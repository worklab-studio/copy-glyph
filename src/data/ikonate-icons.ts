import { IconItem } from '../types/icon';
import { iconMap } from '../../Ikonate icons';

// Ikonate Icons - Complete collection from https://ikonate.com/
// All 283 professional icons imported and processed

// Helper function to convert camelCase to Title Case
function camelCaseToTitleCase(str: string): string {
  return str.replace(/([A-Z])/g, ' $1')
    .replace(/^./, (match) => match.toUpperCase())
    .trim();
}

// Helper function to categorize icons based on their names
function categorizeIcon(iconName: string): string {
  const name = iconName.toLowerCase();
  
  if (name.includes('home') || name.includes('house') || name.includes('back') || name.includes('next') || name.includes('arrow') || name.includes('chevron') || name.includes('menu') || name.includes('nav')) {
    return 'navigation';
  }
  if (name.includes('user') || name.includes('person') || name.includes('people') || name.includes('profile') || name.includes('avatar')) {
    return 'user';
  }
  if (name.includes('mail') || name.includes('message') || name.includes('chat') || name.includes('phone') || name.includes('call') || name.includes('notification') || name.includes('bell')) {
    return 'communication';
  }
  if (name.includes('media') || name.includes('play') || name.includes('pause') || name.includes('music') || name.includes('video') || name.includes('camera') || name.includes('photo') || name.includes('image')) {
    return 'media';
  }
  if (name.includes('edit') || name.includes('create') || name.includes('design') || name.includes('draw') || name.includes('pen') || name.includes('pencil') || name.includes('brush')) {
    return 'design';
  }
  if (name.includes('file') || name.includes('folder') || name.includes('document') || name.includes('save') || name.includes('download') || name.includes('upload')) {
    return 'files';
  }
  if (name.includes('cart') || name.includes('shop') || name.includes('buy') || name.includes('commerce') || name.includes('money') || name.includes('payment')) {
    return 'commerce';
  }
  if (name.includes('time') || name.includes('clock') || name.includes('calendar') || name.includes('date') || name.includes('schedule')) {
    return 'time';
  }
  if (name.includes('lock') || name.includes('security') || name.includes('key') || name.includes('shield') || name.includes('protect')) {
    return 'security';
  }
  if (name.includes('weather') || name.includes('sun') || name.includes('cloud') || name.includes('rain') || name.includes('wind')) {
    return 'weather';
  }
  if (name.includes('location') || name.includes('map') || name.includes('place') || name.includes('pin') || name.includes('marker')) {
    return 'location';
  }
  if (name.includes('transport') || name.includes('car') || name.includes('plane') || name.includes('train') || name.includes('bike')) {
    return 'transport';
  }
  if (name.includes('health') || name.includes('medical') || name.includes('heart') || name.includes('medicine') || name.includes('hospital')) {
    return 'health';
  }
  if (name.includes('sport') || name.includes('game') || name.includes('play') || name.includes('ball')) {
    return 'sports';
  }
  if (name.includes('setting') || name.includes('config') || name.includes('gear') || name.includes('tool') || name.includes('wrench')) {
    return 'system';
  }
  
  return 'general';
}

// Helper function to generate tags for an icon
function generateTags(iconName: string, category: string): string[] {
  const name = iconName.toLowerCase();
  const tags = [name, category];
  
  // Add semantic tags based on icon name
  const semanticMappings: Record<string, string[]> = {
    'home': ['house', 'main', 'start', 'dashboard'],
    'user': ['person', 'profile', 'account', 'people'],
    'mail': ['email', 'message', 'envelope', 'contact'],
    'phone': ['call', 'contact', 'communication'],
    'camera': ['photo', 'picture', 'image', 'capture'],
    'music': ['audio', 'sound', 'play', 'media'],
    'video': ['play', 'media', 'film', 'movie'],
    'edit': ['modify', 'change', 'update', 'pen'],
    'delete': ['remove', 'trash', 'bin', 'clear'],
    'save': ['store', 'keep', 'preserve'],
    'search': ['find', 'look', 'magnify', 'glass'],
    'add': ['plus', 'create', 'new', 'insert'],
    'minus': ['remove', 'subtract', 'delete'],
    'close': ['exit', 'cancel', 'x', 'dismiss'],
    'check': ['tick', 'confirm', 'approve', 'yes'],
    'cross': ['no', 'cancel', 'reject', 'deny'],
    'heart': ['love', 'like', 'favorite', 'health'],
    'star': ['favorite', 'bookmark', 'rate', 'award'],
    'clock': ['time', 'schedule', 'timer', 'alarm'],
    'calendar': ['date', 'schedule', 'event', 'time'],
    'location': ['map', 'pin', 'marker', 'place'],
    'lock': ['secure', 'protect', 'private', 'key'],
    'unlock': ['open', 'access', 'public', 'free'],
    'download': ['save', 'get', 'import', 'receive'],
    'upload': ['send', 'export', 'share', 'publish'],
    'share': ['social', 'send', 'distribute', 'export'],
    'wifi': ['internet', 'connection', 'network', 'wireless'],
    'battery': ['power', 'energy', 'charge', 'electric'],
    'volume': ['sound', 'audio', 'speaker', 'noise']
  };
  
  // Find matching semantic tags
  Object.entries(semanticMappings).forEach(([key, values]) => {
    if (name.includes(key)) {
      tags.push(...values);
    }
  });
  
  return [...new Set(tags)]; // Remove duplicates
}

// Helper function to ensure SVG uses currentColor for theming
function ensureCurrentColor(svg: string): string {
  // First, replace any existing color attributes
  let processedSvg = svg
    .replace(/stroke="(?!none)[^"]*"/g, 'stroke="currentColor"')
    .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"');
    
  // For outline SVGs without explicit stroke attributes, add stroke="currentColor"
  // This handles Ikonate icons which are pure outline SVGs
  if (!processedSvg.includes('stroke=') && !processedSvg.includes('fill=')) {
    // Check if this appears to be an outline icon (has path elements)
    if (processedSvg.includes('<path')) {
      // Handle self-closing path elements
      processedSvg = processedSvg.replace(/<path(?![^>]*stroke=)([^>]*?)\/>/g, '<path$1 stroke="currentColor" fill="none"/>');
      // Handle regular path elements
      processedSvg = processedSvg.replace(/<path(?![^>]*stroke=)([^>]*?)>/g, '<path$1 stroke="currentColor" fill="none">');
      
      // Also handle other shape elements for outline icons
      // Self-closing elements
      processedSvg = processedSvg.replace(/<(circle|ellipse|rect|polygon|polyline)(?![^>]*stroke=)([^>]*?)\/>/g, '<$1$2 stroke="currentColor" fill="none"/>');
      // Regular elements
      processedSvg = processedSvg.replace(/<(circle|ellipse|rect|polygon|polyline)(?![^>]*stroke=)([^>]*?)>/g, '<$1$2 stroke="currentColor" fill="none">');
    }
  }
  
  return processedSvg;
}

// Processed Ikonate icons with proper categorization and tagging
export const ikonateIcons: IconItem[] = Object.entries(iconMap).map(([iconName, svg]) => {
  const category = categorizeIcon(iconName);
  const tags = generateTags(iconName, category);
  const displayName = camelCaseToTitleCase(iconName);
  const themedSvg = ensureCurrentColor(svg);

  return {
    id: `ikonate-${iconName}`,
    name: displayName,
    svg: themedSvg,
    tags: tags,
    style: 'outline',
    category: category,
  };
});