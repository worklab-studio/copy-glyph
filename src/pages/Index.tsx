import { useState, useMemo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { IconGrid } from "@/components/icon-grid/IconGrid";
import { ControlPanel } from "@/components/control-panel";
import { IconCustomizationProvider, useIconCustomization } from "@/contexts/IconCustomizationContext";
import { type IconItem } from "@/types/icon";
import { 
  Activity, AlertCircle, Archive, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, 
  Bell01 as Bell, Bookmark, Calendar, Camera01 as Camera, Check, Clock,
  Download01 as Download, Edit02 as Edit, Eye, EyeOff, File02 as File, Globe01 as Globe, Heart,
  Home01 as Home, Image01 as Image, Lock01 as Lock, Mail01 as Mail, Menu01 as Menu, Minus,
  Phone, Play, Plus, SearchLg as Search, Send01 as Send, Settings01 as Settings,
  Share01 as Share, Star01 as Star, Sun, Upload01 as Upload, User01 as User
} from "@untitled-ui/icons-react";
import { toast } from "@/hooks/use-toast";

// Transform Untitled UI icons to IconItem format
const iconMap = {
  Home, User, Settings, Search, Menu, Heart, Star, Check, Plus,
  Minus, Edit, Download, Upload, Mail, Phone, Calendar, Clock,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Play,
  Camera, Image, File, Globe, Lock, Eye, EyeOff, Bell, 
  Send, Share, Archive, Bookmark, Sun, Activity, AlertCircle
};

const allIcons: IconItem[] = Object.entries(iconMap).map(([name, IconComponent]) => ({
  id: name.toLowerCase(),
  name,
  svg: IconComponent,
  tags: [name.toLowerCase()]
}));

function IconGridPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSet, setSelectedSet] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { customization } = useIconCustomization();

  // Filter icons based on search query
  const filteredIcons = useMemo(() => {
    if (!searchQuery) return allIcons;
    
    const query = searchQuery.toLowerCase();
    return allIcons.filter(icon =>
      icon.name.toLowerCase().includes(query) ||
      icon.tags?.some(tag => tag.includes(query))
    );
  }, [searchQuery]);

  // Filter by selected set
  const displayedIcons = useMemo(() => {
    if (selectedSet === "favorites") {
      return []; // Empty for now - would load from localStorage
    }
    if (selectedSet === "untitled-ui" || selectedSet === "all") {
      return filteredIcons;
    }
    return []; // Other sets not implemented yet
  }, [selectedSet, filteredIcons]);

  const handleCopy = (icon: IconItem) => {
    setSelectedId(icon.id);
    toast({
      description: `${icon.name} icon copied to clipboard!`,
      duration: 2000,
    });
    
    // Clear selection after a delay
    setTimeout(() => setSelectedId(null), 1200);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar 
          selectedSet={selectedSet}
          onSetChange={setSelectedSet}
        />
        
        <div className="flex-1 flex flex-col">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold">
                    {selectedSet === "all" ? "All Icons" : 
                     selectedSet === "favorites" ? "Favorites" : 
                     selectedSet === "untitled-ui" ? "Untitled UI Icons" :
                     selectedSet.charAt(0).toUpperCase() + selectedSet.slice(1)} Icons
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {displayedIcons.length.toLocaleString()} icons
                    {searchQuery && ` matching "${searchQuery}"`}
                  </p>
                </div>
              </div>

              {displayedIcons.length === 0 ? (
                <div className="flex h-64 items-center justify-center text-center">
                  <div className="space-y-2">
                    <p className="text-lg text-muted-foreground">
                      {selectedSet === "favorites" ? "No favorites yet" : "No icons found"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedSet === "favorites" 
                        ? "Star some icons to see them here"
                        : "Try a different search term or select a different library"
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <IconGrid
                  items={displayedIcons}
                  selectedId={selectedId}
                  onCopy={handleCopy}
                  color={customization.color}
                  strokeWidth={customization.strokeWidth}
                />
              )}
            </div>
          </main>
          
          <footer className="border-t p-4 text-center text-xs text-muted-foreground">
            <p>Built with ❤️ • <a href="mailto:support@notionicons.so" className="hover:text-primary">Support</a></p>
          </footer>
        </div>
        
        <ControlPanel />
      </div>
    </SidebarProvider>
  );
}

const Index = () => {
  return (
    <IconCustomizationProvider>
      <IconGridPage />
    </IconCustomizationProvider>
  );
};

export default Index;