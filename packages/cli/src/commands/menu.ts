import * as p from '@clack/prompts';
import pc from 'picocolors';
import { printBanner } from '../ui/banner.js';
import { runInit } from './init.js';
import { runGenerate } from './generate.js';
import { runDoctor } from './doctor.js';
import { runCurriculum } from './curriculum.js';
import { runSearch } from './search.js';
import { runList } from './list.js';

export async function runMainMenu(): Promise<void> {
  printBanner();
  p.intro(pc.bold(pc.cyan('🚀 KMPSkills Developer Console')));

  while (true) {
    const choice = await p.select({
      message: 'What would you like to do?',
      options: [
        { value: 'init', label: '🚀 Initialize AI Context', hint: 'Configure Cursor rules, Copilot, Antigravity, Claude Code' },
        { value: 'generate', label: '💎 Generate Architecture Code', hint: 'Scaffold MVI Feature, Room Entity/DAO, Outbox Sync, Theme' },
        { value: 'doctor', label: '🩺 Run Architecture Doctor', hint: 'Audit project health, Gradle versions, and Auto-Fix rules' },
        { value: 'learn', label: '📚 Masterclass Curriculum Reader', hint: 'Browse 10 levels of KMP & Android engineering' },
        { value: 'search', label: '🔍 Search & Inspect Skills', hint: 'Fuzzy search 27 skills with instant preview & export' },
        { value: 'list', label: '📋 View All 27 Skills', hint: 'Catalog categorized by architectural domain' },
        { value: 'exit', label: '🚪 Exit', hint: 'Close KMPSkills console' }
      ]
    });

    if (p.isCancel(choice) || choice === 'exit') {
      p.outro(pc.dim('See you next time! Build resilient Kotlin applications! 🚀'));
      return;
    }

    console.log('');

    switch (choice) {
      case 'init':
        await runInit();
        break;
      case 'generate':
        await runGenerate();
        break;
      case 'doctor':
        await runDoctor();
        break;
      case 'learn':
        await runCurriculum();
        break;
      case 'search':
        await runSearch();
        break;
      case 'list':
        runList();
        break;
    }

    const again = await p.confirm({
      message: 'Return to KMPSkills main menu?',
      initialValue: true
    });

    if (p.isCancel(again) || !again) {
      p.outro(pc.dim('See you next time! 🚀'));
      return;
    }

    console.log('');
  }
}
