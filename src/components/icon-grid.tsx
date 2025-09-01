import { 
  Home, User, Settings, Search, Menu, Heart, Star, Check, X, Plus,
  Minus, Edit, Trash2, Download, Upload, Mail, Phone, Calendar, Clock, MapPin,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Play, Pause, Square, Volume2, Wifi, Battery,
  Camera, Image, File, Folder, BookOpen, Globe, Shield, Lock, Key, Eye,
  EyeOff, Bell, MessageCircle, Send, Share, Copy, Scissors, Clipboard, Archive,
  Bookmark, Flag, Tag, Filter, SortAsc, RefreshCw, RotateCcw, Zap, Lightbulb,
  Sun, Moon, Cloud, Umbrella, ThermometerSun, Droplets, Wind, Snowflake, Mountain, Trees
} from "lucide-react";
import { IconCard } from "@/components/icon-card";

interface IconGridProps {
  searchQuery: string;
  selectedSet: string;
}

// Direct import approach - guaranteed to work with proper TypeScript types
const iconMap = {
  Home, User, Settings, Search, Menu, Heart, Star, Check, X, Plus,
  Minus, Edit, Trash2, Download, Upload, Mail, Phone, Calendar, Clock, MapPin,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Play, Pause, Square, Volume2, Wifi, Battery,
  Camera, Image, File, Folder, BookOpen, Globe, Shield, Lock, Key, Eye,
  EyeOff, Bell, MessageCircle, Send, Share, Copy, Scissors, Clipboard, Archive,
  Bookmark, Flag, Tag, Filter, SortAsc, RefreshCw, RotateCcw, Zap, Lightbulb,
  Sun, Moon, Cloud, Umbrella, ThermometerSun, Droplets, Wind, Snowflake, Mountain, Trees
};

const allIcons = Object.entries(iconMap);

console.log(`✅ Loaded ${allIcons.length} icons directly:`, allIcons.slice(0, 5).map(([name]) => name));

export function IconGrid({ searchQuery, selectedSet }: IconGridProps) {
  // Filter icons based on search query
  const filteredIcons = allIcons.filter(([name]) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // For demo purposes, we'll use Lucide icons for all sets
  // In a real implementation, you'd load different icon sets
  const displayedIcons = selectedSet === "favorites" 
    ? [] // Empty for now - would load from localStorage
    : filteredIcons;

  if (displayedIcons.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-center">
        <div className="space-y-2">
          <p className="text-lg text-muted-foreground">
            {selectedSet === "favorites" ? "No favorites yet" : "No icons found"}
          </p>
          <p className="text-sm text-muted-foreground">
            {selectedSet === "favorites" 
              ? "Star some icons to see them here"
              : "Try a different search term"
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">
            {selectedSet === "all" ? "All Icons" : 
             selectedSet === "favorites" ? "Favorites" : 
             selectedSet.charAt(0).toUpperCase() + selectedSet.slice(1)} Icons
          </h2>
          <p className="text-sm text-muted-foreground">
            {displayedIcons.length.toLocaleString()} icons
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
        {displayedIcons.map(([name, icon]) => (
          <IconCard
            key={name}
            icon={icon}
            name={name}
            set={selectedSet}
          />
        ))}
      </div>
    </div>
  );
}