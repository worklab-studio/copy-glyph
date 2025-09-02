// Majesticons Demo Set - Phase 1 Implementation
// This is a limited demo set of icons that mimic the Majesticons style
// Full commercial library contains 720+ icons

import { IconItem } from '@/types/icon';

// Demo Majesticons-style React Components
const MajesticonHome = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3l9 7.5v10.5a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5L12 3z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 21v-6a1 1 0 011-1h4a1 1 0 011 1v6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const MajesticonUser = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M6 20c0-4 2.7-6 6-6s6 2 6 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

const MajesticonSearch = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const MajesticonSettings = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 000 2l.15.26a2 2 0 010 2l-.15.26a2 2 0 000 2l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 000-2l-.15-.25a2 2 0 010-2l.15-.26a2 2 0 000-2l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
};

const MajesticonHeart = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const MajesticonStar = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const MajesticonMail = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="m22 7-10 5L2 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const MajesticonBell = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const MajesticonCalendar = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

const MajesticonFolder = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const MajesticonImage = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="m21 15-5-5L5 21" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const MajesticonPlus = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

// Demo icon set with proper categorization
export const majesticons: IconItem[] = [
  {
    id: 'majesticons-home',
    name: 'Home',
    svg: MajesticonHome,
    tags: ['home', 'house', 'building', 'main'],
    category: 'navigation'
  },
  {
    id: 'majesticons-user',
    name: 'User',
    svg: MajesticonUser,
    tags: ['user', 'person', 'profile', 'account'],
    category: 'users'
  },
  {
    id: 'majesticons-search',
    name: 'Search',
    svg: MajesticonSearch,
    tags: ['search', 'find', 'magnify', 'look'],
    category: 'general'
  },
  {
    id: 'majesticons-settings',
    name: 'Settings',
    svg: MajesticonSettings,
    tags: ['settings', 'config', 'gear', 'preferences'],
    category: 'system'
  },
  {
    id: 'majesticons-heart',
    name: 'Heart',
    svg: MajesticonHeart,
    tags: ['heart', 'love', 'like', 'favorite'],
    category: 'general'
  },
  {
    id: 'majesticons-star',
    name: 'Star',
    svg: MajesticonStar,
    tags: ['star', 'favorite', 'rating', 'bookmark'],
    category: 'general'
  },
  {
    id: 'majesticons-mail',
    name: 'Mail',
    svg: MajesticonMail,
    tags: ['mail', 'email', 'message', 'envelope'],
    category: 'communication'
  },
  {
    id: 'majesticons-bell',
    name: 'Bell',
    svg: MajesticonBell,
    tags: ['bell', 'notification', 'alert', 'ring'],
    category: 'communication'
  },
  {
    id: 'majesticons-calendar',
    name: 'Calendar',
    svg: MajesticonCalendar,
    tags: ['calendar', 'date', 'schedule', 'time'],
    category: 'general'
  },
  {
    id: 'majesticons-folder',
    name: 'Folder',
    svg: MajesticonFolder,
    tags: ['folder', 'directory', 'files', 'storage'],
    category: 'files'
  },
  {
    id: 'majesticons-image',
    name: 'Image',
    svg: MajesticonImage,
    tags: ['image', 'photo', 'picture', 'media'],
    category: 'media'
  },
  {
    id: 'majesticons-plus',
    name: 'Plus',
    svg: MajesticonPlus,
    tags: ['plus', 'add', 'create', 'new'],
    category: 'actions'
  }
];