import { IconItem } from '../types/icon';

// Placeholder data for Ikonate icons - replace with actual SVG data when available
export const ikonateIcons: IconItem[] = [
  {
    id: 'ikonate-home',
    name: 'Home',
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L4 9V21H20V9L12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 21V12H15V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    tags: ['home', 'house', 'main'],
    style: 'outline',
    category: 'navigation',
  },
  {
    id: 'ikonate-user',
    name: 'User',
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="5" stroke="currentColor" stroke-width="2"/>
      <path d="M3 21C3 16 7 12 12 12C17 12 21 16 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    tags: ['user', 'person', 'profile'],
    style: 'outline',
    category: 'user',
  },
  {
    id: 'ikonate-settings',
    name: 'Settings',
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M12 1V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 21V23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M1 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M21 12H23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    tags: ['settings', 'gear', 'config'],
    style: 'outline',
    category: 'system',
  },
];