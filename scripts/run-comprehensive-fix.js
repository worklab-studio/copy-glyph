#!/usr/bin/env node

/**
 * Master script to run all icon export fixes in the correct order
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting comprehensive icon export fix...');
console.log('='.repeat(60));

const scripts = [
  {
    name: 'Advanced iconMap Cleaning',
    script: 'advanced-iconmap-cleaner.js',
    description: 'Remove Mac OS X corruption and validate SVG content'
  },
  {
    name: 'Iconsax Advanced Fixing',
    script: 'fix-iconsax-advanced.js', 
    description: 'Fix viewBox and stroke attribute issues'
  },
  {
    name: 'SVG Build Enhancement',
    script: 'enhance-svg-build.js',
    description: 'Add enhanced validation and auto-correction'
  },
  {
    name: 'Export Functionality Test',
    script: 'test-export-functionality.js',
    description: 'Test export success rates across libraries'
  }
];

let successCount = 0;

scripts.forEach((scriptInfo, index) => {
  console.log(`\n${index + 1}. ${scriptInfo.name}`);
  console.log(`   ${scriptInfo.description}`);
  console.log('-'.repeat(40));
  
  try {
    const scriptPath = path.join(__dirname, scriptInfo.script);
    execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
    successCount++;
    console.log(`✅ ${scriptInfo.name} completed successfully!`);
  } catch (error) {
    console.error(`❌ ${scriptInfo.name} failed:`, error.message);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`🎯 COMPREHENSIVE FIX RESULTS:`);
console.log(`✅ Completed: ${successCount}/${scripts.length} scripts`);

if (successCount === scripts.length) {
  console.log('🎉 All fixes completed successfully!');
  console.log('💡 Your icon export functionality should now be significantly improved.');
} else {
  console.log('⚠️  Some fixes failed. Check the logs above for details.');
}

console.log('\n🔄 Next steps:');
console.log('1. Test icon exports in the application');
console.log('2. Monitor console for any remaining errors');
console.log('3. Report any persistent issues for further investigation');