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

export const lucideIcons: IconItem[] = Object.entries(iconMap).map(([name, IconComponent]) => {
  // Add tags based on icon name patterns
  const tags = [
    name.toLowerCase(),
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
    tags: [...new Set(tags)]
  };
});