#!/usr/bin/env node

/**
 * Enhances the svg-build.ts file with improved validation and library-specific handling
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Enhancing SVG build pipeline...');

const svgBuildPath = path.join(__dirname, '..', 'src', 'lib', 'svg-build.ts');
const backupPath = svgBuildPath + '.enhancement-backup.' + Date.now();

// Create backup
console.log('📋 Creating backup...');
const originalContent = fs.readFileSync(svgBuildPath, 'utf8');
fs.writeFileSync(backupPath, originalContent);

// Enhanced SVG validation function
const enhancedValidation = `
// Enhanced SVG validation with corruption detection
function isValidSvgEnhanced(svgString: string): boolean {
  if (!svgString || typeof svgString !== 'string') return false;
  
  // Basic structure validation
  if (!svgString.includes('<svg') || !svgString.includes('</svg>')) return false;
  
  // Minimum length check
  if (svgString.length < 50) return false;
  
  // Mac OS X corruption check
  if (svgString.includes('Mac OS X') || 
      svgString.includes('ATTR') || 
      svgString.includes('com.apple.quarantine')) return false;
  
  // ViewBox validation and auto-correction
  if (svgString.includes('viewBox="0 0 2000 2000"')) {
    console.warn('Detected incorrect viewBox, will be auto-corrected');
  }
  
  // Malformed stroke detection
  if (svgString.includes('stroke-') && 
      !svgString.includes('stroke-width') && 
      !svgString.includes('stroke-linecap') && 
      !svgString.includes('stroke-linejoin')) {
    console.warn('Detected malformed stroke attribute, will be auto-corrected');
  }
  
  return true;
}

// Auto-correct common SVG issues
function autoCorrectSvg(svgString: string): string {
  let corrected = svgString;
  
  // Fix viewBox dimensions
  corrected = corrected.replace(/viewBox="0 0 2000 2000"/g, 'viewBox="0 0 24 24"');
  
  // Fix width/height attributes
  corrected = corrected.replace(/width="2000"/g, 'width="24"');
  corrected = corrected.replace(/height="2000"/g, 'height="24"');
  
  // Fix malformed stroke attributes
  corrected = corrected.replace(/stroke-"[^"]*"/g, 'stroke="currentColor"');
  
  // Normalize stroke colors
  corrected = corrected.replace(/stroke="#[0-9A-Fa-f]{6}"/g, 'stroke="currentColor"');
  
  return corrected;
}
`;

// Find the location to insert enhanced validation
const buildFunctionMatch = originalContent.match(/(export function buildCustomizedSvg\([^{]+\{[\s\S]*?)(return finalSvg;)/);

if (buildFunctionMatch) {
  // Insert enhanced validation before the return statement
  const enhancedBuildFunction = originalContent.replace(
    buildFunctionMatch[0],
    buildFunctionMatch[1] + `
  // Enhanced validation and auto-correction
  if (!isValidSvgEnhanced(finalSvg)) {
    console.warn('Invalid SVG detected, attempting auto-correction for icon:', icon.id);
    finalSvg = autoCorrectSvg(finalSvg);
    
    // If still invalid after correction, return fallback
    if (!isValidSvgEnhanced(finalSvg)) {
      console.error('SVG could not be corrected, using fallback for icon:', icon.id);
      return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><text x="12" y="14" text-anchor="middle" font-size="10" fill="currentColor">?</text></svg>';
    }
  } else {
    // Apply auto-corrections even for valid SVGs
    finalSvg = autoCorrectSvg(finalSvg);
  }
  
  ` + buildFunctionMatch[2]
  );
  
  // Add the helper functions at the top of the file, after imports
  const importsEndMatch = enhancedBuildFunction.match(/(import[^;]+;[\s\S]*?)(\/\/|export|function|const|interface)/);
  
  if (importsEndMatch) {
    const enhancedContent = enhancedBuildFunction.replace(
      importsEndMatch[0],
      importsEndMatch[1] + enhancedValidation + '\n\n' + importsEndMatch[2]
    );
    
    fs.writeFileSync(svgBuildPath, enhancedContent);
    console.log('✅ SVG build pipeline enhanced successfully!');
  } else {
    console.error('❌ Could not find import section to insert helper functions');
  }
} else {
  console.error('❌ Could not find buildCustomizedSvg function to enhance');
}