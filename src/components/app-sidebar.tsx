import { Package2, Home, Star } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

// Icon set data matching NotionIcons
const iconSets = [
  { name: "All Icons", id: "all", count: 40000, icon: Home },
  { name: "Favorites", id: "favorites", count: 0, icon: Star },
  { name: "Untitled UI", id: "untitled-ui", count: 2400, icon: Package2 },
  { name: "Atlas", id: "atlas", count: 1800, icon: Package2 },
  { name: "Bootstrap", id: "bootstrap", count: 1600, icon: Package2 },
  { name: "Boxicons", id: "boxicons", count: 1500, icon: Package2 },
  { name: "CSS.GG", id: "css-gg", count: 700, icon: Package2 },
  { name: "Feather", id: "feather", count: 287, icon: Package2 },
  { name: "Heroicons", id: "heroicons", count: 292, icon: Package2 },
  { name: "Iconoir", id: "iconoir", count: 1400, icon: Package2 },
  { name: "Lucide", id: "lucide", count: 1200, icon: Package2 },
  { name: "Majesticons", id: "majesticons", count: 720, icon: Package2 },
  { name: "Material Icons", id: "material", count: 10000, icon: Package2 },
  { name: "Phosphor", id: "phosphor", count: 6000, icon: Package2 },
  { name: "Pixelarticons", id: "pixelart", count: 460, icon: Package2 },
  { name: "Remix", id: "remix", count: 2800, icon: Package2 },
  { name: "Scarlab", id: "scarlab", count: 300, icon: Package2 },
  { name: "Simple Icons", id: "simple", count: 2700, icon: Package2 },
  { name: "Tabler", id: "tabler", count: 4500, icon: Package2 },
];

interface AppSidebarProps {
  selectedSet: string;
  onSetChange: (setId: string) => void;
}

export function AppSidebar({ selectedSet, onSetChange }: AppSidebarProps) {
  const { open: sidebarOpen } = useSidebar();

  return (
    <Sidebar className="w-64 border-r">
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
            <span className="text-lg font-bold text-primary-foreground">N</span>
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold tracking-tight">NotionIcons</h1>
              <p className="text-xs text-muted-foreground">40,000+ Free Icons</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
            Icon Libraries
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {iconSets.map((set) => (
                <SidebarMenuItem key={set.id}>
                  <SidebarMenuButton
                    onClick={() => onSetChange(set.id)}
                    isActive={selectedSet === set.id}
                    className={`group relative flex h-9 w-full items-center justify-start rounded-lg px-3 text-sm font-medium transition-all duration-200 hover:bg-accent/50 ${
                      selectedSet === set.id
                        ? 'bg-accent text-accent-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <set.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 truncate text-left">{set.name}</span>
                        <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
                          {set.count > 1000 ? `${Math.floor(set.count / 1000)}k` : set.count.toLocaleString()}
                        </span>
                      </>
                    )}
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