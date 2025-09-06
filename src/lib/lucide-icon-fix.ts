/**
 * Lucide Icon Fix Utility
 * Ensures proper rendering and preprocessing of Lucide icons
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { icons } from 'lucide-react';
import { type IconItem } from '@/types/icon';

/**
 * Test if a Lucide icon can be rendered properly
 */
export function testLucideIconRendering(iconName: string): Promise<boolean> {
  return new Promise((resolve) => {
    const IconComponent = icons[iconName as keyof typeof icons];
    if (!IconComponent) {
      resolve(false);
      return;
    }

    // Create a test container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.visibility = 'hidden';
    document.body.appendChild(container);

    try {
      // Test rendering with proper Lucide props
      container.innerHTML = '';
      
      // Create a React element manually
      const element = React.createElement(IconComponent, {
        size: 24,
        color: 'currentColor',
        strokeWidth: 2
      });

      // Test if we can render it
      const root = createRoot(container);
      root.render(element);

      setTimeout(() => {
        const svgElement = container.querySelector('svg');
        const success = svgElement !== null && svgElement.children.length > 0;
        
        try {
          root.unmount();
          document.body.removeChild(container);
        } catch (error) {
          console.warn('Cleanup error:', error);
        }
        
        resolve(success);
      }, 100);
    } catch (error) {
      console.warn(`Test failed for ${iconName}:`, error);
      try {
        document.body.removeChild(container);
      } catch (cleanupError) {
        console.warn('Cleanup error:', cleanupError);
      }
      resolve(false);
    }
  });
}

/**
 * Get properly formatted Lucide icons with validation
 */
export async function getValidatedLucideIcons(): Promise<IconItem[]> {
  const validIcons: IconItem[] = [];
  const iconNames = Object.keys(icons);
  
  console.log(`Testing ${iconNames.length} Lucide icons...`);
  
  // Test a sample of icons first
  const sampleSize = Math.min(10, iconNames.length);
  const sample = iconNames.slice(0, sampleSize);
  
  for (const iconName of sample) {
    const isValid = await testLucideIconRendering(iconName);
    if (isValid) {
      const IconComponent = icons[iconName as keyof typeof icons];
      validIcons.push({
        id: `lucide-${iconName.toLowerCase()}`,
        name: iconName,
        svg: IconComponent,
        style: 'outline',
        category: 'general',
        tags: [iconName.toLowerCase(), 'lucide', 'outline']
      });
    }
  }
  
  console.log(`Validated ${validIcons.length}/${sampleSize} Lucide icons in sample`);
  return validIcons;
}