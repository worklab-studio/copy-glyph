const fs = require('fs');

// Read the animated.tsx file
const content = fs.readFileSync('animated.tsx', 'utf8');

// Extract all icon component exports
const iconNames = [];
const exportRegex = /export \{ (\w+Icon) \};/g;

let match;
while ((match = exportRegex.exec(content)) !== null) {
  const iconName = match[1];
  iconNames.push(iconName);
}

console.log(`Found ${iconNames.length} icon components`);
console.log('Sample icons:', iconNames.slice(0, 10));

console.log(`\nTotal unique icon names: ${iconNames.length}`);

// Write to a file for inspection
fs.writeFileSync('tmp/extracted-icon-names.json', JSON.stringify(iconNames, null, 2));

console.log('Wrote icon names to tmp/extracted-icon-names.json');