import { type IconItem } from '../types/icon';

// Create animated SVG strings with CSS animations
const createAnimatedSVG = (paths: string, animations: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <style>${animations}</style>
    ${paths}
  </svg>`;
};

export const animatedIcons: IconItem[] = [
  {
    id: 'animated-loading-spinner',
    name: 'Loading Spinner',
    svg: createAnimatedSVG(
      '<circle cx="12" cy="12" r="3" class="animate-spin"/>',
      '.animate-spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }'
    ),
    tags: ['loading', 'spinner', 'progress', 'wait']
  },
  {
    id: 'animated-heart-beat',
    name: 'Heart Beat',
    svg: createAnimatedSVG(
      '<path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" class="animate-pulse"/>',
      '.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; } @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }'
    ),
    tags: ['heart', 'love', 'like', 'favorite']
  },
  {
    id: 'animated-bell-ring',
    name: 'Bell Ring',
    svg: createAnimatedSVG(
      '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" class="animate-bounce"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
      '.animate-bounce { animation: bounce 1s infinite; } @keyframes bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); } 50% { transform: none; animation-timing-function: cubic-bezier(0, 0, 0.2, 1); } }'
    ),
    tags: ['bell', 'notification', 'alert', 'ring']
  },
  {
    id: 'animated-settings',
    name: 'Settings',
    svg: createAnimatedSVG(
      '<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" class="rotate"/>',
      '.rotate { transform-origin: 12px 12px; animation: rotate 3s linear infinite; } @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }'
    ),
    tags: ['settings', 'gear', 'config', 'options']
  },
  {
    id: 'animated-search',
    name: 'Search',
    svg: createAnimatedSVG(
      '<circle cx="11" cy="11" r="8" class="scale-pulse"/><path d="21 21l-4.35-4.35" class="scale-pulse"/>',
      '.scale-pulse { animation: scalePulse 2s ease-in-out infinite; } @keyframes scalePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }'
    ),
    tags: ['search', 'find', 'magnify', 'look']
  },
  {
    id: 'animated-download',
    name: 'Download',
    svg: createAnimatedSVG(
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10" class="slide-down"/><line x1="12" y1="15" x2="12" y2="3" class="slide-down"/>',
      '.slide-down { animation: slideDown 2s ease-in-out infinite; } @keyframes slideDown { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }'
    ),
    tags: ['download', 'save', 'export', 'get']
  },
  {
    id: 'animated-upload',
    name: 'Upload',
    svg: createAnimatedSVG(
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8" class="slide-up"/><line x1="12" y1="3" x2="12" y2="15" class="slide-up"/>',
      '.slide-up { animation: slideUp 2s ease-in-out infinite; } @keyframes slideUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }'
    ),
    tags: ['upload', 'send', 'import', 'put']
  },
  {
    id: 'animated-arrow-right',
    name: 'Arrow Right',
    svg: createAnimatedSVG(
      '<path d="M5 12h14"/><path d="m12 5 7 7-7 7" class="slide-right"/>',
      '.slide-right { animation: slideRight 1.5s ease-in-out infinite; } @keyframes slideRight { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(2px); } }'
    ),
    tags: ['arrow', 'right', 'navigation', 'next']
  },
  {
    id: 'animated-check',
    name: 'Check',
    svg: createAnimatedSVG(
      '<polyline points="20,6 9,17 4,12" class="check-draw"/>',
      '.check-draw { stroke-dasharray: 20; stroke-dashoffset: 20; animation: checkDraw 1s ease-in-out infinite; } @keyframes checkDraw { 0% { stroke-dashoffset: 20; } 100% { stroke-dashoffset: 0; } }'
    ),
    tags: ['check', 'tick', 'confirm', 'success']
  },
  {
    id: 'animated-home',
    name: 'Home',
    svg: createAnimatedSVG(
      '<path d="M3 12l9-9 9 9M5 10v10a1 1 0 0 0 1 1h3m0-6v6m4-6v6m3-6a1 1 0 0 0 1-1V10" class="float"/>',
      '.float { animation: float 3s ease-in-out infinite; } @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }'
    ),
    tags: ['home', 'house', 'building', 'main']
  },
  {
    id: 'animated-mail',
    name: 'Mail',
    svg: createAnimatedSVG(
      '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" class="envelope"/><polyline points="22,6 12,13 2,6" class="letter"/>',
      '.envelope { animation: shake 2s ease-in-out infinite; } .letter { animation: bounce 2s ease-in-out infinite; } @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-1px); } 75% { transform: translateX(1px); } } @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }'
    ),
    tags: ['mail', 'email', 'message', 'envelope']
  },
  {
    id: 'animated-user',
    name: 'User',
    svg: createAnimatedSVG(
      '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4" class="user-glow"/>',
      '.user-glow { animation: glow 2s ease-in-out infinite alternate; } @keyframes glow { from { filter: drop-shadow(0 0 5px currentColor); } to { filter: drop-shadow(0 0 10px currentColor); opacity: 0.8; } }'
    ),
    tags: ['user', 'person', 'profile', 'account']
  },
  {
    id: 'animated-play',
    name: 'Play',
    svg: createAnimatedSVG(
      '<polygon points="5,3 19,12 5,21" class="play-pulse"/>',
      '.play-pulse { animation: playPulse 2s ease-in-out infinite; } @keyframes playPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }'
    ),
    tags: ['play', 'start', 'begin', 'media']
  },
  {
    id: 'animated-wifi',
    name: 'WiFi',
    svg: createAnimatedSVG(
      '<path d="M2 12.88a22.6 22.6 0 0 1 20 0" class="wave-1"/><path d="M5 16.82a16 16 0 0 1 14 0" class="wave-2"/><path d="M8.5 20.6a9 9 0 0 1 7 0" class="wave-3"/><circle cx="12" cy="20.4" r=".6"/>',
      '.wave-1 { animation: wave 2s ease-in-out infinite; animation-delay: 0s; } .wave-2 { animation: wave 2s ease-in-out infinite; animation-delay: 0.2s; } .wave-3 { animation: wave 2s ease-in-out infinite; animation-delay: 0.4s; } @keyframes wave { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }'
    ),
    tags: ['wifi', 'wireless', 'internet', 'connection']
  },
  {
    id: 'animated-sun',
    name: 'Sun',
    svg: createAnimatedSVG(
      '<circle cx="12" cy="12" r="5" class="sun-rotate"/><line x1="12" y1="1" x2="12" y2="3" class="ray"/><line x1="12" y1="21" x2="12" y2="23" class="ray"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" class="ray"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" class="ray"/><line x1="1" y1="12" x2="3" y2="12" class="ray"/><line x1="21" y1="12" x2="23" y2="12" class="ray"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" class="ray"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" class="ray"/>',
      '.sun-rotate { transform-origin: 12px 12px; animation: sunRotate 8s linear infinite; } .ray { animation: rayPulse 2s ease-in-out infinite; } @keyframes sunRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @keyframes rayPulse { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }'
    ),
    tags: ['sun', 'sunny', 'weather', 'bright']
  },
  {
    id: 'animated-moon',
    name: 'Moon',
    svg: createAnimatedSVG(
      '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" class="moon-glow"/>',
      '.moon-glow { animation: moonGlow 3s ease-in-out infinite; } @keyframes moonGlow { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; filter: drop-shadow(0 0 8px currentColor); } }'
    ),
    tags: ['moon', 'night', 'dark', 'lunar']
  },
];

export default animatedIcons;