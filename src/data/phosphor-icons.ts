import * as PhosphorIcons from 'react-icons/pi';
import { type IconItem } from '@/types/icon';

// Get all Phosphor icons by filtering the exported names  
const phosphorIconNames = Object.keys(PhosphorIcons).filter(name => name.startsWith('Pi'));

export const phosphorIcons: IconItem[] = phosphorIconNames.map(name => {
  const IconComponent = PhosphorIcons[name as keyof typeof PhosphorIcons];
  const displayName = name.slice(2); // Remove 'Pi' prefix
  
  // Add tags based on icon name patterns
  const tags = [
    displayName.toLowerCase(),
    name.toLowerCase(),
    // Add category tags
    ...(name.includes('Arrow') ? ['arrow', 'navigation'] : []),
    ...(name.includes('Warning') || name.includes('Prohibit') ? ['alert', 'warning'] : []),
    ...(name.includes('Gear') || name.includes('Wrench') ? ['settings', 'tools'] : []),
    ...(name.includes('User') || name.includes('Person') ? ['user', 'people'] : []),
    ...(name.includes('Envelope') || name.includes('Chat') ? ['communication', 'mail'] : []),
    ...(name.includes('File') || name.includes('Folder') ? ['files', 'storage'] : []),
    ...(name.includes('Play') || name.includes('Pause') || name.includes('Music') ? ['media', 'audio'] : []),
    ...(name.includes('Heart') || name.includes('Star') ? ['favorites', 'social'] : []),
    ...(name.includes('Lock') || name.includes('Shield') ? ['security', 'privacy'] : []),
    ...(name.includes('Calendar') || name.includes('Clock') ? ['time', 'schedule'] : []),
  ];

  return {
    id: `phosphor-${name.toLowerCase()}`,
    name: displayName,
    svg: IconComponent,
    tags: [...new Set(tags)]
  };
});