package io.github.kmpskills.plugin.catalog

data class CurriculumLevel(
    val levelNumber: Int,
    val title: String,
    val tier: String,
    val summary: String,
    val keySkills: List<String>
)

object CurriculumCatalog {
    val levels: List<CurriculumLevel> = listOf(
        CurriculumLevel(
            levelNumber = 1,
            title = "Kotlin 2.x K2 & Functional Programming",
            tier = "Level 1: Foundation",
            summary = "Smart Casting, value classes, data object, sealed interfaces, and zero-allocation inline functions.",
            keySkills = listOf("kmp-architecture-foundation")
        ),
        CurriculumLevel(
            levelNumber = 2,
            title = "Asynchronous Coroutines & Flow Mastery",
            tier = "Level 2: Foundation",
            summary = "Suspension vs Blocking, Structured Concurrency (SupervisorJob), Cold Flow vs StateFlow/SharedFlow.",
            keySkills = listOf("kmp-mvi-stateflow-architecture")
        ),
        CurriculumLevel(
            levelNumber = 3,
            title = "Jetpack Compose & Declarative UI Mental Model",
            tier = "Level 3: UI Foundation",
            summary = "UI = f(State), Recomposition lifecycle, State Hoisting, SideEffects, and LazyColumn keys.",
            keySkills = listOf("kmp-compose-multiplatform-ui")
        ),
        CurriculumLevel(
            levelNumber = 4,
            title = "Clean Architecture, Hexagonal & Multi-Module",
            tier = "Level 4: Intermediate",
            summary = "Ports & Adapters, Dependency Inversion, :core / :feature / :app module boundaries, and Koin DI.",
            keySkills = listOf("kmp-architecture-foundation", "kmp-dependency-injection-koin")
        ),
        CurriculumLevel(
            levelNumber = 5,
            title = "Compose Multiplatform: Android, iOS, Desktop & Web",
            tier = "Level 5: Intermediate",
            summary = "Skiko rendering engine, CMP Resources, WindowSizeClass adaptive layouts, and Type-Safe Navigation.",
            keySkills = listOf("kmp-compose-multiplatform-ui", "kmp-adaptive-responsive-layouts")
        ),
        CurriculumLevel(
            levelNumber = 6,
            title = "Persistence with Room KMP & Networking with Ktor",
            tier = "Level 6: Intermediate",
            summary = "Room KMP 2.7+ BundledSQLiteDriver, DAOs, DataStore Secure Vault, and Ktor 3.x Mutex Token Refresh.",
            keySkills = listOf("kmp-offline-room-database", "kmp-ktor-network-client")
        ),
        CurriculumLevel(
            levelNumber = 7,
            title = "MVI State Machines & Unidirectional Data Flow",
            tier = "Level 7: Advanced",
            summary = "UiState, UiIntent, UiEffect, Single-event handling with Channels, and Turbine Flow unit testing.",
            keySkills = listOf("kmp-mvi-stateflow-architecture", "kmp-testing-mocking-turbines")
        ),
        CurriculumLevel(
            levelNumber = 8,
            title = "Offline-First Sync Engine & Mutation Outbox",
            tier = "Level 8: Advanced",
            summary = "Optimistic UI updates (1ms), Room FIFO mutation queue, Idempotency-Key, and Last-Write-Wins.",
            keySkills = listOf("kmp-offline-sync-engine", "kmp-offline-room-database")
        ),
        CurriculumLevel(
            levelNumber = 9,
            title = "Native Hardware Bridges & Kotlin/Native ARC Safety",
            tier = "Level 9: Master Architect",
            summary = "Interface-Factory expect/actual pattern, SwiftUI hosting, ARC Retain Cycle elimination, Android 15.",
            keySkills = listOf("kmp-expect-actual-hardware-interop", "kmp-memory-leak-profiling")
        ),
        CurriculumLevel(
            levelNumber = 10,
            title = "120Hz Performance, Compiler Stability & CI/CD Matrix",
            tier = "Level 10: Master Architect",
            summary = "Compose Compiler Metrics, Modifier.graphicsLayer, Baseline Profiles, Roborazzi, and GitHub Actions.",
            keySkills = listOf("kmp-compose-compiler-recomposition-optimization", "kmp-ci-cd-matrix-automation")
        )
    )
}
