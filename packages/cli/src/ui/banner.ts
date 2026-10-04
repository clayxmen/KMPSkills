import pc from 'picocolors';

export function printBanner(version = '1.0.0'): void {
  const line = pc.cyan('═'.repeat(64));
  console.log(pc.bold(pc.cyan(`\n╔${'═'.repeat(62)}╗`)));
  console.log(pc.bold(pc.cyan(`║  💎 KMPSkills Universal AI Engine v${version.padEnd(28)}║`)));
  console.log(pc.bold(pc.cyan(`║  Senior Architecture & AI Prompt Matrix for Android & KMP     ║`)));
  console.log(pc.bold(pc.cyan(`╚${'═'.repeat(62)}╝\n`)));
}

export function printSection(title: string): void {
  console.log(pc.bold(pc.magenta(`\n▶ ${title}`)));
  console.log(pc.dim('─'.repeat(40)));
}
