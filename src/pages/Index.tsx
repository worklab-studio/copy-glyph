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
import { phosphorIcons } from "@/data/phosphor-icons";
import { lucideIcons } from "@/data/lucide-icons";
import { tablerIcons } from "@/data/tabler-icons";
import { remixIcons } from "@/data/remix-icons";
import { bootstrapIcons } from "@/data/bootstrap-icons";
import { boxicons } from "@/data/boxicons";
import cssGgIcons from "@/data/css-gg-icons";
import { animatedIcons } from "@/data/animated-icons";
import { iconsaxIcons } from "@/data/iconsax-icons";
import { atlasIcons } from "@/data/atlas-icons";
import { lineIcons } from "@/data/line-icons";
import { pixelartIcons } from "@/data/pixelart-icons";
import { teenyIcons } from "@/data/teeny-icons";
import { antIcons } from "@/data/ant-icons";
import { fluentIcons } from "@/data/fluent-icons";
import { iconnoirIcons } from "@/data/iconnoir-icons";
import { ikonateIcons } from "@/data/ikonate-icons";
import { octiconsIcons } from "@/data/octicons-icons";
import { radixIcons } from "@/data/radix-icons";
// Combine all icon libraries
const allIcons: IconItem[] = [
  ...atlasIcons,
  ...animatedIcons,
  ...lucideIcons,
  ...featherIcons,
  ...phosphorIcons,
  ...tablerIcons,
  ...bootstrapIcons,
  ...remixIcons,
  ...boxicons,
  ...cssGgIcons,
  ...iconsaxIcons,
  ...lineIcons,
  ...pixelartIcons,
  ...teenyIcons,
  ...antIcons,
  ...fluentIcons,
  ...iconnoirIcons,
  ...ikonateIcons,
  ...octiconsIcons,
  ...radixIcons,
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
    
    const setMappings: Record<string, string> = {
      'animated': 'animated-',
      'lucide': 'lucide-',
      'feather': 'feather-',
      'phosphor': 'phosphor-',
      'tabler': 'tabler-',
      'remix': 'remix-',
      'bootstrap': 'bootstrap-',
      'boxicons': 'boxicons-',
      'css-gg': 'css-gg-',
      'iconsax': 'iconsax-',
      'atlas': 'atlas-',
      'line': 'line-',
      'pixelart': 'pixelart-',
      'teeny': 'teeny-',
      'ant': 'ant-',
      'fluent': 'fluent-',
      'iconnoir': 'iconnoir-',
      'ikonate': 'ikonate-',
      'octicons': 'octicons-',
      'radix': 'radix-',
    };
    
    const prefix = setMappings[selectedSet];
    if (prefix) {
      return filteredIcons.filter(icon => icon.id.startsWith(prefix));
    }
    
    return [];
  }, [selectedSet, filteredIcons]);

  // Get available categories from current icon set
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    libraryFilteredIcons.forEach(icon => {
      if (icon.category) categories.add(icon.category);
    });
    return Array.from(categories).sort();
  }, [libraryFilteredIcons]);

  // Filter by category and sort to show outline icons first
  const displayedIcons = useMemo(() => {
    let filtered = libraryFilteredIcons;
    
    if (selectedCategory) {
      filtered = filtered.filter(icon => icon.category === selectedCategory);
    }
    
    // Sort to show outline icons first, then others
    return filtered.sort((a, b) => {
      // Prioritize outline icons
      const aIsOutline = a.style === 'outline' || a.id.includes('outline');
      const bIsOutline = b.style === 'outline' || b.id.includes('outline');
      
      if (aIsOutline && !bIsOutline) return -1;
      if (!aIsOutline && bIsOutline) return 1;
      
      // Then sort alphabetically by name
      return a.name.localeCompare(b.name);
    });
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
      <div className="flex h-screen w-full overflow-hidden">{/* Fixed viewport height */}
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
                    {selectedSet === "all" ? "All icons" : 
                     selectedSet === "favorites" ? "Favorites" : 
                     selectedSet === "animated" ? "Animated Icons" :
                     selectedSet === "lucide" ? "Lucide Icons" :
                     selectedSet === "feather" ? "Feather Icons" :
                     selectedSet === "phosphor" ? "Phosphor Icons" :
                     selectedSet === "tabler" ? "Tabler Icons" :
                     selectedSet === "bootstrap" ? "Bootstrap Icons" :
                     selectedSet === "remix" ? "Remix Icons" :
                     selectedSet === "boxicons" ? "Boxicons" :
                     selectedSet === "css-gg" ? "CSS.GG Icons" :
                     selectedSet === "iconsax" ? "Iconsax Icons" :
                      selectedSet === "atlas" ? "Atlas Icons" :
                      selectedSet.charAt(0).toUpperCase() + selectedSet.slice(1)}
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