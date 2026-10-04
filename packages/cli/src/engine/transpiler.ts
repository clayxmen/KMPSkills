import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { EMBEDDED_SKILLS, SkillEntry } from './skills-data.js';
import { adaptSkillForModel, TargetModel } from './model-adapter.js';

export interface TranspileOptions {
  cwd: string;
  ides: ('cursor' | 'android-studio' | 'vscode' | 'antigravity' | 'claude-code')[];
  models: TargetModel[];
  selectedSkills?: string[];
}

export interface TranspileResult {
  cursorFiles: string[];
  copilotFile?: string;
  claudeFile?: string;
  antigravitySkills: number;
}

export function transpileSkills(options: TranspileOptions): TranspileResult {
  const result: TranspileResult = {
    cursorFiles: [],
    antigravitySkills: 0
  };

  const skillsToGenerate = options.selectedSkills && options.selectedSkills.length > 0
    ? EMBEDDED_SKILLS.filter(s => options.selectedSkills!.includes(s.id))
    : EMBEDDED_SKILLS;

  // 1. Generate Cursor MDC rules (.cursor/rules/*.mdc)
  if (options.ides.includes('cursor')) {
    const cursorRulesDir = path.join(options.cwd, '.cursor', 'rules');
    fs.mkdirSync(cursorRulesDir, { recursive: true });

    for (const skill of skillsToGenerate) {
      const fileName = `${skill.id}.mdc`;
      const filePath = path.join(cursorRulesDir, fileName);
      const isAlwaysApply = skill.id === 'kmp-architecture-foundation';

      const globsFormatted = JSON.stringify(skill.globs);
      const mdcHeader = `---
description: "${escapeQuotes(skill.description)}"
globs: ${globsFormatted}
alwaysApply: ${isAlwaysApply}
---

`;
      const body = adaptSkillForModel(skill, options.models);
      fs.writeFileSync(filePath, mdcHeader + body, 'utf-8');
      result.cursorFiles.push(fileName);
    }
  }

  // 2. Generate Android Studio & VS Code (.github/copilot-instructions.md)
  if (options.ides.includes('android-studio') || options.ides.includes('vscode')) {
    const githubDir = path.join(options.cwd, '.github');
    fs.mkdirSync(githubDir, { recursive: true });
    const copilotPath = path.join(githubDir, 'copilot-instructions.md');

    let combined = `# KMPSkills: Enterprise Kotlin Multiplatform & Android Architecture Instructions\n\n`;
    combined += `You are an expert Senior Android Native & Kotlin Multiplatform Architect pair programming on this codebase.\n`;
    combined += `Follow the architectural rules below strictly. Never use stubbed code (// TODO), ensure Compose stability (@Immutable/ImmutableList), and enforce Unidirectional Data Flow (MVI).\n\n`;
    combined += `---\n\n`;

    for (const skill of skillsToGenerate) {
      combined += adaptSkillForModel(skill, options.models) + '\n\n---\n\n';
    }

    fs.writeFileSync(copilotPath, combined, 'utf-8');
    result.copilotFile = copilotPath;
  }

  // 3. Generate Claude Code CLI & Windsurf (CLAUDE.md and .windsurfrules)
  if (options.ides.includes('claude-code')) {
    const claudePath = path.join(options.cwd, 'CLAUDE.md');
    let claudeContent = `# KMPSkills Architecture & Development Guide\n\n`;
    claudeContent += `## 🚀 Core Build & Verification Commands\n`;
    claudeContent += `- Build project: \`./gradlew assembleDebug\`\n`;
    claudeContent += `- Run unit tests: \`./gradlew check\`\n`;
    claudeContent += `- Check code style: \`./gradlew ktlintCheck detekt\`\n`;
    claudeContent += `- Apply formatting: \`./gradlew ktlintFormat\`\n\n`;
    claudeContent += `## 🏛️ Architectural Guardrails\n`;

    for (const skill of skillsToGenerate) {
      claudeContent += `- **${skill.title}** (${skill.domain}): Target files: \`${skill.globs.join(', ')}\`\n`;
    }

    claudeContent += `\n## 📚 Active Architectural Rules\n\n`;
    for (const skill of skillsToGenerate) {
      claudeContent += adaptSkillForModel(skill, ['claude']) + '\n\n';
    }

    fs.writeFileSync(claudePath, claudeContent, 'utf-8');
    result.claudeFile = claudePath;

    // Also mirror to .windsurfrules
    const windsurfPath = path.join(options.cwd, '.windsurfrules');
    fs.writeFileSync(windsurfPath, claudeContent, 'utf-8');
  }

  // 4. Sync to Global Antigravity (~/.gemini/config/skills/kmp-*)
  if (options.ides.includes('antigravity')) {
    const homeDir = os.homedir();
    const globalSkillsDir = path.join(homeDir, '.gemini', 'config', 'skills');

    try {
      if (fs.existsSync(globalSkillsDir)) {
        for (const skill of skillsToGenerate) {
          const targetDir = path.join(globalSkillsDir, skill.id);
          fs.mkdirSync(targetDir, { recursive: true });
          fs.writeFileSync(path.join(targetDir, 'SKILL.md'), skill.content, 'utf-8');
          result.antigravitySkills++;
        }
      }
    } catch {
      // Non-fatal if global directory permissions prevent writing
    }

    // Also sync to workspace .gemini if applicable
    const workspaceGemini = path.join(options.cwd, '.gemini', 'antigravity', 'skills');
    try {
      fs.mkdirSync(workspaceGemini, { recursive: true });
      for (const skill of skillsToGenerate) {
        const targetDir = path.join(workspaceGemini, skill.id);
        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(path.join(targetDir, 'SKILL.md'), skill.content, 'utf-8');
      }
    } catch {
      // Non-fatal
    }
  }

  return result;
}

function escapeQuotes(str: string): string {
  return str.replace(/"/g, '\\"');
}
