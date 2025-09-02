// Clean iconoir implementation with only verified working icons
import { type IconItem } from '@/types/icon';
import { 
  // Core working icons
  Home, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ArrowUpLeft, ArrowUpRight, ArrowDownLeft, ArrowDownRight,
  ArrowSeparateVertical, ArrowSeparate, ArrowUnion, MenuScale as Menu, Navigator, 
  NavArrowLeft, NavArrowRight, NavArrowUp, NavArrowDown, Compass,
  Search, Plus, Check, Edit, Trash, Copy, Cut, Download, Upload, Refresh, Undo, Redo,
  ZoomIn, ZoomOut, Expand, Collapse, DragHandGesture,
  Settings, Database, Server, Cpu, HardDrive, Printer, Laptop, Table,
  Mail, Phone, Bell, MessageText, ChatLines, MailOpen,
  Play, Pause, SkipNext, SkipPrev, FastArrowLeft, FastArrowRight, Camera, VideoCamera, 
  Microphone, MicrophoneMute,
  Folder, Page, Archive, FileNotFound,
  User, UserPlus, Group, UserBadgeCheck,
  Heart, Star, ThumbsUp, ThumbsDown, Pin, Bookmark,
  Lock, Key, Shield, ShieldCheck, Eye, Fingerprint,
  Calendar, CalendarPlus, Clock, Timer, Alarm, Hourglass, TimeZone,
  Cloud, CloudCheck, CloudDownload, CloudUpload, Wifi, WifiOff, Globe, Antenna, 
  Bluetooth, BluetoothTag, Network,
  SunLight as Sun, HalfMoon as Moon, Cloud as CloudIcon, Umbrella,
  ShoppingBag, CreditCard, Coins, Dollar, Euro, Pound,
  Activity, Hospital,
  Battery25 as Battery, BatteryFull, BatteryEmpty, BatteryCharging, Wind,
  Hammer, Wrench, Ruler, Palette,
  Text, Code, Terminal, Bug, Git, Github, Package,
  List, ListSelect, Dashboard, Filter, Sort,
  Circle, Square, Triangle, Pentagon, Hexagon, Rhombus, Cylinder, Cube,
  Car, Train, Bus, Bicycle, Walking, Running,
  Puzzle, Gamepad, ColorPicker, Magnet, Rocket, Planet, 
  Atom, Microscope, Binocular, Map, MapPin,
  
  // Additional verified icons
  Erase, InfoCircle, WarningCircle, CheckCircle, XmarkCircle,
  Reports, PhoneIncome, FloppyDisk, FloppyDiskArrowIn, FloppyDiskArrowOut,
  FolderMinus, FolderPlus, CalendarMinus, BatteryWarning, Battery50, Battery75,
  SoundHigh, SoundLow, SoundOff, Brightness, CloudSync, CloudSunny,
  EyeClosed, EyeSolid, LockSlash, PrivateWifi, SecureWindow,
  UserCircle, UserScan, UserCrown, UserStar, UserXmark, PeopleTag,
  HeartSolid, StarSolid, DoubleCheck, Xmark, EditPencil,
  UploadSquare, DownloadSquare, RefreshCircle, RefreshDouble, ExpandLines,
  OpenBook, OpenInWindow, PlaySolid, PauseSolid
} from 'iconoir-react';

console.log('🚀 ICONOIR: Loading clean verified collection...');

// Clean list with only working icons
const iconList = [
  // Navigation
  { name: 'Home', component: Home, category: 'navigation' },
  { name: 'Arrow Left', component: ArrowLeft, category: 'navigation' },
  { name: 'Arrow Right', component: ArrowRight, category: 'navigation' },
  { name: 'Arrow Up', component: ArrowUp, category: 'navigation' },
  { name: 'Arrow Down', component: ArrowDown, category: 'navigation' },
  { name: 'Arrow Up Left', component: ArrowUpLeft, category: 'navigation' },
  { name: 'Arrow Up Right', component: ArrowUpRight, category: 'navigation' },
  { name: 'Arrow Down Left', component: ArrowDownLeft, category: 'navigation' },
  { name: 'Arrow Down Right', component: ArrowDownRight, category: 'navigation' },
  { name: 'Menu', component: Menu, category: 'navigation' },
  { name: 'Navigator', component: Navigator, category: 'navigation' },
  { name: 'Nav Arrow Left', component: NavArrowLeft, category: 'navigation' },
  { name: 'Nav Arrow Right', component: NavArrowRight, category: 'navigation' },
  { name: 'Nav Arrow Up', component: NavArrowUp, category: 'navigation' },
  { name: 'Nav Arrow Down', component: NavArrowDown, category: 'navigation' },
  { name: 'Compass', component: Compass, category: 'navigation' },

  // Actions
  { name: 'Search', component: Search, category: 'actions' },
  { name: 'Plus', component: Plus, category: 'actions' },
  { name: 'Check', component: Check, category: 'actions' },
  { name: 'Double Check', component: DoubleCheck, category: 'actions' },
  { name: 'X Mark', component: Xmark, category: 'actions' },
  { name: 'Edit', component: Edit, category: 'actions' },
  { name: 'Edit Pencil', component: EditPencil, category: 'actions' },
  { name: 'Trash', component: Trash, category: 'actions' },
  { name: 'Copy', component: Copy, category: 'actions' },
  { name: 'Cut', component: Cut, category: 'actions' },
  { name: 'Download', component: Download, category: 'actions' },
  { name: 'Upload', component: Upload, category: 'actions' },
  { name: 'Upload Square', component: UploadSquare, category: 'actions' },
  { name: 'Download Square', component: DownloadSquare, category: 'actions' },
  { name: 'Refresh', component: Refresh, category: 'actions' },
  { name: 'Refresh Circle', component: RefreshCircle, category: 'actions' },
  { name: 'Refresh Double', component: RefreshDouble, category: 'actions' },
  { name: 'Undo', component: Undo, category: 'actions' },
  { name: 'Redo', component: Redo, category: 'actions' },
  { name: 'Zoom In', component: ZoomIn, category: 'actions' },
  { name: 'Zoom Out', component: ZoomOut, category: 'actions' },
  { name: 'Expand', component: Expand, category: 'actions' },
  { name: 'Expand Lines', component: ExpandLines, category: 'actions' },
  { name: 'Collapse', component: Collapse, category: 'actions' },
  { name: 'Save Floppy', component: FloppyDisk, category: 'actions' },
  { name: 'Save In', component: FloppyDiskArrowIn, category: 'actions' },
  { name: 'Save Out', component: FloppyDiskArrowOut, category: 'actions' },
  { name: 'Erase', component: Erase, category: 'actions' },

  // System
  { name: 'Settings', component: Settings, category: 'system' },
  { name: 'Database', component: Database, category: 'system' },
  { name: 'Server', component: Server, category: 'system' },
  { name: 'CPU', component: Cpu, category: 'system' },
  { name: 'Hard Drive', component: HardDrive, category: 'system' },
  { name: 'Printer', component: Printer, category: 'system' },
  { name: 'Laptop', component: Laptop, category: 'system' },
  { name: 'Table', component: Table, category: 'system' },
  { name: 'Battery', component: Battery, category: 'system' },
  { name: 'Battery Full', component: BatteryFull, category: 'system' },
  { name: 'Battery Empty', component: BatteryEmpty, category: 'system' },
  { name: 'Battery Charging', component: BatteryCharging, category: 'system' },
  { name: 'Battery Warning', component: BatteryWarning, category: 'system' },
  { name: 'Battery 50%', component: Battery50, category: 'system' },
  { name: 'Battery 75%', component: Battery75, category: 'system' },
  { name: 'Brightness', component: Brightness, category: 'system' },

  // Communication
  { name: 'Mail', component: Mail, category: 'communication' },
  { name: 'Mail Open', component: MailOpen, category: 'communication' },
  { name: 'Phone', component: Phone, category: 'communication' },
  { name: 'Phone Income', component: PhoneIncome, category: 'communication' },
  { name: 'Bell', component: Bell, category: 'communication' },
  { name: 'Message Text', component: MessageText, category: 'communication' },
  { name: 'Chat Lines', component: ChatLines, category: 'communication' },
  { name: 'Wifi', component: Wifi, category: 'communication' },
  { name: 'Wifi Off', component: WifiOff, category: 'communication' },

  // Media
  { name: 'Play', component: Play, category: 'media' },
  { name: 'Play Solid', component: PlaySolid, category: 'media' },
  { name: 'Pause', component: Pause, category: 'media' },
  { name: 'Pause Solid', component: PauseSolid, category: 'media' },
  { name: 'Skip Next', component: SkipNext, category: 'media' },
  { name: 'Skip Previous', component: SkipPrev, category: 'media' },
  { name: 'Fast Left', component: FastArrowLeft, category: 'media' },
  { name: 'Fast Right', component: FastArrowRight, category: 'media' },
  { name: 'Camera', component: Camera, category: 'media' },
  { name: 'Video Camera', component: VideoCamera, category: 'media' },
  { name: 'Microphone', component: Microphone, category: 'media' },
  { name: 'Microphone Mute', component: MicrophoneMute, category: 'media' },
  { name: 'Sound High', component: SoundHigh, category: 'media' },
  { name: 'Sound Low', component: SoundLow, category: 'media' },
  { name: 'Sound Off', component: SoundOff, category: 'media' },

  // Files
  { name: 'Folder', component: Folder, category: 'files' },
  { name: 'Folder Plus', component: FolderPlus, category: 'files' },
  { name: 'Folder Minus', component: FolderMinus, category: 'files' },
  { name: 'Page', component: Page, category: 'files' },
  { name: 'Archive', component: Archive, category: 'files' },
  { name: 'File Not Found', component: FileNotFound, category: 'files' },
  { name: 'Open Book', component: OpenBook, category: 'files' },
  { name: 'Open In Window', component: OpenInWindow, category: 'files' },

  // Users
  { name: 'User', component: User, category: 'users' },
  { name: 'User Plus', component: UserPlus, category: 'users' },
  { name: 'User Circle', component: UserCircle, category: 'users' },
  { name: 'User Scan', component: UserScan, category: 'users' },
  { name: 'User Crown', component: UserCrown, category: 'users' },
  { name: 'User Star', component: UserStar, category: 'users' },
  { name: 'User X Mark', component: UserXmark, category: 'users' },
  { name: 'Group', component: Group, category: 'users' },
  { name: 'People Tag', component: PeopleTag, category: 'users' },
  { name: 'User Badge Check', component: UserBadgeCheck, category: 'users' },

  // Social
  { name: 'Heart', component: Heart, category: 'social' },
  { name: 'Heart Solid', component: HeartSolid, category: 'social' },
  { name: 'Star', component: Star, category: 'social' },
  { name: 'Star Solid', component: StarSolid, category: 'social' },
  { name: 'Thumbs Up', component: ThumbsUp, category: 'social' },
  { name: 'Thumbs Down', component: ThumbsDown, category: 'social' },
  { name: 'Pin', component: Pin, category: 'social' },
  { name: 'Bookmark', component: Bookmark, category: 'social' },

  // Security
  { name: 'Lock', component: Lock, category: 'security' },
  { name: 'Lock Slash', component: LockSlash, category: 'security' },
  { name: 'Key', component: Key, category: 'security' },
  { name: 'Shield', component: Shield, category: 'security' },
  { name: 'Shield Check', component: ShieldCheck, category: 'security' },
  { name: 'Eye', component: Eye, category: 'security' },
  { name: 'Eye Closed', component: EyeClosed, category: 'security' },
  { name: 'Eye Solid', component: EyeSolid, category: 'security' },
  { name: 'Fingerprint', component: Fingerprint, category: 'security' },
  { name: 'Private Wifi', component: PrivateWifi, category: 'security' },
  { name: 'Secure Window', component: SecureWindow, category: 'security' },

  // Time
  { name: 'Calendar', component: Calendar, category: 'time' },
  { name: 'Calendar Plus', component: CalendarPlus, category: 'time' },
  { name: 'Calendar Minus', component: CalendarMinus, category: 'time' },
  { name: 'Clock', component: Clock, category: 'time' },
  { name: 'Timer', component: Timer, category: 'time' },
  { name: 'Alarm', component: Alarm, category: 'time' },
  { name: 'Hourglass', component: Hourglass, category: 'time' },
  { name: 'Time Zone', component: TimeZone, category: 'time' },

  // Network
  { name: 'Cloud', component: Cloud, category: 'network' },
  { name: 'Cloud Icon', component: CloudIcon, category: 'network' },
  { name: 'Cloud Check', component: CloudCheck, category: 'network' },
  { name: 'Cloud Download', component: CloudDownload, category: 'network' },
  { name: 'Cloud Upload', component: CloudUpload, category: 'network' },
  { name: 'Cloud Sync', component: CloudSync, category: 'network' },
  { name: 'Cloud Sunny', component: CloudSunny, category: 'network' },
  { name: 'Globe', component: Globe, category: 'network' },
  { name: 'Antenna', component: Antenna, category: 'network' },
  { name: 'Bluetooth', component: Bluetooth, category: 'network' },
  { name: 'Bluetooth Tag', component: BluetoothTag, category: 'network' },
  { name: 'Network', component: Network, category: 'network' },

  // Shapes
  { name: 'Circle', component: Circle, category: 'shapes' },
  { name: 'Square', component: Square, category: 'shapes' },
  { name: 'Triangle', component: Triangle, category: 'shapes' },
  { name: 'Pentagon', component: Pentagon, category: 'shapes' },
  { name: 'Hexagon', component: Hexagon, category: 'shapes' },
  { name: 'Rhombus', component: Rhombus, category: 'shapes' },
  { name: 'Cylinder', component: Cylinder, category: 'shapes' },
  { name: 'Cube', component: Cube, category: 'shapes' },

  // Transport
  { name: 'Car', component: Car, category: 'transport' },
  { name: 'Train', component: Train, category: 'transport' },
  { name: 'Bus', component: Bus, category: 'transport' },
  { name: 'Bicycle', component: Bicycle, category: 'transport' },
  { name: 'Walking', component: Walking, category: 'transport' },
  { name: 'Running', component: Running, category: 'transport' },

  // Location
  { name: 'Map', component: Map, category: 'location' },
  { name: 'Map Pin', component: MapPin, category: 'location' },

  // Weather
  { name: 'Sun', component: Sun, category: 'weather' },
  { name: 'Moon', component: Moon, category: 'weather' },
  { name: 'Umbrella', component: Umbrella, category: 'weather' },
  { name: 'Wind', component: Wind, category: 'weather' },

  // Shopping
  { name: 'Shopping Bag', component: ShoppingBag, category: 'shopping' },
  { name: 'Credit Card', component: CreditCard, category: 'shopping' },
  { name: 'Coins', component: Coins, category: 'shopping' },
  { name: 'Dollar', component: Dollar, category: 'shopping' },
  { name: 'Euro', component: Euro, category: 'shopping' },
  { name: 'Pound', component: Pound, category: 'shopping' },

  // Health
  { name: 'Activity', component: Activity, category: 'health' },
  { name: 'Hospital', component: Hospital, category: 'health' },

  // Tools
  { name: 'Hammer', component: Hammer, category: 'tools' },
  { name: 'Wrench', component: Wrench, category: 'tools' },
  { name: 'Ruler', component: Ruler, category: 'tools' },
  { name: 'Palette', component: Palette, category: 'tools' },
  { name: 'Color Picker', component: ColorPicker, category: 'tools' },

  // Interface
  { name: 'List', component: List, category: 'interface' },
  { name: 'List Select', component: ListSelect, category: 'interface' },
  { name: 'Dashboard', component: Dashboard, category: 'interface' },
  { name: 'Filter', component: Filter, category: 'interface' },
  { name: 'Sort', component: Sort, category: 'interface' },
  { name: 'Info Circle', component: InfoCircle, category: 'interface' },
  { name: 'Warning Circle', component: WarningCircle, category: 'interface' },
  { name: 'Check Circle', component: CheckCircle, category: 'interface' },
  { name: 'X Mark Circle', component: XmarkCircle, category: 'interface' },

  // Code & Text
  { name: 'Text', component: Text, category: 'code' },
  { name: 'Code', component: Code, category: 'code' },
  { name: 'Terminal', component: Terminal, category: 'code' },
  { name: 'Bug', component: Bug, category: 'code' },
  { name: 'Git', component: Git, category: 'code' },
  { name: 'Github', component: Github, category: 'code' },
  { name: 'Package', component: Package, category: 'code' },
  { name: 'Reports', component: Reports, category: 'code' },

  // General
  { name: 'Puzzle', component: Puzzle, category: 'general' },
  { name: 'Gamepad', component: Gamepad, category: 'general' },
  { name: 'Magnet', component: Magnet, category: 'general' },
  { name: 'Rocket', component: Rocket, category: 'general' },
  { name: 'Planet', component: Planet, category: 'general' },
  { name: 'Atom', component: Atom, category: 'general' },
  { name: 'Microscope', component: Microscope, category: 'general' },
  { name: 'Binocular', component: Binocular, category: 'general' }
];

export const iconoirIcons: IconItem[] = iconList.map((icon, index) => {
  return {
    id: `iconoir-${index}-${icon.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: icon.name,
    svg: icon.component,
    style: 'outline' as const,
    category: icon.category,
    tags: [icon.name.toLowerCase(), icon.category, 'iconoir']
  };
});

console.log('🚀 ICONOIR: Successfully loaded', iconoirIcons.length, 'clean icons');
console.log('🚀 ICONOIR: Categories:', [...new Set(iconList.map(i => i.category))].join(', '));

export const iconoirIconCount = iconoirIcons.length;