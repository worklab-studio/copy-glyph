import * as HeroIcons from 'react-icons/hi2';
import { type IconItem } from '@/types/icon';

// Get all Heroicons v2 (solid) by filtering the exported names
const heroIconNames = Object.keys(HeroIcons).filter(name => name.startsWith('Hi'));

// Category mapping based on icon names
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('chevron') || lowerName.includes('menu') || lowerName.includes('cursor')) return 'navigation';
  if (lowerName.includes('envelope') || lowerName.includes('chat') || lowerName.includes('phone') || lowerName.includes('bell')) return 'communication';
  if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('music') || lowerName.includes('speaker') || lowerName.includes('film')) return 'media';
  if (lowerName.includes('document') || lowerName.includes('folder') || lowerName.includes('archive') || lowerName.includes('clipboard')) return 'files';
  if (lowerName.includes('cog') || lowerName.includes('wrench') || lowerName.includes('adjustments') || lowerName.includes('switch')) return 'system';
  if (lowerName.includes('banknotes') || lowerName.includes('currency') || lowerName.includes('receipt') || lowerName.includes('calculator')) return 'finance';
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('share') || lowerName.includes('hand')) return 'social';
  if (lowerName.includes('user') || lowerName.includes('users') || lowerName.includes('identification')) return 'users';
  if (lowerName.includes('lock') || lowerName.includes('key') || lowerName.includes('shield') || lowerName.includes('finger')) return 'security';
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('stopwatch')) return 'time';
  if (lowerName.includes('bolt') || lowerName.includes('fire') || lowerName.includes('sun') || lowerName.includes('moon')) return 'weather';
  if (lowerName.includes('map') || lowerName.includes('globe') || lowerName.includes('building')) return 'location';
  if (lowerName.includes('plus') || lowerName.includes('minus') || lowerName.includes('x') || lowerName.includes('check') || lowerName.includes('exclamation')) return 'actions';
  if (lowerName.includes('eye') || lowerName.includes('magnifying') || lowerName.includes('view')) return 'view';
  
  return 'general';
};

export const heroiconsSolid: IconItem[] = heroIconNames.map(name => {
  const IconComponent = HeroIcons[name as keyof typeof HeroIcons];
  const displayName = name.slice(2); // Remove 'Hi' prefix
  const category = getCategoryFromName(name);
  
  // Add tags based on icon name patterns
  const tags = [
    displayName.toLowerCase(),
    name.toLowerCase(),
    category,
    'solid',
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
  ];

  return {
    id: `heroicons-solid-${name.toLowerCase()}`,
    name: displayName,
    svg: IconComponent,
    style: 'solid',
    category,
    tags: [...new Set(tags)]
  };
});