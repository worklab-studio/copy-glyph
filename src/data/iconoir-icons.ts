// Simple Iconoir icons implementation - NO FILTERING
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

// NO FILTERING - Take everything as potential icon
console.log('🚀 ICONOIR: Starting simple import (no filtering)...');
console.log('📦 ICONOIR: Available exports:', Object.keys(IconoirIcons).length);

const iconComponents: Array<{ name: string; component: any }> = [];

// Import EVERYTHING - no filtering at all
Object.entries(IconoirIcons).forEach(([key, value]) => {
  // Only skip obvious non-components
  if (key === 'default') return;
  
  const readableName = convertPascalToReadable(key);
  
  iconComponents.push({
    name: readableName,
    component: value
  });
  
  // Log first 10 to see what we're getting
  if (iconComponents.length <= 10) {
    console.log(`📌 ICONOIR: Added ${readableName} (${key}) - Type:`, typeof value);
  }
});

console.log('📊 ICONOIR: Total components imported:', iconComponents.length);

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