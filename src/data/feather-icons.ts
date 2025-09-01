import * as FeatherIcons from 'react-icons/fi';
import { type IconItem } from '@/types/icon';

// Get all Feather icons by filtering the exported names
const featherIconNames = Object.keys(FeatherIcons).filter(name => name.startsWith('Fi'));

export const featherIcons: IconItem[] = featherIconNames.map(name => {
  const IconComponent = FeatherIcons[name as keyof typeof FeatherIcons];
  const displayName = name.slice(2); // Remove 'Fi' prefix
  
  // Add tags based on icon name patterns
  const tags = [
    displayName.toLowerCase(),
    name.toLowerCase(),
    // Add category tags based on common patterns
    ...(name.includes('Arrow') ? ['arrow', 'navigation'] : []),
    ...(name.includes('Alert') ? ['alert', 'warning'] : []),
    ...(name.includes('Settings') || name.includes('Tool') ? ['settings', 'tools'] : []),
    ...(name.includes('User') || name.includes('Person') ? ['user', 'people'] : []),
    ...(name.includes('Mail') || name.includes('Message') ? ['communication', 'mail'] : []),
    ...(name.includes('File') || name.includes('Folder') ? ['files', 'storage'] : []),
    ...(name.includes('Play') || name.includes('Pause') || name.includes('Music') ? ['media', 'audio'] : []),
    ...(name.includes('Heart') || name.includes('Star') ? ['favorites', 'social'] : []),
    ...(name.includes('Lock') || name.includes('Shield') ? ['security', 'privacy'] : []),
  ];

  const category = 
    name.includes('Arrow') ? 'navigation' :
    name.includes('Alert') ? 'status' :
    name.includes('Settings') || name.includes('Tool') ? 'system' :
    name.includes('User') || name.includes('Person') ? 'user' :
    name.includes('Mail') || name.includes('Message') ? 'communication' :
    name.includes('File') || name.includes('Folder') ? 'files' :
    name.includes('Play') || name.includes('Pause') || name.includes('Music') ? 'media' :
    name.includes('Heart') || name.includes('Star') ? 'social' :
    name.includes('Lock') || name.includes('Shield') ? 'security' :
    'actions';

  return {
    id: `feather-${name.toLowerCase()}`,
    name: displayName,
    svg: IconComponent,
    tags: [...new Set(tags)],
    style: 'outline' as const,
    category
  };
});