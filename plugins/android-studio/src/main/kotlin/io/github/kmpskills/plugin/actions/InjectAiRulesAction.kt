package io.github.kmpskills.plugin.actions

import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.ui.Messages
import io.github.kmpskills.plugin.generator.AiContextGenerator

class InjectAiRulesAction : AnAction() {

    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return

        val success = AiContextGenerator.injectAiRules(project)
        if (success) {
            Messages.showInfoMessage(
                project,
                "Successfully generated .github/copilot-instructions.md and .cursor/rules/ for your project!\n\nGitHub Copilot and Gemini Code Assist in Android Studio will now automatically follow all 27 KMPSkills architectural standards.",
                "KMPSkills AI Context Injected"
            )
        }
    }
}
