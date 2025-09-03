import { type IconItem } from '@/types/icon';

// Material Design Icons data - Sample set (Note: This is a subset for demo purposes)
const iconMap: Record<string, string> = {
  "account": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-account" viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>`,
  "accountAlert": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-account-alert" viewBox="0 0 24 24"><path d="M10 4A4 4 0 0 1 14 8A4 4 0 0 1 10 12A4 4 0 0 1 6 8A4 4 0 0 1 10 4M10 14C14.42 14 18 15.79 18 18V20H2V18C2 15.79 5.58 14 10 14M20 12V7H22V13H20M20 17V15H22V17H20Z" /></svg>`,
  "accountBox": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-account-box" viewBox="0 0 24 24"><path d="M6,17C6,15 10,13.9 12,13.9C14,13.9 18,15 18,17V18H6M15,9A3,3 0 0,1 12,12A3,3 0 0,1 9,9A3,3 0 0,1 12,6A3,3 0 0,1 15,9M3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5C3.89,3 3,3.9 3,5Z" /></svg>`,
  "home": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-home" viewBox="0 0 24 24"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>`,
  "menu": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-menu" viewBox="0 0 24 24"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>`,
  "star": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-star" viewBox="0 0 24 24"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z" /></svg>`,
  "heart": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-heart" viewBox="0 0 24 24"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>`,
  "settings": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-settings" viewBox="0 0 24 24"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>`,
  "search": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-magnify" viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>`,
  "delete": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-delete" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>`,
  "edit": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-pencil" viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>`,
  "folder": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-folder" viewBox="0 0 24 24"><path d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" /></svg>`,
  "email": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-email" viewBox="0 0 24 24"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>`,
  "phone": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-phone" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" /></svg>`,
  "camera": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-camera" viewBox="0 0 24 24"><path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" /></svg>`,
  "download": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-download" viewBox="0 0 24 24"><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" /></svg>`,
  "upload": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-upload" viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" /></svg>`,
  "play": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-play" viewBox="0 0 24 24"><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>`,
  "pause": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-pause" viewBox="0 0 24 24"><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>`,
  "stop": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-stop" viewBox="0 0 24 24"><path d="M18,18H6V6H18V18Z" /></svg>`,
  "check": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-check" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>`,
  "close": `<svg xmlns="http://www.w3.org/2000/svg" id="mdi-close" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`
};

// Helper functions
function camelCaseToTitleCase(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

function ensureCurrentColor(svg: string): string {
  // Handle both fill and stroke attributes for better color theming
  return svg
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
    .replace(/<path/g, '<path fill="currentColor"');
}

function categorizeIcon(name: string): string {
  const lowerName = name.toLowerCase();
  
  // Navigation
  if (/(arrow|chevron|navigation|menu|home|back|forward|up|down|left|right)/.test(lowerName)) return 'navigation';
  
  // Communication
  if (/(email|mail|phone|message|chat|comment|forum|bell|notification)/.test(lowerName)) return 'communication';
  
  // Action
  if (/(add|plus|minus|delete|edit|save|copy|paste|settings|search|filter|sort)/.test(lowerName)) return 'action';
  
  // Content
  if (/(text|format|content|document|page|article|blog|news)/.test(lowerName)) return 'content';
  
  // Device
  if (/(phone|computer|tablet|desktop|laptop|mobile|device|screen)/.test(lowerName)) return 'device';
  
  // File
  if (/(file|folder|document|download|upload|attachment|pdf|image)/.test(lowerName)) return 'file';
  
  // Image
  if (/(photo|camera|image|picture|gallery|album)/.test(lowerName)) return 'image';
  
  // Maps
  if (/(map|location|place|pin|marker|gps|navigation)/.test(lowerName)) return 'maps';
  
  // Social
  if (/(people|person|user|profile|account|group|share|social)/.test(lowerName)) return 'social';
  
  // Toggle
  if (/(check|toggle|switch|radio|select|option)/.test(lowerName)) return 'toggle';
  
  // AV (Audio/Video)
  if (/(play|pause|stop|music|video|audio|volume|speaker)/.test(lowerName)) return 'av';
  
  // Alert
  if (/(alert|warning|error|info|help|question|exclamation)/.test(lowerName)) return 'alert';
  
  // Hardware  
  if (/(keyboard|mouse|printer|scanner|headphone|microphone)/.test(lowerName)) return 'hardware';
  
  return 'other';
}

function generateTags(name: string, category: string): string[] {
  const tags = [name, category];
  const lowerName = name.toLowerCase();
  
  // Add semantic tags based on name patterns
  if (lowerName.includes('arrow')) tags.push('direction', 'navigation', 'pointer');
  if (lowerName.includes('heart')) tags.push('love', 'favorite', 'like');
  if (lowerName.includes('star')) tags.push('rating', 'favorite', 'bookmark');
  if (lowerName.includes('home')) tags.push('house', 'main', 'dashboard');
  if (lowerName.includes('user')) tags.push('person', 'profile', 'account');
  if (lowerName.includes('settings')) tags.push('config', 'preferences', 'options');
  if (lowerName.includes('search')) tags.push('find', 'lookup', 'magnify');
  if (lowerName.includes('delete')) tags.push('remove', 'trash', 'clear');
  
  return tags;
}

// Process all Material Design Icons from the iconMap
const processedMaterialIcons: IconItem[] = Object.entries(iconMap).map(([name, svg]) => {
  const displayName = camelCaseToTitleCase(name);
  const category = categorizeIcon(name);
  const tags = generateTags(name, category);
  
  return {
    id: `material-${name}`,
    name: displayName,
    svg: ensureCurrentColor(svg),
    tags,
    style: 'filled',
    category,
  };
});

export const materialIcons: IconItem[] = processedMaterialIcons;