import * as IconoirIcons from 'iconoir-react';
import { type IconItem } from '@/types/icon';
import { type ComponentType } from 'react';

// Get all function exports that start with a capital letter (React components)
const iconoirIconNames = Object.keys(IconoirIcons).filter(name => {
  const exportedItem = IconoirIcons[name as keyof typeof IconoirIcons];
  
  // Filter for React components - functions that start with capital letter
  return typeof exportedItem === 'function' && 
         /^[A-Z]/.test(name) &&
         name !== 'IconoirProvider' && 
         name !== 'IconoirContext';
});

// Category mapping for Iconoir icons
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('nav') || lowerName.includes('menu') || lowerName.includes('compass') || lowerName.includes('direction') || name.includes('Arrow') || name === 'Menu') return 'navigation';
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('chat') || lowerName.includes('phone') || lowerName.includes('bell') || lowerName.includes('send') || name === 'Email' || name === 'Phone' || name === 'Bell') return 'communication';
  if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('music') || lowerName.includes('sound') || lowerName.includes('video') || lowerName.includes('camera') || lowerName.includes('film') || lowerName.includes('media') || name === 'Play' || name === 'Pause' || name === 'Music' || name === 'Camera' || name === 'Video') return 'media';
  if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('document') || lowerName.includes('page') || lowerName.includes('archive') || lowerName.includes('save') || name === 'File' || name === 'Folder' || name === 'Archive' || name === 'Save') return 'files';
  if (lowerName.includes('settings') || lowerName.includes('gear') || lowerName.includes('tool') || lowerName.includes('wrench') || lowerName.includes('edit') || lowerName.includes('config') || name === 'Settings' || name === 'Edit') return 'system';
  if (lowerName.includes('dollar') || lowerName.includes('euro') || lowerName.includes('pound') || lowerName.includes('coin') || lowerName.includes('bank') || lowerName.includes('card') || lowerName.includes('payment') || lowerName.includes('money') || lowerName.includes('wallet') || name === 'Dollar' || name === 'Money' || name === 'Wallet') return 'finance';
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('like') || lowerName.includes('favorite') || lowerName.includes('share') || lowerName.includes('social') || name === 'Heart' || name === 'Star' || name === 'Share' || name === 'Favorite') return 'social';
  if (lowerName.includes('user') || lowerName.includes('person') || lowerName.includes('people') || lowerName.includes('profile') || lowerName.includes('account') || lowerName.includes('avatar') || name === 'User' || name === 'Profile') return 'users';
  if (lowerName.includes('lock') || lowerName.includes('key') || lowerName.includes('shield') || lowerName.includes('security') || lowerName.includes('password') || lowerName.includes('safe') || name === 'Lock' || name === 'Shield' || name === 'Password') return 'security';
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('time') || lowerName.includes('date') || lowerName.includes('schedule') || lowerName.includes('timer') || lowerName.includes('watch') || lowerName.includes('alarm') || name === 'Calendar' || name === 'Timer' || name === 'Watch' || name === 'Alarm') return 'time';
  if (lowerName.includes('cloud') || lowerName.includes('sun') || lowerName.includes('moon') || lowerName.includes('rain') || lowerName.includes('weather') || lowerName.includes('temperature') || name === 'Cloud' || name === 'Sun' || name === 'Weather' || name === 'Temperature') return 'weather';
  if (lowerName.includes('map') || lowerName.includes('location') || lowerName.includes('pin') || lowerName.includes('place') || lowerName.includes('globe') || lowerName.includes('earth') || lowerName.includes('building') || lowerName.includes('house') || name === 'Map' || name === 'Globe' || name === 'Building') return 'location';
  if (lowerName.includes('plus') || lowerName.includes('add') || lowerName.includes('minus') || lowerName.includes('remove') || lowerName.includes('delete') || lowerName.includes('close') || lowerName.includes('cancel') || lowerName.includes('check') || lowerName.includes('confirm') || name === 'Add' || name === 'Plus' || name === 'Minus' || name === 'Delete' || name === 'Close' || name === 'Check') return 'actions';
  if (lowerName.includes('eye') || lowerName.includes('view') || lowerName.includes('visible') || lowerName.includes('show') || lowerName.includes('hide') || lowerName.includes('search') || lowerName.includes('zoom') || name === 'Eye' || name === 'View' || name === 'Search' || name === 'Zoom') return 'view';
  if (lowerName.includes('warning') || lowerName.includes('alert') || lowerName.includes('error') || lowerName.includes('info') || lowerName.includes('help') || lowerName.includes('question') || name === 'Warning' || name === 'Info' || name === 'Help' || name === 'Question') return 'alerts';
  if (lowerName.includes('shopping') || lowerName.includes('cart') || lowerName.includes('bag') || lowerName.includes('store') || lowerName.includes('product') || lowerName.includes('price') || name === 'Shopping') return 'commerce';
  if (lowerName.includes('transport') || lowerName.includes('car') || lowerName.includes('bus') || lowerName.includes('train') || lowerName.includes('plane') || lowerName.includes('bike') || lowerName.includes('truck') || name === 'Truck') return 'transport';
  
  return 'general';
};

export const iconoirIcons: IconItem[] = iconoirIconNames.map(name => {
  const IconComponent = IconoirIcons[name as keyof typeof IconoirIcons] as ComponentType<any>;
  const category = getCategoryFromName(name);
  
  // Convert PascalCase to readable name
  const displayName = name
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .trim() // Remove leading space
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize first letter
  
  return {
    id: `iconoir-${name.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()}`,
    name: displayName,
    svg: IconComponent,
    style: 'outline',
    category,
    tags: [
      name.toLowerCase(),
      displayName.toLowerCase(),
      category,
      'outline',
      'iconoir'
    ]
  };
}).sort((a, b) => a.name.localeCompare(b.name));