package io.github.kmpskills.plugin.toolwindow

import com.intellij.openapi.project.Project
import com.intellij.openapi.ui.Messages
import com.intellij.ui.components.*
import io.github.kmpskills.plugin.catalog.CurriculumCatalog
import io.github.kmpskills.plugin.catalog.CurriculumLevel
import io.github.kmpskills.plugin.catalog.SkillItem
import io.github.kmpskills.plugin.catalog.SkillsCatalog
import io.github.kmpskills.plugin.generator.AiContextGenerator
import java.awt.BorderLayout
import java.awt.Component
import java.awt.Dimension
import java.awt.Font
import java.awt.Toolkit
import java.awt.datatransfer.StringSelection
import javax.swing.*
import javax.swing.event.DocumentEvent
import javax.swing.event.DocumentListener

class KMPSkillsToolWindowPanel(private val project: Project) : JPanel(BorderLayout()) {

    init {
        val topPanel = createHeaderPanel()
        val tabbedPane = JBTabbedPane()

        tabbedPane.addTab("27 Skills Catalog", createSkillsTab())
        tabbedPane.addTab("10-Level Curriculum", createCurriculumTab())

        add(topPanel, BorderLayout.NORTH)
        add(tabbedPane, BorderLayout.CENTER)
    }

    private fun createHeaderPanel(): JPanel {
        val panel = JPanel()
        panel.layout = BoxLayout(panel, BoxLayout.Y_AXIS)
        panel.border = BorderFactory.createEmptyBorder(10, 10, 10, 10)

        val titleLabel = JLabel("💎 KMPSkills Assistant")
        titleLabel.font = titleLabel.font.deriveFont(Font.BOLD, 15f)
        titleLabel.alignmentX = Component.LEFT_ALIGNMENT

        val subLabel = JLabel("Production Architecture & AI Matrix for Android & KMP")
        subLabel.font = subLabel.font.deriveFont(Font.PLAIN, 11f)
        subLabel.alignmentX = Component.LEFT_ALIGNMENT

        val buttonPanel = JPanel()
        buttonPanel.layout = BoxLayout(buttonPanel, BoxLayout.X_AXIS)
        buttonPanel.alignmentX = Component.LEFT_ALIGNMENT
        buttonPanel.border = BorderFactory.createEmptyBorder(8, 0, 0, 0)

        val injectBtn = JButton("⚡ Inject AI Rules")
        injectBtn.toolTipText = "Generate .github/copilot-instructions.md and AI rules in this project"
        injectBtn.addActionListener {
            val success = AiContextGenerator.injectAiRules(project)
            if (success) {
                Messages.showInfoMessage(
                    project,
                    "Successfully injected .github/copilot-instructions.md!\n\nGitHub Copilot and Gemini Code Assist in Android Studio are now primed with all 27 KMPSkills.",
                    "KMPSkills Injected"
                )
            }
        }

        val doctorBtn = JButton("🔍 Doctor")
        doctorBtn.toolTipText = "Audit libs.versions.toml architecture health"
        doctorBtn.addActionListener {
            val action = io.github.kmpskills.plugin.actions.RunDoctorAction()
            val event = com.intellij.openapi.actionSystem.AnActionEvent.createFromAnAction(
                action, null, "KMPSkillsToolWindow", com.intellij.openapi.actionSystem.DataContext.EMPTY_CONTEXT
            )
            // Just show doctor message directly
            Messages.showInfoMessage(
                project,
                "Project: ${project.name}\nLocation: ${project.basePath}\n\nTo view full version audit, use Tools > KMPSkills > Run Architecture Doctor.",
                "KMPSkills Architecture Doctor"
            )
        }

        buttonPanel.add(injectBtn)
        buttonPanel.add(Box.createRigidArea(Dimension(8, 0)))
        buttonPanel.add(doctorBtn)

        panel.add(titleLabel)
        panel.add(Box.createRigidArea(Dimension(0, 2)))
        panel.add(subLabel)
        panel.add(buttonPanel)

        return panel
    }

    private fun createSkillsTab(): JPanel {
        val panel = JPanel(BorderLayout(0, 6))
        panel.border = BorderFactory.createEmptyBorder(6, 6, 6, 6)

        val searchField = JBTextField()
        searchField.emptyText.text = "Search 27 skills (e.g. MVI, Room, Ktor, ARC)..."

        val listModel = DefaultListModel<SkillItem>()
        SkillsCatalog.skills.forEach { listModel.addElement(it) }

        val skillsList = JBList(listModel)
        skillsList.cellRenderer = ListCellRenderer { _, value, _, isSelected, _ ->
            val p = JPanel(BorderLayout())
            p.border = BorderFactory.createEmptyBorder(4, 6, 4, 6)
            if (isSelected) {
                p.background = UIManager.getColor("List.selectionBackground")
            }

            val title = JLabel(value.title)
            title.font = title.font.deriveFont(Font.BOLD, 12f)
            val domain = JLabel(value.domain)
            domain.font = domain.font.deriveFont(Font.ITALIC, 10f)

            p.add(title, BorderLayout.NORTH)
            p.add(domain, BorderLayout.SOUTH)
            p
        }

        searchField.document.addDocumentListener(object : DocumentListener {
            override fun insertUpdate(e: DocumentEvent) = filter()
            override fun removeUpdate(e: DocumentEvent) = filter()
            override fun changedUpdate(e: DocumentEvent) = filter()

            fun filter() {
                val query = searchField.text.trim().lowercase()
                listModel.clear()
                SkillsCatalog.skills
                    .filter { it.title.lowercase().contains(query) || it.domain.lowercase().contains(query) || it.description.lowercase().contains(query) }
                    .forEach { listModel.addElement(it) }
            }
        })

        // Detail preview panel
        val detailPanel = JPanel(BorderLayout(0, 4))
        detailPanel.border = BorderFactory.createTitledBorder("Skill Architectural Directive")

        val descArea = JTextArea(6, 20)
        descArea.isEditable = false
        descArea.lineWrap = true
        descArea.wrapStyleWord = true
        descArea.font = Font("Monospaced", Font.PLAIN, 11)

        val copyBtn = JButton("📋 Copy Directive for AI Chat")
        copyBtn.isEnabled = false

        skillsList.addListSelectionListener {
            val selected = skillsList.selectedValue
            if (selected != null) {
                descArea.text = "${selected.title}\nDomain: ${selected.domain}\n\n${selected.description}\n\nAI DIRECTIVE:\n${selected.promptDirective}"
                copyBtn.isEnabled = true
            }
        }

        copyBtn.addActionListener {
            val selected = skillsList.selectedValue
            if (selected != null) {
                val selection = StringSelection("KMPSkills Directive for ${selected.title}:\n${selected.promptDirective}")
                Toolkit.getDefaultToolkit().systemClipboard.setContents(selection, selection)
                Messages.showInfoMessage(project, "Directive copied to clipboard! Paste it into your AI chat.", "Copied")
            }
        }

        detailPanel.add(JBScrollPane(descArea), BorderLayout.CENTER)
        detailPanel.add(copyBtn, BorderLayout.SOUTH)

        panel.add(searchField, BorderLayout.NORTH)
        panel.add(JBScrollPane(skillsList), BorderLayout.CENTER)
        panel.add(detailPanel, BorderLayout.SOUTH)

        return panel
    }

    private fun createCurriculumTab(): JPanel {
        val panel = JPanel(BorderLayout(0, 6))
        panel.border = BorderFactory.createEmptyBorder(6, 6, 6, 6)

        val listModel = DefaultListModel<CurriculumLevel>()
        CurriculumCatalog.levels.forEach { listModel.addElement(it) }

        val levelList = JBList(listModel)
        levelList.cellRenderer = ListCellRenderer { _, value, _, isSelected, _ ->
            val p = JPanel(BorderLayout())
            p.border = BorderFactory.createEmptyBorder(5, 6, 5, 6)
            if (isSelected) {
                p.background = UIManager.getColor("List.selectionBackground")
            }

            val title = JLabel("${value.levelNumber}. ${value.title}")
            title.font = title.font.deriveFont(Font.BOLD, 12f)
            val tier = JLabel(value.tier)
            tier.font = tier.font.deriveFont(Font.ITALIC, 10f)

            p.add(title, BorderLayout.NORTH)
            p.add(tier, BorderLayout.SOUTH)
            p
        }

        val detailArea = JTextArea(6, 20)
        detailArea.isEditable = false
        detailArea.lineWrap = true
        detailArea.wrapStyleWord = true
        detailArea.border = BorderFactory.createTitledBorder("Syllabus Summary")

        levelList.addListSelectionListener {
            val selected = levelList.selectedValue
            if (selected != null) {
                detailArea.text = "${selected.tier}: ${selected.title}\n\n${selected.summary}\n\nKey Skills: ${selected.keySkills.joinToString(", ")}"
            }
        }

        panel.add(JBScrollPane(levelList), BorderLayout.CENTER)
        panel.add(JBScrollPane(detailArea), BorderLayout.SOUTH)

        return panel
    }
}
