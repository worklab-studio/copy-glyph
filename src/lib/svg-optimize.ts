/**
 * SVG optimization and normalization utilities
 * Normalizes all SVGs to use currentColor as the baseline for consistent theming
 */

/**
 * Normalize SVG styles and attributes to use currentColor
 * This creates a consistent baseline for color customization
 */
function normalizeStyleColors(svgContent: string): string {
  return svgContent
    // Normalize fill in style attributes (preserve fill="none" and fill="transparent")
    .replace(/style="([^"]*?)fill:\s*(?!none|transparent|inherit)([^;"\s]+)([^"]*?)"/gi, 
      (match, before, color, after) => {
        // Preserve none and transparent
        if (color.trim() === 'none' || color.trim() === 'transparent') {
          return match;
        }
        return `style="${before}fill: currentColor${after}"`;
      })
    // Normalize stroke in style attributes (preserve stroke="none" and stroke="transparent")  
    .replace(/style="([^"]*?)stroke:\s*(?!none|transparent|inherit)([^;"\s]+)([^"]*?)"/gi,
      (match, before, color, after) => {
        // Preserve none and transparent
        if (color.trim() === 'none' || color.trim() === 'transparent') {
          return match;
        }
        return `style="${before}stroke: currentColor${after}"`;
      })
    // Normalize stop-color in gradients
    .replace(/style="([^"]*?)stop-color:\s*(?!none|transparent|inherit)([^;"\s]+)([^"]*?)"/gi,
      `style="$1stop-color: currentColor$3"`);
}

/**
 * Normalize SVG attributes to use currentColor
 */
function normalizeAttributeColors(svgContent: string): string {
  return svgContent
    // Normalize fill attributes (preserve fill="none" and fill="transparent")
    .replace(/fill="(?!none|transparent|inherit|currentColor)([^"]+)"/gi, 'fill="currentColor"')
    // Normalize stroke attributes (preserve stroke="none" and stroke="transparent")
    .replace(/stroke="(?!none|transparent|inherit|currentColor)([^"]+)"/gi, 'stroke="currentColor"')
    // Normalize stop-color attributes in gradients
    .replace(/stop-color="(?!none|transparent|inherit|currentColor)([^"]+)"/gi, 'stop-color="currentColor"');
}

/**
 * Ensure consistent SVG structure for proper scaling and compatibility
 */
function ensureConsistentStructure(svgContent: string): string {
  let result = svgContent;
  
  // Remove width and height attributes for consistent scaling
  result = result.replace(/\s*width="[^"]*"/gi, '');
  result = result.replace(/\s*height="[^"]*"/gi, '');
  
  // Ensure viewBox is present (extract from original width/height if needed)
  if (!result.includes('viewBox=')) {
    // Default to 24x24 if no viewBox is found
    result = result.replace('<svg', '<svg viewBox="0 0 24 24"');
  }
  
  // Add preserveAspectRatio for consistent scaling (helps PNG render size)
  if (!result.includes('preserveAspectRatio=')) {
    result = result.replace('<svg', '<svg preserveAspectRatio="xMidYMid meet"');
  }
  
  return result;
}

/**
 * Main SVG optimization function
 * Normalizes SVG content to use currentColor and ensures consistent structure
 */
export function optimizeSvg(svgContent: string): string {
  if (!svgContent || typeof svgContent !== 'string') {
    return svgContent;
  }
  
  let result = svgContent;
  
  // Step 1: Normalize colors in style attributes
  result = normalizeStyleColors(result);
  
  // Step 2: Normalize colors in attributes  
  result = normalizeAttributeColors(result);
  
  // Step 3: Ensure consistent scaling structure
  result = ensureConsistentStructure(result);
  
  return result;
}