#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Cloudflare deployment...\n');

try {
  // Step 1: Clean previous build
  console.log('🧹 Cleaning previous build...');
  if (fs.existsSync('.next')) {
    execSync('rm -rf .next', { stdio: 'inherit' });
  }
  
  // Step 2: Install dependencies if needed
  console.log('📦 Checking dependencies...');
  if (!fs.existsSync('node_modules')) {
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }
  
  // Step 3: Build the project
  console.log('🔨 Building project...');
  execSync('npm run build:static', { stdio: 'inherit' });
  
  // Step 4: Deploy to Cloudflare
  console.log('☁️ Deploying to Cloudflare...');
  execSync('wrangler deploy --env production', { stdio: 'inherit' });
  
  console.log('\n✅ Deployment completed successfully!');
  console.log('🌐 Your app should be available at: https://marva-cosmic.pages.dev');
  
} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  process.exit(1);
}
