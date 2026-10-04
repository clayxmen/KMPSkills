package io.github.kmpskills.plugin.actions

import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.ui.Messages
import java.io.File

class RunDoctorAction : AnAction() {

    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
        val basePath = project.basePath ?: return

        val tomlFile = File(basePath, "gradle/libs.versions.toml")
        val tomlContent = if (tomlFile.exists()) tomlFile.readText(Charsets.UTF_8) else ""

        val kotlinVer = extractVersion(tomlContent, "kotlin") ?: "Not found"
        val agpVer = extractVersion(tomlContent, "agp") ?: extractVersion(tomlContent, "android-gradle-plugin") ?: "Not found"
        val composeVer = extractVersion(tomlContent, "compose") ?: extractVersion(tomlContent, "compose-multiplatform") ?: "Not found"
        val ktorVer = extractVersion(tomlContent, "ktor") ?: "Not found"
        val roomVer = extractVersion(tomlContent, "room") ?: "Not found"
        val koinVer = extractVersion(tomlContent, "koin") ?: "Not found"

        val copilotFile = File(basePath, ".github/copilot-instructions.md")
        val cursorRules = File(basePath, ".cursor/rules")

        val report = StringBuilder()
        report.append("💎 KMPSkills Architecture & AI Health Report:\n\n")

        report.append("📦 Library Versions in libs.versions.toml:\n")
        report.append("  • Kotlin Language: $kotlinVer ${checkStatus(kotlinVer, "2.0.0")}\n")
        report.append("  • Android Gradle Plugin: $agpVer ${checkStatus(agpVer, "8.5.0")}\n")
        report.append("  • Compose Multiplatform: $composeVer ${checkStatus(composeVer, "1.7.0")}\n")
        report.append("  • Ktor Client: $ktorVer ${checkStatus(ktorVer, "3.0.0")}\n")
        report.append("  • Room Multiplatform: $roomVer ${checkStatus(roomVer, "2.7.0")}\n")
        report.append("  • Koin DI: $koinVer ${checkStatus(koinVer, "4.0.0")}\n\n")

        report.append("🤖 AI Assistant Integration:\n")
        report.append("  • .github/copilot-instructions.md: ${if (copilotFile.exists()) "✔ Active" else "○ Not configured"}\n")
        report.append("  • .cursor/rules/: ${if (cursorRules.exists() && (cursorRules.listFiles()?.size ?: 0) > 0) "✔ Active" else "○ Not configured"}\n\n")

        report.append("💡 Recommendation:\n")
        if (!copilotFile.exists()) {
            report.append("Click 'KMPSkills: Inject AI Context' to enable automatic architecture rules for Copilot and Gemini.")
        } else {
            report.append("Your project environment is fully primed with KMPSkills architecture standards!")
        }

        Messages.showInfoMessage(project, report.toString(), "KMPSkills Architecture Doctor")
    }

    private fun extractVersion(toml: String, key: String): String? {
        val regex = Regex("$key\\s*=\\s*[\"']([^\"']+)[\"']", RegexOption.IGNORE_CASE)
        return regex.find(toml)?.groupValues?.get(1)
    }

    private fun checkStatus(current: String, min: String): String {
        return if (current == "Not found") "⚠" else if (current >= min) "✔" else "⚠"
    }
}
