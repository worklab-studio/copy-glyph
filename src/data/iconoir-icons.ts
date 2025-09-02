import { type IconItem } from '@/types/icon';

// Import confirmed working Iconoir icons (using exact names from their library)
import { 
  Home, User, Settings, Search, Calendar,
  Archive, ArrowDown, ArrowLeft, ArrowRight, ArrowUp,
  Bell, Book, Building, Camera, Check, Copy,
  Download, Edit, Eye, Filter, Folder, Globe, Heart, 
  Link, Lock, LogOut, Map, Menu, Minus, Phone, Plus,
  Refresh, Star, Upload, Wifi, Activity, Alarm,
  Apple, Bluetooth, Cloud, Code, Compass, Database, 
  Dollar, Fingerprint, Flash, Gift, Github, Google,
  Language, Laptop, Mail, Microphone, Network,
  Pause, Play, QrCode, Reply, Rocket, Ruler, Shield,
  Terminal, ThumbsDown, ThumbsUp, Timer, Trash,
  Trophy, Truck, Tv, Umbrella, Undo
} from 'iconoir-react';

// Create the icon list with confirmed working icons
const iconComponents = [
  { name: 'Home', component: Home },
  { name: 'User', component: User },
  { name: 'Settings', component: Settings },
  { name: 'Search', component: Search },
  { name: 'Calendar', component: Calendar },
  { name: 'Archive', component: Archive },
  { name: 'Arrow Down', component: ArrowDown },
  { name: 'Arrow Left', component: ArrowLeft },
  { name: 'Arrow Right', component: ArrowRight },
  { name: 'Arrow Up', component: ArrowUp },
  { name: 'Bell', component: Bell },
  { name: 'Book', component: Book },
  { name: 'Building', component: Building },
  { name: 'Camera', component: Camera },
  { name: 'Check', component: Check },
  { name: 'Copy', component: Copy },
  { name: 'Download', component: Download },
  { name: 'Edit', component: Edit },
  { name: 'Eye', component: Eye },
  { name: 'Filter', component: Filter },
  { name: 'Folder', component: Folder },
  { name: 'Globe', component: Globe },
  { name: 'Heart', component: Heart },
  { name: 'Link', component: Link },
  { name: 'Lock', component: Lock },
  { name: 'Log Out', component: LogOut },
  { name: 'Map', component: Map },
  { name: 'Menu', component: Menu },
  { name: 'Minus', component: Minus },
  { name: 'Phone', component: Phone },
  { name: 'Plus', component: Plus },
  { name: 'Refresh', component: Refresh },
  { name: 'Star', component: Star },
  { name: 'Upload', component: Upload },
  { name: 'Wifi', component: Wifi },
  { name: 'Activity', component: Activity },
  { name: 'Alarm', component: Alarm },
  { name: 'Apple', component: Apple },
  { name: 'Bluetooth', component: Bluetooth },
  { name: 'Cloud', component: Cloud },
  { name: 'Code', component: Code },
  { name: 'Compass', component: Compass },
  { name: 'Database', component: Database },
  { name: 'Dollar', component: Dollar },
  { name: 'Fingerprint', component: Fingerprint },
  { name: 'Flash', component: Flash },
  { name: 'Gift', component: Gift },
  { name: 'Github', component: Github },
  { name: 'Google', component: Google },
  { name: 'Language', component: Language },
  { name: 'Laptop', component: Laptop },
  { name: 'Mail', component: Mail },
  { name: 'Microphone', component: Microphone },
  { name: 'Network', component: Network },
  { name: 'Pause', component: Pause },
  { name: 'Play', component: Play },
  { name: 'QR Code', component: QrCode },
  { name: 'Reply', component: Reply },
  { name: 'Rocket', component: Rocket },
  { name: 'Ruler', component: Ruler },
  { name: 'Shield', component: Shield },
  { name: 'Terminal', component: Terminal },
  { name: 'Thumbs Down', component: ThumbsDown },
  { name: 'Thumbs Up', component: ThumbsUp },
  { name: 'Timer', component: Timer },
  { name: 'Trash', component: Trash },
  { name: 'Trophy', component: Trophy },
  { name: 'Truck', component: Truck },
  { name: 'TV', component: Tv },
  { name: 'Umbrella', component: Umbrella },
  { name: 'Undo', component: Undo }
];

// Category mapping for Iconoir icons
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('nav') || lowerName.includes('menu') || lowerName.includes('compass') || lowerName.includes('direction') || name.includes('Arrow') || name === 'Menu') return 'navigation';
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('chat') || lowerName.includes('phone') || lowerName.includes('bell') || lowerName.includes('send') || name === 'Email' || name === 'Phone' || name === 'Bell') return 'communication';
  if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('music') || lowerName.includes('sound') || lowerName.includes('video') || lowerName.includes('camera') || lowerName.includes('film') || lowerName.includes('media') || name === 'Play' || name === 'Pause' || name === 'Music' || name === 'Camera' || name === 'Video') return 'media';
  if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('document') || lowerName.includes('page') || lowerName.includes('archive') || lowerName.includes('save') || name === 'File' || name === 'Folder' || name === 'Archive' || name === 'Save') return 'files';
  if (lowerName.includes('settings') || lowerName.includes('gear') || lowerName.includes('tool') || lowerName.includes('wrench') || lowerName.includes('edit') || lowerName.includes('config') || name === 'Settings' || name === 'Edit') return 'system';
  if (lowerName.includes('dollar') || lowerName.includes('euro') || lowerName.includes('pound') || lowerName.includes('coin') || lowerName.includes('bank') || lowerName.includes('card') || lowerName.includes('payment') || lowerName.includes('money') || lowerName.includes('wallet') || name === 'Dollar' || name === 'Money' || name === 'Wallet') return 'finance';
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('like') || lowerName.includes('favorite') || lowerName.includes('share') || lowerName.includes('social') || name === 'Heart' || name === 'Star' || name === 'Share' || name === 'Favorite') return 'social';
  if (lowerName.includes('user') || lowerName.includes('person') || lowerName.includes('people') || lowerName.includes('profile') || lowerName.includes('account') || lowerName.includes('avatar') || name === 'User' || name === 'Profile') return 'users';
  if (lowerName.includes('lock') || lowerName.includes('key') || lowerName.includes('shield') || lowerName.includes('security') || lowerName.includes('password') || lowerName.includes('safe') || name === 'Lock' || name === 'Shield' || name === 'Password') return 'security';
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('time') || lowerName.includes('date') || lowerName.includes('schedule') || lowerName.includes('timer') || lowerName.includes('watch') || lowerName.includes('alarm') || name === 'Calendar' || name === 'Timer' || name === 'Watch' || name === 'Alarm') return 'time';
  if (lowerName.includes('cloud') || lowerName.includes('sun') || lowerName.includes('moon') || lowerName.includes('rain') || lowerName.includes('weather') || lowerName.includes('temperature') || name === 'Cloud' || name === 'Sun' || name === 'Weather' || name === 'Temperature') return 'weather';
  if (lowerName.includes('map') || lowerName.includes('location') || lowerName.includes('pin') || lowerName.includes('place') || lowerName.includes('globe') || lowerName.includes('earth') || lowerName.includes('building') || lowerName.includes('house') || name === 'Map' || name === 'Globe' || name === 'Building') return 'location';
  if (lowerName.includes('plus') || lowerName.includes('add') || lowerName.includes('minus') || lowerName.includes('remove') || lowerName.includes('delete') || lowerName.includes('close') || lowerName.includes('cancel') || lowerName.includes('check') || lowerName.includes('confirm') || name === 'Add' || name === 'Plus' || name === 'Minus' || name === 'Delete' || name === 'Close' || name === 'Check') return 'actions';
  if (lowerName.includes('eye') || lowerName.includes('view') || lowerName.includes('visible') || lowerName.includes('show') || lowerName.includes('hide') || lowerName.includes('search') || lowerName.includes('zoom') || name === 'Eye' || name === 'View' || name === 'Search' || name === 'Zoom') return 'view';
  if (lowerName.includes('warning') || lowerName.includes('alert') || lowerName.includes('error') || lowerName.includes('info') || lowerName.includes('help') || lowerName.includes('question') || name === 'Warning' || name === 'Info' || name === 'Help' || name === 'Question') return 'alerts';
  if (lowerName.includes('shopping') || lowerName.includes('cart') || lowerName.includes('bag') || lowerName.includes('store') || lowerName.includes('product') || lowerName.includes('price') || name === 'Shopping') return 'commerce';
  if (lowerName.includes('transport') || lowerName.includes('car') || lowerName.includes('bus') || lowerName.includes('train') || lowerName.includes('plane') || lowerName.includes('bike') || lowerName.includes('truck') || name === 'Truck') return 'transport';
  
  return 'general';
};

export const iconoirIcons: IconItem[] = iconComponents.map(({ name, component }) => {
  const category = getCategoryFromName(name);
  
  // Add tags based on icon name patterns
  const tags = [
    name.toLowerCase(),
    category,
    'outline',
    ...(category === 'navigation' ? ['arrow', 'menu', 'direction'] : []),
    ...(category === 'communication' ? ['mail', 'message', 'contact'] : []),
    ...(category === 'media' ? ['audio', 'video', 'entertainment'] : []),
    ...(category === 'files' ? ['document', 'storage', 'data'] : []),
    ...(category === 'system' ? ['settings', 'configuration', 'tools'] : []),
    ...(category === 'social' ? ['like', 'favorite', 'sharing'] : []),
    ...(category === 'users' ? ['profile', 'account', 'people'] : []),
    ...(category === 'security' ? ['privacy', 'protection', 'auth'] : []),
    ...(category === 'time' ? ['schedule', 'date', 'timer'] : []),
    ...(category === 'weather' ? ['climate', 'temperature', 'forecast'] : []),
    ...(category === 'location' ? ['maps', 'places', 'geography'] : []),
    ...(category === 'actions' ? ['buttons', 'controls', 'interface'] : []),
    ...(category === 'view' ? ['visibility', 'display', 'show'] : []),
    ...(category === 'alerts' ? ['notifications', 'warnings', 'info'] : []),
    ...(category === 'commerce' ? ['shopping', 'ecommerce', 'retail'] : []),
    ...(category === 'transport' ? ['vehicles', 'travel', 'mobility'] : []),
  ];

  return {
    id: `iconoir-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name,
    svg: component,
    style: 'outline',
    category,
    tags: [...new Set(tags)]
  };
}).sort((a, b) => a.name.localeCompare(b.name));