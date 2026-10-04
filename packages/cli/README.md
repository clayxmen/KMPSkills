# 💎 `kmp-skills` — Universal AI CLI for Android Native & Kotlin Multiplatform

[![npm version](https://img.shields.io/npm/v/kmp-skills.svg?style=flat-square)](https://www.npmjs.com/package/kmp-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/Node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org)
[![Platform Support](https://img.shields.io/badge/Targets-Android_%7C_iOS_%7C_Desktop_%7C_Web_%7C_Server-blueviolet.svg?style=flat-square)](#supported-targets)

`kmp-skills` is a zero-dependency, universal developer CLI that installs **27 enterprise-grade architectural skills and prompt matrices** into **ANY** Android Native or Kotlin Multiplatform (KMP/CMP) project in seconds.

Once installed, your AI coding assistants (**Cursor, Android Studio, VS Code, Google Antigravity, or Claude Code**) will automatically understand your project conventions, architectural boundaries, Room database migrations, Ktor networking, MVI state machines, and Compose compiler stability rules out-of-the-box.

---

## ⚡ Quick Start (Zero-Install via `npx`)

Navigate to your Android or KMP project root and run:

```bash
npx kmp-skills init
```

That's it! The CLI will inspect your project, detect your IDEs, and generate the appropriate context files.

### Global Installation (Optional)

```bash
npm install -g kmp-skills

# Run project health & architecture doctor
kmp-skills doctor

# Initialize or update AI rules
kmp-skills init --all
```

---

## 🛠️ CLI Command Reference

### 1. `kmp-skills init`
Initializes or refreshes AI prompt rules in the current project.

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

### 2. `kmp-skills doctor`
Runs a deep architectural and AI environment diagnostic check:

```bash
kmp-skills doctor
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

---

### 3. `kmp-skills list`
Displays the complete catalog of 27 architectural skills grouped across 10 domains:

```bash
kmp-skills list
```

---

### 4. `kmp-skills inject <skill-name>`
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
