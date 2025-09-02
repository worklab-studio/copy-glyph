// Ultra simple iconoir - NO LOGIC AT ALL
import { type IconItem } from '@/types/icon';
import { type ComponentType } from 'react';

console.log('🟢 ICONOIR: Starting ultra-simple import...');

// Just hardcode a few test icons to avoid ALL logic
const testIcons = [
  'Home',
  'Search', 
  'Settings',
  'User',
  'Mail',
  'Bell',
  'Calendar',
  'Heart',
  'Star',
  'Lock'
];

export const iconoirIcons: IconItem[] = testIcons.map((iconName, index) => {
  console.log(`🟢 ICONOIR: Creating test icon ${iconName}`);
  
  return {
    id: `iconoir-test-${index}-${iconName.toLowerCase()}`,
    name: `Iconoir ${iconName}`,
    svg: (() => null) as ComponentType<any>, // Dummy component for now
    style: 'outline' as const,
    category: 'test',
    tags: ['iconoir', 'test']
  };
});

console.log('🟢 ICONOIR: Created', iconoirIcons.length, 'test icons');
console.log('🟢 ICONOIR: Icon IDs:', iconoirIcons.map(i => i.id));

export const iconoirIconCount = iconoirIcons.length;