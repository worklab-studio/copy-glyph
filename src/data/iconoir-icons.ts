// Simple test for iconoir-react package
import * as IconoirIcons from 'iconoir-react';
import { type IconItem } from '@/types/icon';

console.log('🔍 ICONOIR TEST: Package loading...');
console.log('🔍 ICONOIR TEST: Available exports:', Object.keys(IconoirIcons));
console.log('🔍 ICONOIR TEST: First 5 exports:', Object.keys(IconoirIcons).slice(0, 5));
console.log('🔍 ICONOIR TEST: Total exports count:', Object.keys(IconoirIcons).length);

// Test specific imports
try {
  const { Home, Search, Settings } = IconoirIcons as any;
  console.log('🔍 ICONOIR TEST: Home component:', typeof Home, Home);
  console.log('🔍 ICONOIR TEST: Search component:', typeof Search, Search);  
  console.log('🔍 ICONOIR TEST: Settings component:', typeof Settings, Settings);
} catch (error) {
  console.error('❌ ICONOIR TEST: Failed to import specific components:', error);
}

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

// Create manual fallback icons first
const manualIcons: IconItem[] = [
  {
    id: 'iconoir-test-home',
    name: 'Test Home',
    svg: (IconoirIcons as any).Home || (() => null),
    style: 'outline' as const,
    category: 'navigation',
    tags: ['home', 'navigation', 'iconoir']
  },
  {
    id: 'iconoir-test-search', 
    name: 'Test Search',
    svg: (IconoirIcons as any).Search || (() => null),
    style: 'outline' as const,
    category: 'actions',
    tags: ['search', 'actions', 'iconoir']
  }
];

console.log('🔍 ICONOIR TEST: Manual test icons created:', manualIcons.length);

// Try dynamic discovery
let dynamicIcons: IconItem[] = [];

try {
  const iconComponents: Array<{ name: string; component: any }> = [];
  
  Object.entries(IconoirIcons).forEach(([key, value]) => {
    // Very loose filtering - only skip 'default'
    if (key === 'default') return;
    
    // Only include if it's a function
    if (typeof value === 'function') {
      const readableName = convertPascalToReadable(key);
      iconComponents.push({
        name: readableName,
        component: value
      });
      
      // Log first few
      if (iconComponents.length <= 3) {
        console.log(`🔍 ICONOIR TEST: Found component ${readableName} (${key})`);
      }
    }
  });
  
  console.log('🔍 ICONOIR TEST: Total components found:', iconComponents.length);
  
  // Create dynamic icons
  dynamicIcons = iconComponents.map(({ name, component }) => {
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
  
  console.log('🔍 ICONOIR TEST: Dynamic icons created:', dynamicIcons.length);
  
} catch (error) {
  console.error('❌ ICONOIR TEST: Dynamic discovery failed:', error);
}

// Export combined icons (manual fallback + dynamic)
export const iconoirIcons: IconItem[] = dynamicIcons.length > 0 ? dynamicIcons : manualIcons;

console.log('✅ ICONOIR TEST: Final export count:', iconoirIcons.length);
console.log('✅ ICONOIR TEST: Using', dynamicIcons.length > 0 ? 'dynamic icons' : 'manual fallback icons');

export const iconoirIconCount = iconoirIcons.length;