#!/usr/bin/env node

/**
 * Advanced Iconsax SVG fixer - corrects viewBox dimensions and stroke attributes
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Starting advanced Iconsax fixing process...');

const iconMapPath = path.join(__dirname, '..', 'iconMap.ts');
const backupPath = iconMapPath + '.iconsax-fix-backup.' + Date.now();

// Create backup
console.log('📋 Creating backup...');
const originalContent = fs.readFileSync(iconMapPath, 'utf8');
fs.writeFileSync(backupPath, originalContent);

let fixedContent = originalContent;
let fixCount = 0;

// Fix viewBox issues (2000x2000 -> 24x24)
const viewBoxMatches = fixedContent.match(/viewBox="0 0 2000 2000"/g) || [];
fixedContent = fixedContent.replace(/viewBox="0 0 2000 2000"/g, 'viewBox="0 0 24 24"');
fixCount += viewBoxMatches.length;
console.log(`🔧 Fixed ${viewBoxMatches.length} viewBox issues`);

// Fix width and height attributes to 24
const widthMatches = fixedContent.match(/width="2000"/g) || [];
fixedContent = fixedContent.replace(/width="2000"/g, 'width="24"');
const heightMatches = fixedContent.match(/height="2000"/g) || [];
fixedContent = fixedContent.replace(/height="2000"/g, 'height="24"');
console.log(`🔧 Fixed ${widthMatches.length} width and ${heightMatches.length} height attributes`);

// Fix malformed stroke attributes (stroke- without proper completion)
const strokeMatches = fixedContent.match(/stroke-"[^"]*"/g) || [];
fixedContent = fixedContent.replace(/stroke-"[^"]*"/g, 'stroke="currentColor"');
console.log(`🔧 Fixed ${strokeMatches.length} malformed stroke attributes`);

// Ensure consistent stroke attributes for line-style icons
fixedContent = fixedContent.replace(/stroke="#[0-9A-Fa-f]{6}"/g, 'stroke="currentColor"');

// Write fixed content
fs.writeFileSync(iconMapPath, fixedContent);

console.log(`✅ Iconsax advanced fixing completed! Total fixes: ${fixCount + widthMatches.length + heightMatches.length + strokeMatches.length}`);