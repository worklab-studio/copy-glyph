import { Package2, Home, Layers, Map, Grid3X3, Box, Code2, Feather, Zap, Crown, Palette, Atom, Gamepad2, Music, TestTube, Circle, Table, Play } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
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


// Calculate total icons count
const totalIconsCount = lucideIcons.length + featherIcons.length + phosphorIcons.length + tablerIcons.length + remixIcons.length + bootstrapIcons.length + boxicons.length + cssGgIcons.length + animatedIcons.length + iconsaxIcons.length + atlasIcons.length;

// Fixed top navigation items  
const topNavItems = [{
  name: "All Icons",
  id: "all",
  count: totalIconsCount,
  icon: Home
}];

// Active icon libraries (actually implemented)
const activeLibraries = [{
  name: "Animated",
  id: "animated",
  count: animatedIcons.length,
  icon: Play,
  hasVariants: false
}, {
  name: "Tabler",
  id: "tabler",
  count: tablerIcons.length,
  icon: Table,
  hasVariants: false
}, {
  name: "Lucide",
  id: "lucide",
  count: lucideIcons.length,
  icon: Zap,
  hasVariants: false
}, {
  name: "Feather",
  id: "feather",
  count: featherIcons.length,
  icon: Feather,
  hasVariants: false
}, {
  name: "Phosphor",
  id: "phosphor",
  count: phosphorIcons.length,
  icon: Atom,
  hasVariants: false
}, {
  name: "Bootstrap",
  id: "bootstrap",
  count: bootstrapIcons.length,
  icon: Grid3X3,
  hasVariants: false
}, {
  name: "Remix",
  id: "remix",
  count: remixIcons.length,
  icon: Music,
  hasVariants: false
}, {
  name: "Boxicons",
  id: "boxicons",
  count: boxicons.length,
  icon: Box,
  hasVariants: false
}, {
  name: "CSS.GG",
  id: "css-gg",
  count: cssGgIcons.length,
  icon: Code2,
  hasVariants: false
}, {
  name: "Iconsax",
  id: "iconsax",
  count: iconsaxIcons.length,
  icon: Crown,
  hasVariants: false
}, {
  name: "Atlas",
  id: "atlas",
  count: atlasIcons.length,
  icon: Map,
  hasVariants: false
}];

// Placeholder icon library sets (not implemented yet)
const placeholderLibraries = [{
  name: "Untitled UI",
  id: "untitled-ui",
  count: 2400,
  icon: Layers
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
  name: "Scarlab",
  id: "scarlab",
  count: 300,
  icon: TestTube
}];
interface AppSidebarProps {
  selectedSet: string;
  onSetChange: (setId: string) => void;
}
export function AppSidebar({
  selectedSet,
  onSetChange
}: AppSidebarProps) {
  return <Sidebar className="w-64 border-r">
      <SidebarHeader className="border-b border-border/50 h-16 flex items-center px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground shadow-lg">
            <span className="text-lg font-bold text-background">I</span>
          </div>
          <div className="flex flex-col">
              <h1 className="text-lg font-semibold tracking-tight">Icono</h1>
              <p className="text-xs text-muted-foreground">50,000+ Free Icons</p>
            </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex flex-col p-3">
        {/* Fixed top navigation */}
        <SidebarGroup className="flex-shrink-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {topNavItems.map(item => <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton onClick={() => onSetChange(item.id)} isActive={selectedSet === item.id} className={cn("group relative flex h-9 w-full items-center justify-start rounded-lg px-3 text-sm font-medium transition-all duration-300 hover:bg-accent/50", selectedSet === item.id ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
                    <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 truncate text-left">{item.name}</span>
                    <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
                      {item.count > 1000 ? `${Math.floor(item.count / 1000)}k` : item.count.toLocaleString()}
                    </span>
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
                return <SidebarMenuItem key={library.id}>
                      <SidebarMenuButton onClick={() => onSetChange(library.id)} isActive={selectedSet === library.id} className={cn("group relative flex h-9 w-full items-center justify-start rounded-lg px-3 text-sm font-medium transition-all duration-300 hover:bg-accent/50", selectedSet === library.id ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
                        <library.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                        <span className="flex-1 truncate text-left">{library.name}</span>
                        <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
                          {library.count > 1000 ? `${Math.floor(library.count / 1000)}k` : library.count.toLocaleString()}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>;
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
                    <span className="flex-1 truncate text-left">{library.name}</span>
                    <span className="ml-2 rounded-full bg-muted/50 px-2 py-0.5 text-xs tabular-nums text-muted-foreground/50">
                      {library.count > 1000 ? `${Math.floor(library.count / 1000)}k` : library.count.toLocaleString()}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}