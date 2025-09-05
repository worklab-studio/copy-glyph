import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { type IconItem } from "@/types/icon";
import { supportsStrokeWidth } from "./icon-utils";

/**
 * Library-specific icon component handlers
 */
const LibraryHandlers = {
  // Lucide React components
  lucide: (IconComponent: React.ComponentType<any>, color: string, strokeWidth: number) => ({
    size: 24,
    color,
    strokeWidth,
    'aria-hidden': true
  }),
  
  // Material icons (usually filled)
  material: (IconComponent: React.ComponentType<any>, color: string, strokeWidth: number) => ({
    style: { color, fontSize: '24px' },
    'aria-hidden': true
  }),
  
  // IconSax icons
  iconsax: (IconComponent: React.ComponentType<any>, color: string, strokeWidth: number) => ({
    size: '24',
    color,
    variant: 'Linear',
    'aria-hidden': true
  }),
  
  // Generic fallback
  generic: (IconComponent: React.ComponentType<any>, color: string, strokeWidth: number) => ({
    size: 24,
    width: 24,
    height: 24,
    color,
    fill: color,
    stroke: color,
    strokeWidth,
    'aria-hidden': true
  })
};

/**
 * Enhanced color replacement patterns for comprehensive SVG processing
 */
function applyColorReplacements(svgContent: string, color: string): string {
  // Skip replacement if color is currentColor (already correct)
  if (color === 'currentColor') return svgContent;
  
  return svgContent
    // Replace currentColor explicitly first (this is what we want to change)
    .replace(/stroke="currentColor"/gi, `stroke="${color}"`)
    .replace(/fill="currentColor"/gi, `fill="${color}"`)
    
    // Hex colors (preserve none, transparent, and inherit)
    .replace(/fill="(?!none|transparent|inherit)#[0-9A-Fa-f]{3,8}"/gi, `fill="${color}"`)
    .replace(/stroke="(?!none|transparent|inherit)#[0-9A-Fa-f]{3,8}"/gi, `stroke="${color}"`)
    
    // RGB/RGBA colors
    .replace(/fill="(?!none|transparent|inherit)rgba?\([^)]+\)"/gi, `fill="${color}"`)
    .replace(/stroke="(?!none|transparent|inherit)rgba?\([^)]+\)"/gi, `stroke="${color}"`)
    
    // HSL/HSLA colors
    .replace(/fill="(?!none|transparent|inherit)hsla?\([^)]+\)"/gi, `fill="${color}"`)
    .replace(/stroke="(?!none|transparent|inherit)hsla?\([^)]+\)"/gi, `stroke="${color}"`)
    
    // Named colors (common ones that should be replaced)
    .replace(/fill="(?!none|transparent|inherit)(black|white|gray|grey|red|blue|green|yellow|orange|purple|pink|brown)"/gi, `fill="${color}"`)
    .replace(/stroke="(?!none|transparent|inherit)(black|white|gray|grey|red|blue|green|yellow|orange|purple|pink|brown)"/gi, `stroke="${color}"`)
    
    // Library-specific colors
    .replace(/fill="(?!none|transparent|inherit)#292D32"/gi, `fill="${color}"`) // Iconsax default
    .replace(/stroke="(?!none|transparent|inherit)#292D32"/gi, `stroke="${color}"`)
    .replace(/fill="(?!none|transparent|inherit)#2F2F2F"/gi, `fill="${color}"`) // Common dark
    .replace(/stroke="(?!none|transparent|inherit)#2F2F2F"/gi, `stroke="${color}"`)
    
    // CSS style attributes - comprehensive patterns
    .replace(/style="([^"]*?)fill:\s*(?!none|transparent|inherit)currentColor([^"]*?)"/gi, `style="$1fill: ${color}$2"`)
    .replace(/style="([^"]*?)stroke:\s*(?!none|transparent|inherit)currentColor([^"]*?)"/gi, `style="$1stroke: ${color}$2"`)
    .replace(/style="([^"]*?)fill:\s*(?!none|transparent|inherit)#[0-9A-Fa-f]{3,8}([^"]*?)"/gi, `style="$1fill: ${color}$2"`)
    .replace(/style="([^"]*?)stroke:\s*(?!none|transparent|inherit)#[0-9A-Fa-f]{3,8}([^"]*?)"/gi, `style="$1stroke: ${color}$2"`)
    .replace(/style="([^"]*?)fill:\s*(?!none|transparent|inherit)rgba?\([^)]+\)([^"]*?)"/gi, `style="$1fill: ${color}$2"`)
    .replace(/style="([^"]*?)stroke:\s*(?!none|transparent|inherit)rgba?\([^)]+\)([^"]*?)"/gi, `style="$1stroke: ${color}$2"`)
    .replace(/style="([^"]*?)color:\s*(?!none|transparent|inherit)#[0-9A-Fa-f]{3,8}([^"]*?)"/gi, `style="$1color: ${color}$2"`)
    .replace(/style="([^"]*?)color:\s*(?!none|transparent|inherit)rgba?\([^)]+\)([^"]*?)"/gi, `style="$1color: ${color}$2"`)
    
    // CSS custom properties (common in modern icon libraries)
    .replace(/var\(--[^)]*color[^)]*\)/gi, color)
    
    // Gradient stop colors (be more selective to avoid breaking gradients)
    .replace(/stop-color="(?!none|transparent)#[0-9A-Fa-f]{3,8}"/gi, `stop-color="${color}"`)
    .replace(/stop-color="(?!none|transparent)rgba?\([^)]+\)"/gi, `stop-color="${color}"`);
}

/**
 * Apply stroke-width to appropriate elements
 */
function applyStrokeWidth(svgContent: string, strokeWidth: number, icon: IconItem): string {
  if (!supportsStrokeWidth(icon)) return svgContent;
  
  let result = svgContent;
  
  // Replace existing stroke-width attributes
  result = result
    .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`)
    .replace(/strokeWidth="[^"]*"/g, `strokeWidth="${strokeWidth}"`)
    .replace(/style="([^"]*?)stroke-width:\s*[^;"\s]+([^"]*?)"/gi, `style="$1stroke-width: ${strokeWidth}$2"`);
  
  // Add stroke-width to elements with stroke but no stroke-width
  result = result.replace(
    /(<[^>]*stroke="[^"]*"[^>]*?)(?![^>]*stroke-width)([^>]*>)/g,
    `$1 stroke-width="${strokeWidth}"$2`
  );
  
  // Add to root SVG if no stroke-width exists anywhere and it's an outline-style icon
  if (!result.includes('stroke-width') && (icon.style?.includes('outline') || icon.style?.includes('line'))) {
    result = result.replace(
      /<svg([^>]*?)>/g,
      `<svg$1 stroke-width="${strokeWidth}">`
    );
  }
  
  return result;
}

/**
 * Robust SVG validation and structure normalization
 */
function validateAndNormalizeSvg(svgContent: string): string {
  // Basic structure validation
  if (!svgContent || !svgContent.includes('<svg')) {
    throw new Error('Invalid SVG: Missing SVG element');
  }
  
  if (!svgContent.includes('</svg>')) {
    throw new Error('Invalid SVG: Unclosed SVG element');
  }
  
  let normalized = svgContent;
  
  // Ensure proper XML namespace
  if (!normalized.includes('xmlns=')) {
    normalized = normalized.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  // Ensure viewBox for proper scaling
  if (!normalized.includes('viewBox=')) {
    // Try to extract width/height for viewBox, default to 24x24
    const widthMatch = normalized.match(/width="(\d+)"/);
    const heightMatch = normalized.match(/height="(\d+)"/);
    const width = widthMatch ? widthMatch[1] : '24';
    const height = heightMatch ? heightMatch[1] : '24';
    normalized = normalized.replace('<svg', `<svg viewBox="0 0 ${width} ${height}"`);
  }
  
  // Ensure proper dimensions for canvas rendering
  if (!normalized.match(/width="\d+"/)) {
    normalized = normalized.replace('<svg', '<svg width="24"');
  }
  if (!normalized.match(/height="\d+"/)) {
    normalized = normalized.replace('<svg', '<svg height="24"');
  }
  
  // Test if SVG can be parsed by DOMParser (browser compatibility)
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(normalized, 'image/svg+xml');
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      throw new Error('SVG parsing failed: Invalid XML structure');
    }
  } catch (error) {
    console.warn('SVG validation warning:', error);
  }
  
  return normalized;
}

/**
 * Detect library type from icon ID
 */
function getLibraryType(iconId: string): keyof typeof LibraryHandlers {
  if (iconId.startsWith('lucide-')) return 'lucide';
  if (iconId.startsWith('material-')) return 'material';
  if (iconId.startsWith('iconsax-')) return 'iconsax';
  if (iconId.startsWith('tabler-')) return 'generic'; // Tabler uses string SVGs
  return 'generic';
}

/**
 * Check if icon is a string SVG (not React component)
 */
function isStringSvg(icon: IconItem): boolean {
  return typeof icon.svg === 'string' || 
         icon.id.startsWith('tabler-') || 
         icon.id.startsWith('feather-') || 
         icon.id.startsWith('bootstrap-') ||
         icon.id.startsWith('remix-');
}

/**
 * Enhanced SVG builder with comprehensive library support
 */
export function buildCustomizedSvg(
  icon: IconItem,
  color: string = 'currentColor',
  strokeWidth: number = 2
): string {
  try {
    let svgContent = '';
    const libraryType = getLibraryType(icon.id);
    
    // Determine processing pipeline based on icon type
    if (isStringSvg(icon)) {
      // Handle string SVGs (Tabler, Feather, Bootstrap, etc.)
      svgContent = icon.svg as string;
    } else {
      // Handle React component icons with library-specific props
      const IconComponent = icon.svg as React.ComponentType<any>;
      const handler = LibraryHandlers[libraryType];
      const iconProps = handler(IconComponent, color, strokeWidth);
      
      try {
        const element = React.createElement(IconComponent, iconProps);
        svgContent = renderToStaticMarkup(element);
      } catch (componentError) {
        console.warn(`Component rendering failed for ${icon.id}, trying generic props:`, componentError);
        // Fallback to generic props
        const fallbackProps = LibraryHandlers.generic(IconComponent, color, strokeWidth);
        const element = React.createElement(IconComponent, fallbackProps);
        svgContent = renderToStaticMarkup(element);
      }
    }
    
    // Validate initial content
    if (!svgContent) {
      throw new Error('Empty SVG content generated');
    }
    
    // Apply comprehensive color replacements
    let processedSvg = applyColorReplacements(svgContent, color);
    
    // Apply stroke-width for supported icons
    processedSvg = applyStrokeWidth(processedSvg, strokeWidth, icon);
    
    // Final validation and normalization
    const finalSvg = validateAndNormalizeSvg(processedSvg);
    
    return finalSvg;
    
  } catch (error) {
    console.error(`Error building customized SVG for ${icon.id}:`, error);
    
    // Return a fallback SVG with proper structure
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>`;
    
    return fallbackSvg;
  }
}

/**
 * Cross-browser clipboard copy with iOS fallback
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    // Modern Clipboard API (preferred)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    // Fallback for iOS and older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (!successful) {
      throw new Error('Clipboard copy failed');
    }
  } catch (error) {
    console.error('Copy to clipboard failed:', error);
    throw new Error('Failed to copy to clipboard');
  }
}

/**
 * Detect iOS devices for download fallback
 */
export function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}

/**
 * Handle file downloads with iOS support
 */
export function downloadFile(blob: Blob, filename: string): void {
  if (isIOS()) {
    // iOS fallback - open in new tab for manual save
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');
    if (!newWindow) {
      // If popup blocked, use data URL
      const reader = new FileReader();
      reader.onload = () => {
        window.open(reader.result as string, '_blank');
      };
      reader.readAsDataURL(blob);
    }
    // Clean up after a delay
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } else {
    // Standard download for other browsers
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}