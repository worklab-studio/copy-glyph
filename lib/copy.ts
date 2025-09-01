import React from 'react';
import { createRoot } from 'react-dom/client';

export type IconItem = {
  id: string;
  name: string;
  svg: string | React.FC;
  tags?: string[];
};

export async function copyIcon(icon: IconItem): Promise<void> {
  let svgString = '';
  
  if (typeof icon.svg === 'string') {
    svgString = icon.svg;
  } else {
    // Render React component to string
    const tempDiv = document.createElement('div');
    const root = createRoot(tempDiv);
    
    try {
      await new Promise<void>((resolve) => {
        const IconComponent = icon.svg as React.FC;
        root.render(React.createElement(IconComponent, {}, null));
        
        // Wait for next tick to ensure rendering is complete
        setTimeout(() => {
          const svgElement = tempDiv.querySelector('svg');
          if (svgElement) {
            svgString = svgElement.outerHTML;
          }
          resolve();
        }, 0);
      });
    } finally {
      root.unmount();
      tempDiv.remove();
    }
  }
  
  if (!svgString) {
    throw new Error('Failed to serialize icon to SVG string');
  }
  
  await navigator.clipboard.writeText(svgString);
}