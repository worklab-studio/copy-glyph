import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { type IconItem } from "@/types/icon";
import { optimizeSvg } from "./svg-optimize";

/**
 * Detect icon library from icon ID for library-specific handling
 */
function detectIconLibrary(iconId: string): string {
  if (iconId.startsWith('tabler-')) return 'tabler';
  if (iconId.startsWith('lucide-')) return 'lucide';
  if (iconId.startsWith('atlas-')) return 'atlas';
  if (iconId.startsWith('phosphor-')) return 'phosphor';
  if (iconId.startsWith('boxicons-')) return 'boxicons';
  if (iconId.startsWith('octicons-')) return 'octicons';
  if (iconId.startsWith('bootstrap-')) return 'bootstrap';
  if (iconId.startsWith('remix-')) return 'remix';
  if (iconId.startsWith('material-')) return 'material';
  if (iconId.startsWith('feather-')) return 'feather';
  if (iconId.startsWith('heroicons-')) return 'heroicons';
  if (iconId.startsWith('radix-')) return 'radix';
  if (iconId.startsWith('css-gg-')) return 'css-gg';
  if (iconId.startsWith('fluent-')) return 'fluent';
  if (iconId.startsWith('iconsax-')) return 'iconsax';
  if (iconId.startsWith('iconnoir-')) return 'iconnoir';
  if (iconId.startsWith('solar-')) return 'solar';
  if (iconId.startsWith('teeny-')) return 'teeny';
  if (iconId.startsWith('ant-')) return 'ant';
  if (iconId.startsWith('line-')) return 'line';
  if (iconId.startsWith('pixelart-')) return 'pixelart';
  return 'unknown';
}

/**
 * Get library-specific props for React component rendering
 */
function getLibrarySpecificProps(library: string, color: string, strokeWidth: number) {
  const baseProps = {
    'aria-hidden': true,
    color: 'currentColor'
  };

  switch (library) {
    case 'lucide':
      return {
        ...baseProps,
        size: 24,
        strokeWidth: strokeWidth
      };
    
    case 'phosphor':
    case 'boxicons':
      return {
        ...baseProps,
        size: 24
      };
    
    case 'bootstrap':
      return {
        ...baseProps,
        size: 24,
        width: 24,
        height: 24,
        fill: 'currentColor'
      };
    
    case 'remix':
      return {
        ...baseProps,
        size: 24,
        width: 24,
        height: 24
      };
    
    case 'material':
    case 'heroicons':
      return {
        ...baseProps,
        width: 24,
        height: 24
      };
    
    case 'feather':
      return {
        ...baseProps,
        size: 24,
        strokeWidth: strokeWidth
      };
    
    case 'radix':
      return {
        ...baseProps,
        width: 24,
        height: 24
      };
    
    default:
      // Generic fallback props
      return {
        ...baseProps,
        size: 24,
        width: 24,
        height: 24,
        strokeWidth: strokeWidth
      };
  }
}

/**
 * Enhanced component rendering with comprehensive library support
 */
function renderReactComponent(IconComponent: React.ComponentType<any>, library: string, color: string, strokeWidth: number): string {
  // Try specific props first based on library
  const primaryProps = getLibrarySpecificProps(library, color, strokeWidth);
  
  try {
    const element = React.createElement(IconComponent, primaryProps);
    const result = renderToStaticMarkup(element);
    if (result && result.includes('<svg')) {
      return result;
    }
  } catch (error) {
    console.debug(`Primary props failed for ${library}:`, error);
  }
  
  // Comprehensive fallback prop sets
  const fallbackPropSets = [
    // Standard size + color combinations
    { size: 24, color: 'currentColor', strokeWidth: strokeWidth },
    { width: 24, height: 24, fill: 'currentColor', stroke: 'currentColor' },
    { size: 24, color: 'currentColor' },
    { width: 24, height: 24, color: 'currentColor' },
    
    // Library-specific known working combinations
    { size: 24, fill: 'currentColor' }, // Bootstrap, Remix
    { width: 24, height: 24, fill: 'currentColor' }, // Material, Heroicons
    { size: 24 }, // Phosphor, Boxicons minimal
    { width: 24, height: 24 }, // Generic minimal
    
    // Last resort minimal props
    {},
  ];

  for (const props of fallbackPropSets) {
    try {
      const element = React.createElement(IconComponent, props);
      const result = renderToStaticMarkup(element);
      if (result && result.includes('<svg')) {
        console.debug(`Fallback succeeded for ${library} with:`, props);
        return result;
      }
    } catch (error) {
      continue;
    }
  }
  
  throw new Error(`Failed to render ${library} component with all prop combinations`);
}

/**
 * Canonical SVG builder using the normalize-then-colorize approach
 * This creates consistent exports across all icon libraries
 */
export function buildCustomizedSvg(
  icon: IconItem,
  color: string = 'currentColor',
  strokeWidth: number = 2
): string {
  try {
    let svgContent = '';
    const library = detectIconLibrary(icon.id);
    
    // Step 1: Get SVG content from icon (string or React component)
    if (typeof icon.svg === 'string') {
      // Handle string SVGs directly
      svgContent = icon.svg;
      
      // Validate string SVG has basic structure
      if (!svgContent.includes('<svg')) {
        throw new Error('Invalid string SVG - missing <svg> tag');
      }
    } else {
      // Handle React component icons with library-specific props
      const IconComponent = icon.svg as React.ComponentType<any>;
      try {
        svgContent = renderReactComponent(IconComponent, library, color, strokeWidth);
      } catch (componentError) {
        console.error(`Component rendering failed for ${icon.id} (${library}):`, componentError);
        throw new Error(`Failed to render React component: ${componentError.message}`);
      }
    }
    
    // Step 2: Validate SVG content
    if (!svgContent || !svgContent.includes('<svg')) {
      throw new Error('Empty or invalid SVG content generated');
    }
    
    // Step 3: Normalize to currentColor baseline (handles all color normalization)
    let normalizedSvg = optimizeSvg(svgContent);
    
    // Step 4: Apply chosen color (if not currentColor)
    if (color !== 'currentColor') {
      normalizedSvg = normalizedSvg
        .replace(/currentColor/g, color)
        // Preserve critical values that should remain unchanged
        .replace(new RegExp(`fill="${color.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'), (match, offset, string) => {
          // Check if this fill should be "none" by looking at nearby attributes
          const surroundingContext = string.slice(Math.max(0, offset - 50), offset + match.length + 50);
          if (surroundingContext.includes('fill="none"') || surroundingContext.includes("fill='none'")) {
            return 'fill="none"';
          }
          return match;
        })
        .replace(new RegExp(`stroke="${color.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'), (match, offset, string) => {
          // Check if this stroke should be "none"
          const surroundingContext = string.slice(Math.max(0, offset - 50), offset + match.length + 50);
          if (surroundingContext.includes('stroke="none"') || surroundingContext.includes("stroke='none'")) {
            return 'stroke="none"';
          }
          return match;
        });
    }
    
    // Step 5: Apply stroke-width (for outline icons that support it)
    const supportsStroke = ['lucide', 'feather', 'tabler', 'heroicons', 'atlas'].includes(library);
    if (strokeWidth !== 2 && supportsStroke) {
      normalizedSvg = normalizedSvg
        .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`)
        // Add stroke-width if missing but stroke exists
        .replace(/(<[^>]*stroke="[^"]*"[^>]*?)(?![^>]*stroke-width)([^>]*>)/g, 
          `$1 stroke-width="${strokeWidth}"$2`);
    }
    
    // Step 6: Ensure proper SVG structure for export compatibility
    if (!normalizedSvg.includes('xmlns=')) {
      normalizedSvg = normalizedSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    
    // Step 7: Final validation
    if (!normalizedSvg.includes('<svg') || !normalizedSvg.includes('</svg>')) {
      throw new Error('Invalid SVG structure after processing');
    }
    
    return normalizedSvg;
    
  } catch (error) {
    console.error(`Error building customized SVG for ${icon.id}:`, error);
    
    // Return a working fallback SVG with proper structure
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>`;
  }
}

/**
 * Robust clipboard copy with iOS fallback
 * Returns boolean success indicator instead of throwing
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Modern Clipboard API (preferred)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for iOS and older browsers using execCommand
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
    
    return successful;
  } catch (error) {
    console.warn('Copy to clipboard failed:', error);
    return false;
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