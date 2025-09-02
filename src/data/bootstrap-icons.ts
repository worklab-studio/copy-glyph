import { type ComponentType } from 'react';
import { type IconItem } from '@/types/icon';
// Import some Bootstrap icons manually to test
import { 
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  House, Heart, Star, Search, Plus, Dash,
  X, Check, Gear, Bell, Envelope,
  Calendar, Clock, Lock, Eye, Cart, File,
  Folder, Person, People, Shield, Globe,
  Camera, Play, Pause, Download
} from 'react-bootstrap-icons';

// Manual list of icons for now (we can expand this later)
const manualBootstrapIcons = [
  { name: 'ArrowRight', component: ArrowRight },
  { name: 'ArrowLeft', component: ArrowLeft },
  { name: 'ArrowUp', component: ArrowUp },
  { name: 'ArrowDown', component: ArrowDown },
  { name: 'House', component: House },
  { name: 'Heart', component: Heart },
  { name: 'Star', component: Star },
  { name: 'Search', component: Search },
  { name: 'Plus', component: Plus },
  { name: 'Dash', component: Dash },
  { name: 'X', component: X },
  { name: 'Check', component: Check },
  { name: 'Gear', component: Gear },
  { name: 'Bell', component: Bell },
  { name: 'Envelope', component: Envelope },
  { name: 'Calendar', component: Calendar },
  { name: 'Clock', component: Clock },
  { name: 'Lock', component: Lock },
  { name: 'Eye', component: Eye },
  { name: 'Cart', component: Cart },
  { name: 'File', component: File },
  { name: 'Folder', component: Folder },
  { name: 'Person', component: Person },
  { name: 'People', component: People },
  { name: 'Shield', component: Shield },
  { name: 'Globe', component: Globe },
  { name: 'Camera', component: Camera },
  { name: 'Play', component: Play },
  { name: 'Pause', component: Pause },
  { name: 'Download', component: Download },
];

// Category mapping for Bootstrap icons
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('chevron') || lowerName.includes('navigation') || lowerName.includes('menu') || lowerName.includes('house') || lowerName.includes('compass')) return 'navigation';
  if (lowerName.includes('envelope') || lowerName.includes('telephone') || lowerName.includes('chat') || lowerName.includes('bell') || lowerName.includes('megaphone') || lowerName.includes('broadcast')) return 'communication';
  if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('music') || lowerName.includes('volume') || lowerName.includes('camera') || lowerName.includes('film') || lowerName.includes('image') || lowerName.includes('mic')) return 'media';
  if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('archive') || lowerName.includes('download') || lowerName.includes('upload') || lowerName.includes('save') || lowerName.includes('document')) return 'files';
  if (lowerName.includes('gear') || lowerName.includes('tools') || lowerName.includes('wrench') || lowerName.includes('nut') || lowerName.includes('hammer') || lowerName.includes('screwdriver')) return 'system';
  if (lowerName.includes('currency') || lowerName.includes('cash') || lowerName.includes('credit') || lowerName.includes('piggy') || lowerName.includes('wallet') || lowerName.includes('coin')) return 'finance';
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('share') || lowerName.includes('thumb') || lowerName.includes('hand') || lowerName.includes('suit')) return 'social';
  if (lowerName.includes('person') || lowerName.includes('people') || lowerName.includes('user') || lowerName.includes('contact') || lowerName.includes('team') || lowerName.includes('group')) return 'users';
  if (lowerName.includes('lock') || lowerName.includes('key') || lowerName.includes('shield') || lowerName.includes('eye') || lowerName.includes('security') || lowerName.includes('safe')) return 'security';
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('watch') || lowerName.includes('alarm') || lowerName.includes('stopwatch') || lowerName.includes('hourglass')) return 'time';
  if (lowerName.includes('cloud') || lowerName.includes('sun') || lowerName.includes('moon') || lowerName.includes('brightness') || lowerName.includes('snow') || lowerName.includes('rain')) return 'weather';
  if (lowerName.includes('geo') || lowerName.includes('map') || lowerName.includes('pin') || lowerName.includes('globe') || lowerName.includes('building') || lowerName.includes('signpost')) return 'location';
  if (lowerName.includes('plus') || lowerName.includes('dash') || lowerName.includes('x') || lowerName.includes('check') || lowerName.includes('search') || lowerName.includes('zoom')) return 'actions';
  if (lowerName.includes('exclamation') || lowerName.includes('question') || lowerName.includes('info') || lowerName.includes('patch')) return 'alerts';
  if (lowerName.includes('cart') || lowerName.includes('bag') || lowerName.includes('shop') || lowerName.includes('basket') || lowerName.includes('tag') || lowerName.includes('receipt')) return 'commerce';
  if (lowerName.includes('device') || lowerName.includes('phone') || lowerName.includes('laptop') || lowerName.includes('display') || lowerName.includes('tablet') || lowerName.includes('tv')) return 'devices';
  if (lowerName.includes('bootstrap') || lowerName.includes('github') || lowerName.includes('twitter') || lowerName.includes('facebook') || lowerName.includes('google') || lowerName.includes('linkedin')) return 'brands';
  if (lowerName.includes('emoji') || lowerName.includes('dice') || lowerName.includes('suit') || lowerName.includes('controller') || lowerName.includes('puzzle')) return 'entertainment';
  if (lowerName.includes('type') || lowerName.includes('text') || lowerName.includes('fonts') || lowerName.includes('justify') || lowerName.includes('indent') || lowerName.includes('list')) return 'typography';
  
  return 'general';
};

export const bootstrapIcons: IconItem[] = manualBootstrapIcons.map(({ name, component }) => {
  const category = getCategoryFromName(name);
  
  // Add tags based on icon name patterns
  const tags = [
    name.toLowerCase(),
    category,
    'bootstrap',
    'outline',
    ...(name.includes('Arrow') ? ['arrow', 'navigation'] : []),
    ...(name.includes('Check') ? ['check', 'success'] : []),
    ...(name.includes('X') ? ['close', 'cancel'] : []),
    ...(name.includes('Plus') ? ['add', 'create'] : []),
    ...(name.includes('Dash') ? ['remove', 'subtract'] : []),
    ...(name.includes('Search') ? ['find', 'lookup'] : []),
    ...(name.includes('Star') ? ['favorite', 'rating'] : []),
    ...(name.includes('Heart') ? ['love', 'like'] : []),
    ...(name.includes('House') ? ['home', 'main'] : []),
    ...(name.includes('Person') ? ['user', 'profile'] : []),
    ...(name.includes('Gear') ? ['settings', 'configure'] : []),
    ...(name.includes('Bell') ? ['notification', 'alert'] : []),
    ...(name.includes('Envelope') ? ['email', 'message'] : []),
    ...(name.includes('Calendar') ? ['date', 'schedule'] : []),
    ...(name.includes('Clock') ? ['time', 'schedule'] : []),
    ...(name.includes('Lock') ? ['secure', 'private'] : []),
    ...(name.includes('Eye') ? ['view', 'visibility'] : []),
    ...(name.includes('Cart') ? ['shopping', 'purchase'] : []),
    ...(name.includes('File') ? ['document', 'storage'] : []),
    ...(name.includes('Folder') ? ['directory', 'storage'] : []),
  ];

  return {
    id: `bootstrap-${name.toLowerCase()}`,
    name,
    svg: component as ComponentType<any>,
    style: 'outline',
    category,
    tags: [...new Set(tags)]
  };
}).sort((a, b) => a.name.localeCompare(b.name));