// Dynamic import of all Iconoir icons
import * as IconoirIcons from 'iconoir-react';
import { type IconItem } from '@/types/icon';

// Function to convert PascalCase to readable name
const convertPascalToReadable = (name: string): string => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

// Get all icon components from iconoir-react
const getAllIconoirIcons = () => {
  const iconComponents: Array<{ name: string; component: any }> = [];
  
  console.log('🔍 Debugging Iconoir imports...');
  console.log('🔍 Total exports from iconoir-react:', Object.keys(IconoirIcons).length);
  console.log('🔍 First 10 exports:', Object.keys(IconoirIcons).slice(0, 10));
  
  // Filter exports to get only icon components (React components)
  Object.entries(IconoirIcons).forEach(([key, value]) => {
    // More inclusive filtering - check if it's a function and has typical React component characteristics
    if (typeof value !== 'function') {
      return;
    }
    
    // Skip obvious non-icon exports
    if (key.startsWith('use') || key === 'default' || key.includes('Context') || key.includes('Provider')) {
      return;
    }
    
    // Log a few examples to debug
    if (iconComponents.length < 5) {
      console.log(`🔍 Adding icon: ${key}, type:`, typeof value, value.name);
    }
    
    // Convert PascalCase to readable name
    const readableName = convertPascalToReadable(key);
    
    iconComponents.push({
      name: readableName,
      component: value
    });
  });
  
  console.log('🔍 Total icon components found:', iconComponents.length);
  return iconComponents.sort((a, b) => a.name.localeCompare(b.name));
};

// Category mapping for better organization
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('nav') || lowerName.includes('menu') || name.includes('Arrow') || name === 'Menu') return 'navigation';
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('phone') || name === 'Mail' || name === 'Phone' || name === 'Bell') return 'communication';
  if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('music') || lowerName.includes('camera') || name === 'Play' || name === 'Pause' || name === 'Camera') return 'media';
  if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('archive') || lowerName.includes('page') || name === 'Folder' || name === 'Archive') return 'files';
  if (lowerName.includes('settings') || lowerName.includes('gear') || lowerName.includes('edit') || name === 'Settings' || name === 'Edit') return 'system';
  if (lowerName.includes('user') || lowerName.includes('person') || lowerName.includes('profile') || name === 'User') return 'users';
  if (lowerName.includes('heart') || lowerName.includes('star') || name === 'Heart' || name === 'Star') return 'social';
  if (lowerName.includes('lock') || lowerName.includes('shield') || name === 'Lock' || name === 'Shield') return 'security';
  if (lowerName.includes('calendar') || lowerName.includes('timer') || lowerName.includes('alarm') || name === 'Calendar' || name === 'Timer' || name === 'Alarm') return 'time';
  if (lowerName.includes('plus') || lowerName.includes('add') || lowerName.includes('minus') || lowerName.includes('check') || name === 'Plus' || name === 'Check') return 'actions';
  if (lowerName.includes('eye') || lowerName.includes('view') || lowerName.includes('search') || name === 'Eye' || name === 'Search') return 'view';
  if (lowerName.includes('map') || lowerName.includes('globe') || lowerName.includes('building') || name === 'Map' || name === 'Globe' || name === 'Building') return 'location';
  if (lowerName.includes('cloud') || lowerName.includes('wifi') || name === 'Cloud' || name === 'Wifi') return 'network';
  
  return 'general';
};

// Get all icon components
const iconComponents = getAllIconoirIcons();

// Simple test - just log when this file loads
console.log('✅ Iconoir module loaded - timestamp:', Date.now());
console.log('✅ Total Iconoir icons found:', iconComponents.length);

export const iconoirIcons: IconItem[] = iconComponents.map(({ name, component }) => {
  const category = getCategoryFromName(name);
  
  return {
    id: `iconoir-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name,
    svg: component,
    style: 'outline' as const,
    category,
    tags: [name.toLowerCase(), category, 'outline', 'iconoir']
  };
}).sort((a, b) => a.name.localeCompare(b.name));

// Final verification log
console.log('✅ Iconoir icons created:', iconoirIcons.length, 'icons');