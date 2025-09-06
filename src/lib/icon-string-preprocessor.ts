import React from 'react';
import { createRoot } from 'react-dom/client';
import { type IconItem } from '@/types/icon';

// Safe SVG fallback for failed conversions
const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
  <circle cx="9" cy="9" r="2"/>
  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
</svg>`;

/**
 * Converts a React component to SVG string with enhanced reliability
 */
function renderComponentToSvg(Component: React.ComponentType<any>, props: any): Promise<string> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.warn('Component rendering timeout');
      resolve(FALLBACK_SVG);
    }, 5000); // Increased timeout for complex libraries

    // Create a temporary container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.visibility = 'hidden';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    try {
      const root = createRoot(container);
      
      // Enhanced props with better fallbacks
      const enhancedProps = {
        ...props,
        'aria-hidden': true,
        xmlns: 'http://www.w3.org/2000/svg'
      };
      
      // Render the component
      root.render(React.createElement(Component, enhancedProps));
      
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        setTimeout(() => {
          try {
            const svgElement = container.querySelector('svg');
            if (svgElement) {
              // Clean up attributes and ensure proper structure
              svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
              svgElement.removeAttribute('class');
              svgElement.removeAttribute('className');
              
              // Ensure proper size attributes
              if (!svgElement.getAttribute('viewBox')) {
                svgElement.setAttribute('viewBox', '0 0 24 24');
              }
              if (!svgElement.getAttribute('width')) {
                svgElement.setAttribute('width', '24');
              }
              if (!svgElement.getAttribute('height')) {
                svgElement.setAttribute('height', '24');
              }
              
              // Validate the SVG
              const svgString = svgElement.outerHTML;
              if (svgString.includes('<svg') && svgString.includes('</svg>')) {
                clearTimeout(timeout);
                resolve(svgString);
              } else {
                console.warn('Invalid SVG structure generated');
                clearTimeout(timeout);
                resolve(FALLBACK_SVG);
              }
            } else {
              console.warn('No SVG element found in rendered component');
              clearTimeout(timeout);
              resolve(FALLBACK_SVG);
            }
          } catch (error) {
            console.warn('Error extracting SVG:', error);
            clearTimeout(timeout);
            resolve(FALLBACK_SVG);
          } finally {
            // Clean up
            try {
              root.unmount();
              if (container.parentNode) {
                document.body.removeChild(container);
              }
            } catch (cleanupError) {
              console.warn('Error during cleanup:', cleanupError);
            }
          }
        }, 100); // Increased timeout for complex components
      });
    } catch (error) {
      console.warn('Error rendering component:', error);
      try {
        if (container.parentNode) {
          document.body.removeChild(container);
        }
      } catch (cleanupError) {
        console.warn('Error removing container:', cleanupError);
      }
      clearTimeout(timeout);
      resolve(FALLBACK_SVG);
    }
  });
}

/**
 * Get library-specific props for rendering
 */
function getLibraryProps(iconId: string): any {
  const baseProps = {
    'aria-hidden': true,
    width: 24,
    height: 24,
  };

  if (iconId.startsWith('lucide-')) {
    return { 
      size: 24, 
      color: 'currentColor', 
      strokeWidth: 2,
      'aria-hidden': true
    };
  }
  
  if (iconId.startsWith('phosphor-')) {
    return { 
      size: 24, 
      color: 'currentColor',
      weight: 'regular',
      'aria-hidden': true
    };
  }
  
  if (iconId.startsWith('feather-')) {
    return { 
      size: 24, 
      color: 'currentColor',
      strokeWidth: 2,
      'aria-hidden': true
    };
  }
  
  if (iconId.startsWith('boxicons-')) {
    return { 
      size: 24, 
      color: 'currentColor',
      'aria-hidden': true
    };
  }
  
  if (iconId.startsWith('bootstrap-')) {
    return { 
      size: 24, 
      fill: 'currentColor',
      'aria-hidden': true
    };
  }
  
  if (iconId.startsWith('remix-')) {
    return { 
      size: 24,
      'aria-hidden': true
    };
  }
  
  if (iconId.startsWith('material-') || iconId.startsWith('heroicons-')) {
    return { 
      width: 24, 
      height: 24,
      'aria-hidden': true
    };
  }
  
  // Enhanced fallback for unknown libraries
  return {
    ...baseProps,
    size: 24,
    color: 'currentColor',
    strokeWidth: 2
  };
}

/**
 * Preprocess a single icon to convert React component to SVG string
 */
export async function preprocessIcon(icon: IconItem): Promise<IconItem> {
  // If it's already a string, validate and normalize it
  if (typeof icon.svg === 'string') {
    try {
      // Check for corrupted data first (Mac OS X metadata)
      if (icon.svg.includes('Mac OS X') || 
          icon.svg.includes('__MACOSX') || 
          icon.svg.includes('ATTR') || 
          icon.svg.includes('com.apple.quarantine') ||
          icon.svg.includes('.DS_Store')) {
        console.warn(`Corrupted icon data detected for ${icon.id}, using fallback`);
        return {
          ...icon,
          svg: FALLBACK_SVG
        };
      }

      // Check minimum length
      if (icon.svg.length < 50) {
        console.warn(`Icon data too short for ${icon.id}, using fallback`);
        return {
          ...icon,
          svg: FALLBACK_SVG
        };
      }
      
      // Validate that it's a proper SVG
      if (icon.svg.trim().startsWith('<svg') && icon.svg.trim().endsWith('</svg>')) {
        return {
          ...icon,
          svg: icon.svg // Keep the original string SVG
        };
      } else {
        console.warn(`Invalid SVG string for icon ${icon.id}`);
        return {
          ...icon,
          svg: FALLBACK_SVG
        };
      }
    } catch (error) {
      console.warn(`Error validating SVG string for icon ${icon.id}:`, error);
      return {
        ...icon,
        svg: FALLBACK_SVG
      };
    }
  }

  try {
    const props = getLibraryProps(icon.id);
    const svgString = await renderComponentToSvg(icon.svg as React.ComponentType<any>, props);
    
    return {
      ...icon,
      svg: svgString
    };
  } catch (error) {
    console.warn(`Failed to preprocess icon ${icon.id}:`, error);
    return {
      ...icon,
      svg: FALLBACK_SVG
    };
  }
}

/**
 * Preprocess an array of icons, converting React components to SVG strings
 */
export async function preprocessIcons(icons: IconItem[]): Promise<IconItem[]> {
  const batchSize = 50; // Process in batches to avoid overwhelming the browser
  const results: IconItem[] = [];
  
  for (let i = 0; i < icons.length; i += batchSize) {
    const batch = icons.slice(i, i + batchSize);
    const processedBatch = await Promise.all(
      batch.map(icon => preprocessIcon(icon))
    );
    results.push(...processedBatch);
    
    // Small delay between batches to keep UI responsive
    if (i + batchSize < icons.length) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
  
  return results;
}

/**
 * Check if preprocessing is needed for an icon library
 */
export function needsPreprocessing(icons: IconItem[]): boolean {
  return icons.some(icon => typeof icon.svg !== 'string');
}
