const fs = require('fs');

// Read the animated.tsx file
const content = fs.readFileSync('animated.tsx', 'utf8');

// Extract all valid icon component definitions
const iconComponents = [];
const componentRegex = /export const (\w+Icon)\s*=.*?(?=export const|\nexport interface|$)/gs;

let match;
while ((match = componentRegex.exec(content)) !== null) {
  const componentName = match[1];
  const componentCode = match[0];
  
  // Skip if it doesn't look like a proper React component
  if (componentCode.includes('React.createElement') || componentCode.includes('return')) {
    iconComponents.push({
      name: componentName,
      code: componentCode.trim()
    });
  }
}

// Also extract interface-based components
const interfaceRegex = /export interface (\w+IconHandle).*?interface (\w+IconProps).*?(?=export interface|\nexport const|$)/gs;

let interfaceMatch;
while ((interfaceMatch = interfaceRegex.exec(content)) !== null) {
  const handleName = interfaceMatch[1];
  const iconName = handleName.replace('Handle', '');
  
  if (!iconComponents.find(c => c.name === iconName)) {
    iconComponents.push({
      name: iconName,
      code: `// Interface-based component: ${iconName}`
    });
  }
}

console.log(`Found ${iconComponents.length} icon components`);
console.log('Sample icons:', iconComponents.slice(0, 10).map(c => c.name));

// Extract unique icon names for the data file
const iconNames = [...new Set(iconComponents.map(c => c.name))];

console.log(`\nUnique icon names: ${iconNames.length}`);

// Write to a file for inspection
fs.writeFileSync('tmp/extracted-icon-names.json', JSON.stringify(iconNames, null, 2));

console.log('Wrote icon names to tmp/extracted-icon-names.json');