import * as IconoirIcons from 'iconoir-react';
import { type IconItem } from '@/types/icon';
import { type ComponentType } from 'react';

// Get all Iconoir icons by filtering the exported names
const iconoirIconNames = Object.keys(IconoirIcons).filter(name => {
  const exportedItem = IconoirIcons[name as keyof typeof IconoirIcons];
  // Simple filtering for React components
  return typeof exportedItem === 'function' && 
         name !== 'IconoirProvider' && 
         !name.includes('Context') &&
         !name.includes('Provider') &&
         // Icon names start with uppercase and are not special exports
         /^[A-Z][a-zA-Z0-9]*$/.test(name);
}).slice(0, 100); // Limit to first 100 for now

// Category mapping for Iconoir icons
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('nav') || lowerName.includes('menu') || lowerName.includes('compass') || lowerName.includes('direction')) return 'navigation';
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('chat') || lowerName.includes('phone') || lowerName.includes('bell') || lowerName.includes('send')) return 'communication';
  if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('music') || lowerName.includes('sound') || lowerName.includes('video') || lowerName.includes('camera') || lowerName.includes('film') || lowerName.includes('media')) return 'media';
  if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('document') || lowerName.includes('page') || lowerName.includes('archive') || lowerName.includes('save')) return 'files';
  if (lowerName.includes('settings') || lowerName.includes('gear') || lowerName.includes('tool') || lowerName.includes('wrench') || lowerName.includes('edit') || lowerName.includes('config')) return 'system';
  if (lowerName.includes('dollar') || lowerName.includes('euro') || lowerName.includes('pound') || lowerName.includes('coin') || lowerName.includes('bank') || lowerName.includes('card') || lowerName.includes('payment')) return 'finance';
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('like') || lowerName.includes('favorite') || lowerName.includes('share') || lowerName.includes('social')) return 'social';
  if (lowerName.includes('user') || lowerName.includes('person') || lowerName.includes('people') || lowerName.includes('profile') || lowerName.includes('account') || lowerName.includes('avatar')) return 'users';
  if (lowerName.includes('lock') || lowerName.includes('key') || lowerName.includes('shield') || lowerName.includes('security') || lowerName.includes('password') || lowerName.includes('safe')) return 'security';
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('time') || lowerName.includes('date') || lowerName.includes('schedule') || lowerName.includes('timer')) return 'time';
  if (lowerName.includes('cloud') || lowerName.includes('sun') || lowerName.includes('moon') || lowerName.includes('rain') || lowerName.includes('weather') || lowerName.includes('temperature')) return 'weather';
  if (lowerName.includes('map') || lowerName.includes('location') || lowerName.includes('pin') || lowerName.includes('place') || lowerName.includes('globe') || lowerName.includes('earth') || lowerName.includes('building') || lowerName.includes('house')) return 'location';
  if (lowerName.includes('plus') || lowerName.includes('add') || lowerName.includes('minus') || lowerName.includes('remove') || lowerName.includes('delete') || lowerName.includes('close') || lowerName.includes('cancel') || lowerName.includes('check') || lowerName.includes('confirm')) return 'actions';
  if (lowerName.includes('eye') || lowerName.includes('view') || lowerName.includes('visible') || lowerName.includes('show') || lowerName.includes('hide') || lowerName.includes('search') || lowerName.includes('zoom')) return 'view';
  if (lowerName.includes('warning') || lowerName.includes('alert') || lowerName.includes('error') || lowerName.includes('info') || lowerName.includes('help') || lowerName.includes('question')) return 'alerts';
  if (lowerName.includes('shopping') || lowerName.includes('cart') || lowerName.includes('bag') || lowerName.includes('store') || lowerName.includes('product') || lowerName.includes('price')) return 'commerce';
  if (lowerName.includes('transport') || lowerName.includes('car') || lowerName.includes('bus') || lowerName.includes('train') || lowerName.includes('plane') || lowerName.includes('bike') || lowerName.includes('truck')) return 'transport';
  if (lowerName.includes('text') || lowerName.includes('font') || lowerName.includes('typography') || lowerName.includes('format') || lowerName.includes('align')) return 'text';
  if (lowerName.includes('design') || lowerName.includes('brush') || lowerName.includes('color') || lowerName.includes('palette') || lowerName.includes('art') || lowerName.includes('draw')) return 'design';
  
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
  
  // Add tags based on icon name patterns
  const tags = [
    name.toLowerCase(),
    displayName.toLowerCase(),
    category,
    'outline',
    // Add category-specific tags
    ...(category === 'navigation' ? ['arrow', 'menu', 'direction'] : []),
    ...(category === 'communication' ? ['mail', 'message', 'contact'] : []),
    ...(category === 'media' ? ['audio', 'video', 'entertainment'] : []),
    ...(category === 'files' ? ['document', 'storage', 'data'] : []),
    ...(category === 'system' ? ['settings', 'configuration', 'tools'] : []),
    ...(category === 'social' ? ['like', 'favorite', 'sharing'] : []),
    ...(category === 'users' ? ['profile', 'account', 'people'] : []),
    ...(category === 'security' ? ['privacy', 'protection', 'auth'] : []),
    ...(category === 'time' ? ['schedule', 'date', 'timer'] : []),
    ...(category === 'weather' ? ['climate', 'temperature', 'forecast'] : []),
    ...(category === 'location' ? ['maps', 'places', 'geography'] : []),
    ...(category === 'actions' ? ['buttons', 'controls', 'interface'] : []),
    ...(category === 'view' ? ['visibility', 'display', 'show'] : []),
    ...(category === 'alerts' ? ['notifications', 'warnings', 'info'] : []),
    ...(category === 'commerce' ? ['shopping', 'ecommerce', 'retail'] : []),
    ...(category === 'transport' ? ['vehicles', 'travel', 'mobility'] : []),
    ...(category === 'text' ? ['typography', 'formatting', 'writing'] : []),
    ...(category === 'design' ? ['creative', 'artistic', 'visual'] : []),
  ];

  return {
    id: `iconoir-${name.toLowerCase()}`,
    name: displayName,
    svg: IconComponent,
    style: 'outline',
    category,
    tags: [...new Set(tags)]
  };
}).sort((a, b) => a.name.localeCompare(b.name));