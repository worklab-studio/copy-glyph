import * as HeroIcons from 'react-icons/hi2';
import { type IconItem } from '@/types/icon';

// Get all Heroicons v2 by filtering the exported names
const heroIconNames = Object.keys(HeroIcons).filter(name => name.startsWith('Hi'));

export const heroiconsV2: IconItem[] = heroIconNames.map(name => {
  const IconComponent = HeroIcons[name as keyof typeof HeroIcons];
  const displayName = name.slice(2); // Remove 'Hi' prefix
  
  // Add tags based on icon name patterns
  const tags = [
    displayName.toLowerCase(),
    name.toLowerCase(),
    // Add category tags
    ...(name.includes('Arrow') ? ['arrow', 'navigation'] : []),
    ...(name.includes('Exclamation') || name.includes('Warning') ? ['alert', 'warning'] : []),
    ...(name.includes('Cog') || name.includes('Wrench') ? ['settings', 'tools'] : []),
    ...(name.includes('User') || name.includes('Person') ? ['user', 'people'] : []),
    ...(name.includes('Envelope') || name.includes('Chat') ? ['communication', 'mail'] : []),
    ...(name.includes('Document') || name.includes('Folder') ? ['files', 'storage'] : []),
    ...(name.includes('Play') || name.includes('Pause') || name.includes('Musical') ? ['media', 'audio'] : []),
    ...(name.includes('Heart') || name.includes('Star') ? ['favorites', 'social'] : []),
    ...(name.includes('Lock') || name.includes('Shield') ? ['security', 'privacy'] : []),
    ...(name.includes('Calendar') || name.includes('Clock') ? ['time', 'schedule'] : []),
  ];

  return {
    id: `heroicons-${name.toLowerCase()}`,
    name: displayName,
    svg: IconComponent,
    tags: [...new Set(tags)]
  };
});