import pc from 'picocolors';

export const logger = {
  info(msg: string): void {
    console.log(pc.blue('ℹ ') + msg);
  },
  success(msg: string): void {
    console.log(pc.green('✔ ') + pc.bold(msg));
  },
  warn(msg: string): void {
    console.log(pc.yellow('⚠ ') + pc.yellow(msg));
  },
  error(msg: string): void {
    console.log(pc.red('✖ ') + pc.bold(pc.red(msg)));
  },
  step(num: number, msg: string): void {
    console.log(pc.cyan(`[Step ${num}] `) + pc.bold(msg));
  },
  bullet(label: string, value: string): void {
    console.log(`  ${pc.dim('•')} ${pc.dim(label)}: ${pc.cyan(value)}`);
  },
  card(title: string, lines: string[]): void {
    console.log(pc.magenta(`┌─ ${title} ${'─'.repeat(Math.max(0, 50 - title.length))}`));
    for (const l of lines) {
      console.log(`${pc.magenta('│')} ${l}`);
    }
    console.log(pc.magenta(`└${'─'.repeat(54)}`));
  }
};
