package io.github.kmpskills.plugin.actions

import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.actionSystem.CommonDataKeys
import com.intellij.openapi.command.WriteCommandAction
import com.intellij.openapi.fileEditor.FileEditorManager
import com.intellij.openapi.ui.Messages
import com.intellij.openapi.vfs.VfsUtil
import com.intellij.openapi.vfs.VirtualFile
import io.github.kmpskills.plugin.generator.MviScaffoldGenerator

class CreateMviFeatureAction : AnAction() {

    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
        val selectedDir = getTargetDirectory(e) ?: return

        val featureNameInput = Messages.showInputDialog(
            project,
            "Enter MVI Feature Name (e.g. Profile, Cart, Feed, ProductDetail):",
            "New MVI Feature Screen",
            Messages.getQuestionIcon()
        )?.trim()

        if (featureNameInput.isNullOrBlank()) return

        val featureName = featureNameInput.replaceFirstChar { it.uppercase() }
        val packageName = detectPackageName(selectedDir)

        WriteCommandAction.runWriteCommandAction(project) {
            val stateFile = selectedDir.findOrCreateChildData(this, "${featureName}UiState.kt")
            stateFile.setBinaryContent(MviScaffoldGenerator.generateUiState(packageName, featureName).toByteArray())

            val intentFile = selectedDir.findOrCreateChildData(this, "${featureName}UiIntent.kt")
            intentFile.setBinaryContent(MviScaffoldGenerator.generateUiIntent(packageName, featureName).toByteArray())

            val effectFile = selectedDir.findOrCreateChildData(this, "${featureName}UiEffect.kt")
            effectFile.setBinaryContent(MviScaffoldGenerator.generateUiEffect(packageName, featureName).toByteArray())

            val vmFile = selectedDir.findOrCreateChildData(this, "${featureName}ViewModel.kt")
            vmFile.setBinaryContent(MviScaffoldGenerator.generateViewModel(packageName, featureName).toByteArray())

            val screenFile = selectedDir.findOrCreateChildData(this, "${featureName}Screen.kt")
            screenFile.setBinaryContent(MviScaffoldGenerator.generateScreen(packageName, featureName).toByteArray())

            VfsUtil.markDirtyAndRefresh(true, true, true, selectedDir)

            // Open the generated ViewModel in the editor
            FileEditorManager.getInstance(project).openFile(vmFile, true)
        }
    }

    private fun getTargetDirectory(e: AnActionEvent): VirtualFile? {
        val file = CommonDataKeys.VIRTUAL_FILE.getData(e.dataContext)
        return if (file != null && file.isDirectory) {
            file
        } else {
            file?.parent ?: e.project?.baseDir
        }
    }

    private fun detectPackageName(dir: VirtualFile): String {
        val path = dir.path.replace("\\", "/")
        val srcMarkers = listOf("/src/commonMain/kotlin/", "/src/main/kotlin/", "/src/main/java/")
        for (marker in srcMarkers) {
            val index = path.indexOf(marker)
            if (index != -1) {
                return path.substring(index + marker.length).replace("/", ".")
            }
        }
        return "com.example.feature"
    }
}
