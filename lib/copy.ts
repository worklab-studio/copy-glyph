import React from 'react';
import { createRoot } from 'react-dom/client';

export type IconItem = {
  id: string;
  name: string;
  svg: string | React.FC;
  tags?: string[];
};

/**
 * Serialize a React component to SVG string
 */
function serializeComponentToSvg(Component: React.FC): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const container = document.createElement('div');
      const root = createRoot(container);
      
      // Render component with standard icon props
      root.render(React.createElement(Component, {
        width: 24,
        height: 24,
        viewBox: "0 0 24 24"
      }));
      
      // Wait for next tick to ensure render completes
      setTimeout(() => {
        const svgElement = container.querySelector('svg');
        if (svgElement) {
          const svgString = svgElement.outerHTML;
          root.unmount();
          resolve(svgString);
        } else {
          root.unmount();
          reject(new Error('No SVG element found in component'));
        }
      }, 0);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Copy icon SVG to clipboard
 */
export async function copyIcon(icon: IconItem): Promise<void> {
  try {
    let svgString: string;
    
    if (typeof icon.svg === 'string') {
      svgString = icon.svg;
    } else {
      // Component case - serialize to string
      svgString = await serializeComponentToSvg(icon.svg);
    }
    
    await navigator.clipboard.writeText(svgString);
  } catch (error) {
    console.error('Failed to copy icon:', error);
    throw new Error('Failed to copy icon to clipboard');
  }
}

/**
 * Check if clipboard API is supported
 */
export function isClipboardSupported(): boolean {
  return typeof navigator !== 'undefined' && 'clipboard' in navigator;
}