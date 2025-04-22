#!/usr/bin/env node

/**
 * Database setup script for ZenPOS
 * 
 * This script initializes the database schema and seeds it with test data
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(chalk.red('Error: Missing Supabase environment variables.'));
  console.log(chalk.yellow('Please ensure you have set the following in .env.local:'));
  console.log('  NEXT_PUBLIC_SUPABASE_URL');
  console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to execute SQL from a file
async function executeSqlFile(filePath, description) {
  try {
    console.log(chalk.blue(`Running ${description}...`));
    
    const sql = readFileSync(join(__dirname, '..', filePath), 'utf8');
    
    // Execute the SQL via Supabase's function
    const { error } = await supabase.rpc('pg_execute', { query: sql });
    
    if (error) {
      console.error(chalk.red(`Error executing ${description}:`), error.message);
      return false;
    }
    
    console.log(chalk.green(`✓ ${description} completed successfully`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error processing ${description}:`), err.message);
    return false;
  }
}

async function setupDatabase() {
  console.log(chalk.blue.bold('ZenPOS Database Setup'));
  console.log('============================');
  console.log(chalk.yellow('This script will set up your database schema and seed it with test data.'));
  console.log(chalk.yellow('Make sure you have created a Supabase project and set the environment variables.'));
  console.log('');
  
  // First, create schema
  const schemaSuccess = await executeSqlFile('supabase/schema.sql', 'schema setup');
  if (!schemaSuccess) {
    console.log(chalk.yellow('\nSchema setup had errors, but we will attempt to continue with seeding...'));
  }
  
  // Then seed the database
  const seedSuccess = await executeSqlFile('supabase/seed.sql', 'data seeding');
  
  console.log('');
  if (schemaSuccess && seedSuccess) {
    console.log(chalk.green.bold('✓ Database setup completed successfully!'));
    console.log(chalk.green('You can now start the application with:'));
    console.log('  npm run dev');
  } else {
    console.log(chalk.yellow('Database setup completed with some issues.'));
    console.log(chalk.yellow('You may need to manually fix the database before the application will work correctly.'));
    console.log(chalk.yellow('Check the error messages above for details.'));
  }
}

setupDatabase().catch(err => {
  console.error(chalk.red('Fatal error:'), err);
  process.exit(1); 
});