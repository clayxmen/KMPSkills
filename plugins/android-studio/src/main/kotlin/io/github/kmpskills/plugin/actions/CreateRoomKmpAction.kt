package io.github.kmpskills.plugin.actions

import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.actionSystem.CommonDataKeys
import com.intellij.openapi.command.WriteCommandAction
import com.intellij.openapi.fileEditor.FileEditorManager
import com.intellij.openapi.ui.Messages
import com.intellij.openapi.vfs.VfsUtil
import com.intellij.openapi.vfs.VirtualFile
import io.github.kmpskills.plugin.generator.RoomScaffoldGenerator

class CreateRoomKmpAction : AnAction() {

    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
        val selectedDir = getTargetDirectory(e) ?: return

        val entityNameInput = Messages.showInputDialog(
            project,
            "Enter Room Entity Name (e.g. Article, Note, Bookmark, Transaction):",
            "New Room KMP Entity & DAO",
            Messages.getQuestionIcon()
        )?.trim()

        if (entityNameInput.isNullOrBlank()) return

        val entityName = entityNameInput.replaceFirstChar { it.uppercase() }
        val packageName = detectPackageName(selectedDir)

        WriteCommandAction.runWriteCommandAction(project) {
            val entityFile = selectedDir.findOrCreateChildData(this, "${entityName}Entity.kt")
            entityFile.setBinaryContent(RoomScaffoldGenerator.generateEntity(packageName, entityName).toByteArray())

            val daoFile = selectedDir.findOrCreateChildData(this, "${entityName}Dao.kt")
            daoFile.setBinaryContent(RoomScaffoldGenerator.generateDao(packageName, entityName).toByteArray())

            VfsUtil.markDirtyAndRefresh(true, true, true, selectedDir)

            FileEditorManager.getInstance(project).openFile(daoFile, true)
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
        return "com.example.database"
    }
}
