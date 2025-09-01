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
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 text-sm font-medium text-muted-foreground">
            Icon Sets
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {iconSets.map((set) => (
                <SidebarMenuItem key={set.id}>
                  <SidebarMenuButton
                    onClick={() => onSetChange(set.id)}
                    isActive={selectedSet === set.id}
                    className={`w-full justify-start text-left transition-all hover:bg-hover-bg ${
                      selectedSet === set.id
                        ? 'bg-icon-hover text-primary font-medium'
                        : ''
                    }`}
                  >
                    <set.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                    {sidebarOpen && (
                      <div className="flex w-full items-center justify-between">
                        <span className="truncate">{set.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {set.count.toLocaleString()}
                        </span>
                      </div>
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