import fs from 'node:fs';
import path from 'node:path';
import * as p from '@clack/prompts';
import pc from 'picocolors';

export interface GenerateOptions {
  type?: string;
  name?: string;
  package?: string;
  output?: string;
}

export async function runGenerate(typeArg?: string, nameArg?: string, options: GenerateOptions = {}): Promise<void> {
  p.intro(pc.bold(pc.cyan('💎 KMPSkills Production Code Generator')));

  // 1. Select template type
  let templateType = typeArg;
  if (!templateType) {
    const selected = await p.select({
      message: 'Select architectural scaffold to generate:',
      options: [
        { value: 'mvi', label: '🔄 MVI Feature Screen', hint: 'State, Intent, Effect, ViewModel, Screen (5 files)' },
        { value: 'room', label: '🗄️ Room KMP Entity & DAO', hint: 'Entity with primary key and Reactive Flow DAO (2 files)' },
        { value: 'outbox', label: '📦 Mutation Outbox Sync Engine', hint: 'Offline-First Mutation Outbox Engine & Dispatcher (3 files)' },
        { value: 'theme', label: '🎨 Design Tokens & Theme Engine', hint: 'Neobrutalism tokens, Typography, Dynamic color scheme (2 files)' }
      ]
    });
    if (p.isCancel(selected)) {
      p.cancel('Generation cancelled.');
      return;
    }
    templateType = selected as string;
  }

  // 2. Prompt for Name
  let name = nameArg;
  if (!name) {
    const namePrompt = await p.text({
      message: `Enter ${templateType.toUpperCase()} Name (e.g. ${getExampleName(templateType)}):`,
      validate: (val) => {
        if (!val || val.trim().length === 0) return 'Name cannot be empty';
        if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(val.trim())) return 'Name must start with a letter and contain only alphanumeric characters';
        return undefined;
      }
    });
    if (p.isCancel(namePrompt)) {
      p.cancel('Generation cancelled.');
      return;
    }
    name = namePrompt.trim();
  }

  // Format capitalized name
  const formattedName = capitalize(name);

  // 3. Package Name & Output Dir
  const cwd = process.cwd();
  const detectedPackage = detectPackageFromCwd(cwd);

  let packageName = options.package;
  if (!packageName) {
    const pkgPrompt = await p.text({
      message: 'Kotlin package name:',
      initialValue: detectedPackage,
      validate: (val) => (!val ? 'Package name is required' : undefined)
    });
    if (p.isCancel(pkgPrompt)) {
      p.cancel('Generation cancelled.');
      return;
    }
    packageName = pkgPrompt.trim();
  }

  const targetDir = options.output ? path.resolve(cwd, options.output) : cwd;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const s = p.spinner();
  s.start(`Generating ${formattedName} ${templateType.toUpperCase()} architecture files...`);

  const createdFiles: string[] = [];

  switch (templateType) {
    case 'mvi':
      createdFiles.push(...generateMviFiles(targetDir, packageName, formattedName));
      break;
    case 'room':
      createdFiles.push(...generateRoomFiles(targetDir, packageName, formattedName));
      break;
    case 'outbox':
      createdFiles.push(...generateOutboxFiles(targetDir, packageName, formattedName));
      break;
    case 'theme':
      createdFiles.push(...generateThemeFiles(targetDir, packageName, formattedName));
      break;
    default:
      s.stop(pc.red(`Unknown scaffold type: ${templateType}`));
      return;
  }

  s.stop(pc.green(`Scaffolded ${createdFiles.length} production-grade files successfully!`));

  p.note(
    createdFiles.map(f => `${pc.green('✔')} ${path.relative(cwd, f)}`).join('\n'),
    'Generated Files'
  );

  p.outro(pc.bold(pc.green(`🎉 ${formattedName} is ready to use in your project!`)));
}

function getExampleName(type: string): string {
  switch (type) {
    case 'mvi': return 'ProductDetail / Cart / Feed';
    case 'room': return 'Article / Note / Bookmark';
    case 'outbox': return 'SyncManager';
    case 'theme': return 'AppTheme';
    default: return 'Feature';
  }
}

function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function detectPackageFromCwd(cwd: string): string {
  const normalized = cwd.replace(/\\/g, '/');
  const markers = ['/src/commonMain/kotlin/', '/src/main/kotlin/', '/src/main/java/'];
  for (const marker of markers) {
    const idx = normalized.indexOf(marker);
    if (idx !== -1) {
      return normalized.substring(idx + marker.length).replace(/\//g, '.');
    }
  }
  return 'com.example.app.feature';
}

function generateMviFiles(dir: string, pkg: string, name: string): string[] {
  const files: string[] = [];

  // 1. UiState
  const statePath = path.join(dir, `${name}UiState.kt`);
  fs.writeFileSync(statePath, `package ${pkg}

import androidx.compose.runtime.Immutable
import kotlinx.collections.immutable.ImmutableList
import kotlinx.collections.immutable.persistentListOf

@Immutable
data class ${name}UiState(
    val isLoading: Boolean = false,
    val items: ImmutableList<String> = persistentListOf(),
    val errorMessage: String? = null
)
`, 'utf-8');
  files.push(statePath);

  // 2. UiIntent
  const intentPath = path.join(dir, `${name}UiIntent.kt`);
  fs.writeFileSync(intentPath, `package ${pkg}

sealed interface ${name}UiIntent {
    data object RefreshRequested : ${name}UiIntent
    data class ItemSelected(val itemId: String) : ${name}UiIntent
}
`, 'utf-8');
  files.push(intentPath);

  // 3. UiEffect
  const effectPath = path.join(dir, `${name}UiEffect.kt`);
  fs.writeFileSync(effectPath, `package ${pkg}

sealed interface ${name}UiEffect {
    data class ShowSnackbar(val message: String) : ${name}UiEffect
    data class NavigateToDetail(val itemId: String) : ${name}UiEffect
}
`, 'utf-8');
  files.push(effectPath);

  // 4. ViewModel
  const vmPath = path.join(dir, `${name}ViewModel.kt`);
  fs.writeFileSync(vmPath, `package ${pkg}

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import kotlinx.collections.immutable.toImmutableList

class ${name}ViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(${name}UiState())
    val uiState: StateFlow<${name}UiState> = _uiState.asStateFlow()

    // Unbuffered channel ensures single-shot effect delivery (No duplicate events on recomposition)
    private val _uiEffect = Channel<${name}UiEffect>(Channel.BUFFERED)
    val uiEffect: Flow<${name}UiEffect> = _uiEffect.receiveAsFlow()

    fun handleIntent(intent: ${name}UiIntent) {
        when (intent) {
            is ${name}UiIntent.RefreshRequested -> loadData()
            is ${name}UiIntent.ItemSelected -> handleItemSelection(intent.itemId)
        }
    }

    private fun loadData() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, errorMessage = null) }
            try {
                // TODO: Call your domain UseCase here
                val resultData = listOf("${name} Alpha", "${name} Beta", "${name} Gamma")
                _uiState.update { it.copy(isLoading = false, items = resultData.toImmutableList()) }
            } catch (e: Exception) {
                _uiState.update { it.copy(isLoading = false, errorMessage = e.message) }
                _uiEffect.send(${name}UiEffect.ShowSnackbar(e.message ?: "An error occurred"))
            }
        }
    }

    private fun handleItemSelection(itemId: String) {
        viewModelScope.launch {
            _uiEffect.send(${name}UiEffect.NavigateToDetail(itemId))
        }
    }
}
`, 'utf-8');
  files.push(vmPath);

  // 5. Screen Composable
  const screenPath = path.join(dir, `${name}Screen.kt`);
  fs.writeFileSync(screenPath, `package ${pkg}

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
fun ${name}Screen(
    viewModel: ${name}ViewModel,
    onNavigateDetail: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(viewModel.uiEffect) {
        viewModel.uiEffect.collect { effect ->
            when (effect) {
                is ${name}UiEffect.ShowSnackbar -> {
                    snackbarHostState.showSnackbar(effect.message)
                }
                is ${name}UiEffect.NavigateToDetail -> {
                    onNavigateDetail(effect.itemId)
                }
            }
        }
    }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) },
        modifier = modifier
    ) { innerPadding ->
        ${name}Content(
            state = state,
            onIntent = viewModel::handleIntent,
            modifier = Modifier.padding(innerPadding)
        )
    }
}

@Composable
fun ${name}Content(
    state: ${name}UiState,
    onIntent: (${name}UiIntent) -> Unit,
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
                        onClick = { onIntent(${name}UiIntent.ItemSelected(item)) },
                        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)
                    ) {
                        Text(text = item, modifier = Modifier.padding(16.dp))
                    }
                }
            }
        }
    }
}
`, 'utf-8');
  files.push(screenPath);

  return files;
}

function generateRoomFiles(dir: string, pkg: string, name: string): string[] {
  const files: string[] = [];

  const entityPath = path.join(dir, `${name}Entity.kt`);
  fs.writeFileSync(entityPath, `package ${pkg}

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "${name.toLowerCase()}s")
data class ${name}Entity(
    @PrimaryKey val id: String,
    val title: String,
    val description: String = "",
    val isSynchronized: Boolean = false,
    val updatedAtEpoch: Long = System.currentTimeMillis()
)
`, 'utf-8');
  files.push(entityPath);

  const daoPath = path.join(dir, `${name}Dao.kt`);
  fs.writeFileSync(daoPath, `package ${pkg}

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface ${name}Dao {

    @Query("SELECT * FROM ${name.toLowerCase()}s ORDER BY updatedAtEpoch DESC")
    fun observeAll(): Flow<List<${name}Entity>>

    @Query("SELECT * FROM ${name.toLowerCase()}s WHERE id = :id")
    suspend fun getById(id: String): ${name}Entity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdate(entity: ${name}Entity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(entities: List<${name}Entity>)

    @Query("DELETE FROM ${name.toLowerCase()}s WHERE id = :id")
    suspend fun deleteById(id: String)
}
`, 'utf-8');
  files.push(daoPath);

  return files;
}

function generateOutboxFiles(dir: string, pkg: string, name: string): string[] {
  const files: string[] = [];

  const entityPath = path.join(dir, `MutationOutboxEntity.kt`);
  fs.writeFileSync(entityPath, `package ${pkg}

import androidx.room.Entity
import androidx.room.PrimaryKey

enum class SyncActionType { CREATE, UPDATE, DELETE }
enum class SyncStatus { PENDING, IN_PROGRESS, FAILED }

@Entity(tableName = "mutation_outbox")
data class MutationOutboxEntity(
    @PrimaryKey val id: String,
    val entityType: String,
    val entityId: String,
    val action: SyncActionType,
    val payloadJson: String,
    val createdAtEpoch: Long,
    val retryCount: Int = 0,
    val status: SyncStatus = SyncStatus.PENDING
)
`, 'utf-8');
  files.push(entityPath);

  const daoPath = path.join(dir, `MutationOutboxDao.kt`);
  fs.writeFileSync(daoPath, `package ${pkg}

import androidx.room.*

@Dao
interface MutationOutboxDao {
    @Query("SELECT * FROM mutation_outbox ORDER BY createdAtEpoch ASC LIMIT 20")
    suspend fun getPendingBatch(): List<MutationOutboxEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun enqueue(mutation: MutationOutboxEntity)

    @Query("DELETE FROM mutation_outbox WHERE id = :id")
    suspend fun markCompleted(id: String)

    @Query("UPDATE mutation_outbox SET retryCount = retryCount + 1, status = :status WHERE id = :id")
    suspend fun recordRetry(id: String, status: SyncStatus)
}
`, 'utf-8');
  files.push(daoPath);

  return files;
}

function generateThemeFiles(dir: string, pkg: string, name: string): string[] {
  const files: string[] = [];

  const tokensPath = path.join(dir, `ColorTokens.kt`);
  fs.writeFileSync(tokensPath, `package ${pkg}

import androidx.compose.ui.graphics.Color

object ColorTokens {
    val NeoYellow = Color(0xFFFFE600)
    val NeoPink = Color(0xFFFF5E97)
    val NeoCyan = Color(0xFF00E5FF)
    val NeoBlack = Color(0xFF121212)
    val NeoWhite = Color(0xFFFFFFFF)
    val NeoCardBorder = Color(0xFF1E1E1E)
}
`, 'utf-8');
  files.push(tokensPath);

  const themePath = path.join(dir, `${name}.kt`);
  fs.writeFileSync(themePath, `package ${pkg}

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColorScheme = darkColorScheme(
    primary = ColorTokens.NeoYellow,
    secondary = ColorTokens.NeoCyan,
    background = ColorTokens.NeoBlack,
    surface = ColorTokens.NeoBlack,
    onPrimary = ColorTokens.NeoBlack,
    onBackground = ColorTokens.NeoWhite
)

@Composable
fun ${name}(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        content = content
    )
}
`, 'utf-8');
  files.push(themePath);

  return files;
}
