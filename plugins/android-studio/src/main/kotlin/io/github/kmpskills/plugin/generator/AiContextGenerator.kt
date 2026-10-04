package io.github.kmpskills.plugin.generator

import com.intellij.openapi.project.Project
import com.intellij.openapi.vfs.VfsUtil
import io.github.kmpskills.plugin.catalog.SkillsCatalog
import java.io.File

object AiContextGenerator {

    fun injectAiRules(project: Project): Boolean {
        val basePath = project.basePath ?: return false
        val githubDir = File(basePath, ".github")
        if (!githubDir.exists()) githubDir.mkdirs()

        val copilotFile = File(githubDir, "copilot-instructions.md")

        val builder = StringBuilder()
        builder.append("# KMPSkills: Enterprise Kotlin Multiplatform & Android Architecture Instructions\n\n")
        builder.append("You are an expert Senior Android Native & Kotlin Multiplatform Architect pair programming on this codebase.\n")
        builder.append("Follow the architectural rules below strictly. Never use stubbed code (// TODO), ensure Compose stability (@Immutable/ImmutableList), and enforce Unidirectional Data Flow (MVI).\n\n")
        builder.append("---\n\n")

        for (skill in SkillsCatalog.skills) {
            builder.append("### 💎 KMPSkills: ${skill.title}\n")
            builder.append("> **Domain**: ${skill.domain}\n\n")
            builder.append("${skill.description}\n\n")
            builder.append("**Directive**:\n")
            builder.append("${skill.promptDirective}\n\n")
            builder.append("---\n\n")
        }

        copilotFile.writeText(builder.toString(), Charsets.UTF_8)

        // Also create a basic .cursor/rules directory with core architecture rule
        val cursorRulesDir = File(basePath, ".cursor/rules")
        if (!cursorRulesDir.exists()) cursorRulesDir.mkdirs()

        val coreMdc = File(cursorRulesDir, "kmp-architecture-foundation.mdc")
        coreMdc.writeText(
            """
            ---
            description: "Enterprise Clean Architecture and MVI for Android & KMP"
            globs: ["**/*.kt"]
            alwaysApply: true
            ---

            ${SkillsCatalog.skills.firstOrNull { it.id == "kmp-architecture-foundation" }?.promptDirective ?: ""}
            """.trimIndent(),
            Charsets.UTF_8
        )

        // Refresh Virtual File System so Android Studio detects files immediately
        VfsUtil.markDirtyAndRefresh(true, true, true, project.baseDir)
        return true
    }
}
