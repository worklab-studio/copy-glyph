// Fixed Iconoir icons implementation with minimal safe filtering
import * as IconoirIcons from 'iconoir-react';
import { type IconItem } from '@/types/icon';

// Function to convert PascalCase to readable name
const convertPascalToReadable = (name: string): string => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

// Simple category assignment
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow')) return 'navigation';
  if (lowerName.includes('mail') || lowerName.includes('phone') || lowerName.includes('message')) return 'communication';
  if (lowerName.includes('play') || lowerName.includes('music') || lowerName.includes('camera')) return 'media';
  if (lowerName.includes('file') || lowerName.includes('folder')) return 'files';
  if (lowerName.includes('settings') || lowerName.includes('gear')) return 'system';
  if (lowerName.includes('user') || lowerName.includes('person')) return 'users';
  if (lowerName.includes('heart') || lowerName.includes('star')) return 'social';
  if (lowerName.includes('lock') || lowerName.includes('shield')) return 'security';
  if (lowerName.includes('calendar') || lowerName.includes('time')) return 'time';
  if (lowerName.includes('plus') || lowerName.includes('check') || lowerName.includes('add')) return 'actions';
  
  return 'general';
};

// Test if something is a React component
const isReactComponent = (value: any): boolean => {
  return (
    typeof value === 'function' &&
    value.$$typeof === Symbol.for('react.forward_ref') ||
    (typeof value === 'function' && value.prototype && value.prototype.isReactComponent) ||
    (typeof value === 'function' && value.displayName) ||
    (typeof value === 'function' && !value.prototype)
  );
};

console.log('🚀 ICONOIR: Starting safe import with component validation...');
console.log('📦 ICONOIR: Available exports:', Object.keys(IconoirIcons).length);

const iconComponents: Array<{ name: string; component: any }> = [];

// Import with minimal safe filtering
Object.entries(IconoirIcons).forEach(([key, value]) => {
  // Skip obvious non-components
  if (key === 'default') return;
  
  // Only include if it's a function (potential React component)
  if (typeof value !== 'function') {
    return;
  }
  
  // Additional safety check - try to detect React components
  try {
    const readableName = convertPascalToReadable(key);
    
    iconComponents.push({
      name: readableName,
      component: value
    });
    
    // Log first 5 to see what we're getting
    if (iconComponents.length <= 5) {
      console.log(`📌 ICONOIR: Added ${readableName} (${key})`);
    }
  } catch (error) {
    console.warn(`⚠️ ICONOIR: Skipped ${key} due to error:`, error);
  }
});

console.log('📊 ICONOIR: Total valid components imported:', iconComponents.length);

// Create final icon items
export const iconoirIcons: IconItem[] = iconComponents.map(({ name, component }) => {
  const category = getCategoryFromName(name);
  
  return {
    id: `iconoir-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name,
    svg: component,
    style: 'outline' as const,
    category,
    tags: [name.toLowerCase(), category, 'iconoir']
  };
}).sort((a, b) => a.name.localeCompare(b.name));

console.log('✅ ICONOIR: Final export ready with', iconoirIcons.length, 'icons');

export const iconoirIconCount = iconoirIcons.length;