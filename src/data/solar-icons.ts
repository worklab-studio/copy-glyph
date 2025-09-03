import { type IconItem } from '@/types/icon';

// Solar icons sample data with SVG strings
const solarIconsData = [
  {
    name: 'Home',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 12V8a2 2 0 0 1 4 0v4"/><path d="M10 12h4"/><rect width="20" height="12" x="2" y="10" rx="2"/></svg>',
    category: 'buildings',
    style: 'outline'
  },
  {
    name: 'User',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    category: 'users',
    style: 'outline'
  },
  {
    name: 'Settings',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
    category: 'system',
    style: 'outline'
  },
  {
    name: 'Search',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
    category: 'actions',
    style: 'outline'
  },
  {
    name: 'Heart',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>',
    category: 'social',
    style: 'outline'
  },
];

// Category mapping for Solar icons  
function getCategoryFromName(name: string): string {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('home') || lowerName.includes('building') || lowerName.includes('house')) return 'buildings';
  if (lowerName.includes('user') || lowerName.includes('profile') || lowerName.includes('people')) return 'users';
  if (lowerName.includes('settings') || lowerName.includes('cog') || lowerName.includes('gear')) return 'system';
  if (lowerName.includes('search') || lowerName.includes('find')) return 'actions';
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('like')) return 'social';
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('chat')) return 'communication';
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('time')) return 'time';
  
  return 'general';
}

// Export the solar icons array
export const solarIcons: IconItem[] = solarIconsData.map((iconData, index) => {
  const category = getCategoryFromName(iconData.name);
  
  const tags = [
    iconData.name.toLowerCase(),
    category,
    iconData.style,
    'solar'
  ];

  return {
    id: `solar-${iconData.name.toLowerCase()}-${index}`,
    name: iconData.name,  
    svg: iconData.svg,
    style: iconData.style,
    category,
    tags: [...new Set(tags)]
  };
});