#!/usr/bin/env node

/**
 * Run the iconMap cleaning script
 */
const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('🧹 Running iconMap cleaning process...');
  
  const scriptPath = path.join(__dirname, 'clean-iconmap.js');
  execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
  
  console.log('✅ iconMap cleaning completed successfully!');
} catch (error) {
  console.error('❌ Failed to clean iconMap:', error.message);
  process.exit(1);
}