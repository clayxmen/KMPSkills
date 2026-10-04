import fs from 'node:fs';
import path from 'node:path';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { EMBEDDED_SKILLS, SkillEntry } from '../engine/skills-data.js';
import { renderContentInTerminal } from './curriculum.js';
import { adaptSkillForModel } from '../engine/model-adapter.js';

export interface SearchOptions {
  query?: string;
}

export async function runSearch(queryArg?: string, options: SearchOptions = {}): Promise<void> {
  p.intro(pc.bold(pc.cyan('🔍 KMPSkills Catalog Search & Inspector')));

  let currentQuery = queryArg || options.query;

  while (true) {
    if (!currentQuery) {
      const queryPrompt = await p.text({
        message: 'Search skills by keyword, domain, or technology (e.g. room, mvi, ktor, memory, swift, test):',
        validate: (v) => (!v || v.trim().length === 0 ? 'Search query cannot be empty' : undefined)
      });

      if (p.isCancel(queryPrompt)) {
        p.outro(pc.dim('Search closed.'));
        return;
      }
      currentQuery = queryPrompt.trim();
    }

    const q = currentQuery.toLowerCase();
    const matches: { skill: SkillEntry; score: number }[] = [];

    for (const skill of EMBEDDED_SKILLS) {
      let score = 0;
      if (skill.id.toLowerCase() === q) score += 100;
      else if (skill.id.toLowerCase().includes(q)) score += 50;

      if (skill.title.toLowerCase().includes(q)) score += 40;
      if (skill.domain.toLowerCase().includes(q)) score += 30;
      if (skill.description.toLowerCase().includes(q)) score += 20;
      if (skill.globs.some(g => g.toLowerCase().includes(q))) score += 25;
      if (skill.content.toLowerCase().includes(q)) score += 10;

      if (score > 0) {
        matches.push({ skill, score });
      }
    }

    matches.sort((a, b) => b.score - a.score);

    if (matches.length === 0) {
      p.note(pc.yellow(`No skills found matching "${currentQuery}". Try "room", "mvi", "compose", or "ktor".`), 'No Results');
      const retry = await p.confirm({
        message: 'Search again with another term?'
      });
      if (p.isCancel(retry) || !retry) {
        p.outro(pc.dim('Search closed.'));
        return;
      }
      currentQuery = undefined;
      continue;
    }

    // Select skill from search results
    const selectOptions = matches.slice(0, 15).map(({ skill }) => ({
      value: skill.id,
      label: `${skill.id.padEnd(38)} [${skill.domain}]`,
      hint: skill.description.slice(0, 60) + '...'
    }));

    const pickedId = await p.select({
      message: `Found ${matches.length} matching skills for "${currentQuery}":`,
      options: [
        ...selectOptions,
        { value: '__NEW_SEARCH__', label: '🔍 Search with another keyword' },
        { value: '__EXIT__', label: '🚪 Exit search' }
      ]
    });

    if (p.isCancel(pickedId) || pickedId === '__EXIT__') {
      p.outro(pc.dim('Search closed.'));
      return;
    }

    if (pickedId === '__NEW_SEARCH__') {
      currentQuery = undefined;
      continue;
    }

    const selectedSkill = EMBEDDED_SKILLS.find(s => s.id === pickedId);
    if (!selectedSkill) continue;

    // Action on selected skill
    p.note(
      [
        `${pc.bold('Skill ID:')}    ${pc.cyan(selectedSkill.id)}`,
        `${pc.bold('Domain:')}      ${pc.magenta(selectedSkill.domain)}`,
        `${pc.bold('Target Files:')} ${pc.yellow(selectedSkill.globs.join(', '))}`,
        `${pc.bold('Summary:')}     ${pc.dim(selectedSkill.description)}`
      ].join('\n'),
      selectedSkill.title
    );

    const skillAction = await p.select({
      message: `Action for ${selectedSkill.id}:`,
      options: [
        { value: 'view', label: '📖 View Full Skill Content in Terminal' },
        { value: 'export_mdc', label: '⚡ Export Cursor MDC Rule (.cursor/rules/' + selectedSkill.id + '.mdc)' },
        { value: 'export_raw', label: '💾 Export Raw Markdown File (' + selectedSkill.id + '.md)' },
        { value: 'back', label: '⬅️ Back to Search Results' },
        { value: 'exit', label: '🚪 Exit Search' }
      ]
    });

    if (p.isCancel(skillAction) || skillAction === 'exit') {
      p.outro(pc.dim('Search closed.'));
      return;
    }

    if (skillAction === 'view') {
      renderContentInTerminal(selectedSkill.title, selectedSkill.content);
    } else if (skillAction === 'export_mdc') {
      const cursorDir = path.join(process.cwd(), '.cursor', 'rules');
      if (!fs.existsSync(cursorDir)) fs.mkdirSync(cursorDir, { recursive: true });
      const dest = path.join(cursorDir, `${selectedSkill.id}.mdc`);
      const mdcContent = `---
description: "${selectedSkill.description.replace(/"/g, '\\"')}"
globs: ${JSON.stringify(selectedSkill.globs)}
alwaysApply: false
---

${selectedSkill.content}`;
      fs.writeFileSync(dest, mdcContent, 'utf-8');
      p.note(`${pc.green('✔')} Created: ${pc.cyan(path.relative(process.cwd(), dest))}`, 'MDC Exported');
    } else if (skillAction === 'export_raw') {
      const dest = path.join(process.cwd(), `${selectedSkill.id}.md`);
      fs.writeFileSync(dest, selectedSkill.content, 'utf-8');
      p.note(`${pc.green('✔')} Created: ${pc.cyan(path.relative(process.cwd(), dest))}`, 'Markdown Exported');
    }

    // Keep querying or return
    const next = await p.select({
      message: 'Next action:',
      options: [
        { value: 'same_query', label: '⬅️ Back to results for "' + currentQuery + '"' },
        { value: 'new_search', label: '🔍 Search new keyword' },
        { value: 'exit', label: '🚪 Exit search' }
      ]
    });

    if (p.isCancel(next) || next === 'exit') {
      p.outro(pc.dim('Search closed.'));
      return;
    }

    if (next === 'new_search') {
      currentQuery = undefined;
    }
  }
}
