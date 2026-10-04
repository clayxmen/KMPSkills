---
name: kmp-gradle-version-catalog
description: |
  Master-tier guide for configuring Gradle 8.x/9.x, Kotlin DSL (build.gradle.kts), Version Catalogs (libs.versions.toml),
  and Convention Plugins for Kotlin Multiplatform projects. Eliminates dependency drift, duplicate configuration,
  and boilerplate across multi-module KMP codebases targeting Android, iOS, Desktop, and Web.

  Use this skill whenever:
    1. Configuring or refactoring gradle/libs.versions.toml for Kotlin Multiplatform and Compose Multiplatform.
    2. Setting up Gradle Kotlin DSL type-safe accessors across multi-module projects.
    3. Writing custom Gradle Convention Plugins (build-logic) for shared KMP and Android library configurations.
    4. Resolving dependency conflicts, AGP / Kotlin compiler plugin mismatches, or Gradle cache issues.
    5. Optimizing build performance with configuration caching, parallel compilation, and build scans.

  Do NOT use when:
    1. Designing application business logic or UI layouts.
    2. Managing runtime dependency injection containers (use `kmp-dependency-injection-koin`).
license: MIT
metadata:
  version: v1.0
  framework: "Gradle Kotlin DSL & Kotlin Multiplatform 2.x"
  architect_tier: "Principal Build & Mobile Architect"
---

# ⚙️ KMP Gradle Version Catalog & Build Engineering Mastery

This skill provides the definitive blueprint for managing dependencies, plugins, and multi-module configurations across **Kotlin Multiplatform (KMP)** and **Android** using **Gradle Version Catalogs (`libs.versions.toml`)** and **Type-Safe Accessors**.

---

## 📦 1. Enterprise `gradle/libs.versions.toml` Master Blueprint

Place this unified version catalog in `gradle/libs.versions.toml`. It provides synchronized, battle-tested dependencies for modern KMP development:

```toml
[versions]
# Build Infrastructure
agp = "8.7.2"
kotlin = "2.1.0"
ksp = "2.1.0-1.0.29"

# Android SDK
android-compileSdk = "35"
android-minSdk = "24"
android-targetSdk = "35"

# Multiplatform Core
coroutines = "1.10.1"
serialization = "1.8.0"
datetime = "0.6.1"

# UI & Lifecycle
composeMultiplatform = "1.7.1"
androidx-lifecycle = "2.8.4"
androidx-navigation = "2.8.0-alpha10"

# Networking & DI
ktor = "3.0.3"
koin = "4.0.0"

# Local Storage
room = "2.7.0-alpha12"
sqlite = "2.5.0-alpha12"
datastore = "1.1.2"

# Utilities & Media
coil = "3.0.4"

# Testing
turbine = "1.2.0"
assertk = "0.28.1"

[libraries]
# KotlinX Ecosystem
kotlinx-coroutines-core = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "coroutines" }
kotlinx-coroutines-android = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-android", version.ref = "coroutines" }
kotlinx-coroutines-swing = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-swing", version.ref = "coroutines" }
kotlinx-coroutines-test = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-test", version.ref = "coroutines" }
kotlinx-serialization-json = { module = "org.jetbrains.kotlinx:kotlinx-serialization-json", version.ref = "serialization" }
kotlinx-datetime = { module = "org.jetbrains.kotlinx:kotlinx-datetime", version.ref = "datetime" }

# Ktor HTTP Client
ktor-client-core = { module = "io.ktor:ktor-client-core", version.ref = "ktor" }
ktor-client-okhttp = { module = "io.ktor:ktor-client-okhttp", version.ref = "ktor" }
ktor-client-darwin = { module = "io.ktor:ktor-client-darwin", version.ref = "ktor" }
ktor-client-cio = { module = "io.ktor:ktor-client-cio", version.ref = "ktor" }
ktor-client-js = { module = "io.ktor:ktor-client-js", version.ref = "ktor" }
ktor-client-content-negotiation = { module = "io.ktor:ktor-client-content-negotiation", version.ref = "ktor" }
ktor-serialization-kotlinx-json = { module = "io.ktor:ktor-serialization-kotlinx-json", version.ref = "ktor" }
ktor-client-logging = { module = "io.ktor:ktor-client-logging", version.ref = "ktor" }
ktor-client-auth = { module = "io.ktor:ktor-client-auth", version.ref = "ktor" }

# Koin Dependency Injection
koin-core = { module = "io.insert-koin:koin-core", version.ref = "koin" }
koin-android = { module = "io.insert-koin:koin-android", version.ref = "koin" }
koin-compose = { module = "io.insert-koin:koin-compose", version.ref = "koin" }
koin-compose-viewmodel = { module = "io.insert-koin:koin-compose-viewmodel", version.ref = "koin" }
koin-test = { module = "io.insert-koin:koin-test", version.ref = "koin" }

# Jetpack & Compose Multiplatform
androidx-lifecycle-viewmodel = { module = "org.jetbrains.androidx.lifecycle:lifecycle-viewmodel-compose", version.ref = "androidx-lifecycle" }
androidx-lifecycle-runtime = { module = "org.jetbrains.androidx.lifecycle:lifecycle-runtime-compose", version.ref = "androidx-lifecycle" }
androidx-navigation-compose = { module = "org.jetbrains.androidx.navigation:navigation-compose", version.ref = "androidx-navigation" }
coil-compose = { module = "io.coil-kt.coil3:coil-compose", version.ref = "coil" }
coil-network-ktor = { module = "io.coil-kt.coil3:coil-network-ktor3", version.ref = "coil" }

# Room Multiplatform Database
androidx-room-runtime = { module = "androidx.room:room-runtime", version.ref = "room" }
androidx-room-compiler = { module = "androidx.room:room-compiler", version.ref = "room" }
androidx-sqlite-bundled = { module = "androidx.sqlite:sqlite-bundled", version.ref = "sqlite" }

# DataStore Preferences
androidx-datastore-preferences = { module = "androidx.datastore:datastore-preferences-core", version.ref = "datastore" }

# Testing Harness
test-turbine = { module = "app.cash.turbine:turbine", version.ref = "turbine" }
test-assertk = { module = "com.willowtreeapps.assertk:assertk", version.ref = "assertk" }

[bundles]
ktor-common = [
    "ktor-client-core",
    "ktor-client-content-negotiation",
    "ktor-serialization-kotlinx-json",
    "ktor-client-logging",
    "ktor-client-auth"
]
koin-common = [
    "koin-core",
    "koin-compose",
    "koin-compose-viewmodel"
]

[plugins]
androidApplication = { id = "com.android.application", version.ref = "agp" }
androidLibrary = { id = "com.android.library", version.ref = "agp" }
kotlinMultiplatform = { id = "org.jetbrains.kotlin.multiplatform", version.ref = "kotlin" }
kotlinSerialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "kotlin" }
composeCompiler = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
composeMultiplatform = { id = "org.jetbrains.compose", version.ref = "composeMultiplatform" }
ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }
room = { id = "androidx.room", version.ref = "room" }
```

---

## 🛠️ 2. Root Project Configuration

### `settings.gradle.kts`
Enable Type-Safe project accessors to write `projects.core` instead of `project(":core")`:

```kotlin
rootProject.name = "MyKmpApp"

enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")

pluginManagement {
    repositories {
        google {
            mavenContent {
                includeGroupAndSubgroups("androidx")
                includeGroupAndSubgroups("com.android")
                includeGroupAndSubgroups("com.google")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}

include(":app:androidApp")
include(":app:shared")
include(":core")
```

---

## 🏗️ 3. Multiplatform Module Configuration (`app/shared/build.gradle.kts`)

Below is the production-grade module definition leveraging the Version Catalog:

```kotlin
plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidLibrary)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.kotlinSerialization)
    alias(libs.plugins.ksp)
    alias(libs.plugins.room)
}

kotlin {
    // 1. Android Target
    androidTarget {
        compilerOptions {
            jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
        }
    }

    // 2. iOS Targets (XCFramework)
    listOf(
        iosX64(),
        iosArm64(),
        iosSimulatorArm64()
    ).forEach { iosTarget ->
        iosTarget.binaries.framework {
            baseName = "SharedApp"
            isStatic = true
        }
    }

    // 3. Desktop JVM Target
    jvm("desktop") {
        compilerOptions {
            jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
        }
    }

    // 4. Web Wasm Target
    @OptIn(org.jetbrains.kotlin.gradle.ExperimentalWasmDsl::class)
    wasmJs {
        moduleName = "webApp"
        browser {
            commonWebpackConfig {
                outputFileName = "webApp.js"
            }
        }
        binaries.executable()
    }

    // 5. SourceSets Hierarchy & Bundles
    sourceSets {
        commonMain.dependencies {
            implementation(compose.runtime)
            implementation(compose.foundation)
            implementation(compose.material3)
            implementation(compose.components.resources)

            // Bundles from Version Catalog
            implementation(libs.bundles.ktor.common)
            implementation(libs.bundles.koin.common)

            implementation(libs.kotlinx.coroutines.core)
            implementation(libs.kotlinx.datetime)
            implementation(libs.androidx.lifecycle.viewmodel)
            implementation(libs.androidx.lifecycle.runtime)
            implementation(libs.androidx.navigation.compose)

            // Persistence
            implementation(libs.androidx.room.runtime)
            implementation(libs.androidx.sqlite.bundled)
            implementation(libs.androidx.datastore.preferences)
        }

        androidMain.dependencies {
            implementation(libs.ktor.client.okhttp)
            implementation(libs.koin.android)
            implementation(libs.kotlinx.coroutines.android)
        }

        iosMain.dependencies {
            implementation(libs.ktor.client.darwin)
        }

        val desktopMain by getting {
            dependencies {
                implementation(compose.desktop.currentOs)
                implementation(libs.ktor.client.cio)
                implementation(libs.kotlinx.coroutines.swing)
            }
        }

        wasmJsMain.dependencies {
            implementation(libs.ktor.client.js)
        }

        commonTest.dependencies {
            implementation(kotlin("test"))
            implementation(libs.kotlinx.coroutines.test)
            implementation(libs.test.turbine)
            implementation(libs.test.assertk)
            implementation(libs.koin.test)
        }
    }
}

android {
    namespace = "com.example.app.shared"
    compileSdk = libs.versions.android.compileSdk.get().toInt()

    defaultConfig {
        minSdk = libs.versions.android.minSdk.get().toInt()
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

room {
    schemaDirectory("$projectDir/schemas")
}

dependencies {
    add("kspCommonMainMetadata", libs.androidx.room.compiler)
    add("kspAndroid", libs.androidx.room.compiler)
}
```

---

## ⚡ 4. High-Performance `gradle.properties` Tuning

Accelerate build speeds up to **4x** by enabling parallel execution, configuration caching, and JVM memory pools:

```properties
# Memory Allocation
org.gradle.jvmargs=-Xmx6144m -XX:+UseG1GC -XX:+UseStringDeduplication

# Gradle Daemon & Concurrency
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.caching=true
org.gradle.configuration-cache=true

# Kotlin Build Performance
kotlin.incremental=true
kotlin.incremental.multiplatform=true
kotlin.native.cacheKind=none
kotlin.mpp.enableCInteropCommonization=true

# Android Gradle Plugin
android.useAndroidX=true
android.nonTransitiveRClass=true
```

---

## 🚫 5. Build Anti-Patterns & Troubleshooting Guide

| Issue / Anti-Pattern | Root Cause | Fix |
|---|---|---|
| **`libs.versions.toml` string duplication** | Defining `"org.jetbrains.kotlin:2.1.0"` directly in subprojects. | Replace all string coordinates with `alias(libs.plugins...)` and `implementation(libs.library.name)`. |
| **Compose Compiler Plugin Missing** | Starting in Kotlin 2.0+, Compose Compiler is no longer part of Jetpack Compose runtime; it is a native Kotlin plugin. | Always apply `alias(libs.plugins.composeCompiler)` alongside `kotlinMultiplatform`. |
| **Darwin Ktor Engine Crash on iOS** | Missing `ktor-client-darwin` dependency in `iosMain.dependencies`. | Ensure each platform sourceSet includes its dedicated Ktor engine (`okhttp` for Android, `darwin` for iOS, `cio` for Desktop). |
| **KSP Room Compilation Errors** | Attaching KSP only to `kspAndroid` instead of multiplatform metadata. | Add `add("kspCommonMainMetadata", libs.androidx.room.compiler)` to ensure common Room DAOs compile properly. |
