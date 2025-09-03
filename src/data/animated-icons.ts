import React from 'react';
import { type IconItem } from '@/types/icon';

// Simple animated icon components using React.createElement to avoid JSX syntax issues
const LoadingSpinnerIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} animate-spin`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', { d: 'M21 12a9 9 0 11-6.219-8.56' })));
};

const LoadingDotsIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color
  }, [
    React.createElement('circle', { key: '1', cx: '4', cy: '12', r: '2', className: 'animate-bounce', style: { animationDelay: '0s' } }),
    React.createElement('circle', { key: '2', cx: '12', cy: '12', r: '2', className: 'animate-bounce', style: { animationDelay: '0.1s' } }),
    React.createElement('circle', { key: '3', cx: '20', cy: '12', r: '2', className: 'animate-bounce', style: { animationDelay: '0.2s' } })
  ]));
};

// Simplified animated upload icon
const UploadIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:animate-bounce`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, [
    React.createElement('path', { key: '1', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
    React.createElement('polyline', { key: '2', points: '7,10 12,5 17,10' }),
    React.createElement('line', { key: '3', x1: '12', y1: '5', x2: '12', y2: '15' })
  ]));
};

const DownloadIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:animate-bounce`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, [
    React.createElement('path', { key: '1', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
    React.createElement('polyline', { key: '2', points: '7,10 12,15 17,10' }),
    React.createElement('line', { key: '3', x1: '12', y1: '15', x2: '12', y2: '3' })
  ]));
};

const ArrowRightIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:translate-x-1 transition-transform duration-300`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, [
    React.createElement('line', { key: '1', x1: '5', y1: '12', x2: '19', y2: '12' }),
    React.createElement('polyline', { key: '2', points: '12,5 19,12 12,19' })
  ]));
};

const CheckIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:scale-110 transition-transform duration-300`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('polyline', { points: '20,6 9,17 4,12' })));
};

const HeartIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:scale-110 hover:animate-bounce transition-transform duration-300`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', { d: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z' })));
};

const StarIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:rotate-12 hover:scale-110 transition-transform duration-300`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('polygon', { points: '12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2' })));
};

const SearchIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:scale-110 transition-transform duration-300`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, [
    React.createElement('circle', { key: '1', cx: '11', cy: '11', r: '8' }),
    React.createElement('path', { key: '2', d: 'M21 21l-4.35-4.35' })
  ]));
};

const SettingsIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:rotate-90 transition-transform duration-500`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, [
    React.createElement('path', { key: '1', d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' }),
    React.createElement('circle', { key: '2', cx: '12', cy: '12', r: '3' })
  ]));
};

const PlusIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:rotate-90 transition-transform duration-300`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, [
    React.createElement('path', { key: '1', d: 'M5 12h14' }),
    React.createElement('path', { key: '2', d: 'M12 5v14' })
  ]));
};

const MailIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:animate-bounce transition-transform duration-300`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, [
    React.createElement('rect', { key: '1', width: '20', height: '16', x: '2', y: '4', rx: '2' }),
    React.createElement('path', { key: '2', d: 'm22 7-10 5L2 7' })
  ]));
};

const UserIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:scale-110 transition-transform duration-300`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, [
    React.createElement('path', { key: '1', d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
    React.createElement('circle', { key: '2', cx: '12', cy: '7', r: '4' })
  ]));
};

const LockIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:animate-pulse transition-transform duration-300`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, [
    React.createElement('rect', { key: '1', width: '18', height: '11', x: '3', y: '11', rx: '2', ry: '2' }),
    React.createElement('path', { key: '2', d: 'M7 11V7a5 5 0 0 1 10 0v4' })
  ]));
};

const EyeIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:animate-pulse transition-transform duration-300`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, [
    React.createElement('path', { key: '1', d: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' }),
    React.createElement('circle', { key: '2', cx: '12', cy: '12', r: '3' })
  ]));
};

const BellIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:animate-bounce hover:rotate-12 transition-transform duration-300`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, [
    React.createElement('path', { key: '1', d: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' }),
    React.createElement('path', { key: '2', d: 'M10.3 21a1.94 1.94 0 0 0 3.4 0' })
  ]));
};

// Export all animated icons as IconItem array
export const animatedIcons: IconItem[] = [
  // Loading & Progress
  {
    id: "animated-loading-spinner",
    name: "loading-spinner",
    svg: LoadingSpinnerIcon,
    style: "animated",
    category: "loading",
    tags: ["loading", "spinner", "progress", "animated"]
  },
  {
    id: "animated-loading-dots",
    name: "loading-dots",
    svg: LoadingDotsIcon,
    style: "animated",
    category: "loading",
    tags: ["loading", "dots", "progress", "animated"]
  },

  // Upload & Download
  {
    id: "animated-upload",
    name: "upload",
    svg: UploadIcon,
    style: "animated",
    category: "files",
    tags: ["upload", "arrow", "up", "file", "animated"]
  },
  {
    id: "animated-download",
    name: "download",
    svg: DownloadIcon,
    style: "animated",
    category: "files",
    tags: ["download", "arrow", "down", "file", "animated"]
  },

  // Navigation
  {
    id: "animated-arrow-right",
    name: "arrow-right",
    svg: ArrowRightIcon,
    style: "animated",
    category: "arrows",
    tags: ["arrow", "right", "navigation", "animated"]
  },

  // Actions
  {
    id: "animated-check",
    name: "check",
    svg: CheckIcon,
    style: "animated",
    category: "actions",
    tags: ["check", "success", "done", "animated"]
  },
  {
    id: "animated-plus",
    name: "plus",
    svg: PlusIcon,
    style: "animated",
    category: "actions",
    tags: ["plus", "add", "create", "animated"]
  },

  // Social
  {
    id: "animated-heart",
    name: "heart",
    svg: HeartIcon,
    style: "animated",
    category: "social",
    tags: ["heart", "love", "like", "animated"]
  },
  {
    id: "animated-star",
    name: "star",
    svg: StarIcon,
    style: "animated",
    category: "social",
    tags: ["star", "favorite", "rating", "animated"]
  },

  // Search
  {
    id: "animated-search",
    name: "search",
    svg: SearchIcon,
    style: "animated",
    category: "search",
    tags: ["search", "find", "magnify", "animated"]
  },

  // Communication
  {
    id: "animated-mail",
    name: "mail",
    svg: MailIcon,
    style: "animated",
    category: "communication",
    tags: ["mail", "email", "message", "animated"]
  },

  // Notifications
  {
    id: "animated-bell",
    name: "bell",
    svg: BellIcon,
    style: "animated",
    category: "notifications",
    tags: ["bell", "notification", "alert", "animated"]
  },

  // Users
  {
    id: "animated-user",
    name: "user",
    svg: UserIcon,
    style: "animated",
    category: "users",
    tags: ["user", "person", "profile", "animated"]
  },

  // Settings
  {
    id: "animated-settings",
    name: "settings",
    svg: SettingsIcon,
    style: "animated",
    category: "settings",
    tags: ["settings", "config", "gear", "animated"]
  },

  // Security
  {
    id: "animated-lock",
    name: "lock",
    svg: LockIcon,
    style: "animated",
    category: "security",
    tags: ["lock", "secure", "private", "animated"]
  },

  // Visibility
  {
    id: "animated-eye",
    name: "eye",
    svg: EyeIcon,
    style: "animated",
    category: "visibility",
    tags: ["eye", "view", "see", "animated"]
  }
];