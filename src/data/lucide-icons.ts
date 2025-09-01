import { type IconItem } from "@/types/icon";
import { 
  Activity, AlertCircle, Archive, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, 
  Bell, Bookmark, Calendar, Camera, Check, Clock,
  Download, Edit, Eye, EyeOff, File, Globe, Heart,
  Home, Image, Lock, Mail, Menu, Minus,
  Phone, Play, Plus, Search, Send, Settings,
  Share, Star, Sun, Upload, User
} from "lucide-react";

// Function to generate tags based on icon name
const generateTags = (name: string): string[] => {
  const baseName = name.toLowerCase();
  const tags = [baseName, "lucide", "ui", "interface"];
  
  // Add category-based tags
  if (/arrow|navigation/.test(baseName)) {
    tags.push("navigation", "direction");
  }
  if (/alert|check/.test(baseName)) {
    tags.push("status", "feedback");
  }
  if (/mail|phone|send/.test(baseName)) {
    tags.push("communication");
  }
  if (/heart|star|bookmark/.test(baseName)) {
    tags.push("social", "favorites");
  }
  if (/play|volume|music/.test(baseName)) {
    tags.push("media", "audio");
  }
  if (/file|archive|download|upload/.test(baseName)) {
    tags.push("files", "storage");
  }
  if (/settings|edit|plus|minus/.test(baseName)) {
    tags.push("actions", "controls");
  }
  if (/calendar|clock/.test(baseName)) {
    tags.push("time", "schedule");
  }
  if (/user/.test(baseName)) {
    tags.push("people", "profile");
  }
  if (/lock|eye|eyeoff/.test(baseName)) {
    tags.push("security", "privacy");
  }
  
  return tags;
};

// Transform Lucide icons to IconItem format
const iconMap = {
  Home, User, Settings, Search, Menu, Heart, Star, Check, Plus,
  Minus, Edit, Download, Upload, Mail, Phone, Calendar, Clock,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Play,
  Camera, Image, File, Globe, Lock, Eye, EyeOff, Bell, 
  Send, Share, Archive, Bookmark, Sun, Activity, AlertCircle
};

export const lucideIcons: IconItem[] = Object.entries(iconMap).map(([name, IconComponent]) => ({
  id: `lucide-${name.toLowerCase()}`,
  name,
  svg: IconComponent,
  tags: generateTags(name)
}));

export default lucideIcons;