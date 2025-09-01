import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { IconGrid } from "@/components/icon-grid";
import { ControlPanel } from "@/components/control-panel";
import { IconCustomizationProvider } from "@/contexts/IconCustomizationContext";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSet, setSelectedSet] = useState("all");

  return (
    <IconCustomizationProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar 
            selectedSet={selectedSet}
            onSetChange={setSelectedSet}
          />
          
          <div className="flex-1 flex flex-col">
            <Header 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            
            <main className="flex-1 overflow-auto">
              <IconGrid 
                searchQuery={searchQuery}
                selectedSet={selectedSet}
              />
            </main>
            
            <footer className="border-t p-4 text-center text-xs text-muted-foreground">
              <p>Built with ❤️ • <a href="mailto:support@notionicons.so" className="hover:text-primary">Support</a></p>
            </footer>
          </div>
          
          <ControlPanel />
        </div>
      </SidebarProvider>
    </IconCustomizationProvider>
  );
};

export default Index;