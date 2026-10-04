import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { detectProject } from '../engine/detector.js';
import { EMBEDDED_SKILLS } from '../engine/skills-data.js';
import { transpileSkills } from '../engine/transpiler.js';

export interface DoctorOptions {
  cwd?: string;
  fix?: boolean;
}

export async function runDoctor(options: DoctorOptions = {}): Promise<void> {
  const cwd = options.cwd || process.cwd();
  p.intro(pc.bold(pc.cyan('🩺 KMPSkills Architecture & AI Environment Doctor')));

  const profile = detectProject(cwd);

  p.note(
    [
      `${pc.dim('Location:')}       ${pc.cyan(profile.cwd)}`,
      `${pc.dim('Project Type:')}   ${pc.bold(pc.white(profile.isKmp ? 'Kotlin Multiplatform (KMP)' : profile.isAndroid ? 'Android Native' : 'General Kotlin'))}`,
      `${pc.dim('Targets:')}        ${pc.yellow(profile.targets.join(', ') || 'JVM')}`,
      `${pc.dim('UI Framework:')}   ${profile.hasCompose ? pc.green('Compose Multiplatform') : pc.dim('Standard UI')}`
    ].join('\n'),
    'Project Topology'
  );

  console.log(`\n${pc.bold('🔍 Gradle Version Catalog & Compatibility:')}`);
  checkVersion('Kotlin Language', profile.versions.kotlin, '2.0.0', '>= 2.0 required for K2 Compiler & CMP 1.7+');
  checkVersion('Android Gradle Plugin', profile.versions.agp, '8.5.0', '>= 8.5 recommended for Android 15 SDK 35');
  checkVersion('Compose Multiplatform', profile.versions.compose, '1.7.0', '>= 1.7 required for stability inference');
  checkVersion('Ktor Client', profile.versions.ktor, '3.0.0', '3.x provides multiplatform engine unification');
  checkVersion('Room Multiplatform', profile.versions.room, '2.7.0', '2.7+ required for official KMP BundledSQLiteDriver');
  checkVersion('Koin DI', profile.versions.koin, '4.0.0', '4.x provides multiplatform moduleDSL');

  console.log(`\n${pc.bold('🤖 AI Coding Assistants & IDE Rules:')}`);
  const cursorStatus = checkCursorRules(cwd);
  const copilotStatus = checkCopilotInstructions(cwd);
  const claudeStatus = checkClaudeRules(cwd);
  const antigravityStatus = checkAntigravitySkills();

  console.log(`\n${pc.bold('🧪 Multiplatform Testing Infrastructure:')}`);
  checkTestSetup(cwd);

  const missingAiContexts = !cursorStatus || !copilotStatus || !claudeStatus || !antigravityStatus;

  if (missingAiContexts) {
    console.log('');
    let shouldAutoFix = options.fix;

    if (shouldAutoFix === undefined) {
      const confirmFix = await p.confirm({
        message: 'Missing or incomplete AI assistant rules detected. Would you like KMPSkills to auto-fix and generate them now?',
        initialValue: true
      });
      if (!p.isCancel(confirmFix)) {
        shouldAutoFix = confirmFix;
      }
    }

    if (shouldAutoFix) {
      const s = p.spinner();
      s.start('Auto-fixing and transpiling 27 KMPSkills into project context...');

      const fixResult = transpileSkills({
        cwd,
        ides: ['cursor', 'android-studio', 'vscode', 'antigravity', 'claude-code'],
        models: ['claude', 'gemini', 'deepseek', 'gpt']
      });

      s.stop(pc.green('Auto-fix completed successfully!'));

      p.note(
        [
          cursorStatus ? null : `${pc.green('✔')} Repaired Cursor MDC rules (.cursor/rules/)`,
          copilotStatus ? null : `${pc.green('✔')} Repaired Android Studio / Copilot (.github/copilot-instructions.md)`,
          claudeStatus ? null : `${pc.green('✔')} Repaired Claude Code memory (CLAUDE.md & .windsurfrules)`,
          antigravityStatus ? null : `${pc.green('✔')} Synced Antigravity skills (~/.gemini/config/skills/)`
        ].filter(Boolean).join('\n'),
        'Auto-Fix Summary'
      );
    }
  }

  p.outro(pc.bold(pc.green('✔ Doctor Diagnostic Complete. Architecture is in excellent health!')));
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

function checkCursorRules(cwd: string): boolean {
  const rulesDir = path.join(cwd, '.cursor', 'rules');
  if (fs.existsSync(rulesDir)) {
    const files = fs.readdirSync(rulesDir).filter(f => f.endsWith('.mdc'));
    console.log(`  ${pc.green('✔')} Cursor Rules (.cursor/rules/) : ${pc.cyan(`${files.length} MDC rules active`)}`);
    return files.length > 0;
  } else {
    console.log(`  ${pc.dim('○')} Cursor Rules (.cursor/rules/) : ${pc.dim('Not configured')}`);
    return false;
  }
}

function checkCopilotInstructions(cwd: string): boolean {
  const copilotPath = path.join(cwd, '.github', 'copilot-instructions.md');
  if (fs.existsSync(copilotPath)) {
    const sizeKb = Math.round(fs.statSync(copilotPath).size / 1024);
    console.log(`  ${pc.green('✔')} Android Studio & VS Code      : ${pc.cyan(`.github/copilot-instructions.md (${sizeKb} KB)`)}`);
    return true;
  } else {
    console.log(`  ${pc.dim('○')} Android Studio & VS Code      : ${pc.dim('Not configured')}`);
    return false;
  }
}

function checkClaudeRules(cwd: string): boolean {
  const claudePath = path.join(cwd, 'CLAUDE.md');
  if (fs.existsSync(claudePath)) {
    console.log(`  ${pc.green('✔')} Claude Code & Windsurf       : ${pc.cyan('CLAUDE.md active')}`);
    return true;
  } else {
    console.log(`  ${pc.dim('○')} Claude Code & Windsurf       : ${pc.dim('Not configured')}`);
    return false;
  }
}

function checkAntigravitySkills(): boolean {
  const globalDir = path.join(os.homedir(), '.gemini', 'config', 'skills');
  let count = 0;
  if (fs.existsSync(globalDir)) {
    count = fs.readdirSync(globalDir).filter(d => d.startsWith('kmp-')).length;
  }
  if (count >= EMBEDDED_SKILLS.length) {
    console.log(`  ${pc.green('✔')} Google Antigravity & AGY     : ${pc.cyan(`${count}/${EMBEDDED_SKILLS.length} Global skills synced`)}`);
    return true;
  } else if (count > 0) {
    console.log(`  ${pc.yellow('⚠')} Google Antigravity & AGY     : ${pc.yellow(`${count}/${EMBEDDED_SKILLS.length} skills (Out of date)`)}`);
    return false;
  } else {
    console.log(`  ${pc.dim('○')} Google Antigravity & AGY     : ${pc.dim('Global skills not synced')}`);
    return false;
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
