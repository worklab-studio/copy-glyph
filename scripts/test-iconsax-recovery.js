/**
 * Test script to check Iconsax icon recovery after cleaning
 */
const path = require('path');

// First, run the cleaning script
console.log('🔄 Running iconMap cleaning script...');
try {
  require('./clean-iconmap.js');
  console.log('✅ Cleaning completed, testing recovery...\n');
} catch (error) {
  console.error('❌ Cleaning failed:', error.message);
  process.exit(1);
}

// Test the recovery by checking how many valid icons we have now
async function testIconRecovery() {
  try {
    // Import the cleaned data
    const { iconMap } = require('../iconMap.ts');
    
    let totalIcons = 0;
    let validIcons = 0;
    let macOSCorrupted = 0;
    let tooShort = 0;
    let noSvgTag = 0;
    
    console.log('📊 Testing cleaned iconMap data...\n');
    
    for (const [key, value] of Object.entries(iconMap)) {
      totalIcons++;
      
      // Check for Mac OS X corruption
      if (value.includes('Mac OS X') || 
          value.includes('__MACOSX') || 
          value.includes('ATTR') || 
          value.includes('com.apple.quarantine')) {
        macOSCorrupted++;
        continue;
      }
      
      // Check minimum length
      if (value.length < 50) {
        tooShort++;
        continue;
      }
      
      // Check for SVG tags
      if (!value.includes('<svg') || !value.includes('</svg>')) {
        noSvgTag++;
        continue;
      }
      
      validIcons++;
    }
    
    console.log(`📈 Recovery Results:`);
    console.log(`   Total entries: ${totalIcons}`);
    console.log(`   Valid SVG icons: ${validIcons}`);
    console.log(`   Mac OS X corrupted: ${macOSCorrupted}`);
    console.log(`   Too short: ${tooShort}`);
    console.log(`   Missing SVG tags: ${noSvgTag}`);
    console.log(`   Recovery rate: ${((validIcons / totalIcons) * 100).toFixed(1)}%\n`);
    
    if (validIcons > 5000) {
      console.log('🎉 Excellent! Recovery successful with 5000+ valid icons');
    } else if (validIcons > 3000) {
      console.log('✅ Good recovery with 3000+ valid icons');
    } else if (validIcons > 1000) {
      console.log('⚠️  Moderate recovery with 1000+ valid icons');
    } else {
      console.log('❌ Poor recovery - less than 1000 valid icons');
    }
    
  } catch (error) {
    console.error('❌ Failed to test icon recovery:', error.message);
  }
}

testIconRecovery();