# 💎 `kmp-skills` — Universal AI CLI for Android Native & Kotlin Multiplatform

[![npm version](https://img.shields.io/npm/v/kmp-skills.svg?style=flat-square)](https://www.npmjs.com/package/kmp-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/Node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org)
[![Platform Support](https://img.shields.io/badge/Targets-Android_%7C_iOS_%7C_Desktop_%7C_Web_%7C_Server-blueviolet.svg?style=flat-square)](#supported-targets)

`kmp-skills` is a masterclass developer CLI and TUI wizard that equips **ANY** Android Native or Kotlin Multiplatform (KMP/CMP) project with **27 enterprise-grade architectural skills, code scaffolders, interactive doctor diagnostics, and a 10-level curriculum reader**.

Once installed, your AI coding assistants (**Cursor, Android Studio, VS Code, Google Antigravity, or Claude Code**) will automatically obey your project conventions, architectural boundaries, Room database migrations, Ktor networking, MVI state machines, and Compose compiler stability rules out-of-the-box.

---

## ⚡ Quick Start (Interactive Console Experience)

Run directly with zero installation via `npx`:

```bash
npx kmp-skills
```

Running `kmp-skills` without arguments launches the **Interactive Developer Console Menu**:
- 🚀 **Initialize AI Context**: Configure Cursor rules, Copilot instructions, Claude Code, and Antigravity.
- 💎 **Generate Architecture Code**: Scaffold production-grade MVI screens, Room DAOs, Outbox sync, and Themes.
- 🩺 **Run Architecture Doctor**: Audit Gradle versions, project topology, and one-click auto-fix missing rules.
- 📚 **Masterclass Curriculum Reader**: Read all 10 levels of KMP engineering directly in the terminal.
- 🔍 **Search & Inspect Skills**: Fuzzy-search 27 skills with terminal preview and direct export.
- 📋 **View Catalog**: Browse skills categorized by 10 architectural domains.

### Global Installation

```bash
npm install -g kmp-skills

# Open interactive menu anytime
kmp-skills

# Run project health & architecture doctor with auto-fix
kmp-skills doctor --fix

# Scaffold an MVI feature screen in seconds
kmp-skills g mvi Cart --package com.example.cart --output src/commonMain/kotlin/com/example/cart
```

---

## 🛠️ CLI Command Reference

### 1. `kmp-skills init`
Initializes or refreshes AI prompt rules in the current project with interactive prompts:

```bash
# Interactive mode (prompts for IDEs and Models)
kmp-skills init

# Automated non-interactive mode
kmp-skills init --yes

# Target specific IDEs and LLM models
kmp-skills init --ides cursor,android-studio --models claude,gemini

# Enable all IDE targets (Cursor, Android Studio, VS Code, Antigravity, Claude Code)
kmp-skills init --all
```

**What it generates**:
- **Cursor**: `.cursor/rules/*.mdc` (27 individual rules with semantic file glob targeting).
- **Android Studio & VS Code**: `.github/copilot-instructions.md` (high-density architecture prompt for Copilot & Gemini Code Assist).
- **Claude Code CLI & Windsurf**: `CLAUDE.md` and `.windsurfrules`.
- **Google Antigravity & AGY**: Syncs all 27 skills to `~/.gemini/config/skills/kmp-*`.

---

### 2. `kmp-skills generate` (alias: `g`, `gen`)
Scaffolds production-grade, warning-free architecture files:

```bash
# Interactive wizard (prompts for scaffold type, name, package, output dir)
kmp-skills generate

# Generate MVI Feature (UiState, UiIntent, UiEffect, ViewModel, Screen)
kmp-skills g mvi ProductDetail --package com.example.product

# Generate Room KMP Relational Entity & Reactive Flow DAO
kmp-skills g room Article --package com.example.database

# Generate Offline-First Mutation Outbox Engine & Dispatcher
kmp-skills g outbox SyncEngine --package com.example.sync

# Generate Neobrutalism Design Tokens & Material 3 Dynamic Theme
kmp-skills g theme AppTheme --package com.example.theme
```

---

### 3. `kmp-skills doctor` (alias: `doc`)
Runs an architectural and AI environment diagnostic check:

```bash
# Standard diagnostic check
kmp-skills doctor

# Audit and automatically fix missing rules
kmp-skills doctor --fix
```

**Checks performed**:
- **Project Structure**: Analyzes whether your project is KMP, Android Native, or Fullstack (Ktor Server).
- **Gradle Version Catalog (`libs.versions.toml`)**:
  - Kotlin version (`>= 2.0.0`)
  - Android Gradle Plugin (`>= 8.5.0`)
  - Compose Multiplatform (`>= 1.7.0`)
  - Ktor Client (`>= 3.0.0`)
  - Room Multiplatform (`>= 2.7.0`)
  - Koin DI (`>= 4.0.0`)
- **Testing Infrastructure**: Verifies presence of CashApp Turbine and Mockative.
- **AI Rule Status**: Checks if Cursor MDC rules, Copilot instructions, Claude rules, and Antigravity skills are active.
- **Auto-Fix**: Automatically generates missing context files on demand.

---

### 4. `kmp-skills learn` (alias: `curriculum`, `c`)
Browse and read the official 10-Level Kotlin Multiplatform Masterclass curriculum directly in the terminal:

```bash
# Open interactive curriculum reader
kmp-skills learn

# Jump directly to Level 7 (MVI State Machines)
kmp-skills learn 7

# Read the full curriculum roadmap & overview
kmp-skills learn readme
```

---

### 5. `kmp-skills search` (alias: `find`, `s`)
Fuzzy search across all 27 skills by technology, domain, or concept:

```bash
# Interactive search prompt
kmp-skills search

# Search for Room database skills
kmp-skills search room

# Search for memory leak and ARC profiling
kmp-skills search memory
```

---

### 6. `kmp-skills list` (alias: `ls`)
Displays the complete catalog of 27 architectural skills grouped across 10 domains:

```bash
kmp-skills list
```

---

### 7. `kmp-skills inject <skill-name>`
Injects a single specific skill into your project or prints it to standard output:

```bash
# Print Room database skill in Cursor MDC format to stdout
kmp-skills inject kmp-offline-room-database --format mdc --stdout

# Write MVI StateFlow skill directly to a markdown file
kmp-skills inject kmp-mvi-stateflow-architecture --output ./docs/MVI_GUIDE.md
```

---

## 🤖 Supported AI Models & Semantic Optimization

`kmp-skills` optimizes rule formats specifically for each major LLM family:

| Model Family | Optimization Strategy |
| :--- | :--- |
| **Anthropic Claude (3.7 / 3.5 Sonnet)** | Formats into structured XML envelopes (`<skill>`, `<architectural_guidelines>`, `<strict_enforcement>`), strictly enforcing zero-stub code and Kotlin/Native ARC safety. |
| **Google Gemini (2.0 Flash / Pro, 1.5 Pro)** | Markdown-optimized for massive context windows (1M+ tokens), enabling whole-repo analysis without loss of detail. |
| **DeepSeek (V3 & R1 Reasoning)** | Includes explicit Chain-of-Thought reasoning protocols, concurrency proofs (Mutex/Outbox FIFO), and time-complexity constraints. |
| **OpenAI (GPT-4o, o1, o3-mini)** | Structured system/developer instructions with 3-step verification gates. |

---

## 💻 Supported IDEs & Coding Environments

- **Cursor IDE (v0.45+)**: Full `.cursor/rules/*.mdc` support with semantic glob triggers (`**/*ViewModel.kt`, `**/*Dao.kt`, etc.).
- **Android Studio (Hedgehog to Ladybug+)**: `.github/copilot-instructions.md` recognized by GitHub Copilot & Gemini Code Assist.
- **VS Code**: `.github/copilot-instructions.md` recognized by GitHub Copilot, Roo Code, and Claude Dev.
- **Google Antigravity & AGY**: Synced into global `~/.gemini/config/skills/kmp-*` for autonomous agent invocation.
- **Claude Code CLI & Windsurf**: `CLAUDE.md` and `.windsurfrules` with build/test command integration.

---

## 📄 License

Distributed under the [MIT License](../../LICENSE).
