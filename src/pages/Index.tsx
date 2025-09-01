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
import { heroiconsV2 } from "@/data/heroicons-v2";
import { phosphorIcons } from "@/data/phosphor-icons";
import { lucideIcons } from "@/data/lucide-icons";

// Combine all icon libraries
const allIcons: IconItem[] = [
  ...lucideIcons,
  ...featherIcons,
  ...heroiconsV2,
  ...phosphorIcons
];

function IconGridPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSet, setSelectedSet] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { customization } = useIconCustomization();

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

  // Filter by selected set
  const displayedIcons = useMemo(() => {
    if (selectedSet === "favorites") {
      return []; // Empty for now - would load from localStorage
    }
    if (selectedSet === "all") {
      return filteredIcons;
    }
    if (selectedSet === "lucide") {
      return filteredIcons.filter(icon => icon.id.startsWith('lucide-'));
    }
    if (selectedSet === "feather") {
      return filteredIcons.filter(icon => icon.id.startsWith('feather-'));
    }
    if (selectedSet === "heroicons") {
      return filteredIcons.filter(icon => icon.id.startsWith('heroicons-'));
    }
    if (selectedSet === "phosphor") {
      return filteredIcons.filter(icon => icon.id.startsWith('phosphor-'));
    }
    return []; // Other sets not implemented yet
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

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full overflow-hidden">
        <AppSidebar 
          selectedSet={selectedSet}
          onSetChange={setSelectedSet}
        />
        
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-background border-b">
          <div className="ml-64"> {/* Account for sidebar width */}
            <Header 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>

        {/* Main content with margins for fixed elements */}
        <div className="ml-64 mr-80 mt-16 mb-16"> {/* ml-64 for sidebar, mr-80 for control panel, mt-16 for header, mb-16 for footer */}
          <main className="h-[calc(100vh-8rem)]"> {/* Full height minus header and footer */}
            {/* Header with padding - fixed height section */}
            <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-border/30">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold">
                  {selectedSet === "all" ? "All Icons" : 
                   selectedSet === "favorites" ? "Favorites" : 
                   selectedSet === "lucide" ? "Lucide Icons" :
                   selectedSet === "feather" ? "Feather Icons" :
                   selectedSet === "heroicons" ? "Heroicons" :
                   selectedSet === "phosphor" ? "Phosphor Icons" :
                   selectedSet.charAt(0).toUpperCase() + selectedSet.slice(1)} Icons
                </h2>
                <p className="text-sm text-muted-foreground">
                  {displayedIcons.length.toLocaleString()} icons
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
            </div>

            {/* Grid container - takes remaining space */}
            <div className="h-[calc(100%-6rem)] overflow-auto"> {/* Subtract header section height */}
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
            </div>
          </main>
        </div>

        {/* Fixed Footer */}
        <footer className="fixed bottom-0 left-64 right-80 z-40 bg-background border-t p-4 text-center text-xs text-muted-foreground">
          <p>Built with ❤️ • <a href="mailto:support@notionicons.so" className="hover:text-primary">Support</a></p>
        </footer>
        
        {/* Fixed Control Panel */}
        <div className="fixed top-0 right-0 bottom-0 z-30">
          <ControlPanel selectedIcon={selectedIcon} />
        </div>
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