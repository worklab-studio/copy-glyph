import { type IconItem } from '@/types/icon';

// Solar icons SVG data - comprehensive collection of the most popular icons
const solarIconsData = [
  // Navigation Icons
  { name: 'ArrowDown', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14m-7-7l7 7 7-7"/></svg>', category: 'navigation' },
  { name: 'ArrowUp', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>', category: 'navigation' },
  { name: 'ArrowLeft', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 12H5m7-7l-7 7 7 7"/></svg>', category: 'navigation' },
  { name: 'ArrowRight', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>', category: 'navigation' },
  { name: 'ChevronDown', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m6 9 6 6 6-6"/></svg>', category: 'navigation' },
  { name: 'ChevronUp', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m18 15-6-6-6 6"/></svg>', category: 'navigation' },
  { name: 'Home', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>', category: 'navigation' },
  { name: 'Menu', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>', category: 'navigation' },
  
  // Communication Icons
  { name: 'Mail', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 5L2 7"/></svg>', category: 'communication' },
  { name: 'Phone', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>', category: 'communication' },
  { name: 'Message', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>', category: 'communication' },
  { name: 'Bell', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>', category: 'communication' },
  { name: 'Chat', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1.5-2s-1.5.62-1.5 2 .5 2 1.5 2z"/><path d="M12 6V4a2 2 0 00-2-2H4a2 2 0 00-2 2v16l4-4h6a2 2 0 002-2V8a2 2 0 00-2-2z"/></svg>', category: 'communication' },
  
  // Media Icons
  { name: 'Play', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5,3 19,12 5,21"/></svg>', category: 'media' },
  { name: 'Pause', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>', category: 'media' },
  { name: 'Stop', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>', category: 'media' },
  { name: 'Volume', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>', category: 'media' },
  { name: 'Camera', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>', category: 'media' },
  { name: 'Image', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 00-2.828 0L6 21"/></svg>', category: 'media' },
  { name: 'Video', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="23,7 16,12 23,17"/><rect width="15" height="14" x="1" y="5" rx="2" ry="2"/></svg>', category: 'media' },
  
  // Files & Storage
  { name: 'File', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/></svg>', category: 'files' },
  { name: 'Folder', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 20a2 2 0 002-2V8a2 2 0 00-2-2h-7.9a2 2 0 01-1.69-.9L9.6 3.9A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z"/></svg>', category: 'files' },
  { name: 'Download', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>', category: 'files' },
  { name: 'Upload', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>', category: 'files' },
  { name: 'Archive', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 002 2h12a2 2 0 002-2V8"/><path d="M10 12h4"/></svg>', category: 'files' },
  
  // System & Tools
  { name: 'Settings', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>', category: 'system' },
  { name: 'Tool', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>', category: 'system' },
  { name: 'Wrench', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>', category: 'system' },
  { name: 'Gear', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-6.5l-4.24 4.24M7.76 16.24l-4.24 4.24m12.02-12.02l-4.24 4.24M7.76 7.76L3.52 3.52"/></svg>', category: 'system' },
  
  // Users & People
  { name: 'User', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', category: 'users' },
  { name: 'Users', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>', category: 'users' },
  { name: 'Profile', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', category: 'users' },
  { name: 'Contact', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/></svg>', category: 'users' },
  
  // Security & Privacy
  { name: 'Lock', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>', category: 'security' },
  { name: 'Unlock', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 019.9-1"/></svg>', category: 'security' },
  { name: 'Key', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6"/><path d="M15.5 7.5l3 3L22 7l-3-3"/></svg>', category: 'security' },
  { name: 'Shield', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>', category: 'security' },
  { name: 'Eye', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>', category: 'security' },
  
  // Time & Calendar
  { name: 'Calendar', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>', category: 'time' },
  { name: 'Clock', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>', category: 'time' },
  { name: 'Timer', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>', category: 'time' },
  { name: 'Watch', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="6"/><polyline points="12,10 12,12 13,13"/><path d="M16.13 7.66l-.81-4.05a2 2 0 00-2-1.61h-2.68a2 2 0 00-2 1.61l-.78 4.05"/><path d="M7.88 16.36l.8 4a2 2 0 002 1.61h2.72a2 2 0 002-1.61l.81-4.05"/></svg>', category: 'time' },
  
  // Weather
  { name: 'Sun', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>', category: 'weather' },
  { name: 'Moon', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>', category: 'weather' },
  { name: 'Cloud', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>', category: 'weather' },
  { name: 'Rain', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 13v8l4-4-4-4z"/><path d="M8 13v8l4-4-4-4z"/><path d="M18 7h-1.26A8 8 0 109 16h9a5 5 0 000-10z"/></svg>', category: 'weather' },
  
  // Location & Maps
  { name: 'MapPin', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>', category: 'location' },
  { name: 'Globe', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>', category: 'location' },
  { name: 'Map', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" x2="8" y1="2" y2="18"/><line x1="16" x2="16" y1="6" y2="22"/></svg>', category: 'location' },
  { name: 'Building', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18Z"/><path d="M6 12H4a2 2 0 00-2 2v8h20v-8a2 2 0 00-2-2h-2"/></svg>', category: 'location' },
  
  // Actions & Controls
  { name: 'Plus', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>', category: 'actions' },
  { name: 'Minus', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="5" x2="19" y1="12" y2="12"/></svg>', category: 'actions' },
  { name: 'Close', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>', category: 'actions' },
  { name: 'Check', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="20,6 9,17 4,12"/></svg>', category: 'actions' },
  { name: 'Search', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>', category: 'actions' },
  { name: 'Filter', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/></svg>', category: 'actions' },
  { name: 'Sort', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18"/><path d="M7 12h10"/><path d="M10 18h4"/></svg>', category: 'actions' },
  
  // Social & Sharing
  { name: 'Heart', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>', category: 'social' },
  { name: 'Star', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>', category: 'social' },
  { name: 'Share', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>', category: 'social' },
  { name: 'Like', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 10v12l4-2v-10l-4-2z"/><path d="M15 5.88L14 10h5.83a2 2 0 011.92 2.56l-2.33 8A2 2 0 0117.5 22H4a2 2 0 01-2-2v-8a2 2 0 012-2h2.76a2 2 0 001.79-1.11L12 2h3a2 2 0 012 2v1.88z"/></svg>', category: 'social' },
  
  // Commerce & Shopping
  { name: 'ShoppingCart', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12"/></svg>', category: 'commerce' },
  { name: 'Store', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>', category: 'commerce' },
  { name: 'CreditCard', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>', category: 'commerce' },
  { name: 'Dollar', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" x2="12" y1="1" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>', category: 'commerce' },
  
  // Technology & Devices
  { name: 'Smartphone', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>', category: 'technology' },
  { name: 'Laptop', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 01-.9 1.45H3.62a1 1 0 01-.9-1.45L4 16"/></svg>', category: 'technology' },
  { name: 'Monitor', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="20" height="14" x="2" y="3" rx="2" ry="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>', category: 'technology' },
  { name: 'Code', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>', category: 'technology' },
  { name: 'Database', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>', category: 'technology' },
  
  // Alerts & Status
  { name: 'AlertCircle', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>', category: 'alerts' },
  { name: 'Warning', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>', category: 'alerts' },
  { name: 'Info', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>', category: 'alerts' },
  { name: 'CheckCircle', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>', category: 'alerts' },
];

// Category mapping function for Solar icons
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('chevron') || lowerName.includes('menu') || lowerName.includes('home') || lowerName.includes('navigation')) return 'navigation';
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('phone') || lowerName.includes('bell') || lowerName.includes('chat')) return 'communication';
  if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('stop') || lowerName.includes('volume') || lowerName.includes('camera') || lowerName.includes('image') || lowerName.includes('video')) return 'media';
  if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('download') || lowerName.includes('upload') || lowerName.includes('archive')) return 'files';
  if (lowerName.includes('settings') || lowerName.includes('tool') || lowerName.includes('wrench') || lowerName.includes('gear')) return 'system';
  if (lowerName.includes('user') || lowerName.includes('users') || lowerName.includes('profile') || lowerName.includes('contact')) return 'users';
  if (lowerName.includes('lock') || lowerName.includes('unlock') || lowerName.includes('key') || lowerName.includes('shield') || lowerName.includes('eye')) return 'security';
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('timer') || lowerName.includes('watch')) return 'time';
  if (lowerName.includes('sun') || lowerName.includes('moon') || lowerName.includes('cloud') || lowerName.includes('rain')) return 'weather';
  if (lowerName.includes('mappin') || lowerName.includes('globe') || lowerName.includes('map') || lowerName.includes('building')) return 'location';
  if (lowerName.includes('plus') || lowerName.includes('minus') || lowerName.includes('close') || lowerName.includes('check') || lowerName.includes('search') || lowerName.includes('filter') || lowerName.includes('sort')) return 'actions';
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('share') || lowerName.includes('like')) return 'social';
  if (lowerName.includes('shopping') || lowerName.includes('store') || lowerName.includes('credit') || lowerName.includes('dollar')) return 'commerce';
  if (lowerName.includes('smartphone') || lowerName.includes('laptop') || lowerName.includes('monitor') || lowerName.includes('code') || lowerName.includes('database')) return 'technology';
  if (lowerName.includes('alert') || lowerName.includes('warning') || lowerName.includes('info') || lowerName.includes('check')) return 'alerts';
  
  return 'general';
};

export const solarIcons: IconItem[] = solarIconsData.map(iconData => {
  const category = iconData.category || getCategoryFromName(iconData.name);
  
  // Generate comprehensive tags for better searchability
  const tags = [
    iconData.name.toLowerCase(),
    category,
    'solar',
    'outline',
    // Add specific tags based on icon patterns
    ...(iconData.name.includes('Arrow') ? ['arrow', 'navigation', 'direction'] : []),
    ...(iconData.name.includes('Home') ? ['house', 'main', 'dashboard'] : []),
    ...(iconData.name.includes('Mail') || iconData.name.includes('Message') ? ['email', 'communication', 'contact'] : []),
    ...(iconData.name.includes('Phone') ? ['call', 'telephone', 'mobile'] : []),
    ...(iconData.name.includes('Bell') ? ['notification', 'alert', 'ring'] : []),
    ...(iconData.name.includes('Play') || iconData.name.includes('Pause') ? ['media', 'video', 'audio'] : []),
    ...(iconData.name.includes('Camera') ? ['photo', 'picture', 'capture'] : []),
    ...(iconData.name.includes('File') || iconData.name.includes('Folder') ? ['document', 'storage', 'data'] : []),
    ...(iconData.name.includes('Download') || iconData.name.includes('Upload') ? ['transfer', 'sync', 'cloud'] : []),
    ...(iconData.name.includes('Settings') || iconData.name.includes('Gear') ? ['configuration', 'preferences', 'options'] : []),
    ...(iconData.name.includes('User') ? ['person', 'profile', 'account'] : []),
    ...(iconData.name.includes('Lock') || iconData.name.includes('Shield') ? ['protection', 'privacy', 'safe'] : []),
    ...(iconData.name.includes('Calendar') || iconData.name.includes('Clock') ? ['schedule', 'date', 'appointment'] : []),
    ...(iconData.name.includes('Sun') || iconData.name.includes('Moon') ? ['bright', 'dark', 'theme'] : []),
    ...(iconData.name.includes('Heart') || iconData.name.includes('Star') ? ['favorite', 'bookmark', 'love'] : []),
    ...(iconData.name.includes('Search') ? ['find', 'lookup', 'magnify'] : []),
    ...(iconData.name.includes('Shopping') || iconData.name.includes('Cart') ? ['buy', 'purchase', 'ecommerce'] : []),
  ];

  return {
    id: `solar-${iconData.name.toLowerCase()}`,
    name: iconData.name,
    svg: iconData.svg,
    style: 'outline',
    category,
    tags: [...new Set(tags)] // Remove duplicates
  };
});