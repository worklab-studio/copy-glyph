// Direct imports for confirmed working Iconoir icons
import { 
  Home, User, Settings, Search, Calendar, Archive, ArrowDown, ArrowLeft, ArrowRight, ArrowUp,
  Bell, Book, Building, Camera, Check, Copy, Download, Edit, Eye, Filter, Folder, Globe, Heart, 
  Link, Lock, LogOut, Map, Menu, Minus, Phone, Plus, Refresh, Star, Upload, Wifi, Activity,
  Alarm, Apple, Bluetooth, Cloud, Code, Compass, Database, Dollar, Fingerprint, Flash, Gift,
  Github, Google, Language, Laptop, Mail, Microphone, Network, Pause, Play, QrCode, Reply,
  Rocket, Ruler, Shield, Terminal, ThumbsDown, ThumbsUp, Timer, Trash, Trophy, Truck, Tv,
  Umbrella, Undo, Circle, Square, CheckCircle, Drag, FastArrowDown,
  FastArrowLeft, FastArrowRight, FastArrowUp, MoreHoriz, MoreVert, NavArrowDown, NavArrowLeft,
  NavArrowRight, NavArrowUp, OpenBook, PageEdit, PageSearch, QuestionMark, SendMail,
  SystemShut, TvFix, UserCircle, ViewGrid, Xmark
} from 'iconoir-react';

import { type IconItem } from '@/types/icon';

// Create a comprehensive list of working Iconoir icons
const iconComponents = [
  { name: 'Home', component: Home }, { name: 'User', component: User }, { name: 'Settings', component: Settings },
  { name: 'Search', component: Search }, { name: 'Calendar', component: Calendar }, { name: 'Archive', component: Archive },
  { name: 'Arrow Down', component: ArrowDown }, { name: 'Arrow Left', component: ArrowLeft }, { name: 'Arrow Right', component: ArrowRight },
  { name: 'Arrow Up', component: ArrowUp }, { name: 'Bell', component: Bell }, { name: 'Book', component: Book },
  { name: 'Building', component: Building }, { name: 'Camera', component: Camera }, { name: 'Check', component: Check },
  { name: 'Copy', component: Copy }, { name: 'Download', component: Download }, { name: 'Edit', component: Edit },
  { name: 'Eye', component: Eye }, { name: 'Filter', component: Filter }, { name: 'Folder', component: Folder },
  { name: 'Globe', component: Globe }, { name: 'Heart', component: Heart }, { name: 'Link', component: Link },
  { name: 'Lock', component: Lock }, { name: 'Log Out', component: LogOut }, { name: 'Map', component: Map },
  { name: 'Menu', component: Menu }, { name: 'Minus', component: Minus }, { name: 'Phone', component: Phone },
  { name: 'Plus', component: Plus }, { name: 'Refresh', component: Refresh }, { name: 'Star', component: Star },
  { name: 'Upload', component: Upload }, { name: 'Wifi', component: Wifi }, { name: 'Activity', component: Activity },
  { name: 'Alarm', component: Alarm }, { name: 'Apple', component: Apple }, { name: 'Bluetooth', component: Bluetooth },
  { name: 'Cloud', component: Cloud }, { name: 'Code', component: Code }, { name: 'Compass', component: Compass },
  { name: 'Database', component: Database }, { name: 'Dollar', component: Dollar }, { name: 'Fingerprint', component: Fingerprint },
  { name: 'Flash', component: Flash }, { name: 'Gift', component: Gift }, { name: 'Github', component: Github },
  { name: 'Google', component: Google }, { name: 'Language', component: Language }, { name: 'Laptop', component: Laptop },
  { name: 'Mail', component: Mail }, { name: 'Microphone', component: Microphone }, { name: 'Network', component: Network },
  { name: 'Pause', component: Pause }, { name: 'Play', component: Play }, { name: 'QR Code', component: QrCode },
  { name: 'Reply', component: Reply }, { name: 'Rocket', component: Rocket }, { name: 'Ruler', component: Ruler },
  { name: 'Shield', component: Shield }, { name: 'Terminal', component: Terminal }, { name: 'Thumbs Down', component: ThumbsDown },
  { name: 'Thumbs Up', component: ThumbsUp }, { name: 'Timer', component: Timer }, { name: 'Trash', component: Trash },
  { name: 'Trophy', component: Trophy }, { name: 'Truck', component: Truck }, { name: 'TV', component: Tv },
  { name: 'Umbrella', component: Umbrella }, { name: 'Undo', component: Undo }, { name: 'Circle', component: Circle },
  { name: 'Square', component: Square }, { name: 'Check Circle', component: CheckCircle }, 
  { name: 'Drag', component: Drag }, { name: 'Fast Arrow Down', component: FastArrowDown }, { name: 'Fast Arrow Left', component: FastArrowLeft },
  { name: 'Fast Arrow Right', component: FastArrowRight }, { name: 'Fast Arrow Up', component: FastArrowUp }, { name: 'More Horizontal', component: MoreHoriz },
  { name: 'More Vertical', component: MoreVert }, { name: 'Nav Arrow Down', component: NavArrowDown }, { name: 'Nav Arrow Left', component: NavArrowLeft },
  { name: 'Nav Arrow Right', component: NavArrowRight }, { name: 'Nav Arrow Up', component: NavArrowUp }, { name: 'Open Book', component: OpenBook },
  { name: 'Page Edit', component: PageEdit }, { name: 'Page Search', component: PageSearch }, { name: 'Question Mark', component: QuestionMark },
  { name: 'Send Mail', component: SendMail }, { name: 'System Shut', component: SystemShut },
  { name: 'TV Fix', component: TvFix }, { name: 'User Circle', component: UserCircle }, { name: 'View Grid', component: ViewGrid },
  { name: 'X Mark', component: Xmark }
];

// Category mapping for better organization
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('nav') || lowerName.includes('menu') || name.includes('Arrow') || name === 'Menu') return 'navigation';
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('phone') || name === 'Mail' || name === 'Phone' || name === 'Bell') return 'communication';
  if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('music') || lowerName.includes('camera') || name === 'Play' || name === 'Pause' || name === 'Camera') return 'media';
  if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('archive') || lowerName.includes('page') || name === 'Folder' || name === 'Archive') return 'files';
  if (lowerName.includes('settings') || lowerName.includes('gear') || lowerName.includes('edit') || name === 'Settings' || name === 'Edit') return 'system';
  if (lowerName.includes('user') || lowerName.includes('person') || lowerName.includes('profile') || name === 'User') return 'users';
  if (lowerName.includes('heart') || lowerName.includes('star') || name === 'Heart' || name === 'Star') return 'social';
  if (lowerName.includes('lock') || lowerName.includes('shield') || name === 'Lock' || name === 'Shield') return 'security';
  if (lowerName.includes('calendar') || lowerName.includes('timer') || lowerName.includes('alarm') || name === 'Calendar' || name === 'Timer' || name === 'Alarm') return 'time';
  if (lowerName.includes('plus') || lowerName.includes('add') || lowerName.includes('minus') || lowerName.includes('check') || name === 'Plus' || name === 'Check') return 'actions';
  if (lowerName.includes('eye') || lowerName.includes('view') || lowerName.includes('search') || name === 'Eye' || name === 'Search') return 'view';
  if (lowerName.includes('map') || lowerName.includes('globe') || lowerName.includes('building') || name === 'Map' || name === 'Globe' || name === 'Building') return 'location';
  if (lowerName.includes('cloud') || lowerName.includes('wifi') || name === 'Cloud' || name === 'Wifi') return 'network';
  
  return 'general';
};

// Simple test - just log when this file loads
console.log('✅ Iconoir module loaded - timestamp:', Date.now());

export const iconoirIcons: IconItem[] = iconComponents.map(({ name, component }) => {
  const category = getCategoryFromName(name);
  
  return {
    id: `iconoir-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name,
    svg: component,
    style: 'outline' as const,
    category,
    tags: [name.toLowerCase(), category, 'outline', 'iconoir']
  };
}).sort((a, b) => a.name.localeCompare(b.name));

// Final verification log
console.log('✅ Iconoir icons created:', iconoirIcons.length, 'icons');