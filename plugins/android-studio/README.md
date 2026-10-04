# 💎 KMPSkills Assistant — Android Studio & IntelliJ IDEA Plugin

[![Version](https://img.shields.io/badge/Plugin_Version-1.0.0-blue.svg)](#installation)
[![Compatibility](https://img.shields.io/badge/Compatibility-Android_Studio_2023.1_%E2%80%93_2024.3+-success.svg)](#supported-android-studio-versions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

**KMPSkills Assistant** is a native IDE plugin for **Android Studio** and **IntelliJ IDEA** that equips your development environment with **27 Enterprise-Grade Architectural Skills**, an interactive **MVI Code Generator**, **Room KMP Scaffolder**, **10-Level Curriculum Viewer**, and **1-Click AI Prompt Rule Injection**.

---

## 🚀 Installation Guide (Install Plugin from Disk)

The compiled, ready-to-install plugin archive is located at:
```text
plugins/android-studio/build/distributions/kmpskills-android-studio-plugin-1.0.0.zip
```

### Step-by-Step Installation:
1. Open **Android Studio** (or IntelliJ IDEA).
2. Open **Settings** (`Ctrl+Alt+S` on Windows/Linux, `Cmd+,` on macOS).
3. Navigate to **Plugins** in the left sidebar.
4. Click the gear icon (**⚙️**) at the top of the Plugins panel and select **"Install Plugin from Disk..."**.
5. Browse to:
   ```text
   c:\VPS\KMPSkills\plugins\android-studio\build\distributions\kmpskills-android-studio-plugin-1.0.0.zip
   ```
6. Click **OK** / **Apply**, and restart Android Studio when prompted.

---

## 🌟 Key Features & Capabilities

### 1. 💎 KMPSkills Sidebar Tool Window
Click the **KMPSkills** tab on the right sidebar of Android Studio to open the interactive panel:
- **⚡ Inject AI Rules Button**: Injects `.github/copilot-instructions.md` and `.cursor/rules/` into your active project in 1 second.
- **🔍 Doctor Button**: Audits `libs.versions.toml` versions and reports compliance.
- **27 Skills Catalog Tab**:
  - Live search filter (e.g., search "MVI", "Room", "Ktor", "ARC").
  - Click any skill to preview its architectural directive.
  - **📋 Copy Directive for AI Chat Button**: Copies the exact prompt into your clipboard so you can paste it into Copilot, Gemini, or ChatGPT.
- **10-Level Curriculum Tab**:
  - Browse all 10 masterclass levels directly inside the IDE.

---

### 2. ⚡ Right-Click Context Menu Generators
Right-click on any package or folder in the Android Studio **Project View**:

#### `KMPSkills > New MVI Feature Screen...`
Prompts you for a feature name (e.g. `ProductDetail`, `Cart`, `Profile`) and automatically generates 5 production-ready, warning-free Kotlin 2.x files:
1. `<Feature>UiState.kt` (Immutable state model with ImmutableList)
2. `<Feature>UiIntent.kt` (Sealed interface user action contracts)
3. `<Feature>UiEffect.kt` (Single-shot transient events for Channel)
4. `<Feature>ViewModel.kt` (Lifecycle-aware MVI ViewModel with StateFlow & Channel)
5. `<Feature>Screen.kt` (Composable UI with Snackbar and State hoisting)

#### `KMPSkills > New Room KMP Entity & DAO...`
Prompts you for an entity name (e.g. `Bookmark`, `Article`, `Order`) and generates:
1. `<Entity>Entity.kt` (Room Entity with primary key and timestamps)
2. `<Entity>Dao.kt` (Reactive DAO returning Coroutine `Flow<List<Entity>>`)

---

### 3. 🔍 Architecture Doctor Action
Go to the top menu bar: **Tools > KMPSkills > Run Architecture Doctor**:
- Checks your `gradle/libs.versions.toml` against production thresholds:
  - Kotlin Language (`>= 2.0.0`)
  - Android Gradle Plugin (`>= 8.5.0`)
  - Compose Multiplatform (`>= 1.7.0`)
  - Ktor Client (`>= 3.0.0`)
  - Room Multiplatform (`>= 2.7.0`)
  - Koin Dependency Injection (`>= 4.0.0`)
- Validates active Copilot instructions and Cursor rules.

---

## 🛠️ Building from Source

To recompile or package the plugin binary:

```bash
cd plugins/android-studio
./gradlew buildPlugin
```

The resulting distribution zip will be placed in:
`plugins/android-studio/build/distributions/kmpskills-android-studio-plugin-1.0.0.zip`.

---

## 📱 Supported Android Studio Versions
- Android Studio Hedgehog (2023.1)
- Android Studio Iguana (2023.2)
- Android Studio Jellyfish (2023.3)
- Android Studio Koala & Koala Feature Drop (2024.1)
- Android Studio Ladybug & Ladybug Feature Drop (2024.2)
- Android Studio Meerkat & IntelliJ IDEA 2024.3+
