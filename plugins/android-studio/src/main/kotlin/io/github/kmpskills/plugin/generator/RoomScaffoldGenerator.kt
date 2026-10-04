package io.github.kmpskills.plugin.generator

object RoomScaffoldGenerator {

    fun generateEntity(packageName: String, entityName: String): String = """
package $packageName

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "${entityName.lowercase()}s")
data class ${entityName}Entity(
    @PrimaryKey val id: String,
    val title: String,
    val description: String = "",
    val isSynchronized: Boolean = false,
    val updatedAtEpoch: Long = System.currentTimeMillis()
)
""".trimIndent()

    fun generateDao(packageName: String, entityName: String): String = """
package $packageName

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface ${entityName}Dao {

    @Query("SELECT * FROM ${entityName.lowercase()}s ORDER BY updatedAtEpoch DESC")
    fun observeAll(): Flow<List<${entityName}Entity>>

    @Query("SELECT * FROM ${entityName.lowercase()}s WHERE id = :id")
    suspend fun getById(id: String): ${entityName}Entity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdate(entity: ${entityName}Entity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(entities: List<${entityName}Entity>)

    @Query("DELETE FROM ${entityName.lowercase()}s WHERE id = :id")
    suspend fun deleteById(id: String)
}
""".trimIndent()
}
