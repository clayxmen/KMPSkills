import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import pc from 'picocolors';
import { detectProject } from '../engine/detector.js';
import { logger } from '../ui/logger.js';
import { printBanner, printSection } from '../ui/banner.js';
import { EMBEDDED_SKILLS } from '../engine/skills-data.js';

export function runDoctor(cwd: string = process.cwd()): void {
  printBanner();
  printSection('Running KMPSkills Architecture & AI Environment Doctor');

  const profile = detectProject(cwd);

  console.log(`\n${pc.bold('📂 Project Profile Analysis:')}`);
  logger.bullet('Location', profile.cwd);
  logger.bullet('Project Nature', profile.isKmp ? 'Kotlin Multiplatform (KMP)' : profile.isAndroid ? 'Android Native' : 'General Kotlin');
  logger.bullet('Detected Targets', profile.targets.join(', '));
  logger.bullet('UI Framework', profile.hasCompose ? 'Compose Multiplatform' : 'Standard UI');

  console.log(`\n${pc.bold('🔍 Gradle Version Catalog & Compatibility:')}`);
  checkVersion('Kotlin Language', profile.versions.kotlin, '2.0.0', '>= 2.0 is required for Compose Multiplatform 1.7+');
  checkVersion('Android Gradle Plugin', profile.versions.agp, '8.5.0', '>= 8.5 recommended for Android 15 compatibility');
  checkVersion('Compose Multiplatform', profile.versions.compose, '1.7.0', '>= 1.7 required for enhanced compiler stability');
  checkVersion('Ktor Client', profile.versions.ktor, '3.0.0', '3.x provides multiplatform engine unification');
  checkVersion('Room Multiplatform', profile.versions.room, '2.7.0', '2.7+ required for official KMP BundledSQLiteDriver');
  checkVersion('Koin Dependency Injection', profile.versions.koin, '4.0.0', '4.x provides multiplatform moduleDSL');

  console.log(`\n${pc.bold('🤖 AI Coding Assistants & IDE Integration:')}`);
  checkCursorRules(cwd);
  checkCopilotInstructions(cwd);
  checkClaudeRules(cwd);
  checkAntigravitySkills();

  console.log(`\n${pc.bold('🧪 Multiplatform Testing Infrastructure:')}`);
  checkTestSetup(cwd);

  console.log(`\n${pc.green('✔ Doctor Diagnostic Complete.')} Run ${pc.cyan('kmp-skills init')} to configure missing IDE contexts.\n`);
}

function checkVersion(name: string, current: string | undefined, recommended: string, note: string): void {
  if (!current) {
    console.log(`  ${pc.yellow('⚠')} ${name.padEnd(26)}: ${pc.dim('Not declared')} (${note})`);
    return;
  }

  const isGood = current >= recommended;
  const status = isGood ? pc.green('✔') : pc.yellow('⚠');
  console.log(`  ${status} ${name.padEnd(26)}: ${pc.cyan(current.padEnd(10))} ${pc.dim(`(Target: >= ${recommended})`)}`);
}

function checkCursorRules(cwd: string): void {
  const rulesDir = path.join(cwd, '.cursor', 'rules');
  if (fs.existsSync(rulesDir)) {
    const files = fs.readdirSync(rulesDir).filter(f => f.endsWith('.mdc'));
    console.log(`  ${pc.green('✔')} Cursor Rules (.cursor/rules/) : ${pc.cyan(`${files.length} MDC rules active`)}`);
  } else {
    console.log(`  ${pc.dim('○')} Cursor Rules (.cursor/rules/) : ${pc.dim('Not found (Run kmp-skills init to generate)')}`);
  }
}

function checkCopilotInstructions(cwd: string): void {
  const copilotPath = path.join(cwd, '.github', 'copilot-instructions.md');
  if (fs.existsSync(copilotPath)) {
    const sizeKb = Math.round(fs.statSync(copilotPath).size / 1024);
    console.log(`  ${pc.green('✔')} Android Studio & VS Code      : ${pc.cyan(`.github/copilot-instructions.md (${sizeKb} KB)`)}`);
  } else {
    console.log(`  ${pc.dim('○')} Android Studio & VS Code      : ${pc.dim('Not found')}`);
  }
}

function checkClaudeRules(cwd: string): void {
  const claudePath = path.join(cwd, 'CLAUDE.md');
  if (fs.existsSync(claudePath)) {
    console.log(`  ${pc.green('✔')} Claude Code & Windsurf       : ${pc.cyan('CLAUDE.md & .windsurfrules active')}`);
  } else {
    console.log(`  ${pc.dim('○')} Claude Code & Windsurf       : ${pc.dim('Not found')}`);
  }
}

function checkAntigravitySkills(): void {
  const globalDir = path.join(os.homedir(), '.gemini', 'config', 'skills');
  let count = 0;
  if (fs.existsSync(globalDir)) {
    count = fs.readdirSync(globalDir).filter(d => d.startsWith('kmp-')).length;
  }
  if (count >= EMBEDDED_SKILLS.length) {
    console.log(`  ${pc.green('✔')} Google Antigravity & AGY     : ${pc.cyan(`${count}/${EMBEDDED_SKILLS.length} Global skills synced`)}`);
  } else if (count > 0) {
    console.log(`  ${pc.yellow('⚠')} Google Antigravity & AGY     : ${pc.yellow(`${count}/${EMBEDDED_SKILLS.length} skills (Out of date)`)}`);
  } else {
    console.log(`  ${pc.dim('○')} Google Antigravity & AGY     : ${pc.dim('Global skills not synced')}`);
  }
}

function checkTestSetup(cwd: string): void {
  const tomlPath = path.join(cwd, 'gradle', 'libs.versions.toml');
  let hasTurbine = false;
  let hasMockative = false;

  if (fs.existsSync(tomlPath)) {
    const content = fs.readFileSync(tomlPath, 'utf-8');
    hasTurbine = content.includes('turbine');
    hasMockative = content.includes('mockative');
  }

  if (hasTurbine) {
    console.log(`  ${pc.green('✔')} CashApp Turbine Flow Testing : ${pc.cyan('Configured')}`);
  } else {
    console.log(`  ${pc.yellow('⚠')} CashApp Turbine Flow Testing : ${pc.dim('Missing from libs.versions.toml')}`);
  }

  if (hasMockative) {
    console.log(`  ${pc.green('✔')} Mockative Multiplatform Mock : ${pc.cyan('Configured')}`);
  } else {
    console.log(`  ${pc.yellow('⚠')} Mockative Multiplatform Mock : ${pc.dim('Consider adding for Kotlin/Native mock support')}`);
  }
}
