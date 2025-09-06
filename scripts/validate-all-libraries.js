#!/usr/bin/env node

/**
 * Comprehensive validation of all icon libraries
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating all icon libraries...\n');

// All icon library data files
const libraries = [
  { file: 'src/data/lucide-icons.ts', name: 'Lucide', type: 'component' },
  { file: 'src/data/tabler-icons.ts', name: 'Tabler', type: 'string' },
  { file: 'src/data/feather-icons.ts', name: 'Feather', type: 'component' },
  { file: 'src/data/phosphor-icons.ts', name: 'Phosphor', type: 'component' },
  { file: 'src/data/boxicons.ts', name: 'Boxicons', type: 'component' },
  { file: 'src/data/octicons-icons.ts', name: 'Octicons', type: 'string' },
  { file: 'src/data/bootstrap-icons.ts', name: 'Bootstrap', type: 'component' },
  { file: 'src/data/remix-icons.ts', name: 'Remix', type: 'component' },
  { file: 'src/data/material-icons.ts', name: 'Material', type: 'component' },
  { file: 'src/data/heroicons.ts', name: 'Heroicons', type: 'component' },
  { file: 'src/data/radix-icons.ts', name: 'Radix', type: 'component' },
  { file: 'src/data/css-gg-icons.ts', name: 'CSS.gg', type: 'component' },
  { file: 'src/data/fluent-icons.ts', name: 'Fluent', type: 'component' },
  { file: 'src/data/iconsax-icons.ts', name: 'Iconsax', type: 'string' },
  { file: 'src/data/iconnoir-icons.ts', name: 'IconNoir', type: 'string' },
  { file: 'src/data/solar-icons.ts', name: 'Solar', type: 'component' },
  { file: 'src/data/teeny-icons.ts', name: 'Teeny', type: 'component' },
  { file: 'src/data/ant-icons.ts', name: 'Ant Design', type: 'component' },
  { file: 'src/data/line-icons.ts', name: 'Line MD', type: 'string' },
  { file: 'src/data/pixelart-icons.ts', name: 'Pixelart', type: 'component' },
  { file: 'src/data/atlas-icons.ts', name: 'Atlas', type: 'string' }
];

let totalLibraries = 0;
let workingLibraries = 0;
let issuesFound = [];

for (const library of libraries) {
  totalLibraries++;
  const fullPath = path.join(__dirname, '..', library.file);
  
  console.log(`📋 Checking ${library.name} (${library.type})...`);
  
  if (!fs.existsSync(fullPath)) {
    issuesFound.push(`❌ ${library.name}: File not found`);
    continue;
  }
  
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    let hasIssues = false;
    
    // Check for import issues
    if (content.includes("import { iconMap } from '../../") && 
        !content.includes("import { iconMap } from '../../iconMap'")) {
      issuesFound.push(`⚠️  ${library.name}: Incorrect import path`);
      hasIssues = true;
    }
    
    // Check for preprocessing integration (component libraries)
    if (library.type === 'component' && !content.includes('preprocessIcons')) {
      issuesFound.push(`⚠️  ${library.name}: Missing preprocessing integration`);
      hasIssues = true;
    }
    
    // Check for async export functions
    if (library.type === 'component' && 
        (!content.includes('export async function get') || !content.includes('processedIconsCache'))) {
      issuesFound.push(`⚠️  ${library.name}: Missing async export pattern`);
      hasIssues = true;
    }
    
    // Check for proper icon exports
    if (!content.includes('export const') && !content.includes('export async function')) {
      issuesFound.push(`❌ ${library.name}: No valid exports found`);
      hasIssues = true;
    }
    
    // Check for SVG validation (string libraries)
    if (library.type === 'string' && library.name === 'Iconsax' && 
        !content.includes('isValidSvg')) {
      issuesFound.push(`⚠️  ${library.name}: Missing SVG validation`);
      hasIssues = true;
    }
    
    if (!hasIssues) {
      workingLibraries++;
      console.log(`   ✅ ${library.name}: OK`);
    }
    
  } catch (error) {
    issuesFound.push(`❌ ${library.name}: Error reading file - ${error.message}`);
  }
  
  console.log('');
}

// Summary
console.log('📊 Validation Summary:');
console.log(`   Total libraries: ${totalLibraries}`);
console.log(`   Working libraries: ${workingLibraries}`);
console.log(`   Libraries with issues: ${totalLibraries - workingLibraries}`);
console.log(`   Success rate: ${((workingLibraries / totalLibraries) * 100).toFixed(1)}%\n`);

if (issuesFound.length > 0) {
  console.log('🔧 Issues Found:');
  issuesFound.forEach(issue => console.log(`   ${issue}`));
} else {
  console.log('🎉 All libraries passed validation!');
}

console.log('\n🎯 Priority Fixes Needed:');
console.log('   1. Fix import paths for string-based libraries');
console.log('   2. Add preprocessing to component libraries');
console.log('   3. Ensure async export patterns for performance');
console.log('   4. Add SVG validation for string libraries');
console.log('   5. Test actual export functionality across all libraries');