import React, { useState, useMemo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { IconGrid } from "@/components/icon-grid/IconGrid";
import { ControlPanel } from "@/components/control-panel";
import { CategoryFilter } from "@/components/CategoryFilter";
import { IconCustomizationProvider, useIconCustomization } from "@/contexts/IconCustomizationContext";
import { type IconItem } from "@/types/icon";
import { toast } from "@/hooks/use-toast";
import { featherIcons } from "@/data/feather-icons";
import { heroiconsOutline } from "@/data/heroicons-outline";
import { heroiconsSolid } from "@/data/heroicons-solid";
import { phosphorIcons } from "@/data/phosphor-icons";
import { lucideIcons } from "@/data/lucide-icons";
import { tablerIcons } from "@/data/tabler-icons";
import { remixIcons } from "@/data/remix-icons";
import { bootstrapIcons } from "@/data/bootstrap-icons";

// Combine all icon libraries
const allIcons: IconItem[] = [
  ...lucideIcons,
  ...featherIcons,
  ...heroiconsOutline,
  ...heroiconsSolid,
  ...phosphorIcons,
  ...tablerIcons,
  ...bootstrapIcons,
  ...remixIcons
];

function IconGridPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSet, setSelectedSet] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
  const libraryFilteredIcons = useMemo(() => {
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
    if (selectedSet === "heroicons-outline") {
      return filteredIcons.filter(icon => icon.id.startsWith('heroicons-outline-'));
    }
    if (selectedSet === "heroicons-solid") {
      return filteredIcons.filter(icon => icon.id.startsWith('heroicons-solid-'));
    }
    if (selectedSet === "phosphor") {
      return filteredIcons.filter(icon => icon.id.startsWith('phosphor-'));
    }
    if (selectedSet === "tabler") {
      return filteredIcons.filter(icon => icon.id.startsWith('tabler-'));
    }
    if (selectedSet === "remix") {
      return filteredIcons.filter(icon => icon.id.startsWith('remix-'));
    }
    if (selectedSet === "bootstrap") {
      return filteredIcons.filter(icon => icon.id.startsWith('bootstrap-'));
    }
    return []; // Other sets not implemented yet
  }, [selectedSet, filteredIcons]);

  // Get available categories from current icon set
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    libraryFilteredIcons.forEach(icon => {
      if (icon.category) categories.add(icon.category);
    });
    return Array.from(categories).sort();
  }, [libraryFilteredIcons]);

  // Filter by category
  const displayedIcons = useMemo(() => {
    if (!selectedCategory) {
      return libraryFilteredIcons;
    }
    return libraryFilteredIcons.filter(icon => icon.category === selectedCategory);
  }, [libraryFilteredIcons, selectedCategory]);

  // Reset category when library changes
  React.useEffect(() => {
    setSelectedCategory(null);
  }, [selectedSet]);

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
      <div className="flex min-h-screen w-full overflow-hidden">{/* Prevent horizontal scroll */}
        <AppSidebar 
          selectedSet={selectedSet}
          onSetChange={setSelectedSet}
        />
        
        <div className="flex-1 flex flex-col h-screen">{/* Fixed layout container */}
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchClear={() => setSearchQuery("")}
          />
          
          {/* Fixed header with padding */}
          <div className="px-6 pt-6 pb-4 border-b border-border/30 bg-background">
            <div className="space-y-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold">
                    {selectedSet === "all" ? "All Icons" : 
                     selectedSet === "favorites" ? "Favorites" : 
                     selectedSet === "lucide" ? "Lucide Icons" :
                     selectedSet === "feather" ? "Feather Icons" :
                     selectedSet === "heroicons-outline" ? "Heroicons Outline" :
                     selectedSet === "heroicons-solid" ? "Heroicons Solid" :
                     selectedSet === "phosphor" ? "Phosphor Icons" :
                     selectedSet === "tabler" ? "Tabler Icons" :
                     selectedSet === "bootstrap" ? "Bootstrap Icons" :
                     selectedSet === "remix" ? "Remix Icons" :
                     selectedSet.charAt(0).toUpperCase() + selectedSet.slice(1)} Icons
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {displayedIcons.length.toLocaleString()} icons
                    {searchQuery && ` matching "${searchQuery}"`}
                    {selectedCategory && ` in ${selectedCategory}`}
                  </p>
                </div>
                
                <CategoryFilter 
                  categories={availableCategories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
            </div>
          </div>

          {/* Scrollable main content */}
          <main className="flex-1 overflow-hidden">
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
          
          <footer className="border-t p-4 text-center text-xs text-muted-foreground bg-background">
            <p>Built at Ossian Design Lab • <a href="mailto:support@notionicons.so" className="hover:text-primary">Support</a></p>
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