const fs = require('fs');

console.log('Starting comprehensive animated icons extraction...');

// Read the Animated.tsx file
const content = fs.readFileSync('./Animated.tsx', 'utf8');

// Extract the animationData object - it starts after "animationData =" and ends before "} as const;"
const startMarker = 'animationData =\n{';
const endMarker = '} as const;';
const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find animationData boundaries');
  process.exit(1);
}

// Extract just the JSON part
const jsonContent = content.substring(startIndex + startMarker.length - 1, endIndex + 1);

console.log('Parsing animation data...');

// Parse the JavaScript object (it's not pure JSON, it has unquoted keys)
let animationData;
try {
  // Use eval to parse the JavaScript object literal
  animationData = eval(`(${jsonContent})`);
} catch (error) {
  console.error('Error parsing animation data:', error);
  process.exit(1);
}

const iconNames = Object.keys(animationData);
console.log(`Found ${iconNames.length} animated icons`);

// Function to convert Svelte component to React
function convertSvelteToReact(iconName, svelteContent) {
  // Extract SVG content and animation patterns
  const svgMatch = svelteContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (!svgMatch) {
    console.warn(`No SVG found for ${iconName}`);
    return null;
  }

  const svgContent = svgMatch[1];
  const svgAttributes = svgMatch[0].match(/<svg([^>]*?)>/)[1];

  // Extract timeout duration if present
  const timeoutMatch = svelteContent.match(/setTimeout\(\(\) => \{\s*isHovered = false;\s*\}, (\d+)\);/);
  const timeoutDuration = timeoutMatch ? parseInt(timeoutMatch[1]) : null;

  // Determine hover behavior
  const hasMouseLeave = svelteContent.includes('handleMouseLeave');
  
  // Extract CSS styles
  const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
  const cssStyles = styleMatch ? styleMatch[1] : '';

  // Convert CSS to JavaScript object
  const cssRules = extractCSSRules(cssStyles);

  // Generate React component name
  const componentName = iconName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('') + 'Icon';

  // Create React component
  return {
    name: componentName,
    originalName: iconName,
    component: generateReactComponent(componentName, iconName, svgContent, svgAttributes, timeoutDuration, hasMouseLeave, cssRules),
    category: categorizeIcon(iconName),
    tags: generateTags(iconName)
  };
}

// Extract CSS rules and convert to React-compatible styles
function extractCSSRules(cssContent) {
  const rules = {};
  
  // Extract keyframes
  const keyframeMatches = cssContent.match(/@keyframes\s+([^{]+)\s*\{([^}]+(?:\}[^}]*)*)\}/g);
  if (keyframeMatches) {
    keyframeMatches.forEach(match => {
      const nameMatch = match.match(/@keyframes\s+([^{]+)/);
      const contentMatch = match.match(/\{([\s\S]*)\}$/);
      if (nameMatch && contentMatch) {
        const name = nameMatch[1].trim();
        const content = contentMatch[1];
        rules[`@keyframes ${name}`] = content;
      }
    });
  }

  // Extract class rules
  const classMatches = cssContent.match(/\.[^{]+\{[^}]*\}/g);
  if (classMatches) {
    classMatches.forEach(match => {
      const parts = match.split('{');
      const selector = parts[0].trim();
      const styles = parts[1].replace('}', '').trim();
      rules[selector] = styles;
    });
  }

  return rules;
}

// Generate React component code
function generateReactComponent(componentName, iconName, svgContent, svgAttributes, timeoutDuration, hasMouseLeave, cssRules) {
  // Create CSS string from rules
  const cssString = Object.entries(cssRules).map(([selector, styles]) => {
    if (selector.startsWith('@keyframes')) {
      return `${selector} { ${styles} }`;
    }
    return `${selector} { ${styles} }`;
  }).join('\n');

  // Create unique CSS class name
  const cssClassName = `animated-${iconName.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return `
const ${componentName} = ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [timeoutRef, setTimeoutRef] = React.useState(null);

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = \`
      .${cssClassName} { display: inline-block; }
      ${cssString.replace(/\./g, '.${cssClassName} .')}
    \`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef) clearTimeout(timeoutRef);
    setIsHovered(true);
    ${timeoutDuration ? `
    const timeout = setTimeout(() => {
      setIsHovered(false);
    }, ${timeoutDuration});
    setTimeoutRef(timeout);
    ` : ''}
  };

  ${hasMouseLeave ? `
  const handleMouseLeave = () => {
    if (timeoutRef) clearTimeout(timeoutRef);
    setIsHovered(false);
  };
  ` : ''}

  return React.createElement('div', {
    className: \`${cssClassName} \${className}\`,
    onMouseEnter: handleMouseEnter,
    ${hasMouseLeave ? 'onMouseLeave: handleMouseLeave,' : ''}
    'aria-label': '${iconName}',
    role: 'img'
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: isHovered ? 'animate' : ''
  }, ${convertSVGContent(svgContent)}));
};`;
}

// Convert SVG content to React.createElement calls
function convertSVGContent(svgContent) {
  // This is a simplified converter - for production, you'd want a more robust parser
  const elements = [];
  
  // Handle paths
  const pathMatches = svgContent.match(/<path[^>]*\/?>|<path[^>]*>.*?<\/path>/g);
  if (pathMatches) {
    pathMatches.forEach((path, index) => {
      const d = path.match(/d="([^"]*)"/) ? path.match(/d="([^"]*)"/) [1] : '';
      const className = path.match(/class(?:Name)?="([^"]*)"/) ? path.match(/class(?:Name)?="([^"]*)"/) [1] : '';
      const classBinding = path.match(/class:([^=]*)=\{([^}]*)\}/);
      
      let elementClass = className;
      if (classBinding) {
        const conditionClass = classBinding[1];
        const condition = classBinding[2];
        elementClass = `\${${condition} ? '${conditionClass}' : ''}`;
      }

      elements.push(`React.createElement('path', { 
        d: '${d}',
        ${elementClass ? `className: \`${elementClass}\`,` : ''}
        key: ${index}
      })`);
    });
  }

  // Handle circles
  const circleMatches = svgContent.match(/<circle[^>]*\/?>|<circle[^>]*>.*?<\/circle>/g);
  if (circleMatches) {
    circleMatches.forEach((circle, index) => {
      const cx = circle.match(/cx="([^"]*)"/) ? circle.match(/cx="([^"]*)"/) [1] : '0';
      const cy = circle.match(/cy="([^"]*)"/) ? circle.match(/cy="([^"]*)"/) [1] : '0';
      const r = circle.match(/r="([^"]*)"/) ? circle.match(/r="([^"]*)"/) [1] : '0';
      const className = circle.match(/class(?:Name)?="([^"]*)"/) ? circle.match(/class(?:Name)?="([^"]*)"/) [1] : '';

      elements.push(`React.createElement('circle', { 
        cx: '${cx}',
        cy: '${cy}',
        r: '${r}',
        ${className ? `className: '${className}',` : ''}
        key: 'circle-${index}'
      })`);
    });
  }

  // Handle groups
  const groupMatches = svgContent.match(/<g[^>]*>[\s\S]*?<\/g>/g);
  if (groupMatches) {
    groupMatches.forEach((group, index) => {
      const className = group.match(/class(?:Name)?="([^"]*)"/) ? group.match(/class(?:Name)?="([^"]*)"/) [1] : '';
      const classBinding = group.match(/class:([^=]*)=\{([^}]*)\}/);
      
      let elementClass = className;
      if (classBinding) {
        const conditionClass = classBinding[1];
        const condition = classBinding[2];
        elementClass = `\${${condition} ? '${conditionClass}' : ''}`;
      }

      const innerContent = group.match(/<g[^>]*>([\s\S]*?)<\/g>/)[1];
      const innerElements = convertSVGContent(innerContent);

      elements.push(`React.createElement('g', { 
        ${elementClass ? `className: \`${elementClass}\`,` : ''}
        key: 'group-${index}'
      }, ${innerElements})`);
    });
  }

  return elements.join(', ');
}

// Categorize icons based on name patterns
function categorizeIcon(iconName) {
  const categories = {
    'loading': ['loading', 'spinner', 'refresh', 'sync', 'rotate'],
    'navigation': ['arrow', 'chevron', 'move', 'direction', 'up', 'down', 'left', 'right'],
    'files': ['file', 'folder', 'document', 'page', 'upload', 'download'],
    'communication': ['message', 'chat', 'mail', 'phone', 'wifi', 'signal'],
    'actions': ['plus', 'minus', 'add', 'remove', 'delete', 'edit', 'save'],
    'media': ['play', 'pause', 'stop', 'volume', 'image', 'video', 'audio'],
    'interface': ['menu', 'grid', 'list', 'layout', 'panel', 'sidebar'],
    'security': ['lock', 'unlock', 'shield', 'key', 'security'],
    'tools': ['settings', 'cog', 'gear', 'tool', 'wrench', 'hammer'],
    'social': ['share', 'like', 'heart', 'star', 'user', 'users'],
    'status': ['check', 'warning', 'error', 'info', 'alert', 'bell'],
    'time': ['clock', 'calendar', 'timer', 'alarm', 'schedule']
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => iconName.includes(keyword))) {
      return category;
    }
  }

  return 'general';
}

// Generate tags for searchability
function generateTags(iconName) {
  const words = iconName.split('-');
  const tags = [...words];
  
  // Add semantic tags
  const semanticMappings = {
    'arrow': ['direction', 'navigation', 'pointer'],
    'file': ['document', 'storage', 'data'],
    'folder': ['directory', 'storage', 'organization'],
    'plus': ['add', 'create', 'new'],
    'minus': ['remove', 'delete', 'subtract'],
    'heart': ['love', 'favorite', 'like'],
    'star': ['favorite', 'rating', 'bookmark'],
    'lock': ['security', 'private', 'protected'],
    'unlock': ['access', 'open', 'public']
  };

  words.forEach(word => {
    if (semanticMappings[word]) {
      tags.push(...semanticMappings[word]);
    }
  });

  return [...new Set(tags)]; // Remove duplicates
}

// Convert all icons
console.log('Converting Svelte components to React...');
const convertedIcons = [];
let successCount = 0;
let errorCount = 0;

iconNames.forEach((iconName, index) => {
  try {
    const iconData = animationData[iconName];
    const svelteContent = iconData.files[0].content;
    
    const converted = convertSvelteToReact(iconName, svelteContent);
    if (converted) {
      convertedIcons.push(converted);
      successCount++;
    }
    
    if (index % 100 === 0) {
      console.log(`Processed ${index}/${iconNames.length} icons...`);
    }
  } catch (error) {
    console.warn(`Error converting ${iconName}:`, error.message);
    errorCount++;
  }
});

console.log(`Conversion complete: ${successCount} successful, ${errorCount} errors`);

// Generate the final TypeScript file
const outputContent = `import React from 'react';
import { type IconItem } from '../types/icon';

// ============ ANIMATED ICON COMPONENTS ============
${convertedIcons.map(icon => icon.component).join('\n\n')}

// ============ EXPORTED ICONS ARRAY ============
export const animatedIcons: IconItem[] = [
${convertedIcons.map(icon => `  {
    id: '${icon.originalName}',
    name: '${icon.name.replace('Icon', '')}',
    svg: ${icon.name},
    style: 'animated',
    category: '${icon.category}',
    tags: ${JSON.stringify(icon.tags)}
  }`).join(',\n')}
];
`;

// Write the output file
fs.writeFileSync('./tmp/comprehensive-animated-icons.ts', outputContent);

// Generate statistics
const categoryStats = {};
convertedIcons.forEach(icon => {
  categoryStats[icon.category] = (categoryStats[icon.category] || 0) + 1;
});

console.log('\n=== CONVERSION STATISTICS ===');
console.log(`Total icons processed: ${iconNames.length}`);
console.log(`Successfully converted: ${successCount}`);
console.log(`Conversion errors: ${errorCount}`);
console.log('\nIcons by category:');
Object.entries(categoryStats).sort((a, b) => b[1] - a[1]).forEach(([category, count]) => {
  console.log(`  ${category}: ${count}`);
});

console.log(`\nOutput written to: ./tmp/comprehensive-animated-icons.ts`);
console.log('Conversion complete!');