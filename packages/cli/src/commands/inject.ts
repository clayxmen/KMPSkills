import fs from 'node:fs';
import path from 'node:path';
import pc from 'picocolors';
import { EMBEDDED_SKILLS } from '../engine/skills-data.js';
import { adaptSkillForModel, TargetModel } from '../engine/model-adapter.js';
import { logger } from '../ui/logger.js';

export interface InjectOptions {
  skillId: string;
  format?: 'raw' | 'mdc' | 'claude' | 'gemini';
  output?: string;
  stdout?: boolean;
}

export function runInject(options: InjectOptions): void {
  const skill = EMBEDDED_SKILLS.find(s => s.id === options.skillId || s.id.includes(options.skillId));

  if (!skill) {
    logger.error(`Skill matching "${options.skillId}" not found in catalog.`);
    console.log(pc.yellow(`Run "kmp-skills list" to inspect available skills.`));
    process.exit(1);
  }

  let formattedContent = '';
  const format = options.format || 'raw';

  switch (format) {
    case 'mdc':
      formattedContent = `---
description: "${skill.description.replace(/"/g, '\\"')}"
globs: ${JSON.stringify(skill.globs)}
alwaysApply: false
---

${skill.content}`;
      break;
    case 'claude':
      formattedContent = adaptSkillForModel(skill, ['claude']);
      break;
    case 'gemini':
      formattedContent = adaptSkillForModel(skill, ['gemini']);
      break;
    case 'raw':
    default:
      formattedContent = skill.content;
      break;
  }

  if (options.stdout) {
    console.log(formattedContent);
    return;
  }

  const outPath = options.output || path.join(process.cwd(), format === 'mdc' ? `${skill.id}.mdc` : `${skill.id}.md`);
  fs.writeFileSync(outPath, formattedContent, 'utf-8');
  logger.success(`Skill "${skill.id}" successfully written to: ${outPath}`);
}
