// Working iconoir implementation with real icons
import { type IconItem } from '@/types/icon';
import { 
  Home,
  Search,
  Settings,
  User,
  Mail,
  Bell,
  Calendar,
  Heart,
  Star,
  Lock,
  Edit,
  Trash,
  Plus,
  Check,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Eye,
  Download,
  Upload,
  Copy,
  Cut,
  Folder,
  Phone,
  Camera,
  Play,
  Pause,
  Refresh,
  Cloud,
  Wifi,
  Battery25 as Battery,
  Globe,
  Shield,
  Key,
  Database,
  Server,
  Printer,
  Laptop,
  Timer,
  Alarm,
  MenuScale as Menu,
  SunLight as Sun,
  HalfMoon as Moon
} from 'iconoir-react';

console.log('🟢 ICONOIR: Loading real icons...');

// Manual list of working icons (only ones that actually exist)
const iconList = [
  { name: 'Home', component: Home, category: 'navigation' },
  { name: 'Search', component: Search, category: 'actions' },
  { name: 'Settings', component: Settings, category: 'system' },
  { name: 'User', component: User, category: 'users' },
  { name: 'Mail', component: Mail, category: 'communication' },
  { name: 'Bell', component: Bell, category: 'communication' },
  { name: 'Calendar', component: Calendar, category: 'time' },
  { name: 'Heart', component: Heart, category: 'social' },
  { name: 'Star', component: Star, category: 'social' },
  { name: 'Lock', component: Lock, category: 'security' },
  { name: 'Edit', component: Edit, category: 'actions' },
  { name: 'Trash', component: Trash, category: 'actions' },
  { name: 'Plus', component: Plus, category: 'actions' },
  { name: 'Check', component: Check, category: 'actions' },
  { name: 'Arrow Left', component: ArrowLeft, category: 'navigation' },
  { name: 'Arrow Right', component: ArrowRight, category: 'navigation' },
  { name: 'Arrow Up', component: ArrowUp, category: 'navigation' },
  { name: 'Arrow Down', component: ArrowDown, category: 'navigation' },
  { name: 'Eye', component: Eye, category: 'view' },
  { name: 'Download', component: Download, category: 'actions' },
  { name: 'Upload', component: Upload, category: 'actions' },
  { name: 'Copy', component: Copy, category: 'actions' },
  { name: 'Cut', component: Cut, category: 'actions' },
  { name: 'Folder', component: Folder, category: 'files' },
  { name: 'Phone', component: Phone, category: 'communication' },
  { name: 'Camera', component: Camera, category: 'media' },
  { name: 'Play', component: Play, category: 'media' },
  { name: 'Pause', component: Pause, category: 'media' },
  { name: 'Refresh', component: Refresh, category: 'actions' },
  { name: 'Cloud', component: Cloud, category: 'network' },
  { name: 'Wifi', component: Wifi, category: 'network' },
  { name: 'Battery', component: Battery, category: 'system' },
  { name: 'Globe', component: Globe, category: 'location' },
  { name: 'Shield', component: Shield, category: 'security' },
  { name: 'Key', component: Key, category: 'security' },
  { name: 'Database', component: Database, category: 'system' },
  { name: 'Server', component: Server, category: 'system' },
  { name: 'Printer', component: Printer, category: 'system' },
  { name: 'Laptop', component: Laptop, category: 'system' },
  { name: 'Timer', component: Timer, category: 'time' },
  { name: 'Alarm', component: Alarm, category: 'time' },
  { name: 'Menu', component: Menu, category: 'navigation' },
  { name: 'Sun', component: Sun, category: 'general' },
  { name: 'Moon', component: Moon, category: 'general' }
];

export const iconoirIcons: IconItem[] = iconList.map((icon, index) => {
  console.log(`🟢 ICONOIR: Adding real icon ${icon.name}`);
  
  return {
    id: `iconoir-real-${index}-${icon.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: icon.name,
    svg: icon.component,
    style: 'outline' as const,
    category: icon.category,
    tags: [icon.name.toLowerCase(), icon.category, 'iconoir']
  };
});

console.log('🟢 ICONOIR: Successfully loaded', iconoirIcons.length, 'real icons');

export const iconoirIconCount = iconoirIcons.length;