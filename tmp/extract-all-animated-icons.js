// Script to extract and convert ALL animated icons from Svelte to React
const fs = require('fs');

const svelteContent = fs.readFileSync('./tmp/github-animated.tsx', 'utf8');

// Extract all icon entries with their content
const iconPattern = /"([^"]+)":\s*\{[^}]*"files":\s*\[\s*\{[^}]*"content":\s*"([^"]*(?:\\.[^"]*)*)"/g;
let match;
const extractedIcons = [];

console.log('Starting extraction of all animated icons...');

while ((match = iconPattern.exec(svelteContent)) !== null) {
  const iconName = match[1];
  const svelteComponentContent = match[2];
  
  extractedIcons.push({
    name: iconName,
    svelteContent: svelteComponentContent
  });
}

console.log(`Found ${extractedIcons.length} animated icons to convert`);

// Function to convert Svelte content to React component
function convertSvelteToReact(iconName, svelteContent) {
  // Clean up the content - remove escapes and parse properly
  const cleanContent = svelteContent.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"');
  
  // Extract key elements from Svelte content
  const svgMatch = cleanContent.match(/<svg[^>]*>(.*?)<\/svg>/s);
  if (!svgMatch) {
    console.warn(`Could not extract SVG for ${iconName}`);
    return null;
  }
  
  const svgContent = svgMatch[1];
  const svgAttributes = svgMatch[0].match(/<svg([^>]*)/)[1];
  
  // Extract animation/style information
  const styleMatch = cleanContent.match(/<style>(.*?)<\/style>/s);
  const styleContent = styleMatch ? styleMatch[1] : '';
  
  // Check for hover-based animation
  const hasHoverAnimation = cleanContent.includes('isHovered') || cleanContent.includes('class:animate');
  const hasTimeout = cleanContent.includes('setTimeout');
  
  // Extract timeout duration if present
  const timeoutMatch = cleanContent.match(/setTimeout\([^,]+,\s*(\d+)\)/);
  const timeoutDuration = timeoutMatch ? parseInt(timeoutMatch[1]) : 300;
  
  // Generate React component
  const componentName = iconName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('') + 'Icon';
  
  // Convert CSS animations to CSS-in-JS format for style injection
  let cssAnimations = '';
  if (styleContent) {
    // Extract keyframes and convert to CSS string
    const keyframeMatches = styleContent.match(/@keyframes\s+([^{]+)\s*\{([^}]+)\}/g);
    if (keyframeMatches) {
      cssAnimations = keyframeMatches.join('\n').replace(/\t/g, '  ');
    }
    
    // Extract other CSS rules
    const otherRules = styleContent.replace(/@keyframes[^}]+}/g, '').trim();
    if (otherRules) {
      cssAnimations += '\n' + otherRules.replace(/\t/g, '  ');
    }
  }
  
  // Create the React component with proper animation handling
  return `
// ${componentName} - Animated ${iconName} icon
export const ${componentName}: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    ${hasTimeout ? `setTimeout(() => setIsAnimating(false), ${timeoutDuration});` : ''}
  };
  
  ${!hasTimeout ? `const handleMouseLeave = () => setIsAnimating(false);` : ''}
  
  useEffect(() => {
    // Inject CSS animations
    const styleId = 'animated-${iconName}-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = \`${cssAnimations.replace(/`/g, '\\`')}\`;
      document.head.appendChild(style);
    }
  }, []);
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      ${!hasTimeout ? 'onMouseLeave={handleMouseLeave}' : ''}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={\`${iconName}-icon \${isAnimating ? 'animate' : ''}\`}
      >
        ${svgContent.replace(/class:/g, 'className=').replace(/class=/g, 'className=')}
      </svg>
    </div>
  );
};`.trim();
}

// Convert all icons
const convertedIcons = [];
let successCount = 0;
let failCount = 0;

extractedIcons.forEach(({ name, svelteContent }) => {
  const reactComponent = convertSvelteToReact(name, svelteContent);
  if (reactComponent) {
    convertedIcons.push({ name, reactComponent });
    successCount++;
  } else {
    failCount++;
  }
});

console.log(`Conversion complete: ${successCount} successful, ${failCount} failed`);

// Generate the React components file
const reactComponentsContent = `import React, { useState, useEffect } from 'react';
import { type IconItem } from '@/types/icon';

${convertedIcons.map(({ reactComponent }) => reactComponent).join('\n\n')}

// Export all animated icons as IconItem array
export const animatedIcons: IconItem[] = [
${convertedIcons.map(({ name }) => {
  const componentName = name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('') + 'Icon';
  
  // Categorize icons
  let category = 'general';
  if (name.includes('arrow') || name.includes('chevron') || name.includes('move')) category = 'arrows';
  else if (name.includes('upload') || name.includes('download') || name.includes('file')) category = 'files';
  else if (name.includes('clock') || name.includes('time') || name.includes('alarm')) category = 'time';
  else if (name.includes('signal') || name.includes('wifi') || name.includes('phone')) category = 'communication';
  else if (name.includes('check') || name.includes('plus') || name.includes('x')) category = 'actions';
  else if (name.includes('user') || name.includes('person')) category = 'users';
  else if (name.includes('search') || name.includes('eye') || name.includes('scan')) category = 'search';
  else if (name.includes('mail') || name.includes('message')) category = 'communication';
  else if (name.includes('bell') || name.includes('alert')) category = 'notifications';
  else if (name.includes('heart') || name.includes('star') || name.includes('thumbs')) category = 'social';
  else if (name.includes('settings') || name.includes('cog') || name.includes('gear')) category = 'settings';
  else if (name.includes('folder') || name.includes('archive')) category = 'files';
  else if (name.includes('shield') || name.includes('lock') || name.includes('key')) category = 'security';
  
  const tags = name.split('-').concat([category, 'animated']);
  
  return `  {
    id: "animated-${name}",
    name: "${name}",
    svg: ${componentName},
    style: "animated",
    category: "${category}",
    tags: ${JSON.stringify(tags)}
  }`;
}).join(',\n')}
];
`;

// Write the converted components
fs.writeFileSync('./tmp/converted-animated-icons.ts', reactComponentsContent);

console.log(`\nGenerated ${convertedIcons.length} React components`);
console.log('File saved as: tmp/converted-animated-icons.ts');
console.log('\nIcon categories distribution:');

// Show category distribution
const categoryCount = {};
convertedIcons.forEach(({ name }) => {
  let category = 'general';
  if (name.includes('arrow') || name.includes('chevron') || name.includes('move')) category = 'arrows';
  else if (name.includes('upload') || name.includes('download') || name.includes('file')) category = 'files';
  else if (name.includes('clock') || name.includes('time') || name.includes('alarm')) category = 'time';
  else if (name.includes('signal') || name.includes('wifi') || name.includes('phone')) category = 'communication';
  else if (name.includes('check') || name.includes('plus') || name.includes('x')) category = 'actions';
  else if (name.includes('user') || name.includes('person')) category = 'users';
  else if (name.includes('search') || name.includes('eye') || name.includes('scan')) category = 'search';
  else if (name.includes('mail') || name.includes('message')) category = 'communication';
  else if (name.includes('bell') || name.includes('alert')) category = 'notifications';
  else if (name.includes('heart') || name.includes('star') || name.includes('thumbs')) category = 'social';
  else if (name.includes('settings') || name.includes('cog') || name.includes('gear')) category = 'settings';
  else if (name.includes('folder') || name.includes('archive')) category = 'files';
  else if (name.includes('shield') || name.includes('lock') || name.includes('key')) category = 'security';
  
  categoryCount[category] = (categoryCount[category] || 0) + 1;
});

Object.entries(categoryCount).sort((a, b) => b[1] - a[1]).forEach(([category, count]) => {
  console.log(`  ${category}: ${count} icons`);
});