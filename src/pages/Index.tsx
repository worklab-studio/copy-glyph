import React, { useState, useMemo, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { IconGrid } from "@/components/icon-grid/IconGrid";
import { ControlPanel } from "@/components/control-panel";
import { CategoryFilter } from "@/components/CategoryFilter";
import { IconCustomizationProvider, useIconCustomization } from "@/contexts/IconCustomizationContext";
import { type IconItem } from "@/types/icon";
import { toast } from "@/hooks/use-toast";
import { useAsyncIconLibrary } from "@/hooks/useAsyncIconLibrary";
import { useSearchWorker } from "@/hooks/useSearchWorker";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

function IconGridPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSet, setSelectedSet] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<IconItem[]>([]);
  const { customization } = useIconCustomization();
  
  // Async icon loading
  const { 
    icons, 
    loading, 
    error, 
    loaded,
    loadLibrary, 
    loadAllLibraries,
    clearError 
  } = useAsyncIconLibrary();
  
  // Search worker
  const { 
    search, 
    indexLibrary, 
    isReady: searchReady, 
    isSearching 
  } = useSearchWorker();

  // Load initial library
  useEffect(() => {
    if (selectedSet === "all") {
      loadAllLibraries();
    } else {
      loadLibrary(selectedSet);
    }
  }, [selectedSet, loadLibrary, loadAllLibraries]);

  // Index loaded icons for search - with error handling
  useEffect(() => {
    if (loaded && icons.length > 0 && searchReady) {
      indexLibrary(selectedSet, icons).catch(error => {
        console.error('Failed to index icons for search:', error);
        // Search will fall back to client-side search automatically
      });
    }
  }, [loaded, icons, searchReady, selectedSet, indexLibrary]);

  // Get the selected icon object
  const selectedIcon = useMemo(() => {
    if (!selectedId) return null;
    return icons.find(icon => icon.id === selectedId) || null;
  }, [selectedId, icons]);

  // Handle search with worker or fallback
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const performSearch = async () => {
      try {
        // Try worker search with comprehensive options
        if (searchReady && loaded) {
          const results = await search(searchQuery, {
            maxResults: 1000,
            fuzzy: true,
            enableSynonyms: true,
            enablePhonetic: true
          });
          // Filter out any invalid results
          const validResults = results.filter(icon => icon && icon.svg);
          setSearchResults(validResults);
        } else if (loaded) {
          // Enhanced fallback search when worker isn't ready
          const { fallbackSearch } = require('@/lib/fallback-search');
          const fallbackResults = fallbackSearch(icons, searchQuery, {
            fuzzy: true,
            maxResults: 1000,
            minScore: 0.1,
            enableSynonyms: true,
            enablePhonetic: true
          });
          setSearchResults(fallbackResults);
        }
      } catch (error) {
        console.warn('Worker search failed, using fallback:', error);
        // Always fallback to client-side search on any error
        const { fallbackSearch } = require('@/lib/fallback-search');
        const fallbackResults = fallbackSearch(icons, searchQuery, {
          fuzzy: true,
          maxResults: 1000,
          minScore: 0.1,
          enableSynonyms: true,
          enablePhonetic: true
        });
        setSearchResults(fallbackResults);
      }
    };

    performSearch();
  }, [searchQuery, search, searchReady, loaded, icons]);

  // Get current icon set to display
  const currentIcons = useMemo(() => {
    if (searchQuery.trim()) {
      // Filter search results to only include icons with valid svg data
      return searchResults.filter(icon => icon.svg !== undefined && icon.svg !== null);
    }
    // Filter out icons that don't have valid svg data
    return icons.filter(icon => icon.svg !== undefined && icon.svg !== null);
  }, [searchQuery, searchResults, icons]);


  // Get available categories from current icon set
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    currentIcons.forEach(icon => {
      if (icon.category) categories.add(icon.category);
    });
    return Array.from(categories).sort();
  }, [currentIcons]);

  // Filter by category and sort to show outline icons first
  const displayedIcons = useMemo(() => {
    let filtered = currentIcons;
    
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
  }, [currentIcons, selectedCategory]);

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
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold">
                    {selectedSet === "all" ? "All icons" : 
                     selectedSet === "favorites" ? "Favorites" : 
                     selectedSet === "material" ? "Material Design Icons" :
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
                      selectedSet === "solar" ? "Solar Icons" :
                      selectedSet.charAt(0).toUpperCase() + selectedSet.slice(1)}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {displayedIcons.length.toLocaleString()} icons
                    {searchQuery && ` matching "${searchQuery}"`}
                    {selectedCategory && ` in ${selectedCategory}`}
                  </p>
                </div>
                
                <div className="flex items-center">
                  <CategoryFilter 
                    categories={availableCategories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable main content */}
          <main className="flex-1 overflow-hidden">
            {error ? (
              <div className="flex h-64 items-center justify-center text-center px-6">
                <Alert className="max-w-md">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="mt-2">
                    <p className="font-medium">Failed to load icons</p>
                    <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    <button
                      onClick={clearError}
                      className="mt-3 text-sm text-primary hover:text-primary/80 underline"
                    >
                      Try again
                    </button>
                  </AlertDescription>
                </Alert>
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center h-64 px-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium">Loading icons...</p>
                <p className="text-sm text-muted-foreground">This may take a moment</p>
              </div>
            ) : displayedIcons.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-center px-6">
                <div className="space-y-2">
                  <p className="text-lg text-muted-foreground">
                    {selectedSet === "favorites" ? "No favorites yet" : 
                     searchQuery ? "No icons found" : "No icons available"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedSet === "favorites" 
                      ? "Star some icons to see them here"
                      : searchQuery
                      ? `Try a different search term or select a different library`
                      : "Select a library from the sidebar to get started"
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
            
            {/* Loading indicator for search */}
            {isSearching && (
              <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-3 py-2 rounded-md shadow-lg flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Searching...</span>
              </div>
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
  return <IconGridPage />;
};

export default Index;