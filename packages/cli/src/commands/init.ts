import readline from 'node:readline';
import pc from 'picocolors';
import { detectProject } from '../engine/detector.js';
import { transpileSkills } from '../engine/transpiler.js';
import { TargetModel } from '../engine/model-adapter.js';
import { printBanner, printSection } from '../ui/banner.js';
import { logger } from '../ui/logger.js';
import { EMBEDDED_SKILLS } from '../engine/skills-data.js';

export interface InitCliOptions {
  ides?: string;
  models?: string;
  all?: boolean;
  yes?: boolean;
  cwd?: string;
}

export async function runInit(options: InitCliOptions = {}): Promise<void> {
  const cwd = options.cwd || process.cwd();
  printBanner();
  printSection('Initializing KMPSkills AI Context in Project');

  const profile = detectProject(cwd);

  logger.card('Project Detected', [
    `Directory:   ${pc.cyan(profile.cwd)}`,
    `Framework:   ${pc.cyan(profile.isKmp ? 'Kotlin Multiplatform (KMP)' : profile.isAndroid ? 'Android Native' : 'Kotlin')}`,
    `Targets:     ${pc.cyan(profile.targets.join(', '))}`,
    `Compose CMP: ${pc.cyan(profile.hasCompose ? 'Yes (v' + (profile.versions.compose || 'latest') + ')' : 'No')}`,
    `Active IDEs: ${pc.cyan(profile.detectedIdes.join(', '))}`
  ]);

  // Determine target IDEs
  let selectedIdes: ('cursor' | 'android-studio' | 'vscode' | 'antigravity' | 'claude-code')[] = [];
  if (options.ides) {
    selectedIdes = options.ides.split(',').map(s => s.trim()) as any;
  } else if (options.yes || options.all) {
    selectedIdes = ['cursor', 'android-studio', 'vscode', 'antigravity', 'claude-code'];
  } else {
    // Default to detected IDEs + cursor & android-studio
    const set = new Set<any>(profile.detectedIdes);
    set.add('cursor');
    set.add('android-studio');
    set.add('antigravity');
    selectedIdes = Array.from(set);
  }

  // Determine target models
  let selectedModels: TargetModel[] = ['claude', 'gemini', 'deepseek', 'gpt'];
  if (options.models) {
    selectedModels = options.models.split(',').map(s => s.trim()) as TargetModel[];
  }

  console.log(`\n${pc.bold('🎯 Target IDE Integrations:')}`);
  for (const ide of selectedIdes) {
    console.log(`  ${pc.green('✔')} ${pc.cyan(ide)}`);
  }

  console.log(`\n${pc.bold('🧠 Target Model Optimizations:')}`);
  for (const m of selectedModels) {
    console.log(`  ${pc.green('✔')} ${pc.cyan(m.toUpperCase())}`);
  }

  logger.step(1, `Transpiling ${EMBEDDED_SKILLS.length} architectural skills into project context...`);

  const transpileResult = transpileSkills({
    cwd,
    ides: selectedIdes,
    models: selectedModels
  });

  console.log('\n');
  if (transpileResult.cursorFiles.length > 0) {
    logger.success(`Generated ${transpileResult.cursorFiles.length} Cursor MDC rules in .cursor/rules/`);
  }
  if (transpileResult.copilotFile) {
    logger.success(`Generated unified Copilot & Android Studio instructions: .github/copilot-instructions.md`);
  }
  if (transpileResult.claudeFile) {
    logger.success(`Generated Claude Code CLI context: CLAUDE.md & .windsurfrules`);
  }
  if (transpileResult.antigravitySkills > 0) {
    logger.success(`Verified & synced ${transpileResult.antigravitySkills} global Antigravity skills in ~/.gemini/config/skills/`);
  }

  printSection('Setup Complete & Ready to Prompt');
  console.log(`${pc.bold(pc.green('🎉 Your project is now AI-supercharged with 27 Master-Tier KMPSkills!'))}\n`);
  console.log(pc.bold('💡 Next Steps:'));
  console.log(`  1. Open ${pc.cyan('Cursor / Android Studio / VS Code')} in this project.`);
  console.log(`  2. In your AI chat window, prompt normally (e.g., ${pc.italic('"Implement an offline-first repository with Room and Outbox sync"')}).`);
  console.log(`  3. The AI assistant will automatically obey all 27 architectural standards, memory safety rules, and Compose stability guidelines.`);
  console.log(`  4. Run ${pc.cyan('npx kmp-skills doctor')} anytime to audit your architecture health.\n`);
}
