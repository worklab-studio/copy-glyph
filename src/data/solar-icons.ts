import { type IconItem } from '@/types/icon';

// For now, create a minimal Solar icons implementation using SVG strings
// This will be expanded once we confirm the integration works properly
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
  {
    name: 'Star',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>',
    category: 'social',
    style: 'outline'
  },
  {
    name: 'Mail',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
    category: 'communication',
    style: 'outline'
  },
  {
    name: 'Phone',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    category: 'communication',
    style: 'outline'
  },
  {
    name: 'Calendar',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
    category: 'time',
    style: 'outline'
  },
  {
    name: 'Clock',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>',
    category: 'time',
    style: 'outline'
  }
];

// Category mapping for Solar icons
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('navigation') || lowerName.includes('compass') || lowerName.includes('direction')) return 'navigation';
  if (lowerName.includes('phone') || lowerName.includes('call') || lowerName.includes('chat') || lowerName.includes('message') || lowerName.includes('mail') || lowerName.includes('letter')) return 'communication';
  if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('music') || lowerName.includes('audio') || lowerName.includes('video') || lowerName.includes('camera') || lowerName.includes('record')) return 'media';
  if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('document') || lowerName.includes('archive') || lowerName.includes('download') || lowerName.includes('upload')) return 'files';
  if (lowerName.includes('settings') || lowerName.includes('widget') || lowerName.includes('cog') || lowerName.includes('gear') || lowerName.includes('slider') || lowerName.includes('tune')) return 'system';
  if (lowerName.includes('money') || lowerName.includes('dollar') || lowerName.includes('card') || lowerName.includes('wallet') || lowerName.includes('bank') || lowerName.includes('coin')) return 'finance';
  if (lowerName.includes('like') || lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('share') || lowerName.includes('social')) return 'social';
  if (lowerName.includes('user') || lowerName.includes('profile') || lowerName.includes('people') || lowerName.includes('person') || lowerName.includes('team')) return 'users';
  if (lowerName.includes('lock') || lowerName.includes('key') || lowerName.includes('shield') || lowerName.includes('security') || lowerName.includes('password')) return 'security';
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('time') || lowerName.includes('alarm') || lowerName.includes('watch')) return 'time';
  if (lowerName.includes('sun') || lowerName.includes('moon') || lowerName.includes('cloud') || lowerName.includes('weather') || lowerName.includes('fog')) return 'weather';
  if (lowerName.includes('map') || lowerName.includes('location') || lowerName.includes('pin') || lowerName.includes('globe') || lowerName.includes('gps')) return 'location';
  if (lowerName.includes('add') || lowerName.includes('plus') || lowerName.includes('minus') || lowerName.includes('close') || lowerName.includes('check') || lowerName.includes('delete') || lowerName.includes('search')) return 'actions';
  if (lowerName.includes('info') || lowerName.includes('danger') || lowerName.includes('warning') || lowerName.includes('question') || lowerName.includes('help')) return 'alerts';
  if (lowerName.includes('shop') || lowerName.includes('cart') || lowerName.includes('bag') || lowerName.includes('store') || lowerName.includes('sale')) return 'commerce';
  if (lowerName.includes('home') || lowerName.includes('building') || lowerName.includes('house') || lowerName.includes('city')) return 'buildings';
  if (lowerName.includes('health') || lowerName.includes('medical') || lowerName.includes('medicine') || lowerName.includes('hospital')) return 'medical';
  if (lowerName.includes('transport') || lowerName.includes('car') || lowerName.includes('bus') || lowerName.includes('train') || lowerName.includes('bicycle')) return 'transport';
  if (lowerName.includes('food') || lowerName.includes('drink') || lowerName.includes('coffee') || lowerName.includes('restaurant')) return 'food';
  
  return 'general';
};

export const solarIcons: IconItem[] = solarIconsData.map((iconData, index) => {
  const category = getCategoryFromName(iconData.name);
  
  // Add comprehensive tags based on icon name patterns
  const tags = [
    iconData.name.toLowerCase(),
    category,
    iconData.style,
    // Add specific tags based on patterns
    ...(iconData.name.toLowerCase().includes('home') ? ['house', 'building'] : []),
    ...(iconData.name.toLowerCase().includes('user') ? ['person', 'profile'] : []),
    ...(iconData.name.toLowerCase().includes('settings') ? ['config', 'preferences'] : []),
    ...(iconData.name.toLowerCase().includes('search') ? ['find', 'lookup'] : []),
    ...(iconData.name.toLowerCase().includes('heart') ? ['like', 'favorite'] : []),
    ...(iconData.name.toLowerCase().includes('star') ? ['favorite', 'rating'] : []),
    ...(iconData.name.toLowerCase().includes('mail') ? ['email', 'message'] : []),
    ...(iconData.name.toLowerCase().includes('phone') ? ['call', 'contact'] : []),
    ...(iconData.name.toLowerCase().includes('calendar') ? ['date', 'schedule'] : []),
    ...(iconData.name.toLowerCase().includes('clock') ? ['time', 'watch'] : []),
  ];

  return {
    id: `solar-${iconData.name.toLowerCase()}-${index}`,
    name: iconData.name,
    svg: iconData.svg,
    style: iconData.style,
    category,
    tags: [...new Set(tags)] // Remove duplicates
  };
});