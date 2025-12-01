#!/usr/bin/env node
/**
 * Sync shared assets from /assets to all app public directories.
 * Run: pnpm sync:assets
 */

import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ASSETS_DIR = join(ROOT, 'assets');
const APPS_DIR = join(ROOT, 'apps');

// Apps that need public assets
const APPS = ['demo-nextjs', 'demo-vite', 'docs', 'landing', 'storybook'];

// Files to copy from assets/ to public/
const ASSET_FILES = ['formkit-gov.png', 'logo.svg'];

// Files to copy from assets/favicons/ to public/
const FAVICON_FILES = [
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'apple-touch-icon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  'favicon.svg',
  'site.webmanifest',
];

/* eslint-disable no-console -- CLI script requires console output */
function syncAssets() {
  console.log('🔄 Syncing shared assets to all apps...\n');

  for (const app of APPS) {
    const publicDir = join(APPS_DIR, app, 'public');

    // Create public directory if it doesn't exist
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }

    console.log(`📁 ${app}/public/`);

    // Copy main assets
    for (const file of ASSET_FILES) {
      const src = join(ASSETS_DIR, file);
      const dest = join(publicDir, file);
      if (existsSync(src)) {
        cpSync(src, dest);
        console.log(`   ✓ ${file}`);
      }
    }

    // Copy favicons
    for (const file of FAVICON_FILES) {
      const src = join(ASSETS_DIR, 'favicons', file);
      const dest = join(publicDir, file);
      if (existsSync(src)) {
        cpSync(src, dest);
        console.log(`   ✓ ${file}`);
      }
    }

    console.log('');
  }

  console.log('✅ Assets synced successfully!');
}
/* eslint-enable no-console */

syncAssets();
