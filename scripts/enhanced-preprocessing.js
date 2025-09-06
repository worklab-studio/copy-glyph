#!/usr/bin/env node

/**
 * Enhanced preprocessing for React component-based icon libraries
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Enhancing icon preprocessing pipeline...');

const preprocessorPath = path.join(__dirname, '..', 'src', 'lib', 'icon-string-preprocessor.ts');
const backupPath = preprocessorPath + '.enhancement-backup.' + Date.now();

// Create backup
console.log('📋 Creating backup...');
const originalContent = fs.readFileSync(preprocessorPath, 'utf8');
fs.writeFileSync(backupPath, originalContent);

// Enhanced getLibraryProps function with better prop handling
const enhancedLibraryProps = `
// Enhanced library-specific props with better error handling
function getLibraryProps(iconId: string): any {
  const defaultProps = { size: 24, color: 'currentColor' };
  
  if (iconId.startsWith('lucide-')) {
    return { 
      size: 24, 
      color: 'currentColor', 
      strokeWidth: 2,
      // Add absoluteStrokeWidth for consistency
      absoluteStrokeWidth: false
    };
  }
  
  if (iconId.startsWith('phosphor-')) {
    return { 
      size: 24, 
      color: 'currentColor', 
      weight: 'regular',
      // Ensure mirrored is set to prevent rendering issues
      mirrored: false
    };
  }
  
  if (iconId.startsWith('boxicons-')) {
    return { 
      size: '24px', // Boxicons expects string size
      color: 'currentColor'
    };
  }
  
  if (iconId.startsWith('bootstrap-')) {
    return { 
      size: 24, 
      color: 'currentColor',
      // Bootstrap icons don't have fill by default
      className: ''
    };
  }
  
  if (iconId.startsWith('feather-')) {
    return { 
      size: 24, 
      color: 'currentColor',
      strokeWidth: 2
    };
  }
  
  // Enhanced default props for unknown libraries
  return {
    ...defaultProps,
    strokeWidth: 2,
    fill: 'none',
    stroke: 'currentColor'
  };
}`;

// Enhanced renderComponentToSvg with timeout and better error handling
const enhancedRenderFunction = `
// Enhanced React component to SVG rendering with improved error handling
async function renderComponentToSvg(Component: React.ComponentType<any>, props: any): Promise<string> {
  return new Promise((resolve) => {
    // Increased timeout for complex libraries
    const timeout = setTimeout(() => {
      console.warn('SVG rendering timeout, using fallback');
      resolve(FALLBACK_SVG);
    }, 5000); // Increased from default
    
    try {
      // Create container element
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.visibility = 'hidden';
      document.body.appendChild(container);
      
      // Enhanced props with fallbacks
      const enhancedProps = {
        ...props,
        // Ensure these props are always set
        'aria-hidden': true,
        xmlns: 'http://www.w3.org/2000/svg',
        // Add data attribute for debugging
        'data-icon-source': 'preprocessed'
      };
      
      // Create root and render
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(Component, enhancedProps));
      
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        try {
          const svgElement = container.querySelector('svg');
          if (svgElement) {
            let svgString = svgElement.outerHTML;
            
            // Enhanced validation
            if (svgString && svgString.length > 50 && svgString.includes('<svg') && svgString.includes('</svg>')) {
              clearTimeout(timeout);
              
              // Cleanup
              root.unmount();
              document.body.removeChild(container);
              
              resolve(svgString);
            } else {
              console.warn('Rendered SVG failed validation, using fallback');
              clearTimeout(timeout);
              root.unmount();
              document.body.removeChild(container);
              resolve(FALLBACK_SVG);
            }
          } else {
            console.warn('No SVG element found after rendering, using fallback');
            clearTimeout(timeout);
            root.unmount();
            document.body.removeChild(container);
            resolve(FALLBACK_SVG);
          }
        } catch (error) {
          console.error('Error during SVG extraction:', error);
          clearTimeout(timeout);
          try {
            root.unmount();
            document.body.removeChild(container);
          } catch (cleanupError) {
            console.warn('Cleanup error:', cleanupError);
          }
          resolve(FALLBACK_SVG);
        }
      });
      
    } catch (error) {
      console.error('Error during component rendering:', error);
      clearTimeout(timeout);
      resolve(FALLBACK_SVG);
    }
  });
}`;

// Replace the functions in the original content
let enhancedContent = originalContent;

// Replace getLibraryProps function
const getLibraryPropsMatch = enhancedContent.match(/(function getLibraryProps\([^}]+\}[^}]*\})/s);
if (getLibraryPropsMatch) {
  enhancedContent = enhancedContent.replace(getLibraryPropsMatch[1], enhancedLibraryProps.trim());
  console.log('✅ Enhanced getLibraryProps function');
} else {
  console.warn('⚠️  Could not find getLibraryProps function to enhance');
}

// Replace renderComponentToSvg function
const renderFunctionMatch = enhancedContent.match(/(async function renderComponentToSvg\([^}]+\}[\s\S]*?\}\s*\}\s*\);[\s\S]*?\}\s*\)\s*;)/);
if (renderFunctionMatch) {
  enhancedContent = enhancedContent.replace(renderFunctionMatch[1], enhancedRenderFunction.trim());
  console.log('✅ Enhanced renderComponentToSvg function');
} else {
  console.warn('⚠️  Could not find renderComponentToSvg function to enhance');
}

// Write enhanced content
fs.writeFileSync(preprocessorPath, enhancedContent);

console.log('✅ Icon preprocessing pipeline enhanced successfully!');