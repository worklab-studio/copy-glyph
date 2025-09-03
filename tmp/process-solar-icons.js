// Script to process complete Solar icons dataset
const fs = require('fs');

// Read the raw Solar icons data
const rawData = fs.readFileSync('./tmp/complete-solar-icons-raw.ts', 'utf8');

// Extract the iconMap object from the markdown content
const iconMapMatch = rawData.match(/export const iconMap: Record<string, string> = \{([\s\S]*?)\};/);
if (!iconMapMatch) {
  console.error('Could not find iconMap in raw data');
  process.exit(1);
}

// Parse the iconMap entries
const iconMapContent = iconMapMatch[1];
const iconEntries = [];

// Extract individual icon entries using regex
const iconRegex = /"([^"]+)":\s*`([^`]*?)`/gs;
let match;
while ((match = iconRegex.exec(iconMapContent)) !== null) {
  const [, name, svg] = match;
  if (svg.trim()) {
    iconEntries.push({
      name: name.trim(),
      svg: svg.trim()
    });
  }
}

console.log(`Found ${iconEntries.length} icons`);

// Function to categorize icons
function getCategoryFromName(name) {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('video') || lowerName.includes('camera') || lowerName.includes('photo') || 
      lowerName.includes('image') || lowerName.includes('music') || lowerName.includes('audio') ||
      lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('stop') ||
      lowerName.includes('record') || lowerName.includes('microphone') || lowerName.includes('speaker') ||
      lowerName.includes('volume') || lowerName.includes('headphone') || name.includes('4k')) {
    return 'media';
  }
  
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('chat') ||
      lowerName.includes('phone') || lowerName.includes('call') || lowerName.includes('notification') ||
      lowerName.includes('bell') || lowerName.includes('inbox') || lowerName.includes('send') ||
      lowerName.includes('share') || lowerName.includes('comment') || lowerName.includes('reply')) {
    return 'communication';
  }
  
  if (lowerName.includes('arrow') || lowerName.includes('navigate') || lowerName.includes('direction') ||
      lowerName.includes('compass') || lowerName.includes('map') || lowerName.includes('location') ||
      lowerName.includes('pin') || lowerName.includes('marker') || lowerName.includes('gps') ||
      lowerName.includes('route') || lowerName.includes('path') || lowerName.includes('move')) {
    return 'navigation';
  }
  
  if (lowerName.includes('file') || lowerName.includes('document') || lowerName.includes('folder') ||
      lowerName.includes('pdf') || lowerName.includes('doc') || lowerName.includes('text') ||
      lowerName.includes('page') || lowerName.includes('note') || lowerName.includes('book') ||
      lowerName.includes('archive') || lowerName.includes('download') || lowerName.includes('upload')) {
    return 'files';
  }
  
  if (lowerName.includes('setting') || lowerName.includes('config') || lowerName.includes('gear') ||
      lowerName.includes('tool') || lowerName.includes('wrench') || lowerName.includes('system') ||
      lowerName.includes('control') || lowerName.includes('panel') || lowerName.includes('admin') ||
      lowerName.includes('server') || lowerName.includes('database') || lowerName.includes('code')) {
    return 'system';
  }
  
  if (lowerName.includes('user') || lowerName.includes('person') || lowerName.includes('profile') ||
      lowerName.includes('account') || lowerName.includes('avatar') || lowerName.includes('team') ||
      lowerName.includes('group') || lowerName.includes('social') || lowerName.includes('friend') ||
      lowerName.includes('follow') || lowerName.includes('like') || lowerName.includes('heart')) {
    return 'users';
  }
  
  if (lowerName.includes('home') || lowerName.includes('house') || lowerName.includes('building') ||
      lowerName.includes('office') || lowerName.includes('shop') || lowerName.includes('store') ||
      lowerName.includes('hospital') || lowerName.includes('school') || lowerName.includes('bank')) {
    return 'buildings';
  }
  
  return 'general';
}

// Function to get style from name
function getStyleFromName(name) {
  if (name.includes('-bold-duotone')) return 'bold-duotone';
  if (name.includes('-broken')) return 'broken';
  if (name.includes('-bold')) return 'bold';
  if (name.includes('-outline')) return 'outline';
  if (name.includes('-linear')) return 'linear';
  if (name.includes('-2') || name.includes('-3') || name.includes('-4')) return 'variant';
  return 'linear';
}

// Function to clean icon name
function cleanIconName(name) {
  return name
    .replace(/-bold-duotone.*$/, '')
    .replace(/-broken.*$/, '')
    .replace(/-bold.*$/, '')
    .replace(/-outline.*$/, '')
    .replace(/-linear.*$/, '')
    .replace(/-\d+$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

// Process icons and create optimized output
const processedIcons = iconEntries.slice(0, 2000).map(({ name, svg }) => {
  const processedSvg = svg
    .replace(/fill="black"/g, 'fill="currentColor"')
    .replace(/fill="#1C274C"/g, 'fill="currentColor"')
    .replace(/stroke="black"/g, 'stroke="currentColor"')
    .replace(/stroke="#1C274C"/g, 'stroke="currentColor"');
    
  return {
    name,
    cleanName: cleanIconName(name),
    svg: processedSvg,
    category: getCategoryFromName(name),
    style: getStyleFromName(name)
  };
});

// Generate the output file
const output = `import { type IconItem } from "@/types/icon";

// Complete Solar Icons Dataset - ${processedIcons.length} icons from the full Solar library
// Auto-generated from Solar Icons Library with proper theming and categorization

export const iconMap: Record<string, string> = {
${processedIcons.map(icon => `  "${icon.name}": \`${icon.svg}\``).join(',\n')}
};

// Comprehensive categorization function for Solar icons
export function getCategoryFromName(name: string): string {
  const lowerName = name.toLowerCase();
  
  // Media & Entertainment
  if (lowerName.includes('video') || lowerName.includes('camera') || lowerName.includes('photo') || 
      lowerName.includes('image') || lowerName.includes('music') || lowerName.includes('audio') ||
      lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('stop') ||
      lowerName.includes('record') || lowerName.includes('microphone') || lowerName.includes('speaker') ||
      lowerName.includes('volume') || lowerName.includes('headphone') || name.includes('4k')) {
    return 'media';
  }
  
  // Communication
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('chat') ||
      lowerName.includes('phone') || lowerName.includes('call') || lowerName.includes('notification') ||
      lowerName.includes('bell') || lowerName.includes('inbox') || lowerName.includes('send') ||
      lowerName.includes('share') || lowerName.includes('comment') || lowerName.includes('reply')) {
    return 'communication';
  }
  
  // Navigation & Movement
  if (lowerName.includes('arrow') || lowerName.includes('navigate') || lowerName.includes('direction') ||
      lowerName.includes('compass') || lowerName.includes('map') || lowerName.includes('location') ||
      lowerName.includes('pin') || lowerName.includes('marker') || lowerName.includes('gps') ||
      lowerName.includes('route') || lowerName.includes('path') || lowerName.includes('move')) {
    return 'navigation';
  }
  
  // Files & Documents
  if (lowerName.includes('file') || lowerName.includes('document') || lowerName.includes('folder') ||
      lowerName.includes('pdf') || lowerName.includes('doc') || lowerName.includes('text') ||
      lowerName.includes('page') || lowerName.includes('note') || lowerName.includes('book') ||
      lowerName.includes('archive') || lowerName.includes('download') || lowerName.includes('upload')) {
    return 'files';
  }
  
  // System & Settings
  if (lowerName.includes('setting') || lowerName.includes('config') || lowerName.includes('gear') ||
      lowerName.includes('tool') || lowerName.includes('wrench') || lowerName.includes('system') ||
      lowerName.includes('control') || lowerName.includes('panel') || lowerName.includes('admin') ||
      lowerName.includes('server') || lowerName.includes('database') || lowerName.includes('code')) {
    return 'system';
  }
  
  // Actions & Controls
  if (lowerName.includes('add') || lowerName.includes('plus') || lowerName.includes('minus') ||
      lowerName.includes('delete') || lowerName.includes('remove') || lowerName.includes('edit') ||
      lowerName.includes('save') || lowerName.includes('copy') || lowerName.includes('paste') ||
      lowerName.includes('cut') || lowerName.includes('undo') || lowerName.includes('redo') ||
      lowerName.includes('refresh') || lowerName.includes('reload') || lowerName.includes('sync')) {
    return 'actions';
  }
  
  // Social & Users
  if (lowerName.includes('user') || lowerName.includes('person') || lowerName.includes('profile') ||
      lowerName.includes('account') || lowerName.includes('avatar') || lowerName.includes('team') ||
      lowerName.includes('group') || lowerName.includes('social') || lowerName.includes('friend') ||
      lowerName.includes('follow') || lowerName.includes('like') || lowerName.includes('heart')) {
    return 'users';
  }
  
  // Buildings & Places
  if (lowerName.includes('home') || lowerName.includes('house') || lowerName.includes('building') ||
      lowerName.includes('office') || lowerName.includes('shop') || lowerName.includes('store') ||
      lowerName.includes('hospital') || lowerName.includes('school') || lowerName.includes('bank') ||
      lowerName.includes('hotel') || lowerName.includes('restaurant') || lowerName.includes('church')) {
    return 'buildings';
  }
  
  // Weather & Nature
  if (lowerName.includes('sun') || lowerName.includes('moon') || lowerName.includes('cloud') ||
      lowerName.includes('rain') || lowerName.includes('snow') || lowerName.includes('storm') ||
      lowerName.includes('weather') || lowerName.includes('temperature') || lowerName.includes('wind') ||
      lowerName.includes('tree') || lowerName.includes('leaf') || lowerName.includes('flower')) {
    return 'weather';
  }
  
  // Commerce & Business
  if (lowerName.includes('shop') || lowerName.includes('cart') || lowerName.includes('buy') ||
      lowerName.includes('sell') || lowerName.includes('price') || lowerName.includes('money') ||
      lowerName.includes('dollar') || lowerName.includes('payment') || lowerName.includes('card') ||
      lowerName.includes('wallet') || lowerName.includes('coin') || lowerName.includes('business')) {
    return 'commerce';
  }
  
  // Security & Safety
  if (lowerName.includes('lock') || lowerName.includes('unlock') || lowerName.includes('key') ||
      lowerName.includes('security') || lowerName.includes('shield') || lowerName.includes('protect') ||
      lowerName.includes('safe') || lowerName.includes('password') || lowerName.includes('auth') ||
      lowerName.includes('login') || lowerName.includes('logout') || lowerName.includes('privacy')) {
    return 'security';
  }
  
  // Time & Calendar
  if (lowerName.includes('time') || lowerName.includes('clock') || lowerName.includes('calendar') ||
      lowerName.includes('date') || lowerName.includes('schedule') || lowerName.includes('event') ||
      lowerName.includes('timer') || lowerName.includes('alarm') || lowerName.includes('watch') ||
      lowerName.includes('hour') || lowerName.includes('minute') || lowerName.includes('second')) {
    return 'time';
  }
  
  // Technology & Devices
  if (lowerName.includes('computer') || lowerName.includes('laptop') || lowerName.includes('mobile') ||
      lowerName.includes('tablet') || lowerName.includes('phone') || lowerName.includes('device') ||
      lowerName.includes('screen') || lowerName.includes('monitor') || lowerName.includes('keyboard') ||
      lowerName.includes('mouse') || lowerName.includes('printer') || lowerName.includes('scanner') ||
      lowerName.includes('wifi') || lowerName.includes('bluetooth') || lowerName.includes('usb') ||
      lowerName.includes('battery') || lowerName.includes('charge') || lowerName.includes('power') ||
      lowerName.includes('accessibility')) {
    return 'technology';
  }
  
  return 'general';
}

// Extract style from icon name (Solar icons have various style suffixes)
export function getStyleFromName(name: string): string {
  if (name.includes('-bold-duotone') || name.includes('-bold-duotone-')) return 'bold-duotone';
  if (name.includes('-broken') || name.includes('-broken-')) return 'broken';
  if (name.includes('-bold') || name.includes('-bold-')) return 'bold';
  if (name.includes('-outline') || name.includes('-outline-')) return 'outline';
  if (name.includes('-linear') || name.includes('-linear-')) return 'linear';
  if (name.includes('-2') || name.includes('-3') || name.includes('-4') || name.includes('-5') || name.includes('-6')) {
    return 'variant';
  }
  return 'linear';
}

// Clean and format icon name for display
export function cleanIconName(name: string): string {
  return name
    .replace(/-bold-duotone.*$/, '')
    .replace(/-broken.*$/, '')
    .replace(/-bold.*$/, '')
    .replace(/-outline.*$/, '')
    .replace(/-linear.*$/, '')
    .replace(/-\d+$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

// Process SVG to ensure proper theming
export function processSvg(svg: string): string {
  return svg
    .replace(/fill="black"/g, 'fill="currentColor"')
    .replace(/fill="#1C274C"/g, 'fill="currentColor"')
    .replace(/stroke="black"/g, 'stroke="currentColor"')
    .replace(/stroke="#1C274C"/g, 'stroke="currentColor"');
}

// Generate complete Solar icons dataset
export const solarIcons: IconItem[] = Object.entries(iconMap).map(([name, svg]) => ({
  id: \`solar-\${name}\`,
  name: cleanIconName(name),
  svg: processSvg(svg),
  style: getStyleFromName(name),
  category: getCategoryFromName(name),
  tags: [
    cleanIconName(name).toLowerCase(),
    getCategoryFromName(name),
    getStyleFromName(name),
    'solar',
    'icon'
  ].filter(Boolean)
}));`;

fs.writeFileSync('./src/data/solar-icons-new.ts', output);
console.log('Generated new solar-icons.ts with', processedIcons.length, 'icons');