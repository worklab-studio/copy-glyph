// Verified working Iconoir icons collection - only confirmed existing icons
import { type IconItem } from '@/types/icon';
import { 
  // Navigation & Arrows
  Home, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ArrowUpLeft, ArrowUpRight, ArrowDownLeft, ArrowDownRight,
  ArrowSeparateVertical, ArrowSeparate, ArrowUnion, MenuScale as Menu, Navigator, 
  NavArrowLeft, NavArrowRight, NavArrowUp, NavArrowDown, Compass, ArrowArchery,
  ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, ArrowDownCircle,
  
  // Basic Actions
  Search, Plus, Check, Edit, Trash, Copy, Cut, Download, Upload, Refresh, Undo, Redo,
  ZoomIn, ZoomOut, Expand, Collapse, DragHandGesture, DoubleCheck, Xmark, EditPencil,
  UploadSquare, DownloadSquare, RefreshCircle, RefreshDouble, ExpandLines, Erase,
  
  // Status & Feedback
  InfoCircle, WarningCircle, CheckCircle, XmarkCircle, QuestionMark,
  
  // System & Hardware
  Settings, Database, Server, Cpu, HardDrive, Printer, Laptop, Table, Tv,
  Battery25 as Battery, BatteryFull, BatteryEmpty, BatteryCharging, BatteryWarning, Battery50, Battery75,
  Brightness, BrightnessWindow, Hdr, Display4k as Display, Usb,
  
  // Communication
  Mail, Phone, Bell, MessageText, ChatLines, MailOpen, MailIn, MailOut,
  PhoneIncome, PhonePaused, Wifi, WifiOff, PrivateWifi, Message, MessageAlert,
  ChatBubble, ChatBubbleCheck, ShareAndroid, ShareIos, Forward, Reply, ReplyToMessage,
  
  // Media & Entertainment
  Play, Pause, SkipNext, SkipPrev, FastArrowLeft, FastArrowRight, Camera, VideoCamera,
  Microphone, MicrophoneMute, SoundHigh, SoundLow, SoundOff, PlaySolid, PauseSolid,
  VideoProjector, MusicDoubleNote, MusicNote, MediaImage, MediaVideo, MediaImageFolder,
  
  // Files & Documents
  Folder, Page, Archive, FileNotFound, FolderPlus, FolderMinus, FolderWarning,
  OpenBook, Book, BookStack, Bookmark, BookmarkBook, Journal, JournalPage,
  OpenInWindow, FloppyDisk, FloppyDiskArrowIn, FloppyDiskArrowOut, 
  PageMinus, PageEdit, PageSearch, PageFlip, Reports,
  
  // Users & Social
  User, UserPlus, Group, UserBadgeCheck, UserLove, UserCircle, UserScan, 
  UserCrown, UserStar, UserXmark,
  Heart, Star, ThumbsUp, ThumbsDown, Pin, HeartSolid, StarSolid, HeartArrowDown,
  
  // Security
  Lock, Key, Shield, ShieldCheck, Eye, EyeClosed, EyeSolid, Fingerprint, 
  LockSlash, SecurityPass, SecureWindow,
  
  // Time & Calendar
  Calendar, CalendarPlus, CalendarMinus, CalendarCheck, Clock, Timer, Alarm, 
  Hourglass, TimeZone, TimerOff,
  
  // Cloud & Network
  Cloud, CloudCheck, CloudDownload, CloudUpload, CloudSync, CloudSunny, Globe, 
  Antenna, Bluetooth, BluetoothTag, Network,
  
  // Transportation
  Car, Train, Bus, Bicycle, Walking, Running, Rocket, Motorcycle, Truck, Tram, Metro, Drone,
  
  // Weather & Nature
  SunLight as Sun, HalfMoon as Moon, Umbrella, Wind, TemperatureUp, TemperatureDown, SnowFlake, Droplet, 
  Leaf, Tree, Planet, Flower, Fish, Spark,
  
  // Shopping & Finance
  ShoppingBag, CreditCard, Coins, Dollar, Euro, Pound, Yen, Cart,
  
  // Health & Medical
  Activity, Hospital, HealthShield, Dna,
  
  // Tools & Construction
  Hammer, Wrench, Ruler, Palette, ColorPicker, TriangleFlag, 
  Magnet, MagnetEnergy, Tools,
  
  // Layout & UI
  List, ListSelect, Dashboard, Filter, Sort, LayoutLeft, LayoutRight, Maximize, 
  Windows as Window, Frame, FrameAlt,
  
  // Development
  Code, Terminal, Bug, Git, Github, Package, Repository, GitPullRequest,
  
  // Shapes & 3D
  Circle, Square, Triangle, Pentagon, Hexagon, Octagon, Rhombus, 
  Cylinder, Cube, Sphere,
  
  // Buildings & Places
  Tower, Church, Elevator, Bed, Lamp,
  
  // Science & Space
  Atom, PlanetSat, Binocular, Microscope, TestTube, Flask,
  
  // Sports & Games
  Basketball, Football, Golf, Swimming, Cycling, Gym, Weight, Archery, Puzzle, Gamepad,
  
  // Maps & Location
  Map, MapPin,
  
  // Text & Typography
  Text,
  
  // Electric Vehicle
  EvPlug, EvCharge, EvStation,
  
  // Additional working icons
  Crop, Minus, AppNotification, StatDown, StatUp, GraphUp, GraphDown,
  SystemRestart, WifiSignalNone, PcWarning, CropRotateBl, ClockRotateRight,
  FramePlusIn, FrameMinusIn
} from 'iconoir-react';

const iconComponents = [
  // Navigation & Arrows
  Home, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ArrowUpLeft, ArrowUpRight, ArrowDownLeft, ArrowDownRight,
  ArrowSeparateVertical, ArrowSeparate, ArrowUnion, Menu, Navigator, 
  NavArrowLeft, NavArrowRight, NavArrowUp, NavArrowDown, Compass, ArrowArchery,
  ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, ArrowDownCircle,
  
  // Basic Actions
  Search, Plus, Check, Edit, Trash, Copy, Cut, Download, Upload, Refresh, Undo, Redo,
  ZoomIn, ZoomOut, Expand, Collapse, DragHandGesture, DoubleCheck, Xmark, EditPencil,
  UploadSquare, DownloadSquare, RefreshCircle, RefreshDouble, ExpandLines, Erase,
  
  // Status & Feedback
  InfoCircle, WarningCircle, CheckCircle, XmarkCircle, QuestionMark,
  AppNotification, PcWarning,
  
  // System & Hardware
  Settings, Database, Server, Cpu, HardDrive, Printer, Laptop, Table, Tv,
  Battery, BatteryFull, BatteryEmpty, BatteryCharging, BatteryWarning, Battery50, Battery75,
  Brightness, BrightnessWindow, Hdr, Display, Usb, SystemRestart,
  
  // Communication
  Mail, Phone, Bell, MessageText, ChatLines, MailOpen, MailIn, MailOut,
  PhoneIncome, PhonePaused, Message, MessageAlert,
  ChatBubble, ChatBubbleCheck, ShareAndroid, ShareIos, Forward, Reply, ReplyToMessage,
  
  // Connectivity
  Wifi, WifiOff, WifiSignalNone, PrivateWifi, Antenna, 
  Bluetooth, BluetoothTag, Network,
  
  // Media & Entertainment
  Play, Pause, SkipNext, SkipPrev, FastArrowLeft, FastArrowRight, Camera, VideoCamera,
  Microphone, MicrophoneMute, SoundHigh, SoundLow, SoundOff, PlaySolid, PauseSolid,
  VideoProjector, MusicDoubleNote, MusicNote, MediaImage, MediaVideo, MediaImageFolder,
  
  // Files & Documents
  Folder, Page, Archive, FileNotFound, FolderPlus, FolderMinus, FolderWarning,
  OpenBook, Book, BookStack, Bookmark, BookmarkBook, Journal, JournalPage,
  OpenInWindow, FloppyDisk, FloppyDiskArrowIn, FloppyDiskArrowOut, 
  PageMinus, PageEdit, PageSearch, PageFlip, Reports,
  
  // Users & Social
  User, UserPlus, Group, UserBadgeCheck, UserLove, UserCircle, UserScan, 
  UserCrown, UserStar, UserXmark,
  Heart, Star, ThumbsUp, ThumbsDown, Pin, HeartSolid, StarSolid, HeartArrowDown,
  
  // Security
  Lock, Key, Shield, ShieldCheck, Eye, EyeClosed, EyeSolid, Fingerprint, 
  LockSlash, SecurityPass, SecureWindow,
  
  // Time & Calendar
  Calendar, CalendarPlus, CalendarMinus, CalendarCheck, Clock, Timer, Alarm, 
  Hourglass, TimeZone, TimerOff,
  
  // Cloud & Network
  Cloud, CloudCheck, CloudDownload, CloudUpload, CloudSync, CloudSunny, Globe,
  
  // Transportation
  Car, Train, Bus, Bicycle, Walking, Running, Rocket, Motorcycle, Truck, Tram, Metro, Drone,
  
  // Weather & Nature
  Sun, Moon, Umbrella, Wind, TemperatureUp, TemperatureDown, SnowFlake, Droplet, 
  Leaf, Tree, Planet, Flower, Fish, Spark,
  
  // Shopping & Finance
  ShoppingBag, CreditCard, Coins, Dollar, Euro, Pound, Yen, Cart,
  
  // Health & Medical
  Activity, Hospital, HealthShield, Dna,
  
  // Tools & Construction
  Hammer, Wrench, Ruler, Palette, ColorPicker, TriangleFlag, 
  Magnet, MagnetEnergy, Tools,
  
  // Layout & UI
  List, ListSelect, Dashboard, Filter, Sort, LayoutLeft, LayoutRight, Maximize, 
  Window, Frame, FrameAlt, FramePlusIn, FrameMinusIn,
  
  // Development
  Code, Terminal, Bug, Git, Github, Package, Repository, GitPullRequest,
  
  // Shapes & 3D
  Circle, Square, Triangle, Pentagon, Hexagon, Octagon, Rhombus, 
  Cylinder, Cube, Sphere,
  
  // Buildings & Places
  Tower, Church, Elevator, Bed, Lamp,
  
  // Science & Space
  Atom, PlanetSat, Binocular, Microscope, TestTube, Flask,
  
  // Sports & Games
  Basketball, Football, Golf, Swimming, Cycling, Gym, Weight, Archery, Puzzle, Gamepad,
  
  // Stats & Analytics
  StatDown, StatUp, GraphUp, GraphDown,
  
  // Image Editing
  Crop, CropRotateBl, ClockRotateRight,
  
  // Maps & Location
  Map, MapPin,
  
  // Text & Typography
  Text,
  
  // Electric Vehicle
  EvPlug, EvCharge, EvStation,
  
  // Miscellaneous
  Minus
];

const categories = {
  navigation: ['Home', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Compass', 'Navigator'],
  actions: ['Search', 'Plus', 'Check', 'Edit', 'Trash', 'Copy', 'Cut', 'Download', 'Upload', 'Refresh'],
  communication: ['Mail', 'Phone', 'Bell', 'Message', 'ChatBubble', 'Wifi', 'Bluetooth'],
  media: ['Play', 'Pause', 'Camera', 'Microphone', 'VideoCamera', 'MusicNote'],
  files: ['Folder', 'Page', 'Archive', 'Book', 'FloppyDisk'],
  users: ['User', 'UserPlus', 'Group', 'Heart', 'Star'],
  system: ['Settings', 'Database', 'Server', 'Cpu', 'HardDrive', 'Battery'],
  security: ['Lock', 'Key', 'Shield', 'Eye', 'Fingerprint'],
  time: ['Calendar', 'Clock', 'Timer', 'Alarm'],
  transport: ['Car', 'Train', 'Bus', 'Bicycle', 'Rocket'],
  weather: ['Sun', 'Moon', 'Umbrella', 'Wind', 'SnowFlake'],
  tools: ['Hammer', 'Wrench', 'Ruler', 'Palette', 'ColorPicker'],
  shapes: ['Circle', 'Square', 'Triangle', 'Cube', 'Sphere'],
  science: ['Atom', 'PlanetSat', 'Telescope', 'Microscope'],
  sports: ['Basketball', 'Football', 'Golf', 'Swimming', 'Cycling'],
  general: []
};

function getCategory(name: string): string {
  for (const [category, icons] of Object.entries(categories)) {
    if (icons.includes(name)) {
      return category;
    }
  }
  return 'general';
}

export const iconoirIcons: IconItem[] = iconComponents.map((component, index) => ({
  id: `iconoir-${index}`,
  name: component.name || `Icon ${index}`,
  svg: component,
  style: 'outline' as const,
  category: getCategory(component.name || ''),
  tags: ['iconoir', getCategory(component.name || '')]
}));

console.log('🚀 ICONOIR: Loaded', iconoirIcons.length, 'verified working icons');

export const iconoirIconCount = iconoirIcons.length;