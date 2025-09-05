import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { type IconItem } from "@/types/icon";
import { optimizeSvg } from "./svg-optimize";

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
    
    // Step 1: Get SVG content from icon (string or React component)
    if (typeof icon.svg === 'string') {
      // Handle string SVGs directly
      svgContent = icon.svg;
    } else {
      // Handle React component icons - render with basic props
      const IconComponent = icon.svg as React.ComponentType<any>;
      try {
        const element = React.createElement(IconComponent, {
          size: 24,
          color: 'currentColor',
          strokeWidth: strokeWidth,
          'aria-hidden': true
        });
        svgContent = renderToStaticMarkup(element);
      } catch (componentError) {
        console.warn(`Component rendering failed for ${icon.id}:`, componentError);
        // Try fallback props
        const element = React.createElement(IconComponent, {
          width: 24,
          height: 24,
          fill: 'currentColor',
          stroke: 'currentColor'
        });
        svgContent = renderToStaticMarkup(element);
      }
    }
    
    if (!svgContent) {
      throw new Error('Empty SVG content generated');
    }
    
    // Step 2: Normalize to currentColor baseline
    let normalizedSvg = optimizeSvg(svgContent);
    
    // Step 3: Apply chosen color (if not currentColor)
    if (color !== 'currentColor') {
      normalizedSvg = normalizedSvg
        .replace(/currentColor/g, color)
        // Preserve fill="none" and stroke="none"
        .replace(/fill="none"/g, 'fill="none"')
        .replace(/stroke="none"/g, 'stroke="none"');
    }
    
    // Step 4: Apply stroke-width (for outline icons)
    if (strokeWidth !== 2) {
      normalizedSvg = normalizedSvg
        .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`)
        // Add stroke-width if missing but stroke exists
        .replace(/(<[^>]*stroke="[^"]*"[^>]*?)(?![^>]*stroke-width)([^>]*>)/g, 
          `$1 stroke-width="${strokeWidth}"$2`);
    }
    
    // Step 5: Ensure proper SVG structure
    if (!normalizedSvg.includes('xmlns=')) {
      normalizedSvg = normalizedSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    
    return normalizedSvg;
    
  } catch (error) {
    console.error(`Error building customized SVG for ${icon.id}:`, error);
    
    // Fallback SVG
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