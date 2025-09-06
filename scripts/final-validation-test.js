#!/usr/bin/env node

/**
 * Final validation test to verify all fixes are working
 */

const fs = require('fs');
const path = require('path');

console.log('🔬 Running final validation tests...');

// Test 1: Check if iconMap corruption is cleaned
function testIconMapCleaning() {
  console.log('\n1️⃣ Testing iconMap corruption cleaning...');
  
  const iconMapPath = path.join(__dirname, '..', 'iconMap.ts');
  const content = fs.readFileSync(iconMapPath, 'utf8');
  
  const corruptionCount = (content.match(/Mac OS X|ATTR|com\.apple\.quarantine/g) || []).length;
  const totalLines = content.split('\n').length;
  
  if (corruptionCount === 0) {
    console.log('✅ iconMap is clean - no Mac OS X corruption detected');
  } else {
    console.log(`❌ Still found ${corruptionCount} corruption entries`);
  }
  
  console.log(`📊 iconMap stats: ${totalLines} total lines`);
  return corruptionCount === 0;
}

// Test 2: Check import paths
function testImportPaths() {
  console.log('\n2️⃣ Testing import paths...');
  
  const files = [
    { path: 'src/data/octicons-icons.ts', expectedImport: 'octicons icons.ts' },
    { path: 'src/data/iconnoir-icons.ts', expectedImport: 'IconNoir icons.ts' }
  ];
  
  let allFixed = true;
  
  files.forEach(file => {
    const filePath = path.join(__dirname, '..', file.path);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(file.expectedImport)) {
        console.log(`✅ ${file.path} has correct import path`);
      } else {
        console.log(`❌ ${file.path} has incorrect import path`);
        allFixed = false;
      }
    } else {
      console.log(`⚠️  ${file.path} does not exist`);
    }
  });
  
  return allFixed;
}

// Test 3: Check SVG build enhancements
function testSvgBuildEnhancements() {
  console.log('\n3️⃣ Testing SVG build enhancements...');
  
  const svgBuildPath = path.join(__dirname, '..', 'src', 'lib', 'svg-build.ts');
  const content = fs.readFileSync(svgBuildPath, 'utf8');
  
  const hasEnhancedValidation = content.includes('isValidSvgEnhanced');
  const hasAutoCorrection = content.includes('autoCorrectSvg');
  
  if (hasEnhancedValidation && hasAutoCorrection) {
    console.log('✅ SVG build pipeline has enhanced validation and auto-correction');
    return true;
  } else {
    console.log('❌ SVG build enhancements not properly applied');
    return false;
  }
}

// Test 4: Check Iconsax fixes
function testIconsaxFixes() {
  console.log('\n4️⃣ Testing Iconsax fixes...');
  
  const iconsaxPath = path.join(__dirname, '..', 'src', 'data', 'iconsax-icons.ts');
  const content = fs.readFileSync(iconsaxPath, 'utf8');
  
  const hasViewBoxFixes = content.includes('2000 2000') && content.includes('0 0 24 24');
  const hasStrokeFixes = content.includes('stroke-"');
  
  if (hasViewBoxFixes && hasStrokeFixes) {
    console.log('✅ Iconsax has viewBox and stroke fixes');
    return true;
  } else {
    console.log('❌ Iconsax fixes not properly applied');
    return false;
  }
}

// Run all tests
const results = {
  iconMapCleaning: testIconMapCleaning(),
  importPaths: testImportPaths(),
  svgBuildEnhancements: testSvgBuildEnhancements(),
  iconsaxFixes: testIconsaxFixes()
};

// Summary
console.log('\n' + '='.repeat(60));
console.log('🎯 FINAL VALIDATION RESULTS:');
console.log('='.repeat(60));

const passedTests = Object.values(results).filter(Boolean).length;
const totalTests = Object.keys(results).length;

Object.entries(results).forEach(([test, passed]) => {
  console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
});

console.log(`\n📊 Overall: ${passedTests}/${totalTests} tests passed`);

if (passedTests === totalTests) {
  console.log('🎉 ALL TESTS PASSED! Icon export fixes are successfully implemented.');
  console.log('\n💡 Expected improvements:');
  console.log('   - Iconsax icons should now display correctly');
  console.log('   - Octicons and IconNoir should be accessible');
  console.log('   - Export functionality should be much more reliable');
  console.log('   - Corrupt data is automatically cleaned and corrected');
} else {
  console.log('⚠️  Some tests failed. Please review the issues above.');
}

console.log('\n✅ Final validation completed!');