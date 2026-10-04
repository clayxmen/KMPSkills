plugins {
    id("java")
    kotlin("jvm") version "2.1.0"
    id("org.jetbrains.intellij") version "1.17.4"
}

group = "io.github.kmpskills"
version = "1.0.0"

repositories {
    mavenCentral()
    gradlePluginPortal()
}

intellij {
    version.set("2024.1.7")
    type.set("IC")
    plugins.set(listOf("com.intellij.java"))
}

tasks {
    withType<JavaCompile> {
        sourceCompatibility = "17"
        targetCompatibility = "17"
    }
    withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
        kotlinOptions.jvmTarget = "17"
        kotlinOptions.freeCompilerArgs = listOf("-Xjvm-default=all")
    }
    patchPluginXml {
        sinceBuild.set("231")
        untilBuild.set("243.*")
    }
}
