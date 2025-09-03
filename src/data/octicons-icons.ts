import { IconItem } from '../types/icon';

// Placeholder data for Octicons icons - replace with actual SVG data when available
export const octiconsIcons: IconItem[] = [
  {
    id: 'octicons-home',
    name: 'Home',
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.156 1.835a.25.25 0 00-.312 0l-5.25 4.2c-.139.112-.219.28-.219.456v8.09c0 .414.336.75.75.75h9.75a.75.75 0 00.75-.75v-8.09c0-.176-.08-.344-.22-.456l-5.25-4.2z" fill="currentColor"/>
      <path d="M6.5 13.25V10.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v2.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    tags: ['home', 'house', 'main'],
    style: 'solid',
    category: 'navigation',
  },
  {
    id: 'octicons-person',
    name: 'Person',
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 9C10.2091 9 12 7.20914 12 5C12 2.79086 10.2091 1 8 1C5.79086 1 4 2.79086 4 5C4 7.20914 5.79086 9 8 9Z" fill="currentColor"/>
      <path d="M8 11C4.68629 11 2 13.6863 2 17H14C14 13.6863 11.3137 11 8 11Z" fill="currentColor"/>
    </svg>`,
    tags: ['person', 'user', 'profile'],
    style: 'solid',
    category: 'user',
  },
  {
    id: 'octicons-gear',
    name: 'Gear',
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke="currentColor" stroke-width="1" fill="none"/>
      <path d="M6.458 1.042L7.458 0.58a2 2 0 0 1 1.584 0l1 .462a2 2 0 0 1 1.062 1.062l.462 1a2 2 0 0 1 0 1.584l-.462 1a2 2 0 0 1-1.062 1.062l-1 .462a2 2 0 0 1-1.584 0l-1-.462A2 2 0 0 1 5.396 4.688l-.462-1a2 2 0 0 1 0-1.584l.462-1A2 2 0 0 1 6.458 1.042z" fill="currentColor"/>
    </svg>`,
    tags: ['gear', 'settings', 'config'],
    style: 'solid',
    category: 'system',
  },
];