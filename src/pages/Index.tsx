import React, { useState } from "react";
import { lucideIcons } from "@/data/lucide-icons";
import { IconGrid } from "@/components/icon-grid/IconGrid";
import { IconCustomizationProvider, useIconCustomization } from "@/contexts/IconCustomizationContext";
import { type IconItem } from "@/types/icon";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/color-picker";
import { Palette, Download } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { renderToStaticMarkup } from "react-dom/server";

function IconGridPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { customization } = useIconCustomization();
  const isMobile = useIsMobile();

  // Get the selected icon object
  const selectedIcon = React.useMemo(() => {
    if (!selectedId) return null;
    return lucideIcons.find(icon => icon.id === selectedId) || null;
  }, [selectedId]);

  const handleCopy = (icon: IconItem) => {
    setSelectedId(icon.id);
    toast({
      description: `${icon.name} icon selected!`,
      duration: 2000,
    });
  };

  const handleIconClick = (icon: IconItem) => {
    setSelectedId(prevId => prevId === icon.id ? null : icon.id);
  };

  // Convert SVG to PNG and download
  const handlePngDownload = async () => {
    if (!selectedIcon) {
      toast({
        description: "Please select an icon first",
        variant: "destructive",
      });
      return;
    }

    try {
      const IconComponent = selectedIcon.svg as React.ComponentType<any>;
      const iconProps = {
        size: 256, // Large size for PNG
        color: customization.color,
        strokeWidth: customization.strokeWidth
      };
      
      const element = React.createElement(IconComponent, iconProps);
      const svgContent = renderToStaticMarkup(element);
      
      // Create SVG blob
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      // Create image element to render SVG
      const img = new Image();
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d')!;
        
        // Fill with transparent background
        ctx.clearRect(0, 0, 256, 256);
        
        // Draw the SVG
        ctx.drawImage(img, 0, 0, 256, 256);
        
        // Convert to PNG and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${selectedIcon.name}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            toast({
              description: `${selectedIcon.name}.png downloaded!`,
            });
          }
        }, 'image/png');
        
        URL.revokeObjectURL(svgUrl);
      };
      
      img.src = svgUrl;
    } catch (error) {
      toast({
        description: "Failed to download PNG",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-6 md:px-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Icon Browser</h1>
          <p className="text-muted-foreground">
            {lucideIcons.length} Lucide icons available
            {selectedIcon && ` • ${selectedIcon.name} selected`}
          </p>
        </div>
      </div>
      
      <div className={`px-0 md:px-6 ${isMobile ? 'pb-20' : ''}`}>
        <IconGrid
          items={lucideIcons}
          selectedId={selectedId}
          onCopy={handleCopy}
          onIconClick={handleIconClick}
          color={customization.color}
          strokeWidth={customization.strokeWidth}
        />
      </div>
      
      {/* Mobile bottom bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex items-center gap-3 z-50">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Palette className="h-4 w-4 mr-2" />
                Color
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Choose Icon Color</DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                <ColorPicker />
              </div>
            </DrawerContent>
          </Drawer>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={handlePngDownload}
            disabled={!selectedIcon}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            PNG
          </Button>
        </div>
      )}
    </div>
  );
}

const Index = () => {
  return (
    <IconCustomizationProvider>
      <IconGridPage />
      <Toaster />
    </IconCustomizationProvider>
  );
};

export default Index;