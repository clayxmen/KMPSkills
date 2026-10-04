import pc from 'picocolors';
import { EMBEDDED_SKILLS } from '../engine/skills-data.js';
import { printBanner, printSection } from '../ui/banner.js';

export function runList(): void {
  printBanner();
  printSection(`Available KMPSkills Architectural Catalog (${EMBEDDED_SKILLS.length} Skills)`);

  const domains = [...new Set(EMBEDDED_SKILLS.map(s => s.domain))].sort();

  for (const domain of domains) {
    console.log(`\n${pc.bold(pc.magenta(`📂 ${domain}`))}`);
    const domainSkills = EMBEDDED_SKILLS.filter(s => s.domain === domain);
    
    for (const skill of domainSkills) {
      console.log(`  ${pc.cyan('•')} ${pc.bold(pc.white(skill.id.padEnd(46)))} ${pc.dim(skill.title)}`);
      console.log(`    ${pc.dim('Targets:')} ${pc.yellow(skill.globs.join(', '))}`);
      console.log(`    ${pc.dim('Summary:')} ${pc.dim(skill.description.slice(0, 100))}${skill.description.length > 100 ? '...' : ''}`);
    }
  }

  console.log(`\n${pc.green('✔ Total:')} ${pc.bold(EMBEDDED_SKILLS.length)} skills ready for injection.\n`);
}
