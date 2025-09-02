import { type IconItem } from '@/types/icon';
import { ComponentType } from 'react';

// Simple animated icons using CSS animations and Tailwind classes
// These are simpler versions that work without complex dependencies

// Activity Icon Component with pulse animation
const ActivityIcon: ComponentType<any> = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hover:animate-pulse transition-all duration-300"
      {...props}
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
};

// Bell Icon Component with shake animation  
const BellIcon: ComponentType<any> = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hover:animate-bounce transition-all duration-300"
      {...props}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
};

// Loading/Spin Icon Component
const LoaderIcon: ComponentType<any> = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

// Heart Icon Component with pulse animation
const HeartIcon: ComponentType<any> = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hover:animate-pulse hover:fill-red-500 hover:stroke-red-500 transition-all duration-300"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  );
};

// Star Icon Component with glow animation
const StarIcon: ComponentType<any> = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hover:animate-pulse hover:fill-yellow-400 hover:stroke-yellow-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
      {...props}
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
};

// Arrow Icon Component with bounce animation
const ArrowRightIcon: ComponentType<any> = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hover:translate-x-1 transition-transform duration-300"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
};

// Download Icon Component with downward motion
const DownloadIcon: ComponentType<any> = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hover:translate-y-1 transition-transform duration-300"
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
};

// Search Icon Component with zoom animation
const SearchIcon: ComponentType<any> = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hover:scale-110 transition-transform duration-300"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
};

// Mail Icon Component with send animation
const MailIcon: ComponentType<any> = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hover:translate-x-1 hover:scale-105 transition-all duration-300"
      {...props}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
};

// Settings Icon Component with rotate animation
const SettingsIcon: ComponentType<any> = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hover:rotate-180 transition-transform duration-500"
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

// Plus Icon Component with scale animation
const PlusIcon: ComponentType<any> = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hover:scale-125 hover:rotate-90 transition-all duration-300"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
};

// Category mapping for animated icons
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('navigation')) return 'navigation';
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('bell')) return 'communication';
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('like')) return 'social';
  if (lowerName.includes('settings') || lowerName.includes('gear')) return 'system';
  if (lowerName.includes('download') || lowerName.includes('upload')) return 'files';
  if (lowerName.includes('search') || lowerName.includes('plus') || lowerName.includes('add')) return 'actions';
  if (lowerName.includes('loader') || lowerName.includes('loading') || lowerName.includes('spin')) return 'status';
  if (lowerName.includes('activity') || lowerName.includes('chart')) return 'data';
  
  return 'general';
};

export const animatedIcons: IconItem[] = [
  {
    id: 'animated-activity',
    name: 'Activity',
    svg: ActivityIcon,
    style: 'animated',
    category: 'data',
    tags: ['activity', 'chart', 'analytics', 'data', 'animated', 'drawing']
  },
  {
    id: 'animated-bell',
    name: 'Bell',
    svg: BellIcon,
    style: 'animated',
    category: 'communication',
    tags: ['bell', 'notification', 'alert', 'communication', 'animated', 'shake']
  },
  {
    id: 'animated-loader',
    name: 'Loader',
    svg: LoaderIcon,
    style: 'animated',
    category: 'status',
    tags: ['loader', 'loading', 'spinner', 'status', 'animated', 'spin']
  },
  {
    id: 'animated-heart',
    name: 'Heart',
    svg: HeartIcon,
    style: 'animated',
    category: 'social',
    tags: ['heart', 'love', 'like', 'favorite', 'social', 'animated', 'pulse']
  },
  {
    id: 'animated-star',
    name: 'Star',
    svg: StarIcon,
    style: 'animated',
    category: 'social',
    tags: ['star', 'favorite', 'rating', 'social', 'animated', 'glow']
  },
  {
    id: 'animated-arrow-right',
    name: 'Arrow Right',
    svg: ArrowRightIcon,
    style: 'animated',
    category: 'navigation',
    tags: ['arrow', 'right', 'navigation', 'direction', 'animated', 'bounce']
  },
  {
    id: 'animated-download',
    name: 'Download',
    svg: DownloadIcon,
    style: 'animated',
    category: 'files',
    tags: ['download', 'save', 'files', 'storage', 'animated', 'bounce']
  },
  {
    id: 'animated-search',
    name: 'Search',
    svg: SearchIcon,
    style: 'animated',
    category: 'actions',
    tags: ['search', 'find', 'magnify', 'actions', 'animated', 'zoom']
  },
  {
    id: 'animated-mail',
    name: 'Mail',
    svg: MailIcon,
    style: 'animated',
    category: 'communication',
    tags: ['mail', 'email', 'message', 'communication', 'animated', 'send']
  },
  {
    id: 'animated-settings',
    name: 'Settings',
    svg: SettingsIcon,
    style: 'animated',
    category: 'system',
    tags: ['settings', 'gear', 'config', 'system', 'animated', 'rotate']
  },
  {
    id: 'animated-plus',
    name: 'Plus',
    svg: PlusIcon,
    style: 'animated',
    category: 'actions',
    tags: ['plus', 'add', 'create', 'actions', 'animated', 'scale']
  }
];