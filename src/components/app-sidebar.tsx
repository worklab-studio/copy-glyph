import { useState } from "react";
import { Package2, Home, Star, Layers, Map, Grid3X3, Box, Code2, Feather, Shield, Paintbrush, Zap, Crown, Palette, Atom, Gamepad2, Music, TestTube, Circle, Table, ChevronDown, ChevronRight } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarSeparator, useSidebar } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

// Fixed top navigation items  
const topNavItems = [{
  name: "All Icons",
  id: "all",
  count: 10000, // Approximate total from all libraries
  icon: Home
}, {
  name: "Favorites", 
  id: "favorites",
  count: 0,
  icon: Star
}];

// Active icon libraries (actually implemented)
const activeLibraries = [{
  name: "Lucide",
  id: "lucide", 
  count: 37,
  icon: Zap,
  hasVariants: false
}, {
  name: "Feather",
  id: "feather",
  count: 287,
  icon: Feather,
  hasVariants: false
}, {
  name: "Heroicons",
  id: "heroicons",
  count: 584,
  icon: Shield,
  hasVariants: true,
  variants: [
    { name: "Outline", id: "heroicons-outline", count: 292 },
    { name: "Solid", id: "heroicons-solid", count: 292 }
  ]
}, {
  name: "Phosphor",
  id: "phosphor",
  count: 6000,
  icon: Atom,
  hasVariants: false
}, {
  name: "Tabler",
  id: "tabler",
  count: 4968,
  icon: Table,
  hasVariants: false
}];

// Placeholder icon library sets (not implemented yet)
const placeholderLibraries = [{
  name: "Untitled UI",
  id: "untitled-ui", 
  count: 2400,
  icon: Layers
}, {
  name: "Atlas",
  id: "atlas",
  count: 1800,
  icon: Map
}, {
  name: "Bootstrap", 
  id: "bootstrap",
  count: 1600,
  icon: Grid3X3
}, {
  name: "Boxicons",
  id: "boxicons",
  count: 1500,
  icon: Box
}, {
  name: "CSS.GG",
  id: "css-gg",
  count: 700,
  icon: Code2
}, {
  name: "Iconoir",
  id: "iconoir",
  count: 1400,
  icon: Paintbrush
}, {
  name: "Majesticons",
  id: "majesticons",
  count: 720,
  icon: Crown
}, {
  name: "Material Icons",
  id: "material",
  count: 10000,
  icon: Palette
}, {
  name: "Pixelarticons",
  id: "pixelart", 
  count: 460,
  icon: Gamepad2
}, {
  name: "Remix",
  id: "remix",
  count: 2800,
  icon: Music
}, {
  name: "Scarlab",
  id: "scarlab",
  count: 300,
  icon: TestTube
}, {
  name: "Simple Icons",
  id: "simple",
  count: 2700,
  icon: Circle
}];
interface AppSidebarProps {
  selectedSet: string;
  onSetChange: (setId: string) => void;
}

export function AppSidebar({
  selectedSet,
  onSetChange
}: AppSidebarProps) {
  const {
    open: sidebarOpen
  } = useSidebar();

  const [expandedLibraries, setExpandedLibraries] = useState<Set<string>>(
    new Set(['heroicons']) // Keep heroicons expanded by default
  );

  const toggleLibrary = (libraryId: string) => {
    setExpandedLibraries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(libraryId)) {
        newSet.delete(libraryId);
      } else {
        newSet.add(libraryId);
      }
      return newSet;
    });
  };
  return <Sidebar className="w-64 border-r">
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground shadow-lg">
            <span className="text-lg font-bold text-background">I</span>
          </div>
          {sidebarOpen && <div className="flex flex-col">
              <h1 className="text-lg font-semibold tracking-tight">Icons</h1>
              <p className="text-xs text-muted-foreground">40,000+ Free Icons</p>
            </div>}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex flex-col p-3">
        {/* Fixed top navigation */}
        <SidebarGroup className="flex-shrink-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {topNavItems.map(item => <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton onClick={() => onSetChange(item.id)} isActive={selectedSet === item.id} className={cn(
                      "group relative flex h-9 w-full items-center justify-start rounded-lg px-3 text-sm font-medium transition-all duration-300 hover:bg-accent/50",
                      selectedSet === item.id 
                        ? 'bg-accent text-accent-foreground shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    )}>
                    <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                    {sidebarOpen && <>
                        <span className="flex-1 truncate text-left">{item.name}</span>
                        <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
                          {item.count > 1000 ? `${Math.floor(item.count / 1000)}k` : item.count.toLocaleString()}
                        </span>
                      </>}
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        {/* Active icon libraries */}
        <SidebarGroup className="flex-shrink-0">
          <SidebarGroupLabel className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
            Available Libraries
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {activeLibraries.map(library => {
                if (!library.hasVariants) {
                  return (
                    <SidebarMenuItem key={library.id}>
                      <SidebarMenuButton 
                        onClick={() => onSetChange(library.id)} 
                        isActive={selectedSet === library.id} 
                        className={cn(
                          "group relative flex h-9 w-full items-center justify-start rounded-lg px-3 text-sm font-medium transition-all duration-300 hover:bg-accent/50",
                          selectedSet === library.id 
                            ? 'bg-accent text-accent-foreground shadow-sm' 
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        <library.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                        {sidebarOpen && (
                          <>
                            <span className="flex-1 truncate text-left">{library.name}</span>
                            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
                              {library.count > 1000 ? `${Math.floor(library.count / 1000)}k` : library.count.toLocaleString()}
                            </span>
                          </>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                // Handle libraries with variants (like Heroicons)
                const isExpanded = expandedLibraries.has(library.id);
                const hasActiveVariant = library.variants?.some(variant => selectedSet === variant.id);

                return (
                  <SidebarMenuItem key={library.id}>
                    <Collapsible open={isExpanded} onOpenChange={() => toggleLibrary(library.id)}>
                      <div className="relative">
                        <SidebarMenuButton 
                          className={cn(
                            "relative flex h-9 w-full items-center justify-start rounded-lg px-3 text-sm font-medium transition-all duration-300 hover:bg-accent/50",
                            hasActiveVariant 
                              ? 'bg-accent/30 text-accent-foreground' 
                              : 'text-muted-foreground hover:text-foreground'
                          )}
                        >
                          {/* Icon area with hover replacement */}
                          <div className="relative mr-3 h-4 w-4 flex-shrink-0 flex items-center justify-center">
                            {/* Normal library icon */}
                            <library.icon className="h-4 w-4 transition-opacity duration-300 group-hover:opacity-0" />
                            {/* Dropdown trigger that replaces icon on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <CollapsibleTrigger asChild>
                                <button className="flex h-4 w-4 items-center justify-center rounded text-current hover:bg-accent/20 transition-colors duration-300">
                                  {isExpanded ? (
                                    <ChevronDown className="h-3 w-3" />
                                  ) : (
                                    <ChevronRight className="h-3 w-3" />
                                  )}
                                </button>
                              </CollapsibleTrigger>
                            </div>
                          </div>
                          {sidebarOpen && (
                            <>
                              <span className="group flex-1 truncate text-left">{library.name}</span>
                              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
                                {library.count > 1000 ? `${Math.floor(library.count / 1000)}k` : library.count.toLocaleString()}
                              </span>
                            </>
                          )}
                        </SidebarMenuButton>
                      </div>
                      <CollapsibleContent className="pl-7">
                        {library.variants?.map(variant => (
                          <SidebarMenuButton
                            key={variant.id}
                            onClick={() => onSetChange(variant.id)}
                            isActive={selectedSet === variant.id}
                            className={cn(
                              "group relative flex h-8 w-full items-center justify-start rounded-lg px-3 text-sm font-medium transition-all duration-300 hover:bg-accent/50 mb-0.5",
                              selectedSet === variant.id 
                                ? 'bg-accent text-accent-foreground shadow-sm' 
                                : 'text-muted-foreground hover:text-foreground'
                            )}
                          >
                            {sidebarOpen && (
                              <>
                                <span className="flex-1 truncate text-left">{variant.name}</span>
                                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
                                  {variant.count.toLocaleString()}
                                </span>
                              </>
                            )}
                          </SidebarMenuButton>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        {/* Placeholder icon libraries */}
        <SidebarGroup className="flex-1 overflow-hidden">
          <SidebarGroupLabel className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
            Coming Soon
          </SidebarGroupLabel>
          <SidebarGroupContent className="h-full overflow-y-auto">
            <SidebarMenu className="space-y-0.5">
              {placeholderLibraries.map(library => <SidebarMenuItem key={library.id}>
                  <SidebarMenuButton disabled className="group relative flex h-9 w-full items-center justify-start rounded-lg px-3 text-sm font-medium text-muted-foreground/50 cursor-not-allowed">
                    <library.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                    {sidebarOpen && <>
                        <span className="flex-1 truncate text-left">{library.name}</span>
                        <span className="ml-2 rounded-full bg-muted/50 px-2 py-0.5 text-xs tabular-nums text-muted-foreground/50">
                          {library.count > 1000 ? `${Math.floor(library.count / 1000)}k` : library.count.toLocaleString()}
                        </span>
                      </>}
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}