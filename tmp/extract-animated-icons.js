// Script to extract and convert animated icons from Svelte to React
const fs = require('fs');

const svelteContent = fs.readFileSync('./tmp/github-animated.tsx', 'utf8');

// Extract icon entries with regex
const iconPattern = /"([^"]+)":\s*\{[^{}]*"content":\s*"([^"]*(?:\\.[^"]*)*)"/g;
let match;
const extractedIcons = [];

while ((match = iconPattern.exec(svelteContent)) !== null) {
  const iconName = match[1];
  const svelteContent = match[2];
  
  // Skip already implemented icons
  const existingIcons = [
    'bell', 'search', 'settings', 'plus', 'mail', 'user', 'lock', 'eye',
    'loading-loop', 'spinner', 'check', 'star', 'heart', 'arrow-right', 'download'
  ];
  
  if (existingIcons.includes(iconName)) continue;
  
  // Priority icons to convert
  const priorityIcons = [
    'upload', 'clock', 'signal', 'wifi-high', 'rocket', 'archive', 'copy',
    'trash-2', 'download', 'maximize', 'minimize-2', 'rotate-cw', 'refresh-cw',
    'chevron-up', 'chevron-down', 'arrow-up', 'arrow-down', 'folder-sync',
    'file-check', 'package-check', 'clipboard-check', 'thumbs-up', 'award',
    'image-down', 'image-up', 'file-warning', 'shield-off'
  ];
  
  if (priorityIcons.includes(iconName)) {
    extractedIcons.push({
      name: iconName,
      svelteContent: svelteContent
    });
  }
}

console.log(`Found ${extractedIcons.length} priority icons to convert`);
console.log('Icons:', extractedIcons.map(i => i.name).join(', '));