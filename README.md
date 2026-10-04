# 💎 KMPSkills: Enterprise Kotlin Multiplatform & Android Architecture Suite

<p align="center">
  <img src="https://img.shields.io/badge/Kotlin-2.1.0-7F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white" alt="Kotlin" />
  <img src="https://img.shields.io/badge/Compose%20Multiplatform-1.7.1-4285F4.svg?style=for-the-badge&logo=jetpackcompose&logoColor=white" alt="Compose Multiplatform" />
  <img src="https://img.shields.io/badge/Android%20SDK-35%20%7C%2036-3DDC84.svg?style=for-the-badge&logo=android&logoColor=white" alt="Android" />
  <img src="https://img.shields.io/badge/iOS-17%20%7C%2018%20(SwiftUI)-000000.svg?style=for-the-badge&logo=apple&logoColor=white" alt="iOS" />
  <img src="https://img.shields.io/badge/Desktop-JVM%20(Skiko)-007396.svg?style=for-the-badge&logo=openjdk&logoColor=white" alt="Desktop" />
  <img src="https://img.shields.io/badge/Web-Wasm%20%2F%20JS-654FF0.svg?style=for-the-badge&logo=webassembly&logoColor=white" alt="Web Wasm" />
  <img src="https://img.shields.io/badge/Backend-Ktor%203.x-E535AB.svg?style=for-the-badge&logo=ktor&logoColor=white" alt="Ktor" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License" />
</p>

---

<p align="center">
  <b>English</b> | <a href="README.vi.md">Tiếng Việt</a> | <a href="ARCHITECTURE.md">Architecture Blueprint</a> | <a href="CONTRIBUTING.md">Contributing Guide</a>
</p>

---

## 🌟 Executive Overview

**KMPSkills** is an enterprise-grade architectural blueprint and comprehensive AI Skills knowledge system designed for modern **Kotlin Multiplatform (KMP)** and **Android Native** development. 

Crafted with the dual standards of a **Principal Systems/Mobile Architect** and a **Senior AI Prompt Developer**, this repository delivers **27 fully tested, production-ready, zero-warning architectural skills**. Every skill contains complete, compile-ready Kotlin 2.x source code, Mermaid topology diagrams, defensive edge-case handling, and strict anti-pattern avoidance playbooks.

Whether building for **Android (API 24–36)**, **iOS (SwiftUI/UIKit)**, **Desktop (Windows/macOS/Linux)**, **Web (Wasm)**, or **Backend (Ktor Server)**, KMPSkills provides the authoritative golden standard.

> 📖 **Deep Dive**: For full technical specifications, module isolation constraints, and memory governance rules, read the [ARCHITECTURE.md](ARCHITECTURE.md) blueprint.

---

## ⚡ Instant Setup in ANY Project (`npx kmp-skills`)

You can endow **ANY** Android Native or Kotlin Multiplatform project with full KMPSkills AI intelligence in under 10 seconds:

```bash
# In your project root:
npx kmp-skills init
```

The CLI automatically detects your project configuration and configures:
- **Cursor IDE**: Generates `.cursor/rules/*.mdc` with semantic file globs (`**/*ViewModel.kt`, `**/*Dao.kt`, etc.).
- **Android Studio & VS Code**: Generates `.github/copilot-instructions.md` for Copilot and Gemini Code Assist.
- **Claude Code CLI & Windsurf**: Generates `CLAUDE.md` and `.windsurfrules`.
- **Google Antigravity**: Syncs all 27 skills directly into `~/.gemini/config/skills/kmp-*`.

To audit your current project's architecture health, run:
```bash
npx kmp-skills doctor
```

For detailed CLI options, visit [`packages/cli`](packages/cli).

---

## 🏛️ Architecture at a Glance

The project strictly adheres to **Clean Architecture** blended with **Feature-First Domain-Driven Design (DDD)** and **Unidirectional Data Flow (MVI)**:

```mermaid
graph TD
    subgraph Presentation Layer
        UI["Compose Multiplatform UI (Screens & Atomic Components)"]
        VM["Lifecycle-Aware ViewModel (StateFlow + Channel Effects)"]
        UI <-->|MVI Loop (UiState / UiIntent / UiEffect)| VM
    end

    subgraph Domain Layer (Pure Kotlin)
        UC["UseCases (Single Responsibility)"]
        Entity["Pure Domain Entities"]
        RepoInterface["Abstract Repository Interfaces"]
        VM --> UC
        UC --> RepoInterface
        UC --> Entity
    end

    subgraph Data Layer
        RepoImpl["Repository Implementations"]
        RemoteDS["Remote DataSource (Ktor Client 3.x)"]
        LocalDS["Local DataSource (Room KMP 2.7+ / DataStore)"]
        Outbox["Mutation Outbox Pattern (Offline Sync)"]
        
        RepoInterface <|.. RepoImpl
        RepoImpl --> RemoteDS
        RepoImpl --> LocalDS
        RepoImpl --> Outbox
    end
```

---

## 📚 The 27 Enterprise Skills Catalog

All skills are organized into 10 cohesive architectural domains. Click any skill name to open its complete specification and production implementation:

### Domain 1: Core Architecture & Build Foundation
| Skill Identifier | Key Responsibilities & Tech Stack | Documentation |
|---|---|---|
| **`kmp-architecture-foundation`** | Clean Architecture + Feature-First DDD; 3-Tier Layering; Topological SourceSet Hierarchy; Context & Memory Leak rules. | [View SKILL.md](./skills/kmp-architecture-foundation/SKILL.md) |
| **`kmp-gradle-version-catalog`** | Master `libs.versions.toml`; Type-Safe Project Accessors; KMP sourceSet bundles; 4x faster builds via `gradle.properties`. | [View SKILL.md](./skills/kmp-gradle-version-catalog/SKILL.md) |
| **`kmp-dependency-injection-koin`** | Koin 4.x Multiplatform; Multiplatform initialization (Android, iOS Swift, Desktop, Wasm); `expect/actual` platform modules; CMP `koinViewModel()`. | [View SKILL.md](./skills/kmp-dependency-injection-koin/SKILL.md) |

### Domain 2: UI Engine & Compose Multiplatform
| Skill Identifier | Key Responsibilities & Tech Stack | Documentation |
|---|---|---|
| **`kmp-compose-multiplatform-ui`** | Atomic Design (Atoms, Molecules, Organisms); Slot APIs; Coil 3.x async image caching; Skiko Retina HiDPI rendering guardrails. | [View SKILL.md](./skills/kmp-compose-multiplatform-ui/SKILL.md) |
| **`kmp-design-tokens-theme-engine`** | Immutable Design Tokens (Colors, Typography, Spacing, Shapes); Material 3 + Custom Semantic Tokens; Neobrutalism high-contrast styling. | [View SKILL.md](./skills/kmp-design-tokens-theme-engine/SKILL.md) |
| **`kmp-adaptive-responsive-layouts`** | Multi-device `WindowSizeClass` (Compact, Medium, Expanded); Dynamic navigation chrome (BottomBar ➔ NavRail ➔ Drawer); List-Detail two-pane. | [View SKILL.md](./skills/kmp-adaptive-responsive-layouts/SKILL.md) |
| **`kmp-animation-motion-graphics`** | 120Hz Zero-Jank philosophy (`Modifier.graphicsLayer`); CMP Shared Element Transitions; Physics-based springs; Shimmer skeletons. | [View SKILL.md](./skills/kmp-animation-motion-graphics/SKILL.md) |

### Domain 3: Navigation & State Management
| Skill Identifier | Key Responsibilities & Tech Stack | Documentation |
|---|---|---|
| **`kmp-navigation-compose-stack`** | Type-safe Navigation Compose KMP (`@Serializable`); Nested subgraphs; Bottom tab state preservation (`saveState`/`restoreState`); Deep-links. | [View SKILL.md](./skills/kmp-navigation-compose-stack/SKILL.md) |
| **`kmp-mvi-stateflow-architecture`** | Model-View-Intent (MVI) & UDF; `BaseViewModel`; Immutable `UiState` vs single-shot `UiEffect` Channel (eliminating duplicate toast/nav triggers). | [View SKILL.md](./skills/kmp-mvi-stateflow-architecture/SKILL.md) |
| **`kmp-decompose-retained-lifecycle`** | Decompose 3.x; Component hierarchy independent of UI; Surviving process death (`StateKeeper`) and rotation (`InstanceKeeper`); StackNavigation. | [View SKILL.md](./skills/kmp-decompose-retained-lifecycle/SKILL.md) |

### Domain 4: Data Persistence & Offline-First
| Skill Identifier | Key Responsibilities & Tech Stack | Documentation |
|---|---|---|
| **`kmp-offline-room-database`** | Official Room KMP 2.7+; `BundledSQLiteDriver` (Android, iOS, Desktop, Web); `@ConstructedBy` compiler bridge; Reactive Flow DAOs; Schema migrations. | [View SKILL.md](./skills/kmp-offline-room-database/SKILL.md) |
| **`kmp-datastore-preferences-security`** | Two-Tier Storage: DataStore Preferences for reactive settings + Hardware Secure Vault (Android KeyStore AES-GCM & iOS Keychain). | [View SKILL.md](./skills/kmp-datastore-preferences-security/SKILL.md) |
| **`kmp-offline-sync-engine`** | Local-First Optimistic UI; Mutation Outbox Pattern (`sync_mutations` FIFO table); Last-Write-Wins (LWW) conflict resolution; Exponential backoff. | [View SKILL.md](./skills/kmp-offline-sync-engine/SKILL.md) |

### Domain 5: Networking & Real-Time Comms
| Skill Identifier | Key Responsibilities & Tech Stack | Documentation |
|---|---|---|
| **`kmp-ktor-network-client`** | Ktor Client 3.x (OkHttp, Darwin, CIO, Js); Thread-safe Mutex **Silent Token Refresh** on 401; Masked header logging; `safeApiCall<T>` wrapper. | [View SKILL.md](./skills/kmp-ktor-network-client/SKILL.md) |
| **`kmp-websocket-sse-realtime`** | Self-healing WebSocket state machine; 15s Heartbeat Ping to prevent carrier NAT drops; Jittered backoff reconnection; Server-Sent Events (SSE). | [View SKILL.md](./skills/kmp-websocket-sse-realtime/SKILL.md) |

### Domain 6: Native Hardware Bridges & Deep OS Capabilities
| Skill Identifier | Key Responsibilities & Tech Stack | Documentation |
|---|---|---|
| **`kmp-expect-actual-hardware-interop`** | Interface-Factory bridge pattern: Biometrics (Face ID/Fingerprint), GPS Geolocation, Haptic Vibrations, System Clipboard; OS permissions. | [View SKILL.md](./skills/kmp-expect-actual-hardware-interop/SKILL.md) |
| **`kmp-android-native-system-services`** | Android 14+ Foreground Service (`dataSync`); WorkManager periodic sync; Android 13+ granular media permissions; Android 15 Edge-to-Edge. | [View SKILL.md](./skills/kmp-android-native-system-services/SKILL.md) |
| **`kmp-ios-swiftui-interop`** | Bidirectional View Bridge: Hosting Compose in SwiftUI (`ComposeUIViewController`), embedding UIKit in Compose (`UIKitView`); SKIE Swift coroutines. | [View SKILL.md](./skills/kmp-ios-swiftui-interop/SKILL.md) |

### Domain 7: Performance & Memory Optimization
| Skill Identifier | Key Responsibilities & Tech Stack | Documentation |
|---|---|---|
| **`kmp-compose-compiler-recomposition-optimization`** | Compose Stability inference; Eliminating list re-renders with `ImmutableList` & `@Immutable`; Compose Metrics; Scroll dampening via `derivedStateOf`. | [View SKILL.md](./skills/kmp-compose-compiler-recomposition-optimization/SKILL.md) |
| **`kmp-memory-leak-profiling`** | JVM GC vs Kotlin/Native ARC; Breaking Retain Cycles with `WeakReference`; LeakCanary integration; Managed CoroutineScope lifecycles. | [View SKILL.md](./skills/kmp-memory-leak-profiling/SKILL.md) |
| **`kmp-baseline-profiles-r8-shrinking`** | Sub-400ms cold startup via Android Baseline Profiles (Macrobenchmark); Production R8/ProGuard shrinking rules for Ktor, Room, Koin, Serialization. | [View SKILL.md](./skills/kmp-baseline-profiles-r8-shrinking/SKILL.md) |

### Domain 8: Quality Assurance & Testing
| Skill Identifier | Key Responsibilities & Tech Stack | Documentation |
|---|---|---|
| **`kmp-testing-mocking-turbines`** | Unit testing reactive flows in `commonTest` with CashApp Turbine; Multiplatform mocking on Kotlin/Native with Mockative; In-Memory Test Fakes. | [View SKILL.md](./skills/kmp-testing-mocking-turbines/SKILL.md) |
| **`kmp-compose-ui-screenshot-testing`** | Headless JVM visual regression testing with Roborazzi; Dark/Light mode matrix; Font scaling validation; CI automated pixel-diff verification gates. | [View SKILL.md](./skills/kmp-compose-ui-screenshot-testing/SKILL.md) |

### Domain 9: DevOps, CI/CD & Store Distribution
| Skill Identifier | Key Responsibilities & Tech Stack | Documentation |
|---|---|---|
| **`kmp-ci-cd-matrix-automation`** | Cost-optimized GitHub Actions matrix (Linux for Android/Wasm, macOS M-series for iOS XCFramework); Quality Gates (ktlint + Detekt); Release tagging. | [View SKILL.md](./skills/kmp-ci-cd-matrix-automation/SKILL.md) |
| **`kmp-multiplatform-packaging-distribution`** | Google Play AAB signing; Fastlane automated TestFlight uploads; macOS Notarization (`notarytool` + `stapler`); Compose Desktop native installers. | [View SKILL.md](./skills/kmp-multiplatform-packaging-distribution/SKILL.md) |

### Domain 10: Full-Stack Ktor & Server-Driven UI
| Skill Identifier | Key Responsibilities & Tech Stack | Documentation |
|---|---|---|
| **`kmp-ktor-fullstack-shared-models`** | Full-Stack Kotlin unification: Shared `@Serializable` DTOs, cross-tier validation rules, and typed endpoints between Ktor Server and CMP Client. | [View SKILL.md](./skills/kmp-ktor-fullstack-shared-models/SKILL.md) |
| **`kmp-server-driven-ui-engine`** | Server-Driven UI (SDUI) engine: Polymorphic JSON component trees (`@JsonClassDiscriminator`), dynamic CMP renderer, graceful unknown widget fallback. | [View SKILL.md](./skills/kmp-server-driven-ui-engine/SKILL.md) |

---

## 🗂️ Project Directory Layout

```text
KMPSkills/
├── .github/workflows/                 # CI/CD matrix automation (Lint, Tests, Release)
├── app/
│   ├── androidApp/                    # Android application entry (MainActivity, Manifest)
│   ├── iosApp/                        # iOS Xcode entry point (SwiftUI App, Info.plist)
│   ├── desktopApp/                    # Desktop JVM application entry point (Main.kt)
│   ├── webApp/                        # Web Wasm / JS browser runner (main.kt, index.html)
│   └── shared/                        # Compose Multiplatform shared UI and feature code
│       └── src/
│           ├── commonMain/            # Shared ViewModels, Navigation, UI Kit, Compose
│           ├── androidMain/           # Android platform bridges & drivers
│           ├── iosMain/               # iOS UIKit/SwiftUI bridges & Darwin drivers
│           ├── jvmMain/               # Desktop Skiko/AWT platform bridges
│           └── wasmJsMain/            # Browser canvas & DOM integrations
├── core/                              # Universal Domain & Data foundation (KMP)
│   └── src/commonMain/kotlin/         # Entities, UseCases, Room DB, Ktor Client, Outbox
├── server/                            # Ktor Server 3.x backend application
├── gradle/
│   └── libs.versions.toml             # Master Version Catalog (Dependencies & Plugins)
└── skills/                            # The 27 Enterprise KMP Skills Suite
    ├── kmp-architecture-foundation/
    ├── kmp-compose-multiplatform-ui/
    ├── kmp-offline-room-database/
    └── ... (27 comprehensive skills)
```

---

## 💻 Quickstart: Build, Run & Test

### Running the Applications
```bash
# Android App (Debug)
./gradlew :app:androidApp:assembleDebug

# Desktop App (Hot Reload)
./gradlew :app:desktopApp:hotRun --auto

# Desktop App (Standard Run)
./gradlew :app:desktopApp:run

# Web Wasm App (Modern Browsers)
./gradlew :app:webApp:wasmJsBrowserDevelopmentRun

# Ktor Backend Server
./gradlew :server:run

# iOS App: Open 'app/iosApp' in Xcode and Run on Simulator or Physical Device
```

### Running Test Suites
```bash
# Common & Android Host Tests
./gradlew :app:shared:testAndroidHostTest

# Desktop JVM Unit Tests
./gradlew :app:shared:jvmTest

# iOS Simulator Unit Tests
./gradlew :app:shared:iosSimulatorArm64Test

# Web Wasm Tests
./gradlew :app:shared:wasmJsTest

# Backend Server Tests
./gradlew :server:test
```

---

## 🤖 Global Agent & Assistant Integration

All 27 skills are dual-deployed into the global Antigravity/Gemini configuration directory:
```text
~/.gemini/config/skills/kmp-*
```
Any AI coding assistant using the Antigravity agentic platform will automatically activate these skills whenever relevant tasks (such as Room migrations, Ktor token refresh, MVI ViewModel creation, or Compose recomposition optimization) are detected in your prompts.

---

## 🤝 Contributing

We welcome contributions, optimizations, and new specialized skills! Please review our [CONTRIBUTING.md](CONTRIBUTING.md) guide for standards on authoring skills with the Golden Template Specification.

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).