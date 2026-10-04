import { SkillEntry } from './skills-data.js';

export type TargetModel = 'claude' | 'gemini' | 'deepseek' | 'gpt';

export function adaptSkillForModel(skill: SkillEntry, models: TargetModel[]): string {
  // If multiple models are selected or default, use hybrid universal format with model directives
  let content = skill.content;

  // 1. Remove YAML frontmatter if embedding into copilot-instructions or CLAUDE.md
  content = content.replace(/^---[\s\S]*?---\n*/, '');

  if (models.includes('claude') && !models.includes('deepseek') && !models.includes('gpt')) {
    return formatClaudeStyle(skill, content);
  } else if (models.includes('deepseek') && !models.includes('claude')) {
    return formatDeepSeekStyle(skill, content);
  } else if (models.includes('gpt') && !models.includes('claude')) {
    return formatGptStyle(skill, content);
  }

  // Universal Enterprise Format (Supported seamlessly by Gemini, Claude, DeepSeek, GPT)
  return formatUniversalStyle(skill, content);
}

function formatClaudeStyle(skill: SkillEntry, rawContent: string): string {
  return `<skill id="${skill.id}">
<domain>${skill.domain}</domain>
<description>${skill.description}</description>

<architectural_guidelines>
${rawContent.trim()}
</architectural_guidelines>

<strict_enforcement>
- Zero stubbed code: never emit "// TODO" or incomplete implementations.
- Kotlin/Native ARC: always ensure weak references across Swift bridges and invoke onCleared().
- Compose Stability: verify all model parameters are @Immutable or use ImmutableList.
</strict_enforcement>
</skill>`;
}

function formatDeepSeekStyle(skill: SkillEntry, rawContent: string): string {
  return `### [KMPSkills Directive: ${skill.title}]
**Domain**: ${skill.domain}
**Primary Invariants**: Ensure mathematical correctness in concurrency, FIFO transaction order, and O(1) recomposition state.

#### Architectural Specification:
${rawContent.trim()}

#### Chain-of-Thought Reasoning Protocol:
Before outputting code, reason through:
1. Concurrency isolation and Mutex thread safety.
2. Compose compiler metrics impact and skippability of Composables.
3. Offline transaction rollback semantics.`;
}

function formatGptStyle(skill: SkillEntry, rawContent: string): string {
  return `### Rule: ${skill.title}
**Scope**: ${skill.domain}

**Instructions**:
Follow this architectural specification strictly when generating Kotlin or Gradle code:

${rawContent.trim()}

**Output Verification Steps**:
- Step 1: Ensure imports are fully typed without wildcards.
- Step 2: Ensure state flows use read-only StateFlow interfaces.
- Step 3: Ensure Room entities provide type-safe TypeConverters.`;
}

function formatUniversalStyle(skill: SkillEntry, rawContent: string): string {
  return `### 💎 KMPSkills: ${skill.title}
> **Domain**: ${skill.domain} | **Target Files**: \`${skill.globs.join(', ')}\`

${rawContent.trim()}
`;
}
