# KMPSkills — System Architecture & Multiplatform Blueprint

[![Kotlin Version](https://img.shields.io/badge/Kotlin-2.1.10-blue.svg)](https://kotlinlang.org)
[![Compose Multiplatform](https://img.shields.io/badge/Compose_Multiplatform-1.7.3-8A2BE2.svg)](https://www.jetbrains.com/lp/compose-multiplatform/)
[![Architecture](https://img.shields.io/badge/Architecture-Clean_%2B_MVI_%2B_Hexagonal-success.svg)](#high-level-architectural-topology)
[![Multiplatform Target](https://img.shields.io/badge/Targets-Android_%7C_iOS_%7C_Desktop_%7C_Web_%7C_Server-orange.svg)](#target-platforms--entry-points)

---

## Executive Summary

**KMPSkills** is an enterprise-grade architectural blueprint and design system built upon **Kotlin Multiplatform (KMP)** and **Compose Multiplatform (CMP)**. It demonstrates how to structure, build, test, and ship mission-critical software across **Android, iOS, Desktop (macOS/Windows/Linux), Web (Wasm), and Ktor Server** from a unified, zero-duplication codebase.

This document formalizes the architectural contracts, module topology, data flow constraints, memory management models, and design trade-offs governing the entire system.

---

## 1. High-Level Architectural Topology

KMPSkills follows **Hexagonal / Clean Architecture** principles adapted for Kotlin Multiplatform. Business logic remains completely isolated from UI rendering frameworks, database engines, and native OS APIs.

```mermaid
graph TD
    subgraph Presentation ["Presentation Layer (Compose Multiplatform)"]
        UI["Composables / Screens / Widgets"]
        VM["MVI ViewModels / StateFlow"]
        Design["Core Design Tokens / Theming"]
    end

    subgraph Domain ["Domain Layer (Pure Kotlin Multiplatform)"]
        UC["UseCases / Interactors"]
        Models["Domain Entities & Value Objects"]
        Repos["Repository Interfaces (Ports)"]
        Validation["Shared Business Rules & Validators"]
    end

    subgraph Data ["Data Layer (KMP Infrastructure)"]
        RepoImpl["Repository Implementations (Adapters)"]
        LocalDB["Room Multiplatform (Bundled SQLite)"]
        RemoteNet["Ktor Client 3.x (OkHttp / Darwin / CIO / Js)"]
        Outbox["Mutation Outbox Sync Engine"]
        Vault["Secure Keystore / Keychain Vault"]
    end

    subgraph PlatformAdapters ["Hardware & OS Bridges (Interface-Factory Pattern)"]
        HW["expect/actual Hardware Bridges (Biometrics, GPS, Haptics)"]
        NativeOS["Android Services / WorkManager / iOS UIKitView"]
    end

    UI --> VM
    VM --> UC
    UC --> Models
    UC --> Repos
    Repos <|-- RepoImpl
    RepoImpl --> LocalDB
    RepoImpl --> RemoteNet
    RepoImpl --> Outbox
    RepoImpl --> Vault
    RepoImpl --> HW
    HW --> NativeOS
```

### Architectural Axioms
1. **Dependency Inversion**: Dependencies point strictly inwards toward the **Domain Layer**. The Domain contains pure Kotlin code and has zero dependencies on Android, iOS CocoaPods, Compose UI, or native platform libraries.
2. **Single Source of Truth (SSOT)**: Local persistent storage (Room KMP) serves as the sole ground truth for application state. Network operations push changes into local storage; UI observes local storage via Coroutine `Flow`.
3. **Unidirectional Data Flow (UDF / MVI)**: States flow down to the UI via immutable `StateFlow`; user intents flow up to the ViewModel via typed `Intent` actions; transient one-off events are delivered via unbuffered `Channel` effects.

---

## 2. Multi-Module Topology & Layer Boundaries

The codebase is organized into granular, decoupled Gradle modules to maximize build parallelism, enforce encapsulation, and prevent transitive dependency pollution.

```mermaid
flowchart TB
    subgraph Launchers ["Platform Application Launchers"]
        AndroidApp[":app:androidApp"]
        IosApp[":app:iosApp (SwiftUI / CocoaPods)"]
        DesktopApp[":app:desktopApp (JVM / Skiko)"]
        WebApp[":app:webApp (Wasm-Js / Skiko)"]
    end

    subgraph FeatureModules ["Feature Modules"]
        FeatureAuth[":feature:auth"]
        FeatureDashboard[":feature:dashboard"]
        FeatureProfile[":feature:profile"]
    end

    subgraph SharedCoordination [":app:shared"]
        SharedNav["Global Navigation Graph (Compose / Decompose)"]
        SharedDI["Koin Global Modules Aggregator"]
    end

    subgraph CoreModules ["Core Infrastructure Modules"]
        CoreModel[":core:model (Entities, Value Objects, DTOs)"]
        CoreDesign[":core:designsystem (Tokens, Themes, Custom Components)"]
        CoreDatabase[":core:database (Room KMP, Bundled SQLite)"]
        CoreNetwork[":core:network (Ktor Client 3.x, Auth, Outbox)"]
        CoreHardware[":core:hardware (Biometrics, Sensors, Clipboard)"]
    end

    subgraph BackendModule ["Backend"]
        KtorServer[":server (Ktor Server 3.x)"]
    end

    AndroidApp --> SharedCoordination
    IosApp --> SharedCoordination
    DesktopApp --> SharedCoordination
    WebApp --> SharedCoordination

    SharedCoordination --> FeatureAuth
    SharedCoordination --> FeatureDashboard
    SharedCoordination --> FeatureProfile

    FeatureAuth --> CoreModel
    FeatureAuth --> CoreDesign
    FeatureDashboard --> CoreModel
    FeatureDashboard --> CoreDesign

    FeatureAuth --> CoreDatabase
    FeatureAuth --> CoreNetwork
    FeatureAuth --> CoreHardware

    KtorServer -.->|Shares DTOs & Validation| CoreModel
```

### Module Responsibilities

| Module | Platforms | Scope & Responsibilities | Prohibited Dependencies |
| :--- | :--- | :--- | :--- |
| **`:core:model`** | Common (JVM, iOS, Desktop, Wasm, Server) | Plain Kotlin data classes, `@Serializable` DTOs, domain value objects, and shared validation logic. | Compose UI, Android SDK, Ktor Server, Room |
| **`:core:designsystem`** | CMP (Android, iOS, Desktop, Wasm) | Design tokens (Colors, Typography, Elevation, Spacing), Neobrutalist components, Markdown highlighters. | Database, Network, Business UseCases |
| **`:core:database`** | KMP | Room KMP 2.7+ entities, DAOs, cross-platform migrations, and `BundledSQLiteDriver`. | Compose UI, ViewModels |
| **`:core:network`** | KMP | Ktor Client 3.x engine configs (Darwin/OkHttp/CIO/Js), Auth token refresh Mutex, NetworkResult wrapper. | Room DAOs, ViewModels |
| **`:core:hardware`** | KMP | Interface-Factory bridges for Biometrics, GPS, Haptic feedback, and System Clipboard. | Compose UI, Server |
| **`:feature:*`** | CMP | Self-contained user journeys (Auth, Feed, Settings). Owns MVI ViewModels, UI Composables, and feature navigation. | Other feature modules (Enforces isolation) |
| **`:app:shared`** | CMP | Entry point wiring, global Koin DI container assembly, and root Compose Multiplatform scaffold. | None (Aggregator) |
| **`:server`** | JVM | Ktor Server 3.x backend providing REST & WebSocket endpoints, consuming shared models from `:core:model`. | Compose UI, Mobile OS APIs |

---

## 3. Unidirectional Data Flow (MVI State Machine)

Every interactive screen is driven by a strict, contract-first **Model-View-Intent (MVI)** state machine.

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Screen Composable
    participant VM as MVI ViewModel
    participant UC as UseCase / Interactor
    participant Repo as Repository (SSOT)
    participant Outbox as Mutation Outbox Engine

    User->>VM: Dispatches UiIntent (e.g. SaveBookmarkIntent)
    Note over VM: Intent mapped to Coroutine Scope
    VM->>UC: Executes UseCase(params)
    UC->>Repo: mutateEntity(data)
    Repo->>Outbox: Stage Pending Mutation (Room DB)
    Outbox-->>Repo: Mutation ID
    Repo-->>UC: Optimistic Success
    UC-->>VM: Domain Result
    VM->>VM: Reducer produces new UiState
    VM-->>User: Emits updated StateFlow<UiState>
    Note over VM: Non-blocking one-shot notification
    VM-->>User: Emits UiEffect.ShowSnackbar via Channel
    
    par Background Sync
        Outbox->>Outbox: Push mutation to Ktor Remote API
        Outbox->>Repo: Mark mutation Confirmed or Rollback on failure
    end
```

### MVI Architectural Contract
```kotlin
// 1. Immutable State (Guaranteed Compose Stability)
@Immutable
data class BookmarkUiState(
    val isLoading: Boolean = false,
    val items: ImmutableList<BookmarkItem> = persistentListOf(),
    val errorMessage: String? = null
)

// 2. User Intent Actions
sealed interface BookmarkUiIntent {
    data class ToggleBookmark(val itemId: String) : BookmarkUiIntent
    data object RefreshRequested : BookmarkUiIntent
    data class FilterCategorySelected(val category: String) : BookmarkUiIntent
}

// 3. One-off Side Effects (Non-state events)
sealed interface BookmarkUiEffect {
    data class ShowToast(val message: String) : BookmarkUiEffect
    data class NavigateToDetail(val itemId: String) : BookmarkUiEffect
}
```

---

## 4. Offline-First Synchronization & Mutation Outbox Engine

The application implements an enterprise **Mutation Outbox Pattern** to provide deterministic offline usability with zero data loss.

```mermaid
flowchart TD
    UIChange["User Action (Create / Update / Delete)"] --> LocalWrite["1. Atomic Write to Room DB (Status: PENDING)"]
    LocalWrite --> OptimisticUI["2. UI Observes DB Update Instantly via Flow"]
    LocalWrite --> EnqueueOutbox["3. Insert into Outbox Queue Table"]
    
    EnqueueOutbox --> NetworkCheck{"Network Available?"}
    NetworkCheck -- No --> IdleWait["Listen to Connectivity Flow (Exponential Backoff)"]
    IdleWait --> NetworkCheck
    
    NetworkCheck -- Yes --> DequeueFIFO["4. Dequeue FIFO Mutation Batch"]
    DequeueFIFO --> RemoteCall["5. Dispatch via Ktor Client with Idempotency-Key"]
    
    RemoteCall -- Success (200 OK) --> MarkSynced["6. Update Room DB Status to SYNCED & Delete Outbox Entry"]
    RemoteCall -- Conflict (409) --> LWW["7. Resolve Conflict via Last-Write-Wins (LWW)"]
    RemoteCall -- Network Timeout --> RetryJitter["8. Retry with Jitter & Backoff"]
    RetryJitter --> DequeueFIFO
```

### Key Outbox Guarantees
- **Idempotency**: Every outbound mutation generates a deterministic UUID `Idempotency-Key` sent in HTTP headers, preventing duplicate server-side side-effects during network retries.
- **Ordered FIFO Replay**: Dependent mutations (e.g., Create Post -> Add Comment to Post) execute in strict chronological sequence.
- **Crash Safety**: All outbox transactions occur within Room ACID transactions. Even if the OS terminates the process mid-action, uncommitted operations safely resume upon app relaunch.

---

## 5. Native Hardware Bridges: Interface-Factory Pattern

To avoid brittle, tightly coupled `expect class` implementations, KMPSkills enforces the **Interface-Factory Pattern** for native hardware and OS capabilities.

```mermaid
classDiagram
    class BiometricAuthenticator {
        <<interface>>
        +isSupported() Boolean
        +authenticate(title: String) BiometricResult
    }

    class AndroidBiometricAuthenticator {
        -context: Context
        +isSupported() Boolean
        +authenticate(title: String) BiometricResult
    }

    class IosBiometricAuthenticator {
        -laContext: LAContext
        +isSupported() Boolean
        +authenticate(title: String) BiometricResult
    }

    class DesktopBiometricAuthenticator {
        +isSupported() Boolean
        +authenticate(title: String) BiometricResult
    }

    class BiometricFactory {
        <<expect>>
        +createBiometricAuthenticator() BiometricAuthenticator
    }

    BiometricAuthenticator <|.. AndroidBiometricAuthenticator : implements
    BiometricAuthenticator <|.. IosBiometricAuthenticator : implements
    BiometricAuthenticator <|.. DesktopBiometricAuthenticator : implements
    BiometricFactory ..> BiometricAuthenticator : produces
```

### Architectural Benefits
1. **Mockability**: Domain and Feature ViewModels accept pure interfaces (`BiometricAuthenticator`), allowing unit tests in `commonTest` to substitute mocks or in-memory fakes without native runtime engines.
2. **Graceful Degradation**: On platforms lacking physical hardware (Desktop or Web), the factory returns a no-op fallback implementation rather than throwing runtime unlinked-symbol exceptions.

---

## 6. Kotlin/Native Memory Governance & Swift Interop

Kotlin/Native operates under an **Automatic Reference Counting (ARC)** runtime. Bridging Kotlin coroutines and Swift views introduces retain-cycle hazards if not governed properly.

```mermaid
graph LR
    subgraph SwiftIOS ["Swift / SwiftUI Runtime (ARC)"]
        SwiftView["SwiftUI View"]
        SwiftCoordinator["ObservableObject Coordinator"]
    end

    subgraph BridgeBoundary ["Interop Boundary (SKIE / Objective-C)"]
        WeakRef["Weak Reference / Lifetime Binder"]
    end

    subgraph KotlinNative ["Kotlin/Native Runtime (ARC)"]
        KMPScope["CoroutineScope (SupervisorJob + Dispatchers.Main.immediate)"]
        KMPViewModel["Shared ViewModel / Flow Producer"]
    end

    SwiftView -->|Retains| SwiftCoordinator
    SwiftCoordinator -->|Binds to| WeakRef
    WeakRef -->|Observes| KMPViewModel
    KMPViewModel -->|Owns| KMPScope
    SwiftCoordinator -.->|On View Disappear: onCleared()| KMPViewModel
    KMPViewModel -.->|Cancels Children| KMPScope
```

### Critical Native Safety Rules
- **No Strong Cycles Across Language Boundaries**: Swift closures or listeners held by Kotlin objects must use weak wrappers.
- **Explicit Scope Cancellation**: Every multiplatform ViewModel exposes a lifecycle termination hook (`onCleared()`), invoked by Android `ViewModel.onCleared()`, Desktop window close handlers, and SwiftUI `.onDisappear()`.
- **SKIE Integration**: Coroutine `Flow` streams are exported as native Swift `AsyncSequence` types, allowing native `for await item in viewModel.state` ergonomics without manual callback wrapping.

---

## 7. Performance & Optimization Envelope

| Dimension | Production Standard | Enforcement Mechanism |
| :--- | :--- | :--- |
| **Android Startup Time** | Cold start < 400ms | Android Baseline Profiles generated via Macrobenchmark + R8 Full Mode. |
| **Recomposition Frequency** | Zero non-skipped renders on stable state | Compose Compiler Metrics audit (`-Pplugin:androidx.compose.compiler.plugins.kotlin:reportsDestination=...`). All models use `@Immutable` or `ImmutableList<T>`. |
| **Frame Budgeting** | Zero jank at 120Hz (8.33ms / frame) | Dynamic transforms offloaded to `Modifier.graphicsLayer { ... }` bypass layout and draw phases. |
| **Binary Footprint** | Stripped release binaries | ProGuard/R8 code and resource shrinking, dead-code elimination, and SVG vector asset conversion. |
| **Memory Leak Guard** | Zero activity/view retain cycles | LeakCanary on Android, Instruments Leaks Trace on iOS, and strict Coroutine scope cancellation guards. |

---

## 8. Build & Verification Matrix

Every pull request and release build undergoes strict static and dynamic verification:

```mermaid
flowchart LR
    LintCheck["1. Static Analysis (detekt + ktlint)"] --> ComposeAudit["2. Compose Metrics Stability Audit"]
    ComposeAudit --> HeadlessTests["3. Unit & Turbine Flow Tests (commonTest)"]
    HeadlessTests --> Roborazzi["4. Roborazzi Headless Screenshot Diffs"]
    Roborazzi --> MatrixBuild["5. Matrix Multi-Platform Binary Compilation"]
    
    subgraph Targets ["Parallel Matrix Targets"]
        AndroidTarget["Android AAB / APK"]
        IosTarget["iOS Framework / IPA"]
        DesktopTarget["Desktop MSI / DMG / Deb"]
        WebTarget["Web Wasm HTML5 Bundle"]
    end
    
    MatrixBuild --> AndroidTarget
    MatrixBuild --> IosTarget
    MatrixBuild --> DesktopTarget
    MatrixBuild --> WebTarget
```

For guidelines on authoring and extending this architecture, consult [CONTRIBUTING.md](file:///c:/VPS/KMPSkills/CONTRIBUTING.md).
