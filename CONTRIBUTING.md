# Contributing to KMPSkills

Thank you for your interest in contributing to **KMPSkills**! This project provides the definitive, production-grade architectural blueprint and AI agent skill matrix for Kotlin Multiplatform (KMP) and Compose Multiplatform (CMP).

To ensure every skill and code snippet maintains the standard of a **Senior Systems Architect** and **Senior Prompt Developer**, all contributions must strictly adhere to the guidelines outlined below.

---

## 1. Dual Deployment Architecture

Every skill authored for KMPSkills serves a dual purpose:
1. **Interactive AI Agent Prompt Injection**: Directly ingested by LLM agents (Antigravity, Gemini Code Assist, Claude, Cursor) to automate KMP development.
2. **Open-Source Architectural Reference**: Consumed by human engineering teams as an authoritative implementation standard.

### File Location Requirements
Whenever a skill is added or updated, it **MUST** be deployed to both destinations:
- **Global AI Agent Config**: `~/.gemini/config/skills/<skill-name>/SKILL.md`
- **Repository Showcase**: `c:\VPS\KMPSkills\skills/<skill-name>/SKILL.md`

---

## 2. The Golden Skill Specification

Every skill file (`SKILL.md`) must follow our **Golden Standard Template**. Any pull request containing partial implementations, placeholders, or missing sections will be automatically blocked.

### Mandatory Sections

```yaml
---
name: kmp-example-feature
description: High-impact 1-3 line summary describing the domain and technical scope.
---

# Title: Master-Tier Domain Guide for Kotlin Multiplatform

## When to Use This Skill
Use this skill whenever:
  1. [Explicit trigger scenario 1]
  2. [Explicit trigger scenario 2]
  3. [Explicit trigger scenario 3]
  4. [Explicit trigger scenario 4]
  5. [Explicit trigger scenario 5]

Do NOT use when:
  1. [Negative trigger scenario 1 - redirect to relevant skill]
  2. [Negative trigger scenario 2 - redirect to relevant skill]
```

### Golden Quality Criteria
- **Zero Stubbed Code**: Every code block must be fully typed, valid Kotlin 2.x. Placeholder comments (`// TODO: implement later`, `// your logic here`, `/* ... */`) are strictly forbidden.
- **Architectural Diagramming**: Every skill must include at least one complete **Mermaid diagram** (`graph TD`, `sequenceDiagram`, `classDiagram`, or `flowchart LR`) illustrating the data flow or component interactions.
- **Anti-Pattern Avoidance Table**: Must include an explicit side-by-side comparison table contrasting rookie mistakes with enterprise production patterns:
  ```markdown
  | Anti-Pattern | Why It Breaks in Production | Master-Tier Architecture |
  | :--- | :--- | :--- |
  | Using MutableList in State | Compose skips stability optimization | Use kotlinx.collections.immutable.ImmutableList |
  ```
- **Platform Edge Cases**: Must detail OS-specific behaviors across Android (14/15 permissions, insets), iOS (ARC memory cycles, Swift interop), Desktop (Skiko JVM), and Web (Wasm).

---

## 3. Code Standards & Static Analysis

All Kotlin and Gradle code contributed to this repository must pass strict automated gates:

### Kotlin Code Conventions
- **Kotlin 2.x & CMP 1.7+ Idioms**: Use modern language features (`data object`, `@Immutable`, context receivers or context parameters, typed sealed interfaces).
- **Compose Stability**: Composable parameters must be inferred as `@Stable` or `@Immutable`. Collections in UI state must use `ImmutableList<T>` or `ImmutableSet<T>` from `kotlinx-collections-immutable`.
- **Pure Domain Isolation**: Code in `:core:model` and domain UseCases must never import platform packages (`android.*`, `platform.UIKit.*`, `androidx.compose.*`).

### Static Analysis Commands
Run the following commands locally before opening a pull request:

```bash
# Check code formatting and style
./gradlew ktlintCheck detekt

# Automatically apply formatting fixes
./gradlew ktlintFormat

# Run unit tests across all targets in commonTest
./gradlew check

# Generate Compose Compiler stability metrics
./gradlew assembleRelease -Pplugin:androidx.compose.compiler.plugins.kotlin:reportsDestination=build/compose_metrics
```

---

## 4. Development & Testing Workflow

### Step 1: Fork and Branch
Create a descriptive feature branch from `main`:
```bash
git checkout -b feature/kmp-new-capability
```

### Step 2: Implement Code & Skill
1. Add or modify the core module implementation in `c:\VPS\KMPSkills\`.
2. Write unit tests in `commonTest` using **CashApp Turbine** for Flow assertions and in-memory test fakes.
3. Author the comprehensive `SKILL.md` following the Golden Template.
4. Copy the completed skill to `~/.gemini/config/skills/<skill-name>/SKILL.md`.

### Step 3: Run Headless Verification
Ensure all headless tests and screenshot diffs pass without regressions:
```bash
# Execute unit test suites
./gradlew :core:network:testDebugUnitTest
./gradlew :core:database:testDebugUnitTest

# Run Roborazzi screenshot regression checks (if UI modified)
./gradlew verifyRoborazziDebug
```

---

## 5. Commit & Pull Request Conventions

We adhere to the **Conventional Commits** specification:

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

### Supported Types
- `feat`: A new architectural capability or new skill definition.
- `fix`: A bug fix in an existing module or correction in skill documentation.
- `refactor`: Code reorganization with zero behavior alterations.
- `perf`: A performance optimization (e.g., eliminating recompositions or reducing APK size).
- `docs`: Documentation updates, bilingual translations, or README refinements.
- `test`: Adding or correcting unit, integration, or visual regression tests.

### Examples
- `feat(skills): add kmp-ai-gemini-on-device skill specification`
- `fix(room): resolve iOS bundled SQLite symbol collision in 2.7.0`
- `docs(arch): update offline sync outbox sequence diagram`

---

## 6. Community & Code of Conduct

By participating in the KMPSkills project, you agree to maintain a respectful, inclusive, and collaborative environment. Treat every contributor with kindness, provide constructive feedback on pull requests, and uphold the highest standard of technical excellence.

For questions, open a GitHub Discussion or reach out to the core maintainers.
