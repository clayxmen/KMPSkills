package io.github.kmpskills.plugin.generator

object MviScaffoldGenerator {

    fun generateUiState(packageName: String, featureName: String): String = """
package $packageName

import androidx.compose.runtime.Immutable
import kotlinx.collections.immutable.ImmutableList
import kotlinx.collections.immutable.persistentListOf

@Immutable
data class ${featureName}UiState(
    val isLoading: Boolean = false,
    val items: ImmutableList<String> = persistentListOf(),
    val errorMessage: String? = null
)
""".trimIndent()

    fun generateUiIntent(packageName: String, featureName: String): String = """
package $packageName

sealed interface ${featureName}UiIntent {
    data object RefreshRequested : ${featureName}UiIntent
    data class ItemSelected(val itemId: String) : ${featureName}UiIntent
}
""".trimIndent()

    fun generateUiEffect(packageName: String, featureName: String): String = """
package $packageName

sealed interface ${featureName}UiEffect {
    data class ShowSnackbar(val message: String) : ${featureName}UiEffect
    data class NavigateToDetail(val itemId: String) : ${featureName}UiEffect
}
""".trimIndent()

    fun generateViewModel(packageName: String, featureName: String): String = """
package $packageName

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import kotlinx.collections.immutable.toImmutableList

class ${featureName}ViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(${featureName}UiState())
    val uiState: StateFlow<${featureName}UiState> = _uiState.asStateFlow()

    // Unbuffered channel ensures single-shot effect delivery (No duplicate events on recomposition)
    private val _uiEffect = Channel<${featureName}UiEffect>(Channel.BUFFERED)
    val uiEffect: Flow<${featureName}UiEffect> = _uiEffect.receiveAsFlow()

    fun handleIntent(intent: ${featureName}UiIntent) {
        when (intent) {
            is ${featureName}UiIntent.RefreshRequested -> loadData()
            is ${featureName}UiIntent.ItemSelected -> handleItemSelection(intent.itemId)
        }
    }

    private fun loadData() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, errorMessage = null) }
            try {
                // TODO: Replace with real domain UseCase call
                val data = listOf("Item 1", "Item 2", "Item 3")
                _uiState.update { it.copy(isLoading = false, items = data.toImmutableList()) }
            } catch (e: Exception) {
                _uiState.update { it.copy(isLoading = false, errorMessage = e.message) }
                _uiEffect.send(${featureName}UiEffect.ShowSnackbar(e.message ?: "An error occurred"))
            }
        }
    }

    private fun handleItemSelection(itemId: String) {
        viewModelScope.launch {
            _uiEffect.send(${featureName}UiEffect.NavigateToDetail(itemId))
        }
    }
}
""".trimIndent()

    fun generateScreen(packageName: String, featureName: String): String = """
package $packageName

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle

@Composable
fun ${featureName}Screen(
    viewModel: ${featureName}ViewModel,
    onNavigateDetail: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    val snackbarHostState = remember { SnackbarHostState() }

    // Listen for single-shot effects
    LaunchedEffect(viewModel.uiEffect) {
        viewModel.uiEffect.collect { effect ->
            when (effect) {
                is ${featureName}UiEffect.ShowSnackbar -> {
                    snackbarHostState.showSnackbar(effect.message)
                }
                is ${featureName}UiEffect.NavigateToDetail -> {
                    onNavigateDetail(effect.itemId)
                }
            }
        }
    }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) },
        modifier = modifier
    ) { innerPadding ->
        ${featureName}Content(
            state = state,
            onIntent = viewModel::handleIntent,
            modifier = Modifier.padding(innerPadding)
        )
    }
}

@Composable
fun ${featureName}Content(
    state: ${featureName}UiState,
    onIntent: (${featureName}UiIntent) -> Unit,
    modifier: Modifier = Modifier
) {
    Box(modifier = modifier.fillMaxSize()) {
        if (state.isLoading) {
            CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
        } else if (state.errorMessage != null) {
            Text(
                text = state.errorMessage,
                color = MaterialTheme.colorScheme.error,
                modifier = Modifier.align(Alignment.Center)
            )
        } else {
            LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp)) {
                items(items = state.items, key = { it }) { item ->
                    Card(
                        onClick = { onIntent(${featureName}UiIntent.ItemSelected(item)) },
                        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)
                    ) {
                        Text(text = item, modifier = Modifier.padding(16.dp))
                    }
                }
            }
        }
    }
}
""".trimIndent()
}
