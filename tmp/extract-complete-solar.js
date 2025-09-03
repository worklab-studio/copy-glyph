const fs = require('fs');
const path = require('path');

// This script extracts all Solar icons from @solar-icons/react package
async function extractSolarIcons() {
  try {
    // Import the entire Solar icons package to get all exports
    const solarPackagePath = path.join(process.cwd(), 'node_modules', '@solar-icons/react');
    const packageJson = JSON.parse(fs.readFileSync(path.join(solarPackagePath, 'package.json'), 'utf8'));
    
    console.log('📦 Solar Icons Package Version:', packageJson.version);
    
    // Read the main export file to understand the structure
    const mainFile = path.join(solarPackagePath, 'dist', 'index.js');
    let indexContent = '';
    
    if (fs.existsSync(mainFile)) {
      indexContent = fs.readFileSync(mainFile, 'utf8');
    } else {
      // Try alternative paths
      const altPaths = [
        path.join(solarPackagePath, 'index.js'),
        path.join(solarPackagePath, 'lib', 'index.js'),
        path.join(solarPackagePath, 'src', 'index.js')
      ];
      
      for (const altPath of altPaths) {
        if (fs.existsSync(altPath)) {
          indexContent = fs.readFileSync(altPath, 'utf8');
          console.log('✅ Found Solar icons at:', altPath);
          break;
        }
      }
    }
    
    if (!indexContent) {
      throw new Error('Could not find Solar icons main file');
    }
    
    // Extract all icon exports using regex
    const exportMatches = indexContent.match(/export\s*{\s*([^}]+)\s*}/g) || [];
    const iconNames = new Set();
    
    exportMatches.forEach(match => {
      const exports = match.replace(/export\s*{\s*|\s*}/g, '');
      const names = exports.split(',').map(name => name.trim()).filter(name => name);
      names.forEach(name => iconNames.add(name));
    });
    
    console.log('🔍 Found', iconNames.size, 'exported icon names');
    
    // Also try to find icons by scanning the dist directory
    const distPath = path.join(solarPackagePath, 'dist');
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(distPath).filter(file => file.endsWith('.js') && file !== 'index.js');
      files.forEach(file => {
        const baseName = file.replace('.js', '');
        iconNames.add(baseName);
      });
    }
    
    const allIconNames = Array.from(iconNames).filter(name => 
      name && 
      !name.includes('__') && 
      !name.toLowerCase().includes('index') &&
      name.length > 1
    );
    
    console.log('🎯 Filtered to', allIconNames.length, 'valid icon names');
    
    // Function to determine category from icon name
    function getCategoryFromName(name) {
      const lowerName = name.toLowerCase();
      
      if (lowerName.includes('video') || lowerName.includes('music') || lowerName.includes('play') || 
          lowerName.includes('pause') || lowerName.includes('media') || lowerName.includes('camera') ||
          lowerName.includes('mic') || lowerName.includes('speaker') || lowerName.includes('volume')) {
        return 'Media & Entertainment';
      }
      
      if (lowerName.includes('message') || lowerName.includes('chat') || lowerName.includes('mail') ||
          lowerName.includes('phone') || lowerName.includes('call') || lowerName.includes('notification')) {
        return 'Communication';
      }
      
      if (lowerName.includes('arrow') || lowerName.includes('direction') || lowerName.includes('navigation') ||
          lowerName.includes('compass') || lowerName.includes('map') || lowerName.includes('location')) {
        return 'Navigation & Arrows';
      }
      
      if (lowerName.includes('file') || lowerName.includes('document') || lowerName.includes('folder') ||
          lowerName.includes('download') || lowerName.includes('upload') || lowerName.includes('save')) {
        return 'Files & Documents';
      }
      
      if (lowerName.includes('user') || lowerName.includes('person') || lowerName.includes('people') ||
          lowerName.includes('profile') || lowerName.includes('account') || lowerName.includes('avatar')) {
        return 'Users & People';
      }
      
      if (lowerName.includes('home') || lowerName.includes('building') || lowerName.includes('house') ||
          lowerName.includes('office') || lowerName.includes('shop') || lowerName.includes('store')) {
        return 'Buildings & Architecture';
      }
      
      if (lowerName.includes('settings') || lowerName.includes('gear') || lowerName.includes('config') ||
          lowerName.includes('system') || lowerName.includes('admin') || lowerName.includes('tool')) {
        return 'System & Settings';
      }
      
      if (lowerName.includes('weather') || lowerName.includes('sun') || lowerName.includes('moon') ||
          lowerName.includes('cloud') || lowerName.includes('rain') || lowerName.includes('snow')) {
        return 'Weather & Nature';
      }
      
      if (lowerName.includes('shopping') || lowerName.includes('cart') || lowerName.includes('bag') ||
          lowerName.includes('money') || lowerName.includes('payment') || lowerName.includes('credit')) {
        return 'Commerce & Shopping';
      }
      
      if (lowerName.includes('security') || lowerName.includes('lock') || lowerName.includes('key') ||
          lowerName.includes('shield') || lowerName.includes('protection') || lowerName.includes('safe')) {
        return 'Security & Privacy';
      }
      
      if (lowerName.includes('time') || lowerName.includes('clock') || lowerName.includes('calendar') ||
          lowerName.includes('date') || lowerName.includes('schedule') || lowerName.includes('alarm')) {
        return 'Time & Calendar';
      }
      
      if (lowerName.includes('tech') || lowerName.includes('computer') || lowerName.includes('device') ||
          lowerName.includes('mobile') || lowerName.includes('tablet') || lowerName.includes('laptop')) {
        return 'Technology & Devices';
      }
      
      return 'General';
    }
    
    // Function to determine style from icon name
    function getStyleFromName(name) {
      const lowerName = name.toLowerCase();
      if (lowerName.includes('bold') && lowerName.includes('duotone')) return 'BoldDuotone';
      if (lowerName.includes('bold')) return 'Bold';
      if (lowerName.includes('broken')) return 'Broken';
      if (lowerName.includes('outline')) return 'Outline';
      if (lowerName.includes('linear')) return 'Linear';
      return 'Linear'; // Default style
    }
    
    // Function to clean icon name
    function cleanIconName(name) {
      return name
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add spaces between camelCase
        .replace(/(Bold|Linear|Outline|Broken|Duotone)/gi, '') // Remove style suffixes
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    // Generate the solar icons data
    const solarIconsData = allIconNames.map(iconName => {
      const cleanName = cleanIconName(iconName);
      const category = getCategoryFromName(iconName);
      const style = getStyleFromName(iconName);
      
      return {
        id: `solar-${iconName.toLowerCase()}`,
        name: cleanName,
        svg: `import { ${iconName} } from '@solar-icons/react'; export default ${iconName};`,
        style: style,
        category: category,
        tags: [cleanName.toLowerCase(), style.toLowerCase(), category.toLowerCase()]
      };
    });
    
    console.log('🎨 Generated', solarIconsData.length, 'icon entries');
    
    // Create the TypeScript file content
    const tsContent = `import { type IconItem } from "@/types/icon";
import React from "react";

// Auto-generated Solar Icons library with complete icon set
// Generated from @solar-icons/react package

${solarIconsData.map(icon => {
  const componentName = icon.id.split('-').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
  
  return `const ${componentName}Component = React.lazy(() => import('@solar-icons/react').then(module => ({ 
    default: module.${icon.svg.match(/import { (\w+) }/)?.[1] || 'Unknown'}
  })));`;
}).join('\n')}

export const solarIcons: IconItem[] = [
${solarIconsData.map(icon => {
  const componentName = icon.id.split('-').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
  
  return `  {
    id: "${icon.id}",
    name: "${icon.name}",
    svg: ${componentName}Component,
    style: "${icon.style}",
    category: "${icon.category}",
    tags: ${JSON.stringify(icon.tags)}
  }`;
}).join(',\n')}
];

export default solarIcons;`;
    
    // Write the TypeScript file
    fs.writeFileSync('./src/data/solar-icons.ts', tsContent);
    
    console.log('✅ Successfully generated solar-icons.ts with', solarIconsData.length, 'icons');
    console.log('📊 Categories:', [...new Set(solarIconsData.map(i => i.category))].join(', '));
    console.log('🎭 Styles:', [...new Set(solarIconsData.map(i => i.style))].join(', '));
    
  } catch (error) {
    console.error('❌ Error extracting Solar icons:', error);
    
    // Fallback: Try to use dynamic imports approach
    console.log('🔄 Attempting fallback approach...');
    
    const fallbackContent = `import { type IconItem } from "@/types/icon";
import React from "react";

// Fallback Solar Icons implementation using dynamic imports
const solarIconNames = [
  // Common Solar icon names - this will be populated dynamically
  'Home', 'User', 'Settings', 'Search', 'Menu', 'Close', 'ArrowRight', 'ArrowLeft',
  'Play', 'Pause', 'Stop', 'Heart', 'Star', 'Bell', 'Mail', 'Phone',
  'Calendar', 'Clock', 'Camera', 'Video', 'Music', 'Download', 'Upload', 'Share',
  'Edit', 'Delete', 'Add', 'Remove', 'Check', 'Cross', 'Info', 'Warning',
  'Shield', 'Lock', 'Key', 'Eye', 'EyeClosed', 'Refresh', 'Sync', 'Power',
  'Battery', 'Wifi', 'Signal', 'Location', 'Map', 'Compass', 'Flag', 'Target'
];

// Function to create icon component with dynamic import
const createSolarIcon = (iconName: string): React.ComponentType<any> => {
  return React.lazy(() => 
    import('@solar-icons/react').then(module => ({
      default: module[iconName] || module[\`\${iconName}Linear\`] || module[\`\${iconName}Outline\`] || module[\`\${iconName}Bold\`] || (() => null)
    })).catch(() => ({ default: () => null }))
  );
};

// Generate icons with proper categorization
function getCategoryFromName(name: string): string {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('home') || lowerName.includes('building')) return 'Buildings & Architecture';
  if (lowerName.includes('user') || lowerName.includes('person') || lowerName.includes('people')) return 'Users & People';
  if (lowerName.includes('settings') || lowerName.includes('gear') || lowerName.includes('config')) return 'System & Settings';
  if (lowerName.includes('play') || lowerName.includes('music') || lowerName.includes('video')) return 'Media & Entertainment';
  if (lowerName.includes('mail') || lowerName.includes('phone') || lowerName.includes('message')) return 'Communication';
  if (lowerName.includes('arrow') || lowerName.includes('direction') || lowerName.includes('navigation')) return 'Navigation & Arrows';
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('time')) return 'Time & Calendar';
  if (lowerName.includes('shield') || lowerName.includes('lock') || lowerName.includes('security')) return 'Security & Privacy';
  
  return 'General';
}

export const solarIcons: IconItem[] = solarIconNames.map(iconName => ({
  id: \`solar-\${iconName.toLowerCase()}\`,
  name: iconName.replace(/([a-z])([A-Z])/g, '$1 $2'),
  svg: createSolarIcon(iconName),
  style: 'Linear',
  category: getCategoryFromName(iconName),
  tags: [iconName.toLowerCase(), 'solar', 'linear']
}));

export default solarIcons;`;
    
    fs.writeFileSync('./src/data/solar-icons.ts', fallbackContent);
    console.log('✅ Generated fallback solar-icons.ts');
  }
}

// Run the extraction
extractSolarIcons();