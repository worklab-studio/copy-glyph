import { type IconItem } from '@/types/icon';
import * as SolarIcons from '@solar-icons/react';

// Category mapping for Solar icons
function getCategoryFromName(name: string): string {
  const lowerName = name.toLowerCase();
  
  // Buildings & Architecture
  if (lowerName.includes('home') || lowerName.includes('building') || lowerName.includes('house') || 
      lowerName.includes('city') || lowerName.includes('shop') || lowerName.includes('store') || 
      lowerName.includes('hospital') || lowerName.includes('school')) return 'buildings';
  
  // Users & People
  if (lowerName.includes('user') || lowerName.includes('profile') || lowerName.includes('people') || 
      lowerName.includes('face') || lowerName.includes('person') || lowerName.includes('group')) return 'users';
  
  // System & Settings
  if (lowerName.includes('settings') || lowerName.includes('cog') || lowerName.includes('gear') || 
      lowerName.includes('tool') || lowerName.includes('wrench') || lowerName.includes('config')) return 'system';
  
  // Actions & Controls
  if (lowerName.includes('search') || lowerName.includes('find') || lowerName.includes('play') || 
      lowerName.includes('pause') || lowerName.includes('stop') || lowerName.includes('refresh') || 
      lowerName.includes('reload') || lowerName.includes('update')) return 'actions';
  
  // Social & Community
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('like') || 
      lowerName.includes('share') || lowerName.includes('follow') || lowerName.includes('subscribe')) return 'social';
  
  // Communication
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('chat') || 
      lowerName.includes('phone') || lowerName.includes('call') || lowerName.includes('notification')) return 'communication';
  
  // Time & Calendar
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('time') || 
      lowerName.includes('date') || lowerName.includes('schedule')) return 'time';
  
  // Navigation
  if (lowerName.includes('arrow') || lowerName.includes('direction') || lowerName.includes('navigate') || 
      lowerName.includes('compass') || lowerName.includes('location') || lowerName.includes('map')) return 'navigation';
  
  // Media & Files
  if (lowerName.includes('file') || lowerName.includes('document') || lowerName.includes('folder') || 
      lowerName.includes('image') || lowerName.includes('video') || lowerName.includes('music') || 
      lowerName.includes('audio') || lowerName.includes('photo')) return 'media';
  
  // Security
  if (lowerName.includes('lock') || lowerName.includes('key') || lowerName.includes('shield') || 
      lowerName.includes('security') || lowerName.includes('safe') || lowerName.includes('protect')) return 'security';
  
  // Weather
  if (lowerName.includes('sun') || lowerName.includes('moon') || lowerName.includes('cloud') || 
      lowerName.includes('rain') || lowerName.includes('storm') || lowerName.includes('weather')) return 'weather';
  
  // Commerce
  if (lowerName.includes('cart') || lowerName.includes('shopping') || lowerName.includes('money') || 
      lowerName.includes('payment') || lowerName.includes('card') || lowerName.includes('wallet')) return 'commerce';
  
  return 'general';
}

// Get style from icon name
function getStyleFromName(name: string): string {
  if (name.includes('Bold')) return 'bold';
  if (name.includes('Linear')) return 'linear';
  if (name.includes('Broken')) return 'broken';
  if (name.includes('BoldDuotone')) return 'boldduotone';
  return 'outline';
}

// Clean icon name (remove style suffixes)
function cleanIconName(name: string): string {
  return name
    .replace(/Bold$/, '')
    .replace(/Linear$/, '')
    .replace(/Broken$/, '')
    .replace(/BoldDuotone$/, '')
    .replace(/Outline$/, '');
}

// Export the solar icons array
export const solarIcons: IconItem[] = Object.entries(SolarIcons)
  .filter(([name]) => name !== 'default' && typeof SolarIcons[name as keyof typeof SolarIcons] === 'function')
  .map(([name, Component], index) => {
    const cleanName = cleanIconName(name);
    const style = getStyleFromName(name);
    const category = getCategoryFromName(cleanName);
    
    const tags = [
      cleanName.toLowerCase(),
      name.toLowerCase(),
      category,
      style,
      'solar'
    ];

    return {
      id: `solar-${name.toLowerCase()}-${index}`,
      name: cleanName,
      svg: Component as any,
      style,
      category,
      tags: [...new Set(tags)]
    };
  });