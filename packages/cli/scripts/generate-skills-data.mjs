import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const skillsDir = path.resolve(__dirname, '../../../skills');
const outputFile = path.resolve(__dirname, '../src/engine/skills-data.ts');

console.log(`Scanning skills from: ${skillsDir}`);

const skillDirs = fs.readdirSync(skillsDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name.startsWith('kmp-'))
  .map(d => d.name)
  .sort();

console.log(`Found ${skillDirs.length} skills.`);

const GLOBS_MAP = {
  'kmp-architecture-foundation': ['**/*.kt'],
  'kmp-gradle-version-catalog': ['gradle/libs.versions.toml', '**/*.gradle.kts'],
  'kmp-dependency-injection-koin': ['**/di/**/*.kt', '**/*Module.kt'],
  'kmp-mvi-stateflow-architecture': ['**/*ViewModel.kt', '**/*State.kt', '**/*Intent.kt', '**/*Effect.kt'],
  'kmp-compose-multiplatform-ui': ['**/*Screen.kt', '**/*Component.kt', '**/ui/**/*.kt'],
  'kmp-design-tokens-theme-engine': ['**/theme/**/*.kt', '**/designsystem/**/*.kt', '**/*Theme.kt'],
  'kmp-navigation-compose-stack': ['**/*Nav*.kt', '**/*Route*.kt', '**/*Destination*.kt'],
  'kmp-adaptive-responsive-layouts': ['**/*Screen.kt', '**/layout/**/*.kt', '**/*Adaptive*.kt'],
  'kmp-animation-motion-graphics': ['**/*Animation*.kt', '**/motion/**/*.kt', '**/*Transition*.kt'],
  'kmp-offline-room-database': ['**/*Database*.kt', '**/*Dao.kt', '**/*Entity.kt'],
  'kmp-datastore-preferences-security': ['**/*Preferences*.kt', '**/*DataStore*.kt', '**/*Vault*.kt'],
  'kmp-ktor-network-client': ['**/*Api.kt', '**/*Client.kt', '**/*Network*.kt', '**/*Service.kt'],
  'kmp-offline-sync-engine': ['**/*Sync*.kt', '**/*Outbox*.kt', '**/*Queue*.kt'],
  'kmp-websocket-sse-realtime': ['**/*Socket*.kt', '**/*Sse*.kt', '**/*Stream*.kt'],
  'kmp-expect-actual-hardware-interop': ['**/hardware/**/*.kt', '**/*Sensor*.kt', '**/*Authenticator*.kt'],
  'kmp-android-native-system-services': ['**/androidMain/**/*.kt', '**/*Worker.kt', '**/*Service.kt'],
  'kmp-ios-swiftui-interop': ['**/iosMain/**/*.kt', '**/*.swift', '**/*ViewController.kt'],
  'kmp-decompose-retained-lifecycle': ['**/*Component.kt', '**/*Root*.kt'],
  'kmp-compose-compiler-recomposition-optimization': ['**/*Screen.kt', '**/*Item.kt', '**/*Card.kt'],
  'kmp-memory-leak-profiling': ['**/*ViewModel.kt', '**/*Scope*.kt'],
  'kmp-baseline-profiles-r8-shrinking': ['**/benchmark/**/*.kt', '**/proguard-rules.pro'],
  'kmp-testing-mocking-turbines': ['**/test/**/*.kt', '**/commonTest/**/*.kt'],
  'kmp-compose-ui-screenshot-testing': ['**/*ScreenshotTest*.kt', '**/*Preview*.kt'],
  'kmp-ci-cd-matrix-automation': ['.github/workflows/*.yml', '.github/workflows/*.yaml'],
  'kmp-multiplatform-packaging-distribution': ['**/build.gradle.kts', 'Fastfile'],
  'kmp-ktor-fullstack-shared-models': ['**/model/**/*.kt', '**/dto/**/*.kt'],
  'kmp-server-driven-ui-engine': ['**/*Sdui*.kt', '**/*WidgetParser*.kt']
};

const DOMAIN_MAP = {
  'kmp-architecture-foundation': '1. Core Architecture',
  'kmp-gradle-version-catalog': '1. Core Architecture',
  'kmp-dependency-injection-koin': '2. DI & State Management',
  'kmp-mvi-stateflow-architecture': '2. DI & State Management',
  'kmp-compose-multiplatform-ui': '3. UI & Design System',
  'kmp-design-tokens-theme-engine': '3. UI & Design System',
  'kmp-navigation-compose-stack': '4. Navigation & Layouts',
  'kmp-adaptive-responsive-layouts': '4. Navigation & Layouts',
  'kmp-animation-motion-graphics': '4. Navigation & Layouts',
  'kmp-offline-room-database': '5. Persistence & Security',
  'kmp-datastore-preferences-security': '5. Persistence & Security',
  'kmp-ktor-network-client': '6. Networking & Sync',
  'kmp-offline-sync-engine': '6. Networking & Sync',
  'kmp-websocket-sse-realtime': '6. Networking & Sync',
  'kmp-expect-actual-hardware-interop': '7. Native Bridges',
  'kmp-android-native-system-services': '7. Native Bridges',
  'kmp-ios-swiftui-interop': '7. Native Bridges',
  'kmp-decompose-retained-lifecycle': '7. Native Bridges',
  'kmp-compose-compiler-recomposition-optimization': '8. Performance & Memory',
  'kmp-memory-leak-profiling': '8. Performance & Memory',
  'kmp-baseline-profiles-r8-shrinking': '8. Performance & Memory',
  'kmp-testing-mocking-turbines': '9. Testing & Quality',
  'kmp-compose-ui-screenshot-testing': '9. Testing & Quality',
  'kmp-ci-cd-matrix-automation': '10. DevOps & Fullstack',
  'kmp-multiplatform-packaging-distribution': '10. DevOps & Fullstack',
  'kmp-ktor-fullstack-shared-models': '10. DevOps & Fullstack',
  'kmp-server-driven-ui-engine': '10. DevOps & Fullstack'
};

const skills = [];

for (const id of skillDirs) {
  const filePath = path.join(skillsDir, id, 'SKILL.md');
  if (!fs.existsSync(filePath)) continue;

  const rawContent = fs.readFileSync(filePath, 'utf-8');
  
  // Extract frontmatter description
  let description = '';
  const multilineMatch = rawContent.match(/description:\s*\|\s*\n((?:\s{2,}[^\n]+\n)+)/);
  if (multilineMatch) {
    description = multilineMatch[1]
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean)
      .join(' ');
  } else {
    const singleMatch = rawContent.match(/description:\s*([^\n]+)/);
    if (singleMatch) {
      description = singleMatch[1].replace(/["']/g, '').trim();
    }
  }

  // Extract title
  let title = id;
  const titleMatch = rawContent.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  skills.push({
    id,
    title,
    domain: DOMAIN_MAP[id] || 'General',
    description: description || title,
    globs: GLOBS_MAP[id] || ['**/*.kt'],
    content: rawContent
  });
}

const fileHeader = `// AUTO-GENERATED BY scripts/generate-skills-data.mjs
// DO NOT EDIT MANUALLY. CONTAINS EMBEDDED KMP SKILLS REPOSITORY.

export interface SkillEntry {
  id: string;
  title: string;
  domain: string;
  description: string;
  globs: string[];
  content: string;
}

export const EMBEDDED_SKILLS: SkillEntry[] = ${JSON.stringify(skills, null, 2)};
`;

fs.writeFileSync(outputFile, fileHeader, 'utf-8');
console.log(`Generated ${outputFile} with ${skills.length} skills successfully!`);
