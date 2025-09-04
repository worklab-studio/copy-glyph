import React, { useState, useMemo, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { IconGrid } from "@/components/icon-grid/IconGrid";
import { SectionedIconGrid } from "@/components/icon-grid/SectionedIconGrid";
import { ControlPanel } from "@/components/control-panel";
import { CategoryFilter } from "@/components/CategoryFilter";
import { IconCustomizationProvider, useIconCustomization } from "@/contexts/IconCustomizationContext";
import { type IconItem } from "@/types/icon";
import { toast } from "@/hooks/use-toast";
import { useAsyncIconLibrary, useIconLibraryMetadata } from "@/hooks/useAsyncIconLibrary";
import { useSearchWorker } from "@/hooks/useSearchWorker";
import { useFirstTimeUser } from "@/hooks/useFirstTimeUser";
import { showFirstCopyNudge } from "@/components/ui/first-copy-nudge";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingWithTagline from "@/components/LoadingWithTagline";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { iconLibraryManager } from "@/services/IconLibraryManager";
import { type LibrarySection } from "@/types/icon";

function IconGridPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSet, setSelectedSet] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<IconItem[]>([]);
  const [searchTotalCount, setSearchTotalCount] = useState<number>(0);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(true);
  const [minDurationComplete, setMinDurationComplete] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const { customization } = useIconCustomization();

  // Load Tabler first as priority
  const priorityLibrary = 'tabler';
  
  // Async icon loading
  const { 
    icons, 
    sections,
    loading, 
    backgroundLoading,
    error, 
    loaded,
    loadLibrary, 
    loadLibraryProgressive,
    loadAllLibraries,
    loadAllLibrariesSectioned,
    loadAllLibrariesSectionedProgressive,
    clearError 
  } = useAsyncIconLibrary();
  
  // Library metadata for total counts
  const { libraries, totalCount } = useIconLibraryMetadata();
  
  // Search worker
  const { 
    search, 
    indexLibrary, 
    isReady: searchReady, 
    isSearching 
  } = useSearchWorker();

  // Control loading animation visibility
  useEffect(() => {
    // Hide loading only when both conditions are met:
    // 1. Minimum duration has passed
    // 2. Tabler icons are loaded (priority library)
    if (minDurationComplete && loaded && icons.length > 0) {
      setShowLoadingAnimation(false);
    }
  }, [minDurationComplete, loaded, icons.length]);

  // Fallback timeout to prevent infinite loading
  useEffect(() => {
    const timeoutTimer = setTimeout(() => {
      setLoadingTimeout(true);
      setShowLoadingAnimation(false);
    }, 20000);

    return () => clearTimeout(timeoutTimer);
  }, []);

  // Load Tabler first, then load remaining libraries in background
  useEffect(() => {
    const loadIcons = async () => {
      try {
        // Load Tabler first
        await loadLibrary(priorityLibrary);
        // Then load all libraries in background
        loadAllLibrariesSectionedProgressive();
      } catch (error) {
        console.error('Failed to load priority library:', error);
        // Fallback to loading all libraries
        loadAllLibrariesSectionedProgressive();
      }
    };
    
    loadIcons();
  }, [loadLibrary, loadAllLibrariesSectionedProgressive, priorityLibrary]);

  // Load specific library when selection changes (after initial load)
  useEffect(() => {
    if (loaded && selectedSet !== "all") {
      loadLibraryProgressive(selectedSet);
    }
  }, [selectedSet, loadLibraryProgressive, loaded]);

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
      setSearchTotalCount(0);
      return;
    }

    const performSearch = async () => {
      try {
        // Try worker search with comprehensive options including library filter
        if (searchReady && loaded) {
          const searchResult = await search(searchQuery, {
            maxResults: 10000, // Increase limit to show more results
            fuzzy: true,
            enableSynonyms: true,
            enablePhonetic: true,
            libraryId: selectedSet // Filter by selected library
          });
          // Filter out any invalid results
          const validResults = searchResult.results.filter(icon => icon && icon.svg);
          setSearchResults(validResults);
          setSearchTotalCount(searchResult.totalCount);
        } else if (loaded) {
          // Enhanced fallback search when worker isn't ready
          const { fallbackSearch } = require('@/lib/fallback-search');
          const fallbackResult = fallbackSearch(icons, searchQuery, {
            fuzzy: true,
            maxResults: 10000, // Increase limit to show more results
            minScore: 0.1,
            enableSynonyms: true,
            enablePhonetic: true,
            libraryId: selectedSet // Filter by selected library
          });
          setSearchResults(fallbackResult.results);
          setSearchTotalCount(fallbackResult.totalCount);
        }
      } catch (error) {
        console.warn('Worker search failed, using fallback:', error);
        // Always fallback to client-side search on any error
        const { fallbackSearch } = require('@/lib/fallback-search');
        const fallbackResult = fallbackSearch(icons, searchQuery, {
          fuzzy: true,
          maxResults: 10000, // Increase limit to show more results
          minScore: 0.1,
          enableSynonyms: true,
          enablePhonetic: true,
          libraryId: selectedSet // Filter by selected library
        });
        setSearchResults(fallbackResult.results);
        setSearchTotalCount(fallbackResult.totalCount);
      }
    };

    performSearch();
  }, [searchQuery, search, searchReady, loaded, icons, selectedSet]);

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

  // Group search results by library for sectioned display when searching "all icons"
  const groupedSearchSections = useMemo(() => {
    if (!searchQuery.trim() || selectedSet !== "all" || searchResults.length === 0) {
      return [];
    }

    // Group icons by library ID
    const iconsByLibrary = new Map<string, IconItem[]>();
    
    searchResults.forEach(icon => {
      // Extract library ID from icon ID (assumes format like "library-iconname")
      const libraryId = icon.id.split('-')[0];
      if (!iconsByLibrary.has(libraryId)) {
        iconsByLibrary.set(libraryId, []);
      }
      iconsByLibrary.get(libraryId)!.push(icon);
    });

    // Create sections in the same order as defined in IconLibraryManager
    const orderedSections: LibrarySection[] = [];
    
    iconLibraryManager.libraries.forEach(libraryMeta => {
      const libraryIcons = iconsByLibrary.get(libraryMeta.id);
      if (libraryIcons && libraryIcons.length > 0) {
        // Filter by category if selected
        let filteredIcons = libraryIcons;
        if (selectedCategory) {
          filteredIcons = libraryIcons.filter(icon => icon.category === selectedCategory);
        }
        
        if (filteredIcons.length > 0) {
          // Sort icons within each library (outline icons first, then alphabetically)
          const sortedIcons = filteredIcons.sort((a, b) => {
            const aIsOutline = a.style === 'outline' || a.id.includes('outline');
            const bIsOutline = b.style === 'outline' || b.id.includes('outline');
            
            if (aIsOutline && !bIsOutline) return -1;
            if (!aIsOutline && bIsOutline) return 1;
            
            return a.name.localeCompare(b.name);
          });
          
          orderedSections.push({
            libraryId: libraryMeta.id,
            libraryName: libraryMeta.name,
            icons: sortedIcons
          });
        }
      }
    });

    return orderedSections;
  }, [searchQuery, selectedSet, searchResults, selectedCategory]);

  // Reset category when library changes
  React.useEffect(() => {
    setSelectedCategory(null);
  }, [selectedSet]);

  const { isFirstCopy, markFirstCopyComplete, getKeyboardShortcut } = useFirstTimeUser();

  const handleCopy = (icon: IconItem) => {
    setSelectedId(icon.id);
    
    // Show first copy nudge if this is their first copy
    if (isFirstCopy) {
      showFirstCopyNudge({ keyboardShortcut: getKeyboardShortcut() });
      markFirstCopyComplete();
    } else {
      toast({
        description: `${icon.name} icon copied to clipboard!`,
        duration: 2000,
      });
    }
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
                      {searchQuery && searchTotalCount > (groupedSearchSections.length > 0 ? groupedSearchSections.reduce((total, section) => total + section.icons.length, 0) : displayedIcons.length) ? (
                        <>
                          Showing {groupedSearchSections.length > 0 ? groupedSearchSections.reduce((total, section) => total + section.icons.length, 0).toLocaleString() : displayedIcons.length.toLocaleString()} of {searchTotalCount.toLocaleString()} icons matching "{searchQuery}"
                          {selectedCategory && ` in ${selectedCategory}`}
                        </>
                      ) : searchQuery ? (
                        <>
                          {groupedSearchSections.length > 0 ? groupedSearchSections.reduce((total, section) => total + section.icons.length, 0).toLocaleString() : displayedIcons.length.toLocaleString()} icons matching "{searchQuery}"
                          {selectedCategory && ` in ${selectedCategory}`}
                        </>
                      ) : (
                        <>
                          {(() => {
                            if (selectedSet === "all") return totalCount.toLocaleString();
                            if (selectedSet === "animated") {
                              const animatedLib = libraries.find(lib => lib.id === "animated");
                              return animatedLib ? animatedLib.count.toLocaleString() : "0";
                            }
                            const selectedLib = libraries.find(lib => lib.id === selectedSet);
                            return selectedLib ? selectedLib.count.toLocaleString() : "0";
                          })()} icons
                          {selectedCategory && ` in ${selectedCategory}`}
                        </>
                      )}
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
            {showLoadingAnimation ? (
              <div className="flex-1 flex items-center justify-center h-full">
                <LoadingWithTagline 
                  minDuration={4000}
                  onMinDurationComplete={() => setMinDurationComplete(true)}
                />
              </div>
            ) : loadingTimeout ? (
              <div className="flex h-64 items-center justify-center text-center px-6">
                <Alert className="max-w-md">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="mt-2">
                    <p className="font-medium">Taking longer than expected</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      The icons are taking a while to load. Please check your connection.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-3 text-sm text-primary hover:text-primary/80 underline"
                    >
                      Reload page
                    </button>
                  </AlertDescription>
                </Alert>
              </div>
            ) : error ? (
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
            ) : displayedIcons.length === 0 && !loading ? (
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
              // Use SectionedIconGrid for: 1) "all icons" without search, OR 2) "all icons" with search results
              (selectedSet === "all" && !searchQuery.trim() && sections.length > 0) || 
              (selectedSet === "all" && searchQuery.trim() && groupedSearchSections.length > 0) ? (
                <SectionedIconGrid
                  sections={searchQuery.trim() ? groupedSearchSections : sections}
                  selectedId={selectedId}
                  onCopy={handleCopy}
                  onIconClick={handleIconClick}
                  color={customization.color}
                  strokeWidth={customization.strokeWidth}
                />
              ) : (
                <IconGrid
                  items={displayedIcons}
                  selectedId={selectedId}
                  onCopy={handleCopy}
                  onIconClick={handleIconClick}
                  color={customization.color}
                  strokeWidth={customization.strokeWidth}
                  libraryName={selectedSet !== "all" ? (
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
                    selectedSet.charAt(0).toUpperCase() + selectedSet.slice(1)
                  ) : undefined}
                />
              )
            )}
          </main>
          
          <footer className="border-t p-4 text-center text-xs text-muted-foreground bg-background">
            <p>Built by Ossian Design Lab • <a href="mailto:support@iconstack.io" className="hover:text-primary">Support</a></p>
          </footer>
        </div>
        
        <ControlPanel selectedIcon={selectedIcon} selectedSet={selectedSet} />
      </div>
    </SidebarProvider>
  );
}

const Index = () => {
  return <IconGridPage />;
};

export default Index;