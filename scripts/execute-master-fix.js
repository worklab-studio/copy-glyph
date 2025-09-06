#!/usr/bin/env node

/**
 * Execute the master comprehensive fix
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Executing comprehensive icon export fix...');

try {
  // Run the advanced iconMap cleaner
  console.log('1️⃣ Cleaning iconMap...');
  execSync(`node "${path.join(__dirname, 'advanced-iconmap-cleaner.js')}"`, { stdio: 'inherit' });
  
  // Run the Iconsax fixes
  console.log('2️⃣ Fixing Iconsax issues...');
  execSync(`node "${path.join(__dirname, 'fix-iconsax-advanced.js')}"`, { stdio: 'inherit' });
  
  // Enhanced preprocessing
  console.log('3️⃣ Enhancing preprocessing...');
  execSync(`node "${path.join(__dirname, 'enhanced-preprocessing.js')}"`, { stdio: 'inherit' });
  
  // Test the results
  console.log('4️⃣ Testing export functionality...');
  execSync(`node "${path.join(__dirname, 'test-export-functionality.js')}"`, { stdio: 'inherit' });
  
  console.log('\n🎉 Comprehensive icon export fix completed successfully!');
  console.log('✅ All major issues should now be resolved:');
  console.log('   - iconMap corruption cleaned');
  console.log('   - Import paths fixed');
  console.log('   - Iconsax viewBox issues corrected');
  console.log('   - Enhanced SVG validation added');
  console.log('   - Component preprocessing improved');
  
} catch (error) {
  console.error('❌ Error during comprehensive fix:', error.message);
  process.exit(1);
}