import fs from 'node:fs';
import path from 'node:path';

export interface ProjectProfile {
  cwd: string;
  isKmp: boolean;
  isAndroid: boolean;
  hasServer: boolean;
  hasCompose: boolean;
  detectedIdes: ('cursor' | 'android-studio' | 'vscode' | 'antigravity')[];
  versions: {
    kotlin?: string;
    agp?: string;
    compose?: string;
    ktor?: string;
    room?: string;
    koin?: string;
  };
  targets: string[];
}

export function detectProject(cwd: string = process.cwd()): ProjectProfile {
  const profile: ProjectProfile = {
    cwd,
    isKmp: false,
    isAndroid: false,
    hasServer: false,
    hasCompose: false,
    detectedIdes: [],
    versions: {},
    targets: []
  };

  // 1. Detect IDE directories
  if (fs.existsSync(path.join(cwd, '.cursor'))) profile.detectedIdes.push('cursor');
  if (fs.existsSync(path.join(cwd, '.idea'))) profile.detectedIdes.push('android-studio');
  if (fs.existsSync(path.join(cwd, '.vscode'))) profile.detectedIdes.push('vscode');
  if (fs.existsSync(path.join(cwd, '.gemini'))) profile.detectedIdes.push('antigravity');

  // If no IDE dirs detected, default recommend Cursor and Android Studio
  if (profile.detectedIdes.length === 0) {
    profile.detectedIdes = ['cursor', 'android-studio'];
  }

  // 2. Parse libs.versions.toml if present
  const tomlPath = path.join(cwd, 'gradle', 'libs.versions.toml');
  if (fs.existsSync(tomlPath)) {
    const tomlContent = fs.readFileSync(tomlPath, 'utf-8');
    
    profile.versions.kotlin = extractVersion(tomlContent, 'kotlin');
    profile.versions.agp = extractVersion(tomlContent, 'agp') || extractVersion(tomlContent, 'android-gradle-plugin');
    profile.versions.compose = extractVersion(tomlContent, 'compose') || extractVersion(tomlContent, 'compose-multiplatform');
    profile.versions.ktor = extractVersion(tomlContent, 'ktor');
    profile.versions.room = extractVersion(tomlContent, 'room');
    profile.versions.koin = extractVersion(tomlContent, 'koin');
  }

  // 3. Inspect build / settings scripts
  const settingsKts = path.join(cwd, 'settings.gradle.kts');
  const buildKts = path.join(cwd, 'build.gradle.kts');
  let buildContent = '';

  if (fs.existsSync(settingsKts)) {
    buildContent += fs.readFileSync(settingsKts, 'utf-8');
  }
  if (fs.existsSync(buildKts)) {
    buildContent += fs.readFileSync(buildKts, 'utf-8');
  }

  // 4. Determine Project Nature
  const hasAndroidApp = fs.existsSync(path.join(cwd, 'app', 'androidApp')) || 
                        fs.existsSync(path.join(cwd, 'app', 'src', 'main', 'AndroidManifest.xml')) ||
                        fs.existsSync(path.join(cwd, 'androidApp'));
  const hasCommonMain = fs.existsSync(path.join(cwd, 'app', 'shared', 'src', 'commonMain')) ||
                        fs.existsSync(path.join(cwd, 'shared', 'src', 'commonMain')) ||
                        fs.existsSync(path.join(cwd, 'core'));

  if (hasCommonMain || buildContent.includes('kotlin("multiplatform")') || buildContent.includes('org.jetbrains.kotlin.multiplatform')) {
    profile.isKmp = true;
  }
  if (hasAndroidApp || buildContent.includes('com.android.application') || buildContent.includes('com.android.library')) {
    profile.isAndroid = true;
  }
  if (fs.existsSync(path.join(cwd, 'server')) || buildContent.includes('io.ktor')) {
    profile.hasServer = true;
  }
  if (profile.versions.compose || buildContent.includes('org.jetbrains.compose')) {
    profile.hasCompose = true;
  }

  // 5. Detect Targets
  if (profile.isAndroid) profile.targets.push('Android');
  if (fs.existsSync(path.join(cwd, 'app', 'iosApp')) || fs.existsSync(path.join(cwd, 'iosApp'))) profile.targets.push('iOS (SwiftUI)');
  if (fs.existsSync(path.join(cwd, 'app', 'desktopApp')) || fs.existsSync(path.join(cwd, 'desktopApp'))) profile.targets.push('Desktop (JVM)');
  if (fs.existsSync(path.join(cwd, 'app', 'webApp')) || fs.existsSync(path.join(cwd, 'webApp'))) profile.targets.push('Web (Wasm)');
  if (profile.hasServer) profile.targets.push('Server (Ktor)');

  if (profile.targets.length === 0) {
    profile.targets.push('Android / KMP Common');
  }

  return profile;
}

function extractVersion(toml: string, key: string): string | undefined {
  const regex = new RegExp(`${key}\\s*=\\s*["']([^"']+)["']`, 'i');
  const match = toml.match(regex);
  return match ? match[1] : undefined;
}
