import { Command } from 'commander';
import { runInit } from './commands/init.js';
import { runDoctor } from './commands/doctor.js';
import { runList } from './commands/list.js';
import { runInject } from './commands/inject.js';
import { printBanner } from './ui/banner.js';

const program = new Command();

program
  .name('kmp-skills')
  .description('Production-grade AI skills and architectural context generator for Android & KMP')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize KMPSkills AI rules in the current project')
  .option('--ides <ides>', 'Comma-separated target IDEs (cursor,android-studio,vscode,antigravity,claude-code)')
  .option('--models <models>', 'Comma-separated target LLMs (claude,gemini,deepseek,gpt)')
  .option('-y, --yes', 'Automatically accept all recommended defaults')
  .option('--all', 'Enable all IDE integrations and target formats')
  .action(async (options) => {
    await runInit(options);
  });

program
  .command('doctor')
  .description('Run architectural and AI environment diagnostics on the current project')
  .action(() => {
    runDoctor();
  });

program
  .command('list')
  .description('List all 27 available architectural skills with metadata')
  .action(() => {
    runList();
  });

program
  .command('inject <skillId>')
  .description('Inject a specific skill into the project or output format')
  .option('-f, --format <format>', 'Output format: raw, mdc, claude, gemini', 'mdc')
  .option('-o, --output <path>', 'Destination file path')
  .option('--stdout', 'Print skill to standard output instead of writing to disk')
  .action((skillId, options) => {
    runInject({
      skillId,
      format: options.format,
      output: options.output,
      stdout: options.stdout
    });
  });

// Default behavior when invoked with no arguments
if (process.argv.length <= 2) {
  printBanner();
  program.outputHelp();
} else {
  program.parse(process.argv);
}
