import { type IconItem } from '@/types/icon';
import { 
  Activity, AlertCircle, Archive, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, 
  Bell, Bookmark, Calendar, Camera, Check, Clock,
  Download, Edit, Eye, EyeOff, File, Globe, Heart,
  Home, Image, Lock, Mail, Menu, Minus,
  Phone, Play, Plus, Search, Send, Settings,
  Share, Star, Sun, Upload, User
} from "lucide-react";

// Transform selected Lucide icons to IconItem format
const iconMap = {
  Home, User, Settings, Search, Menu, Heart, Star, Check, Plus,
  Minus, Edit, Download, Upload, Mail, Phone, Calendar, Clock,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Play,
  Camera, Image, File, Globe, Lock, Eye, EyeOff, Bell, 
  Send, Share, Archive, Bookmark, Sun, Activity, AlertCircle
};

// Category mapping for Lucide icons
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName === 'menu' || lowerName === 'home') return 'navigation';
  if (lowerName.includes('mail') || lowerName.includes('phone') || lowerName.includes('bell') || lowerName.includes('send')) return 'communication';
  if (lowerName.includes('play') || lowerName.includes('image') || lowerName.includes('camera')) return 'media';
  if (lowerName.includes('file') || lowerName.includes('archive') || lowerName.includes('bookmark') || lowerName.includes('download') || lowerName.includes('upload')) return 'files';
  if (lowerName.includes('settings') || lowerName.includes('edit')) return 'system';
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('share')) return 'social';
  if (lowerName.includes('user')) return 'users';
  if (lowerName.includes('lock') || lowerName.includes('eye')) return 'security';
  if (lowerName.includes('calendar') || lowerName.includes('clock')) return 'time';
  if (lowerName.includes('plus') || lowerName.includes('minus') || lowerName.includes('check') || lowerName.includes('search')) return 'actions';
  if (lowerName.includes('sun') || lowerName.includes('globe')) return 'general';
  
  return 'general';
};

export const lucideIcons: IconItem[] = Object.entries(iconMap).map(([name, IconComponent]) => {
  const category = getCategoryFromName(name);
  
  // Add tags based on icon name patterns
  const tags = [
    name.toLowerCase(),
    category,
    'outline',
    ...(name.includes('Arrow') ? ['arrow', 'navigation'] : []),
    ...(name.includes('Alert') ? ['alert', 'warning'] : []),
    ...(name === 'Settings' ? ['settings', 'tools'] : []),
    ...(name === 'User' ? ['user', 'people'] : []),
    ...(name === 'Mail' ? ['communication', 'mail'] : []),
    ...(name === 'File' ? ['files', 'storage'] : []),
    ...(name === 'Play' ? ['media', 'audio'] : []),
    ...(name.includes('Heart') || name.includes('Star') ? ['favorites', 'social'] : []),
    ...(name === 'Lock' ? ['security', 'privacy'] : []),
    ...(name === 'Calendar' || name === 'Clock' ? ['time', 'schedule'] : []),
  ];

  return {
    id: `lucide-${name.toLowerCase()}`,
    name,
    svg: IconComponent,
    style: 'outline',
    category,
    tags: [...new Set(tags)]
  };
});