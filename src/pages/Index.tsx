import React, { useState, useMemo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { IconGrid } from "@/components/icon-grid/IconGrid";
import { ControlPanel } from "@/components/control-panel";
import { IconCustomizationProvider, useIconCustomization } from "@/contexts/IconCustomizationContext";
import { type IconItem } from "@/types/icon";
import { toast } from "@/hooks/use-toast";
import { featherIcons } from "@/data/feather-icons";
import { heroiconsOutline } from "@/data/heroicons-outline";
import { heroiconsSolid } from "@/data/heroicons-solid";
import { phosphorIcons } from "@/data/phosphor-icons";
import { lucideIcons } from "@/data/lucide-icons";
import { CategoryHeader } from "@/components/CategoryHeader";
import { useScrollCategory } from "@/hooks/useScrollCategory";

// Combine all icon libraries
const allIcons: IconItem[] = [
  ...lucideIcons,
  ...featherIcons,
  ...heroiconsOutline,
  ...heroiconsSolid,
  ...phosphorIcons
];

function IconGridPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSet, setSelectedSet] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { customization } = useIconCustomization();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Get the selected icon object
  const selectedIcon = useMemo(() => {
    if (!selectedId) return null;
    return allIcons.find(icon => icon.id === selectedId) || null;
  }, [selectedId]);

  // Filter icons based on search query
  const filteredIcons = useMemo(() => {
    if (!searchQuery) return allIcons;
    
    const query = searchQuery.toLowerCase();
    return allIcons.filter(icon =>
      icon.name.toLowerCase().includes(query) ||
      icon.tags?.some(tag => tag.includes(query))
    );
  }, [searchQuery]);

  // Filter by selected set and group by category
  const displayedIcons = useMemo(() => {
    let icons: IconItem[] = [];
    
    if (selectedSet === "favorites") {
      icons = []; // Empty for now - would load from localStorage
    } else if (selectedSet === "all") {
      icons = filteredIcons;
    } else if (selectedSet === "lucide") {
      icons = filteredIcons.filter(icon => icon.id.startsWith('lucide-'));
    } else if (selectedSet === "feather") {
      icons = filteredIcons.filter(icon => icon.id.startsWith('feather-'));
    } else if (selectedSet === "heroicons-outline") {
      icons = filteredIcons.filter(icon => icon.id.startsWith('heroicons-outline-'));
    } else if (selectedSet === "heroicons-solid") {
      icons = filteredIcons.filter(icon => icon.id.startsWith('heroicons-solid-'));
    } else if (selectedSet === "phosphor") {
      icons = filteredIcons.filter(icon => icon.id.startsWith('phosphor-'));
    }
    
    // Group icons by category and then flatten in category order
    const categoryOrder = ['navigation', 'communication', 'media', 'files', 'system', 'user', 'security', 'time', 'finance', 'social', 'status', 'actions', 'shopping', 'other'];
    const groupedByCategory = icons.reduce((acc, icon) => {
      const category = icon.category || 'other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(icon);
      return acc;
    }, {} as Record<string, IconItem[]>);
    
    // Return icons in category order
    return categoryOrder.flatMap(category => groupedByCategory[category] || []);
  }, [selectedSet, filteredIcons]);

  const handleCopy = (icon: IconItem) => {
    setSelectedId(icon.id);
    toast({
      description: `${icon.name} icon copied to clipboard!`,
      duration: 2000,
    });
  };

  const handleIconClick = (icon: IconItem) => {
    // Toggle selection - if already selected, deselect; otherwise select
    setSelectedId(prevId => prevId === icon.id ? null : icon.id);
  };

  // Get current category for the header
  const currentCategory = useScrollCategory({ 
    icons: displayedIcons, 
    containerRef
  });

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">{/* Prevent horizontal scroll */}
        <AppSidebar 
          selectedSet={selectedSet}
          onSetChange={setSelectedSet}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">{/* Prevent horizontal scroll */}
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchClear={() => setSearchQuery("")}
          />
          
          <main className="flex-1 overflow-auto relative" ref={containerRef}>
            {/* Category header */}
            {displayedIcons.length > 0 && currentCategory && (
              <CategoryHeader currentCategory={currentCategory} />
            )}
            {/* Header with padding */}
            <div className="px-6 pt-6 pb-4 border-b border-border/30">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold">
                  {selectedSet === "all" ? "All Icons" : 
                   selectedSet === "favorites" ? "Favorites" : 
                   selectedSet === "lucide" ? "Lucide Icons" :
                   selectedSet === "feather" ? "Feather Icons" :
                   selectedSet === "heroicons-outline" ? "Heroicons Outline" :
                   selectedSet === "heroicons-solid" ? "Heroicons Solid" :
                   selectedSet === "phosphor" ? "Phosphor Icons" :
                   selectedSet.charAt(0).toUpperCase() + selectedSet.slice(1)} Icons
                </h2>
                <p className="text-sm text-muted-foreground">
                  {displayedIcons.length.toLocaleString()} icons
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
            </div>

            {/* Grid - edge to edge */}
            {displayedIcons.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-center px-6">
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
                  onIconClick={handleIconClick}
                  color={customization.color}
                  strokeWidth={customization.strokeWidth}
                />
            )}
          </main>
          
          <footer className="border-t p-4 text-center text-xs text-muted-foreground">
            <p>Built with ❤️ • <a href="mailto:support@notionicons.so" className="hover:text-primary">Support</a></p>
          </footer>
        </div>
        
        <ControlPanel selectedIcon={selectedIcon} />
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