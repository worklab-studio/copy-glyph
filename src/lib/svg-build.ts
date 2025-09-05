import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { type IconItem } from "@/types/icon";
import { supportsStrokeWidth } from "./icon-utils";

/**
 * Builds a customized SVG string from an icon with applied color and stroke-width
 * Handles both string SVGs and React component icons consistently
 */
export function buildCustomizedSvg(
  icon: IconItem,
  color: string = 'currentColor',
  strokeWidth: number = 2
): string {
  try {
    console.log('buildCustomizedSvg called for:', icon.id, 'color:', color, 'strokeWidth:', strokeWidth);
    let svgContent = '';
    
    // Handle React component icons
    if (typeof icon.svg !== 'string') {
      console.log('Processing React component icon');
      const IconComponent = icon.svg as React.ComponentType<any>;
      const iconProps: any = {
        size: 24,
        width: 24,
        height: 24,
        color,
        fill: color,
        stroke: color
      };
      
      // Add strokeWidth for supported icons
      if (supportsStrokeWidth(icon)) {
        iconProps.strokeWidth = strokeWidth;
      }
      
      const element = React.createElement(IconComponent, iconProps);
      svgContent = renderToStaticMarkup(element);
    } else {
      console.log('Processing string SVG icon');
      svgContent = icon.svg;
    }

    console.log('Initial SVG content length:', svgContent.length);

    // Ensure SVG has proper namespace and structure
    if (!svgContent.includes('xmlns=')) {
      svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      console.log('Added xmlns namespace');
    }

    // Ensure viewBox is preserved/added
    if (!svgContent.includes('viewBox=') && svgContent.includes('<svg')) {
      svgContent = svgContent.replace('<svg', '<svg viewBox="0 0 24 24"');
      console.log('Added viewBox');
    }

    // Comprehensive color normalization - preserve fill="none" and stroke="none"
    let normalizedSVG = svgContent
      // Handle hex colors in attributes (preserve none values)
      .replace(/fill="(?!none|transparent)#[0-9A-Fa-f]{3,8}"/gi, `fill="${color}"`)
      .replace(/stroke="(?!none|transparent)#[0-9A-Fa-f]{3,8}"/gi, `stroke="${color}"`)
      
      // Handle RGB/RGBA colors
      .replace(/fill="(?!none|transparent)rgba?\([^)]+\)"/gi, `fill="${color}"`)
      .replace(/stroke="(?!none|transparent)rgba?\([^)]+\)"/gi, `stroke="${color}"`)
      
      // Handle HSL colors
      .replace(/fill="(?!none|transparent)hsla?\([^)]+\)"/gi, `fill="${color}"`)
      .replace(/stroke="(?!none|transparent)hsla?\([^)]+\)"/gi, `stroke="${color}"`)
      
      // Handle CSS style attributes
      .replace(/style="([^"]*?)fill:\s*(?!none|transparent)#[0-9A-Fa-f]{3,8}([^"]*?)"/gi, `style="$1fill: ${color}$2"`)
      .replace(/style="([^"]*?)stroke:\s*(?!none|transparent)#[0-9A-Fa-f]{3,8}([^"]*?)"/gi, `style="$1stroke: ${color}$2"`)
      .replace(/style="([^"]*?)fill:\s*(?!none|transparent)rgba?\([^)]+\)([^"]*?)"/gi, `style="$1fill: ${color}$2"`)
      .replace(/style="([^"]*?)stroke:\s*(?!none|transparent)rgba?\([^)]+\)([^"]*?)"/gi, `style="$1stroke: ${color}$2"`)
      
      // Handle gradient stop colors
      .replace(/stop-color="(?!none)#[0-9A-Fa-f]{3,8}"/gi, `stop-color="${color}"`)
      .replace(/stop-color="(?!none)rgba?\([^)]+\)"/gi, `stop-color="${color}"`)
      
      // Handle color classes (common in some libraries)
      .replace(/class="([^"]*?)text-\w+([^"]*?)"/gi, (match, before, after) => {
        return `class="${before.trim()} ${after.trim()}".trim() style="color: ${color}"`;
      });

    // Apply stroke-width for supported icons
    if (supportsStrokeWidth(icon)) {
      // Replace existing stroke-width attributes
      normalizedSVG = normalizedSVG
        .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`)
        .replace(/strokeWidth="[^"]*"/g, `strokeWidth="${strokeWidth}"`)
        .replace(/style="([^"]*?)stroke-width:\s*[^;"\s]+([^"]*?)"/gi, `style="$1stroke-width: ${strokeWidth}$2"`);
      
      // Add stroke-width to elements with stroke but no stroke-width
      normalizedSVG = normalizedSVG.replace(
        /(<[^>]*stroke="[^"]*"[^>]*?)(?![^>]*stroke-width)([^>]*>)/g,
        `$1 stroke-width="${strokeWidth}"$2`
      );
      
      // Add to root SVG if no stroke-width exists anywhere
      if (!normalizedSVG.includes('stroke-width')) {
        normalizedSVG = normalizedSVG.replace(
          /<svg([^>]*?)>/g,
          `<svg$1 stroke-width="${strokeWidth}">`
        );
      }
    }

    // Validate the generated SVG
    if (!normalizedSVG.includes('<svg')) {
      throw new Error('Invalid SVG structure');
    }

    console.log('Final SVG generated successfully, length:', normalizedSVG.length);
    console.log('Final SVG preview:', normalizedSVG.substring(0, 150) + '...');
    return normalizedSVG;
  } catch (error) {
    console.error('Error building customized SVG:', error);
    // Return a fallback SVG
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>`;
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