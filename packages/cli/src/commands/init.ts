import * as p from '@clack/prompts';
import pc from 'picocolors';
import { detectProject } from '../engine/detector.js';
import { transpileSkills } from '../engine/transpiler.js';
import { TargetModel } from '../engine/model-adapter.js';
import { EMBEDDED_SKILLS } from '../engine/skills-data.js';

export interface InitCliOptions {
  ides?: string;
  models?: string;
  all?: boolean;
  yes?: boolean;
  cwd?: string;
}

export type TargetIde = 'cursor' | 'android-studio' | 'vscode' | 'antigravity' | 'claude-code';

export async function runInit(options: InitCliOptions = {}): Promise<void> {
  const cwd = options.cwd || process.cwd();

  p.intro(pc.bold(pc.cyan('🚀 KMPSkills AI Context Initializer')));

  const profile = detectProject(cwd);

  const frameworkName = profile.isKmp
    ? 'Kotlin Multiplatform (KMP)'
    : profile.isAndroid
    ? 'Android Native'
    : 'Kotlin';

  p.note(
    [
      `${pc.dim('Directory:')}   ${pc.cyan(profile.cwd)}`,
      `${pc.dim('Framework:')}   ${pc.bold(pc.white(frameworkName))}`,
      `${pc.dim('Targets:')}     ${pc.yellow(profile.targets.join(', ') || 'JVM')}`,
      `${pc.dim('Compose CMP:')} ${profile.hasCompose ? pc.green('Yes (v' + (profile.versions.compose || 'latest') + ')') : pc.dim('No')}`,
      `${pc.dim('Detected IDEs:')} ${profile.detectedIdes.length > 0 ? pc.magenta(profile.detectedIdes.join(', ')) : pc.dim('None')}`
    ].join('\n'),
    'Project Profile'
  );

  let selectedIdes: TargetIde[] = [];
  let selectedModels: TargetModel[] = ['claude', 'gemini', 'deepseek', 'gpt'];

  if (options.all || options.yes) {
    selectedIdes = ['cursor', 'android-studio', 'vscode', 'antigravity', 'claude-code'];
    if (options.models) {
      selectedModels = options.models.split(',').map(s => s.trim().toLowerCase()) as TargetModel[];
    }
  } else if (options.ides) {
    selectedIdes = options.ides.split(',').map(s => s.trim().toLowerCase()) as TargetIde[];
    if (options.models) {
      selectedModels = options.models.split(',').map(s => s.trim().toLowerCase()) as TargetModel[];
    }
  } else {
    // Interactive IDE multi-select
    const ideChoices = await p.multiselect<TargetIde>({
      message: 'Select AI coding environments to configure:',
      options: [
        { value: 'cursor', label: 'Cursor IDE', hint: '.cursor/rules/*.mdc (Deep context)' },
        { value: 'android-studio', label: 'Android Studio / Copilot', hint: '.github/copilot-instructions.md' },
        { value: 'vscode', label: 'VS Code & Windsurf', hint: '.windsurfrules & Copilot context' },
        { value: 'antigravity', label: 'Google Antigravity & AGY', hint: '~/.gemini/config/skills/kmp-*' },
        { value: 'claude-code', label: 'Claude Code CLI', hint: 'CLAUDE.md memory file' }
      ],
      initialValues: ['cursor', 'android-studio', 'antigravity'],
      required: true
    });

    if (p.isCancel(ideChoices)) {
      p.cancel('Initialization cancelled.');
      return;
    }
    selectedIdes = ideChoices as TargetIde[];

    // Interactive Model multi-select
    const modelChoices = await p.multiselect<TargetModel>({
      message: 'Select target LLM models to optimize prompts for:',
      options: [
        { value: 'claude', label: 'Anthropic Claude (3.5 Sonnet / 3.7 / Opus)', hint: 'Strict XML tags & Chain-of-Thought' },
        { value: 'gemini', label: 'Google Gemini (1.5 Pro / 2.0 Flash)', hint: 'Markdown specs & Long context' },
        { value: 'deepseek', label: 'DeepSeek (R1 / V3)', hint: 'Mathematical invariants & Reasoning' },
        { value: 'gpt', label: 'OpenAI GPT (4o / o1 / o3)', hint: 'Structured JSON & Step-by-step' }
      ],
      initialValues: ['claude', 'gemini', 'deepseek', 'gpt'],
      required: true
    });

    if (p.isCancel(modelChoices)) {
      p.cancel('Initialization cancelled.');
      return;
    }
    selectedModels = modelChoices as TargetModel[];
  }

  const s = p.spinner();
  s.start(`Transpiling ${EMBEDDED_SKILLS.length} architectural skills into selected IDE contexts...`);

  const transpileResult = transpileSkills({
    cwd,
    ides: selectedIdes,
    models: selectedModels
  });

  s.stop(pc.green(`Transpiled ${EMBEDDED_SKILLS.length} skills successfully!`));

  const resultDetails: string[] = [];
  if (transpileResult.cursorFiles.length > 0) {
    resultDetails.push(`${pc.green('✔')} Cursor: ${pc.cyan(transpileResult.cursorFiles.length + ' rules')} in .cursor/rules/`);
  }
  if (transpileResult.copilotFile) {
    resultDetails.push(`${pc.green('✔')} Android Studio & VS Code: .github/copilot-instructions.md`);
  }
  if (transpileResult.claudeFile) {
    resultDetails.push(`${pc.green('✔')} Claude Code: CLAUDE.md & .windsurfrules`);
  }
  if (transpileResult.antigravitySkills > 0) {
    resultDetails.push(`${pc.green('✔')} Google Antigravity: ${transpileResult.antigravitySkills} skills in ~/.gemini/config/skills/`);
  }

  p.note(resultDetails.join('\n'), 'Generated AI Contexts');

  p.outro(
    `${pc.bold(pc.green('🎉 Project is AI-supercharged!'))}\n\n` +
    `${pc.bold('💡 How to Prompt:')}\n` +
    `  • Open ${pc.cyan(selectedIdes.join(' / '))}\n` +
    `  • Ask your AI assistant: ${pc.italic(pc.cyan('"Create an offline-first repository with Room and Mutation Outbox"'))}\n` +
    `  • The AI will automatically apply MVI, strict typing, zero-leak ARC, and Compose stability rules!`
  );
}
