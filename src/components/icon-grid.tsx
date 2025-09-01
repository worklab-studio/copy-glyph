import { 
  Activity, AlertCircle, Archive, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, 
  Bell01 as Bell, Bookmark, Calendar, Camera01 as Camera, Check, Clock,
  Download01 as Download, Edit02 as Edit, Eye, EyeOff, File02 as File, Globe01 as Globe, Heart,
  Home01 as Home, Image01 as Image, Lock01 as Lock, Mail01 as Mail, Menu01 as Menu, Minus,
  Phone, Play, Plus, SearchLg as Search, Send01 as Send, Settings01 as Settings,
  Share01 as Share, Star01 as Star, Sun, Upload01 as Upload, User01 as User
} from "@untitled-ui/icons-react";
import { IconCard } from "@/components/icon-card";

interface IconGridProps {
  searchQuery: string;
  selectedSet: string;
}

// Direct import approach - guaranteed to work with proper TypeScript types
const iconMap = {
  Home, User, Settings, Search, Menu, Heart, Star, Check, Plus,
  Minus, Edit, Download, Upload, Mail, Phone, Calendar, Clock,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Play,
  Camera, Image, File, Globe, Lock, Eye, EyeOff, Bell, 
  Send, Share, Archive, Bookmark, Sun, Activity, AlertCircle
};

const allIcons = Object.entries(iconMap);

console.log(`✅ Loaded ${allIcons.length} basic Untitled UI icons:`, allIcons.slice(0, 5).map(([name]) => name));

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

      <div className="grid grid-cols-8 gap-1 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-16 xl:grid-cols-20 2xl:grid-cols-24">
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