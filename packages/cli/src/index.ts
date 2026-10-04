import { Command } from 'commander';
import { runInit } from './commands/init.js';
import { runDoctor } from './commands/doctor.js';
import { runList } from './commands/list.js';
import { runInject } from './commands/inject.js';
import { runGenerate } from './commands/generate.js';
import { runCurriculum } from './commands/curriculum.js';
import { runSearch } from './commands/search.js';
import { runMainMenu } from './commands/menu.js';

const program = new Command();

program
  .name('kmp-skills')
  .description('Production-grade AI skills, architecture code generators, and curriculum for Android & KMP')
  .version('1.0.0');

// 1. Init command
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

// 2. Generate command
program
  .command('generate [type] [name]')
  .alias('g')
  .alias('gen')
  .description('Scaffold production-grade architecture files (mvi, room, outbox, theme)')
  .option('-p, --package <package>', 'Kotlin package name')
  .option('-o, --output <dir>', 'Destination output directory')
  .action(async (type, name, options) => {
    await runGenerate(type, name, options);
  });

// 3. Doctor command
program
  .command('doctor')
  .alias('doc')
  .description('Run architectural and AI environment diagnostics on the current project')
  .option('--fix', 'Automatically repair and transpile missing AI contexts')
  .action(async (options) => {
    await runDoctor({ fix: options.fix });
  });

// 4. Learn / Curriculum command
program
  .command('learn [level]')
  .alias('curriculum')
  .alias('c')
  .description('Browse and read the 10-level Masterclass curriculum in terminal')
  .action(async (level) => {
    await runCurriculum(level);
  });

// 5. Search command
program
  .command('search [query]')
  .alias('find')
  .alias('s')
  .description('Fuzzy search 27 skills with terminal preview and direct export')
  .action(async (query) => {
    await runSearch(query);
  });

// 6. List command
program
  .command('list')
  .alias('ls')
  .description('List all 27 available architectural skills by domain')
  .action(() => {
    runList();
  });

// 7. Inject command
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

// 8. Menu command (explicit)
program
  .command('menu')
  .description('Open interactive KMPSkills developer console menu')
  .action(async () => {
    await runMainMenu();
  });

// Default behavior when invoked with no arguments: open interactive menu
if (process.argv.length <= 2) {
  runMainMenu().catch((err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  program.parse(process.argv);
}
