#!/usr/bin/env node

/**
 * This script installs dependencies needed for the database setup script
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = join(__dirname, '..', 'package.json');

// Load package.json
const packageJson = JSON.parse(require('fs').readFileSync(packageJsonPath, 'utf8'));

const dependencies = ['dotenv', 'chalk'];
const devDependencies = [];

// Check if @supabase/supabase-js is already a dependency
if (!packageJson.dependencies['@supabase/supabase-js']) {
  dependencies.push('@supabase/supabase-js');
}

// Install dependencies
if (dependencies.length > 0) {
  console.log('Installing required dependencies for database setup...');
  
  try {
    // Detect package manager
    let packageManager = 'npm';
    if (existsSync(join(__dirname, '..', 'yarn.lock'))) {
      packageManager = 'yarn';
    } else if (existsSync(join(__dirname, '..', 'pnpm-lock.yaml'))) {
      packageManager = 'pnpm';
    }

    // Install dependencies based on package manager
    if (packageManager === 'npm') {
      execSync(`npm install ${dependencies.join(' ')}`, { stdio: 'inherit' });
    } else if (packageManager === 'yarn') {
      execSync(`yarn add ${dependencies.join(' ')}`, { stdio: 'inherit' });
    } else if (packageManager === 'pnpm') {
      execSync(`pnpm add ${dependencies.join(' ')}`, { stdio: 'inherit' });
    }

    // Install dev dependencies if any
    if (devDependencies.length > 0) {
      if (packageManager === 'npm') {
        execSync(`npm install -D ${devDependencies.join(' ')}`, { stdio: 'inherit' });
      } else if (packageManager === 'yarn') {
        execSync(`yarn add -D ${devDependencies.join(' ')}`, { stdio: 'inherit' });
      } else if (packageManager === 'pnpm') {
        execSync(`pnpm add -D ${devDependencies.join(' ')}`, { stdio: 'inherit' });
      }
    }

    console.log('Dependencies installed successfully!');
  } catch (error) {
    console.error('Error installing dependencies:', error.message);
    console.error('Please install the following dependencies manually:');
    console.error(dependencies.join(', '));
    if (devDependencies.length > 0) {
      console.error('And the following dev dependencies:');
      console.error(devDependencies.join(', '));
    }
  }
} else {
  console.log('All required dependencies are already installed.');
} 