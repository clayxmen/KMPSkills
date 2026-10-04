import fs from 'node:fs';
import path from 'node:path';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { EMBEDDED_CURRICULUM, CURRICULUM_README, CurriculumLevel } from '../engine/curriculum-data.js';

export interface CurriculumOptions {
  level?: number | string;
  export?: boolean;
  output?: string;
}

export async function runCurriculum(levelArg?: string | number, options: CurriculumOptions = {}): Promise<void> {
  p.intro(pc.bold(pc.cyan('📚 KMPSkills Masterclass Curriculum Reader')));

  let selectedLevelNum: number | 'readme' | 'exit' = 0;

  if (levelArg !== undefined) {
    if (String(levelArg).toLowerCase() === 'readme' || String(levelArg).toLowerCase() === 'overview') {
      selectedLevelNum = 'readme';
    } else {
      const parsed = parseInt(String(levelArg), 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 10) {
        selectedLevelNum = parsed;
      }
    }
  }

  // Interactive selection loop
  while (true) {
    if (selectedLevelNum === 0) {
      const choices = EMBEDDED_CURRICULUM.map((item) => ({
        value: item.level as number,
        label: `Level ${String(item.level).padStart(2, '0')}: ${item.title.replace(/^Học Phần \d+:\s*/, '')}`,
        hint: item.description.slice(0, 70) + (item.description.length > 70 ? '...' : '')
      }));

      const selection = await p.select({
        message: 'Select a Masterclass Level to explore:',
        options: [
          ...choices,
          { value: 'readme' as any, label: '📋 View Curriculum Overview & Roadmap', hint: 'Full 10-level learning roadmap & tech stack' },
          { value: 'exit' as any, label: '🚪 Exit Reader', hint: 'Return to console' }
        ]
      });

      if (p.isCancel(selection) || selection === 'exit') {
        p.outro(pc.dim('Happy learning Kotlin Multiplatform! 🚀'));
        return;
      }

      selectedLevelNum = selection as any;
    }

    if (selectedLevelNum === 'readme') {
      renderContentInTerminal('Curriculum Roadmap & Overview', CURRICULUM_README);
      selectedLevelNum = 0;
      continue;
    }

    const levelData = EMBEDDED_CURRICULUM.find(l => l.level === selectedLevelNum);
    if (!levelData) {
      p.cancel(`Level ${selectedLevelNum} not found.`);
      return;
    }

    // Level Menu
    p.note(
      [
        `${pc.bold('Title:')}       ${pc.cyan(levelData.title)}`,
        `${pc.bold('Sections:')}    ${pc.yellow(levelData.sections.length + ' comprehensive chapters')}`,
        `${pc.bold('Objectives:')}  ${pc.dim(levelData.description)}`
      ].join('\n'),
      `Level ${levelData.level} Overview`
    );

    const action = await p.select({
      message: `What would you like to do with Level ${levelData.level}?`,
      options: [
        { value: 'read_all', label: '📖 Read Full Chapter in Terminal', hint: 'Formatted Markdown with code highlights' },
        { value: 'browse_sections', label: '📑 Browse Chapter Sections', hint: 'Inspect specific topics and code blocks' },
        { value: 'export', label: '💾 Export Chapter to Markdown File', hint: 'Save as .md in current directory' },
        { value: 'back', label: '⬅️  Choose Another Level', hint: 'Return to level list' },
        { value: 'exit', label: '🚪 Exit Reader', hint: 'Close curriculum reader' }
      ]
    });

    if (p.isCancel(action) || action === 'exit') {
      p.outro(pc.dim('Happy learning Kotlin Multiplatform! 🚀'));
      return;
    }

    if (action === 'read_all') {
      renderContentInTerminal(levelData.title, levelData.content);
    } else if (action === 'browse_sections') {
      await browseLevelSections(levelData);
    } else if (action === 'export') {
      const defaultPath = path.join(process.cwd(), levelData.filename);
      const outPathPrompt = await p.text({
        message: 'Save file path:',
        initialValue: defaultPath,
        validate: (v) => (!v ? 'Path cannot be empty' : undefined)
      });
      if (!p.isCancel(outPathPrompt)) {
        fs.writeFileSync(outPathPrompt.trim(), levelData.content, 'utf-8');
        p.note(`${pc.green('✔')} Exported to: ${pc.cyan(outPathPrompt.trim())}`, 'Export Complete');
      }
    } else if (action === 'back') {
      selectedLevelNum = 0;
      continue;
    }

    // Ask what to do next
    const next = await p.select({
      message: 'Next step:',
      options: [
        { value: 'menu', label: '🔄 Select another level' },
        { value: 're-read', label: '📖 Re-read this level' },
        { value: 'exit', label: '🚪 Exit reader' }
      ]
    });

    if (p.isCancel(next) || next === 'exit') {
      p.outro(pc.dim('Happy learning Kotlin Multiplatform! 🚀'));
      return;
    }

    if (next === 'menu') {
      selectedLevelNum = 0;
    }
  }
}

async function browseLevelSections(level: CurriculumLevel): Promise<void> {
  const sectionChoices = level.sections.map((sec, idx) => ({
    value: idx,
    label: sec
  }));

  const picked = await p.select({
    message: `Select section in Level ${level.level}:`,
    options: [
      ...sectionChoices,
      { value: -1, label: '⬅️ Back to Level Menu' }
    ]
  });

  if (p.isCancel(picked) || picked === -1) {
    return;
  }

  const pickedTitle = level.sections[picked as number];
  // Extract text of this section from content
  const regex = new RegExp(`##\\s+${escapeRegex(pickedTitle)}([\\s\\S]*?)(?=\\n## |$)`);
  const match = level.content.match(regex);
  const sectionContent = match ? match[1].trim() : 'Section content not found.';

  renderContentInTerminal(pickedTitle, `## ${pickedTitle}\n\n${sectionContent}`);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function renderContentInTerminal(title: string, markdown: string): void {
  const width = Math.min(process.stdout.columns || 80, 100);
  const border = pc.cyan('═'.repeat(width));

  console.log('\n' + border);
  console.log(pc.bold(pc.white(` 📖 ${title}`)));
  console.log(border + '\n');

  const lines = markdown.split('\n');
  let inCodeBlock = false;
  let codeBlockLang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block delimiters
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = line.slice(3).trim();
        console.log(pc.dim(`╭─── [${codeBlockLang || 'code'}] ──────────────────────────────────`));
      } else {
        inCodeBlock = false;
        codeBlockLang = '';
        console.log(pc.dim(`╰──────────────────────────────────────────────────`));
      }
      continue;
    }

    if (inCodeBlock) {
      console.log(pc.dim('│ ') + pc.green(line));
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      console.log(`\n${pc.bold(pc.cyan('█ ' + line.slice(2)))}\n`);
    } else if (line.startsWith('## ')) {
      console.log(`\n${pc.bold(pc.yellow('▶ ' + line.slice(3)))}\n`);
    } else if (line.startsWith('### ')) {
      console.log(`\n${pc.bold(pc.magenta('  ◇ ' + line.slice(4)))}\n`);
    } else if (line.startsWith('---')) {
      console.log(pc.dim('─'.repeat(width)));
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      console.log(`  ${pc.cyan('•')} ${formatInlineStyles(line.slice(2))}`);
    } else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+\.)\s*(.*)$/);
      if (match) {
        console.log(`  ${pc.yellow(match[1])} ${formatInlineStyles(match[2])}`);
      }
    } else if (line.trim().length === 0) {
      console.log('');
    } else {
      console.log(formatInlineStyles(line));
    }
  }

  console.log('\n' + border + '\n');
}

function formatInlineStyles(text: string): string {
  // Replace inline `code`
  let res = text.replace(/`([^`]+)`/g, (_, code) => pc.cyan(` ${code} `));
  // Replace bold **text**
  res = res.replace(/\*\*([^*]+)\*\*/g, (_, bold) => pc.bold(bold));
  return res;
}
