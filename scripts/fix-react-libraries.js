#!/usr/bin/env node

/**
 * Fix React-based icon libraries (Feather, Phosphor, Boxicons, etc.)
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing React-based icon libraries...');

// Check if the main libraries data files exist and have proper structure
const librariesToCheck = [
  'src/data/feather-icons.ts',
  'src/data/phosphor-icons.ts', 
  'src/data/boxicons.ts',
  'src/data/bootstrap-icons.ts',
  'src/data/remix-icons.ts',
  'src/data/material-icons.ts'
];

let fixesApplied = 0;

for (const libraryPath of librariesToCheck) {
  const fullPath = path.join(__dirname, '..', libraryPath);
  
  if (fs.existsSync(fullPath)) {
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check if it uses preprocessIcons
      if (content.includes('preprocessIcons')) {
        console.log(`✅ ${libraryPath} - Already uses preprocessing`);
      } else {
        console.log(`⚠️  ${libraryPath} - Missing preprocessing integration`);
      }
      
      // Check for proper async export functions
      if (content.includes('export async function get') && content.includes('preprocessIcons')) {
        console.log(`✅ ${libraryPath} - Has async export function`);
      } else {
        console.log(`⚠️  ${libraryPath} - Missing async export function`);
      }
      
    } catch (error) {
      console.log(`❌ ${libraryPath} - Error reading file: ${error.message}`);
    }
  } else {
    console.log(`❌ ${libraryPath} - File not found`);
  }
}

console.log(`\n🔧 React library fixes completed. Applied ${fixesApplied} fixes.`);
console.log('\n📋 Manual fixes still needed:');
console.log('   1. Ensure all React libraries use preprocessIcons');
console.log('   2. Add async export functions for better performance');
console.log('   3. Verify proper prop handling for each library type');
console.log('   4. Test rendering with updated icon-string-preprocessor.ts');