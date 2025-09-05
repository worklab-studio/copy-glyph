import { type IconItem } from "@/types/icon";

/**
 * Determines if an icon supports stroke width customization
 * Excludes filled, solid, bold, bulk icons, BoxIcons (which are primarily filled), and CSS.gg icons
 */
export function supportsStrokeWidth(icon: IconItem): boolean {
  // Special handling for Solar icons - only outline variants support stroke
  if (icon.id.startsWith('solar-')) {
    return icon.style === 'outline';
  }

  // CSS.gg icons don't support stroke width customization
  if (icon.id.startsWith('css-gg-')) {
    return false;
  }

  // If no style is defined, check against known filled library prefixes
  if (!icon.style) {
    // Exception: BoxIcons and Ant icons don't have explicit style but are primarily filled
    if (icon.id.startsWith('box-') || icon.id.startsWith('ant-')) {
      return false;
    }
    // Default: icons without style support stroke width (like Line icons, Radix icons)
    return true;
  }

  // List of styles that explicitly support stroke width (outline/line variants)
  const strokeSupportStyles = [
    'outline',
    'regular', 
    'line',
    'thin',
    'light',
    'stroke'
  ];

  // List of styles that don't support stroke width (filled variants)
  const nonStrokeStyles = [
    'solid',
    'filled', 
    'bold',
    'bulk',
    'fill'
  ];

  const style = icon.style.toLowerCase();
  
  // First check if it's explicitly a stroke-supporting style
  if (strokeSupportStyles.includes(style)) {
    return true;
  }
  
  // Then check if it's explicitly a non-stroke style
  if (nonStrokeStyles.includes(style)) {
    return false;
  }
  
  // Default: assume it supports stroke width for unknown styles
  return true;
}

/**
 * Determines if an icon library primarily uses filled icons
 * Used for libraries that don't have explicit style definitions
 */
export function isFilledIconLibrary(iconId: string): boolean {
  const filledLibraryPrefixes = [
    'box-', // BoxIcons are primarily filled
    'ant-', // Many Ant Design icons are filled
  ];

  return filledLibraryPrefixes.some(prefix => iconId.startsWith(prefix));
}

/**
 * Get style priority for sorting (lower number = higher priority)
 * Prioritizes outline/line/stroke icons first, then regular, then solid/filled
 */
export function getStylePriority(style: string): number {
  if (!style) return 1; // Default priority for no style

  const styleLower = style.toLowerCase();
  
  // Priority 0: outline, line, stroke styles (most preferred)
  if (['outline', 'line', 'stroke', 'thin', 'light', 'regular'].includes(styleLower)) {
    return 0;
  }
  
  // Priority 1: default/unknown styles
  if (['default', 'normal'].includes(styleLower)) {
    return 1;
  }
  
  // Priority 2: filled, solid, bold styles (less preferred)  
  if (['solid', 'filled', 'bold', 'bulk', 'fill'].includes(styleLower)) {
    return 2;
  }
  
  // Priority 3: other styles (animations, etc.)
  return 3;
}

/**
 * Sort icons by style priority first, then alphabetically by name
 * Ensures outline/line/stroke icons appear before filled/solid icons
 */
export function sortIconsByStyleThenName(icons: IconItem[]): IconItem[] {
  return [...icons].sort((a, b) => {
    // First sort by style priority
    const stylePriorityA = getStylePriority(a.style || '');
    const stylePriorityB = getStylePriority(b.style || '');
    
    if (stylePriorityA !== stylePriorityB) {
      return stylePriorityA - stylePriorityB;
    }
    
    // If same style priority, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });
}

/**
 * Library-specific color patterns and replacements
 */
const LIBRARY_COLOR_PATTERNS = {
  // Iconsax specific colors
  iconsax: [
    /#292D32/gi,
    /#2f2f2f/gi,
    /#333333/gi
  ],
  // Atlas specific colors  
  atlas: [
    /#020202/gi,
    /#000000/gi,
    /#000/gi
  ],
  // CSS.gg specific colors
  'css-gg': [
    /#000000/gi,
    /#000/gi
  ],
  // Material Design colors
  material: [
    /#000000/gi,
    /#212121/gi,
    /#424242/gi
  ],
  // BoxIcons colors
  boxicons: [
    /#000000/gi,
    /#2d3748/gi
  ],
  // Ant Design colors
  ant: [
    /#000000/gi,
    /#262626/gi,
    /#434343/gi
  ]
};

/**
 * Get comprehensive SVG with applied customizations
 * Handles both string SVGs and React components with proper library-specific color handling
 */
export function getCustomizedSVG(
  icon: IconItem, 
  customization: { color: string; strokeWidth: number },
  renderSize: number = 24
): string {
  if (!icon.svg) {
    throw new Error('Icon SVG is undefined');
  }
  
  const supportsStroke = supportsStrokeWidth(icon);
  let svgContent = '';
  
  try {
    if (typeof icon.svg === 'string') {
      svgContent = icon.svg;
    } else {
      // Render React component to SVG string
      const React = require('react');
      const { renderToStaticMarkup } = require('react-dom/server');
      
      const IconComponent = icon.svg as React.ComponentType<any>;
      const iconProps: any = {
        size: renderSize,
        color: customization.color
      };
      
      if (supportsStroke) {
        iconProps.strokeWidth = customization.strokeWidth;
      }
      
      const element = React.createElement(IconComponent, iconProps);
      svgContent = renderToStaticMarkup(element);
    }
    
    // Apply comprehensive color customization
    let customizedSVG = applyColorCustomization(svgContent, icon.id, customization.color);
    
    // Apply stroke width customization
    if (supportsStroke) {
      customizedSVG = applyStrokeWidthCustomization(customizedSVG, customization.strokeWidth);
    }
    
    return customizedSVG;
    
  } catch (error) {
    console.error('Failed to process SVG for icon:', icon.id, error);
    throw new Error(`Failed to process SVG: ${error.message}`);
  }
}

/**
 * Apply comprehensive color customization based on library-specific patterns
 */
function applyColorCustomization(svgContent: string, iconId: string, targetColor: string): string {
  let modifiedSvg = svgContent;
  
  // Determine library type from icon ID
  const libraryType = getLibraryType(iconId);
  
  // Apply library-specific color patterns
  if (LIBRARY_COLOR_PATTERNS[libraryType]) {
    LIBRARY_COLOR_PATTERNS[libraryType].forEach(pattern => {
      modifiedSvg = modifiedSvg.replace(pattern, targetColor);
    });
  }
  
  // Apply comprehensive generic color replacements
  modifiedSvg = modifiedSvg
    // Replace ALL hex colors in fill and stroke attributes (3 and 6 digit)
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/gi, `fill="${targetColor}"`)
    .replace(/stroke="#[0-9A-Fa-f]{3,6}"/gi, `stroke="${targetColor}"`)
    
    // Handle CSS style attributes with hex colors
    .replace(/style="([^"]*?)fill:\s*#[0-9A-Fa-f]{3,6}([^"]*?)"/gi, `style="$1fill: ${targetColor}$2"`)
    .replace(/style="([^"]*?)stroke:\s*#[0-9A-Fa-f]{3,6}([^"]*?)"/gi, `style="$1stroke: ${targetColor}$2"`)
    
    // Handle stop-color in gradients
    .replace(/stop-color="#[0-9A-Fa-f]{3,6}"/gi, `stop-color="${targetColor}"`)
    
    // Handle CSS classes within SVG (common in Atlas icons)
    .replace(/<style[^>]*>([^<]*\.cls-\d+[^}]*fill:\s*#[0-9A-Fa-f]{3,6}[^<]*)<\/style>/gi, 
      (match, content) => match.replace(/#[0-9A-Fa-f]{3,6}/g, targetColor))
    .replace(/<style[^>]*>([^<]*\.cls-\d+[^}]*stroke:\s*#[0-9A-Fa-f]{3,6}[^<]*)<\/style>/gi, 
      (match, content) => match.replace(/#[0-9A-Fa-f]{3,6}/g, targetColor))
    
    // Handle currentColor for copy operations
    .replace(/stroke="currentColor"/gi, `stroke="${targetColor}"`)
    .replace(/fill="currentColor"/gi, `fill="${targetColor}"`)
    
    // Preserve fill="none" and stroke="none" by fixing overwrites
    .replace(new RegExp(`fill="${targetColor}"([^>]*?)stroke="${targetColor}"`, 'gi'), 
      `fill="none"$1stroke="${targetColor}"`);
  
  return modifiedSvg;
}

/**
 * Apply stroke width customization to SVG content
 */
function applyStrokeWidthCustomization(svgContent: string, strokeWidth: number): string {
  let modifiedSvg = svgContent;
  
  // Replace existing stroke-width attributes
  modifiedSvg = modifiedSvg
    .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`)
    .replace(/strokeWidth="[^"]*"/g, `strokeWidth="${strokeWidth}"`)
    .replace(/stroke-width:\s*[^;"\s]+/g, `stroke-width: ${strokeWidth}`);
  
  // Add stroke-width to elements that have stroke but no stroke-width
  modifiedSvg = modifiedSvg.replace(/(<[^>]*stroke="[^"]*"[^>]*?)(?![^>]*stroke-width)([^>]*>)/g, 
    `$1 stroke-width="${strokeWidth}"$2`);
  
  // If no stroke-width exists anywhere, inject it into the root SVG element
  if (!modifiedSvg.includes('stroke-width')) {
    modifiedSvg = modifiedSvg.replace(/<svg([^>]*?)>/g, `<svg$1 stroke-width="${strokeWidth}">`);
  }
  
  return modifiedSvg;
}

/**
 * Determine library type from icon ID
 */
function getLibraryType(iconId: string): string {
  if (iconId.startsWith('iconsax-')) return 'iconsax';
  if (iconId.startsWith('atlas-')) return 'atlas';
  if (iconId.startsWith('css-gg-')) return 'css-gg';
  if (iconId.startsWith('material-')) return 'material';
  if (iconId.startsWith('box-')) return 'boxicons';
  if (iconId.startsWith('ant-')) return 'ant';
  
  return 'generic';
}

/**
 * Get customized SVG for display (using currentColor for theme compatibility)
 */
export function getDisplaySVG(
  icon: IconItem,
  customization: { color: string; strokeWidth: number }
): string {
  if (!icon.svg) return '';
  
  const supportsStroke = supportsStrokeWidth(icon);
  let svgContent = '';
  
  if (typeof icon.svg === 'string') {
    svgContent = icon.svg;
    
    // For display, use currentColor to maintain theme compatibility
    let modifiedSvg = applyColorCustomization(svgContent, icon.id, 'currentColor');
    
    if (supportsStroke) {
      modifiedSvg = applyStrokeWidthCustomization(modifiedSvg, customization.strokeWidth);
    }
    
    return modifiedSvg;
  }
  
  // For React components, we don't modify them for display - they handle theming themselves
  return '';
}