import { Package2, Home, Layers, Map, Grid3X3, Box, Code2, Feather, Zap, Crown, Palette, Atom, Gamepad2, Music, TestTube, Circle, Table, Play, Globe, Minus, Hash, Bug, Workflow, GitBranch, Component, Sparkles, Sun } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { AnimatedPlayIcon } from "@/components/animated-play-icon";
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
import { octiconsIcons } from "@/data/octicons-icons";
import { radixIcons } from "@/data/radix-icons";
import { materialIcons } from "@/data/material-icons";
import { solarIcons } from "@/data/solar-icons";

// Calculate total icons count
const totalIconsCount = lucideIcons.length + featherIcons.length + phosphorIcons.length + tablerIcons.length + remixIcons.length + bootstrapIcons.length + boxicons.length + cssGgIcons.length + animatedIcons.length + iconsaxIcons.length + atlasIcons.length + lineIcons.length + pixelartIcons.length + teenyIcons.length + antIcons.length + fluentIcons.length + iconnoirIcons.length + octiconsIcons.length + radixIcons.length + materialIcons.length + solarIcons.length;

// Fixed top navigation items  
const topNavItems = [
  {
    name: "All Icons",
    id: "all",
    count: totalIconsCount,
    icon: Home
  },
  {
    name: "Animated",
    id: "animated",
    count: animatedIcons.length,
    icon: AnimatedPlayIcon
  }
];

// Active icon libraries - ordered per user preference
const activeLibraries = [
  { name: "Material Design", id: "material", count: materialIcons.length, icon: Sparkles },
  { name: "Atlas Icons", id: "atlas", count: atlasIcons.length, icon: Globe },
  { name: "Lucide", id: "lucide", count: lucideIcons.length, icon: Zap },
  { name: "Feather", id: "feather", count: featherIcons.length, icon: Feather },
  { name: "Solar", id: "solar", count: solarIcons.length, icon: Sun },
  { name: "Phosphor", id: "phosphor", count: phosphorIcons.length, icon: Atom },
  { name: "Tabler", id: "tabler", count: tablerIcons.length, icon: Table },
  { name: "Bootstrap", id: "bootstrap", count: bootstrapIcons.length, icon: Layers },
  { name: "Remix", id: "remix", count: remixIcons.length, icon: Music },
  { name: "BoxIcons", id: "boxicons", count: boxicons.length, icon: Package2 },
  { name: "CSS.gg", id: "css-gg", count: cssGgIcons.length, icon: Code2 },
  { name: "Iconsax", id: "iconsax", count: iconsaxIcons.length, icon: Crown },
  { name: "Line Icons", id: "line", count: lineIcons.length, icon: Minus },
  { name: "Pixelart Icons", id: "pixelart", count: pixelartIcons.length, icon: Hash },
  { name: "Teeny Icons", id: "teeny", count: teenyIcons.length, icon: Circle },
  { name: "Ant Design", id: "ant", count: antIcons.length, icon: Bug },
  { name: "Fluent UI", id: "fluent", count: fluentIcons.length, icon: Workflow },
  { name: "IconNoir", id: "iconnoir", count: iconnoirIcons.length, icon: Palette },
  { name: "Octicons", id: "octicons", count: octiconsIcons.length, icon: GitBranch },
  { name: "Radix Icons", id: "radix", count: radixIcons.length, icon: Component },
];

// Placeholder libraries (coming soon)
const placeholderLibraries = [
  // All libraries are now active!
];

interface AppSidebarProps {
  selectedSet: string;
  onSetChange: (setId: string) => void;
}

export function AppSidebar({ selectedSet, onSetChange }: AppSidebarProps) {
  return (
    <Sidebar className="border-r flex flex-col">
      {/* Fixed Header - Logo Area */}
      <SidebarHeader className="flex-shrink-0 border-b h-16">
        <div className="flex items-center px-3 h-full">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Crown className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Icon Library</span>
              <span className="text-xs text-muted-foreground">
                {totalIconsCount.toLocaleString()}+ icons
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* Fixed Browse Section */}
      <div className="flex-shrink-0">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Browse
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {topNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onSetChange(item.id)}
                    className={cn(
                      "w-full justify-start gap-3 text-sm",
                      selectedSet === item.id && "bg-accent text-accent-foreground font-medium"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{item.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.count.toLocaleString()}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
      </div>

      {/* Scrollable Content Area */}
      <SidebarContent className="flex-1 overflow-y-auto">
        {/* Icon Libraries */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Libraries
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {activeLibraries.map((library) => (
                <SidebarMenuItem key={library.id}>
                  <SidebarMenuButton 
                    onClick={() => onSetChange(library.id)}
                    className={cn(
                      "w-full justify-start gap-3 text-sm",
                      selectedSet === library.id && "bg-accent text-accent-foreground font-medium"
                    )}
                  >
                    <library.icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{library.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {library.count.toLocaleString()}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}