package io.github.kmpskills.plugin.catalog

data class SkillItem(
    val id: String,
    val title: String,
    val domain: String,
    val description: String,
    val promptDirective: String
)

object SkillsCatalog {
    val skills: List<SkillItem> = listOf(
        SkillItem(
            id = "kmp-architecture-foundation",
            title = "Architecture Foundation & Clean Modular DDD",
            domain = "1. Core Architecture",
            description = "Clean Architecture, Hexagonal Boundaries, Multi-Module isolation (:core, :feature, :app).",
            promptDirective = "Follow Clean Architecture with strict separation between Domain (pure Kotlin), Data, and Presentation. Never import Android/UI packages into Domain."
        ),
        SkillItem(
            id = "kmp-gradle-version-catalog",
            title = "Gradle Version Catalog & Build Engineering",
            domain = "1. Core Architecture",
            description = "Mastery of gradle/libs.versions.toml, bundle groups, and build cache optimization.",
            promptDirective = "Define all dependencies in gradle/libs.versions.toml. Use bundle groups and explicit version declarations."
        ),
        SkillItem(
            id = "kmp-dependency-injection-koin",
            title = "Koin Dependency Injection & Scope Governance",
            domain = "2. DI & State Management",
            description = "Multiplatform Koin 4.x setup with moduleDSL, singleOf, viewModelOf, and scope lifecycle.",
            promptDirective = "Use Koin 4.x moduleDSL with singleOf and viewModelOf. Avoid service locators or static singletons."
        ),
        SkillItem(
            id = "kmp-mvi-stateflow-architecture",
            title = "MVI & Unidirectional StateFlow Architecture",
            domain = "2. DI & State Management",
            description = "Model-View-Intent with @Immutable UiState, UiIntent, and single-shot Channel UiEffect.",
            promptDirective = "Implement strict MVI. UiState must be @Immutable with ImmutableList. Deliver one-off events via unbuffered Channel, never SharedFlow."
        ),
        SkillItem(
            id = "kmp-compose-multiplatform-ui",
            title = "Compose Multiplatform UI Engine & Atomic Design",
            domain = "3. UI & Design System",
            description = "Cross-platform declarative UI for Android, iOS, Desktop, and Web using Skiko rendering.",
            promptDirective = "Build UI using Compose Multiplatform 1.7+. Separate Stateful and Stateless composables. Use CMP Resources for strings/drawables."
        ),
        SkillItem(
            id = "kmp-design-tokens-theme-engine",
            title = "Design Tokens & Multi-Theme Engine",
            domain = "3. UI & Design System",
            description = "Dynamic Color Schemes, Typography, Spacing, and Neobrutalism high-contrast design tokens.",
            promptDirective = "Use design tokens via CompositionLocalProvider. Support Light, Dark, and High-Contrast themes dynamically."
        ),
        SkillItem(
            id = "kmp-navigation-compose-stack",
            title = "Type-Safe Navigation Compose Stack",
            domain = "4. Navigation & Layouts",
            description = "Type-safe navigation using Kotlinx Serialization @Serializable route objects and NavHost.",
            promptDirective = "Use type-safe Navigation Compose with @Serializable routes. Do not use raw String URLs."
        ),
        SkillItem(
            id = "kmp-adaptive-responsive-layouts",
            title = "Adaptive & Responsive Multi-Device Layouts",
            domain = "4. Navigation & Layouts",
            description = "WindowSizeClass adaptation (Compact, Medium, Expanded) for Mobile, Tablet, Desktop, and Web.",
            promptDirective = "Adapt layouts based on WindowSizeClass width: BottomBar (<600dp), NavRail (600-840dp), PermanentDrawer (>840dp)."
        ),
        SkillItem(
            id = "kmp-animation-motion-graphics",
            title = "120Hz Animation, Physics Springs & Motion",
            domain = "4. Navigation & Layouts",
            description = "Physics-based spring animations, zero-jank frame budgeting, and Modifier.graphicsLayer transforms.",
            promptDirective = "Offload continuous animations to Modifier.graphicsLayer to bypass Layout and Draw phases for 120Hz fluid motion."
        ),
        SkillItem(
            id = "kmp-offline-room-database",
            title = "Room Multiplatform Offline-First Database",
            domain = "5. Persistence & Security",
            description = "Room KMP 2.7+ with BundledSQLiteDriver across Android, iOS, Desktop, and Web.",
            promptDirective = "Configure Room KMP with BundledSQLiteDriver and @ConstructedBy. DAOs must return reactive Coroutine Flows."
        ),
        SkillItem(
            id = "kmp-datastore-preferences-security",
            title = "DataStore Preferences & Secure Storage Vault",
            domain = "5. Persistence & Security",
            description = "Key-value persistence with Jetpack DataStore and AES-256 Android Keystore / Apple Keychain vault.",
            promptDirective = "Store user settings in DataStore Preferences and sensitive credentials (JWT) in hardware-backed Secure Vault."
        ),
        SkillItem(
            id = "kmp-ktor-network-client",
            title = "Ktor Client 3.x Resilient Networking & Auth Engine",
            domain = "6. Networking & Sync",
            description = "Cross-platform Ktor 3.x with OkHttp/Darwin/CIO engines, ContentNegotiation, and Mutex silent token refresh.",
            promptDirective = "Use Ktor Client 3.x with Auth bearer plugin. Ensure silent token refresh uses Mutex to prevent race conditions on 401."
        ),
        SkillItem(
            id = "kmp-offline-sync-engine",
            title = "Offline-First Sync Engine & Mutation Outbox",
            domain = "6. Networking & Sync",
            description = "Mutation Outbox pattern with FIFO replay queue, Idempotency-Key headers, and Last-Write-Wins conflict resolution.",
            promptDirective = "Implement Mutation Outbox in Room DB. Send UUID Idempotency-Key headers and resolve conflicts via Last-Write-Wins."
        ),
        SkillItem(
            id = "kmp-websocket-sse-realtime",
            title = "Real-Time WebSocket & SSE Streaming",
            domain = "6. Networking & Sync",
            description = "Bidirectional WebSockets and Server-Sent Events with exponential backoff heartbeat and reconnection.",
            promptDirective = "Manage persistent WebSocket streams with structured heartbeat ping/pong and exponential reconnection backoff."
        ),
        SkillItem(
            id = "kmp-expect-actual-hardware-interop",
            title = "expect/actual Hardware & Device Interop",
            domain = "7. Native Bridges",
            description = "Interface-Factory pattern for native sensors, Biometrics, GPS, Haptics, and Clipboard without expect class.",
            promptDirective = "Use the Interface-Factory pattern for hardware bridges (Biometrics, GPS) instead of expect class to allow 100% mockable tests."
        ),
        SkillItem(
            id = "kmp-android-native-system-services",
            title = "Android Native System Services & Modern OS",
            domain = "7. Native Bridges",
            description = "Android 14/15 Foreground Service types (dataSync, location), WorkManager, and WindowInsets.safeDrawing.",
            promptDirective = "Declare mandatory foregroundServiceType for Android 14+ services and apply WindowInsets.safeDrawing for Android 15 edge-to-edge."
        ),
        SkillItem(
            id = "kmp-ios-swiftui-interop",
            title = "iOS SwiftUI Interop & Native View Bridging",
            domain = "7. Native Bridges",
            description = "ComposeUIViewController in SwiftUI, UIKitView in Compose, SKIE Swift async/await, and ARC memory cycle guards.",
            promptDirective = "Host Compose in SwiftUI via ComposeUIViewController. Guard against ARC retain cycles by invoking viewModel.onCleared()."
        ),
        SkillItem(
            id = "kmp-decompose-retained-lifecycle",
            title = "Decompose Retained Component Architecture",
            domain = "7. Native Bridges",
            description = "Navigation and state preservation using Decompose Value, ChildStack, and ComponentContext.",
            promptDirective = "Use Decompose ComponentContext for retained state management and non-Compose multiplatform navigation stacks."
        ),
        SkillItem(
            id = "kmp-compose-compiler-recomposition-optimization",
            title = "Compose Recomposition & Stability Optimization",
            domain = "8. Performance & Memory",
            description = "Compose Compiler Metrics audit, Stable vs Unstable parameters, and kotlinx-collections-immutable.",
            promptDirective = "Enforce @Immutable on UI states and use ImmutableList to ensure all Composables are marked SKIPPABLE by the Compose Compiler."
        ),
        SkillItem(
            id = "kmp-memory-leak-profiling",
            title = "Memory Leak Profiling & Kotlin/Native ARC Safety",
            domain = "8. Performance & Memory",
            description = "LeakCanary integration, Kotlin/Native ARC retain cycle audits, and CoroutineScope cancellation guards.",
            promptDirective = "Prevent Kotlin/Native ARC leaks: use weak references in Swift callbacks and cancel CoroutineScopes explicitly on view disposal."
        ),
        SkillItem(
            id = "kmp-baseline-profiles-r8-shrinking",
            title = "Baseline Profiles, R8 Optimization & Startup Speed",
            domain = "8. Performance & Memory",
            description = "Macrobenchmark startup acceleration (<400ms) and R8 Full Mode shrinking rules for KMP libraries.",
            promptDirective = "Generate Android Baseline Profiles via Macrobenchmark and configure R8 rules for Kotlinx Serialization and Ktor."
        ),
        SkillItem(
            id = "kmp-testing-mocking-turbines",
            title = "Logic Unit Testing with Turbine & Mockative",
            domain = "9. Testing & Quality",
            description = "Multiplatform Flow testing with CashApp Turbine and Kotlin/Native compatible mocking with Mockative.",
            promptDirective = "Write multiplatform unit tests in commonTest using CashApp Turbine for StateFlow assertions and in-memory test fakes."
        ),
        SkillItem(
            id = "kmp-compose-ui-screenshot-testing",
            title = "Compose UI Visual Regression & Screenshot Testing",
            domain = "9. Testing & Quality",
            description = "Roborazzi headless JVM screenshot capture, light/dark mode diff verification, and CI/CD gating.",
            promptDirective = "Use Roborazzi for headless JVM visual regression testing across Light and Dark theme matrix baselines."
        ),
        SkillItem(
            id = "kmp-ci-cd-matrix-automation",
            title = "CI/CD Matrix Automation & Release Pipelines",
            domain = "10. DevOps & Fullstack",
            description = "GitHub Actions matrix builds for Linux (Android AAB/Wasm), macOS (iOS XCFramework), and Windows (MSI).",
            promptDirective = "Automate multiplatform builds with GitHub Actions matrix jobs, enforcing static analysis (ktlint, detekt) before merge."
        ),
        SkillItem(
            id = "kmp-multiplatform-packaging-distribution",
            title = "Multi-Target Distribution & Code Signing",
            domain = "10. DevOps & Fullstack",
            description = "Play Store AAB signing, Apple Notarization, Fastlane automation, and Conveyor Desktop MSI/DMG packaging.",
            promptDirective = "Automate store code-signing: Android release keystores, Fastlane match for iOS, and notarytool for macOS Gatekeeper."
        ),
        SkillItem(
            id = "kmp-ktor-fullstack-shared-models",
            title = "Full-Stack Unification & Shared Ktor Server Models",
            domain = "10. DevOps & Fullstack",
            description = "Sharing @Serializable DTOs and cross-tier validation rules between Ktor Server and KMP clients.",
            promptDirective = "Share @Serializable DTOs and validation rules directly between :server and :core:model to prevent API schema drift."
        ),
        SkillItem(
            id = "kmp-server-driven-ui-engine",
            title = "Server-Driven UI (SDUI) Engine for Compose",
            domain = "10. DevOps & Fullstack",
            description = "Polymorphic JSON component trees, dynamic widget parser, and remote action dispatchers.",
            promptDirective = "Parse polymorphic JSON SDUI component trees with Kotlinx Serialization and provide graceful fallback widgets."
        )
    )
}
