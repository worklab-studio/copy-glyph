// Comprehensive Iconoir icons implementation using dynamic discovery
import * as IconoirIcons from 'iconoir-react';
import { type IconItem } from '@/types/icon';

// Function to convert PascalCase to readable name
const convertPascalToReadable = (name: string): string => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
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

// Dynamic discovery of all available Iconoir icons
const getAllIconoirIcons = () => {
  console.log('🚀 Starting Iconoir dynamic discovery...');
  
  const iconComponents: Array<{ name: string; component: any }> = [];
  
  try {
    console.log('📦 Iconoir package loaded successfully');
    console.log('📊 Total exports from iconoir-react:', Object.keys(IconoirIcons).length);
    console.log('🔍 Sample exports:', Object.keys(IconoirIcons).slice(0, 10));
    
    // Get all exports and filter for icon components
    Object.entries(IconoirIcons).forEach(([key, value]) => {
      // Check if it's a function (React component)
      if (typeof value !== 'function') {
        return;
      }
      
      // Skip obvious non-icon exports
      if (key.startsWith('use') || 
          key === 'default' || 
          key.includes('Context') || 
          key.includes('Provider') ||
          key.includes('Hook') ||
          key.toLowerCase().includes('theme') ||
          key.toLowerCase().includes('config') ||
          key.startsWith('_') ||
          key.endsWith('Context') ||
          key.endsWith('Provider')) {
        return;
      }
      
      // Additional validation - check if it looks like an icon component
      try {
        const component = value as React.ComponentType<any>;
        if (component && typeof component === 'function') {
          // Convert to readable name
          const readableName = convertPascalToReadable(key);
          
          iconComponents.push({
            name: readableName,
            component: component
          });
          
          // Log progress for first few icons
          if (iconComponents.length <= 5) {
            console.log(`✅ Added icon: ${readableName} (${key})`);
          } else if (iconComponents.length % 100 === 0) {
            console.log(`📈 Progress: ${iconComponents.length} icons loaded...`);
          }
        }
      } catch (error) {
        console.warn(`⚠️ Skipped problematic component: ${key}`);
      }
    });
    
    console.log('🎉 Dynamic discovery complete!');
    console.log('📊 Total icons found:', iconComponents.length);
    
    return iconComponents.sort((a, b) => a.name.localeCompare(b.name));
    
  } catch (error) {
    console.error('❌ Failed to load Iconoir icons:', error);
    console.log('🔄 Returning empty array - will show 0 icons');
    return [];
  }
};

// Get all available icons
const iconComponents = getAllIconoirIcons();

// Create IconItem array
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
});

// Final status logs
console.log('🏁 Iconoir icons export ready:');
console.log('   📊 Total icons exported:', iconoirIcons.length);
console.log('   🏷️ Categories found:', [...new Set(iconoirIcons.map(icon => icon.category))].join(', '));
console.log('   ✨ Icons ready for use in grid');

// Export count for debugging
export const iconoirIconCount = iconoirIcons.length;