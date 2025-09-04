import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Copy, Download, FileCode, Braces, Image } from "lucide-react";
import { useIconCustomization } from "@/contexts/IconCustomizationContext";
import { toast } from "@/hooks/use-toast";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { supportsStrokeWidth } from "@/lib/icon-utils";

interface MobileIconActionsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIcon: {
    id: string;
    name: string;
    svg: string | React.ComponentType<any>;
    style?: string;
  } | null;
}

export function MobileIconActions({
  isOpen,
  onClose,
  selectedIcon,
}: MobileIconActionsProps) {
  const { customization } = useIconCustomization();

  const getCustomizedSVG = () => {
    if (!selectedIcon) return '';
    
    const supportsStroke = supportsStrokeWidth(selectedIcon);
    
    let svgContent = '';
    if (typeof selectedIcon.svg === 'string') {
      svgContent = selectedIcon.svg;
    } else {
      // Render the React component to SVG string
      const IconComponent = selectedIcon.svg as React.ComponentType<any>;
      const iconProps: any = {
        size: 24,
        color: customization.color
      };
      
      // Only add strokeWidth for icons that support it
      if (supportsStroke) {
        iconProps.strokeWidth = customization.strokeWidth;
      }
      
      const element = React.createElement(IconComponent, iconProps);
      svgContent = renderToStaticMarkup(element);
    }

    // Apply current customizations to the SVG
    let customizedSVG = svgContent
      .replace(/stroke="[^"]*"/g, `stroke="${customization.color}"`)
      .replace(/fill="#[0-9A-Fa-f]{3,6}"/gi, `fill="${customization.color}"`)
      .replace(/stroke="#[0-9A-Fa-f]{3,6}"/gi, `stroke="${customization.color}"`);
    
    if (supportsStroke) {
      customizedSVG = customizedSVG
        .replace(/stroke-width="[^"]*"/g, `stroke-width="${customization.strokeWidth}"`)
        .replace(/strokeWidth="[^"]*"/g, `strokeWidth="${customization.strokeWidth}"`);
    }
    
    return customizedSVG;
  };

  const handleDownloadSVG = async () => {
    if (!selectedIcon) return;
    
    try {
      const customizedSVG = getCustomizedSVG();
      const blob = new Blob([customizedSVG], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedIcon.name}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({
        description: `${selectedIcon.name}.svg downloaded successfully!`,
        duration: 2000
      });
      onClose();
    } catch (error) {
      toast({
        description: "Failed to download SVG",
        variant: "destructive",
        duration: 2000
      });
    }
  };

  const handleDownloadPNG = async () => {
    if (!selectedIcon) return;
    
    try {
      const customizedSVG = getCustomizedSVG();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      
      canvas.width = 500;
      canvas.height = 500;
      
      const img = document.createElement('img');
      const svgBlob = new Blob([customizedSVG], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        ctx.clearRect(0, 0, 500, 500);
        ctx.drawImage(img, 0, 0, 500, 500);
        
        canvas.toBlob((blob) => {
          if (!blob) return;
          
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `${selectedIcon.name}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(downloadUrl);
          URL.revokeObjectURL(url);
          
          toast({
            description: `${selectedIcon.name}.png downloaded successfully!`,
            duration: 2000
          });
          onClose();
        }, 'image/png');
      };
      
      img.src = url;
    } catch (error) {
      toast({
        description: "Failed to download PNG",
        variant: "destructive",
        duration: 2000
      });
    }
  };

  const handleCopySVG = async () => {
    if (!selectedIcon) return;
    
    try {
      const customizedSVG = getCustomizedSVG();
      await navigator.clipboard.writeText(customizedSVG);
      toast({
        description: "SVG copied to clipboard!",
        duration: 2000
      });
      onClose();
    } catch (error) {
      toast({
        description: "Failed to copy SVG",
        variant: "destructive",
        duration: 2000
      });
    }
  };

  if (!selectedIcon) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[400px]">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-left">
            {selectedIcon.name}
          </SheetTitle>
        </SheetHeader>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Download options */}
          <Button
            onClick={handleDownloadSVG}
            className="flex flex-col h-20 gap-2"
            variant="outline"
          >
            <Download className="h-5 w-5" />
            <span className="text-xs">Download SVG</span>
          </Button>
          
          <Button
            onClick={handleDownloadPNG}
            className="flex flex-col h-20 gap-2"
            variant="outline"
          >
            <Image className="h-5 w-5" />
            <span className="text-xs">Download PNG</span>
          </Button>
          
          {/* Copy options */}
          <Button
            onClick={handleCopySVG}
            className="flex flex-col h-20 gap-2"
            variant="outline"
          >
            <Copy className="h-5 w-5" />
            <span className="text-xs">Copy SVG</span>
          </Button>
          
          <Button
            onClick={() => {
              // Copy as data URL for easy embedding
              const customizedSVG = getCustomizedSVG();
              const encodedSVG = encodeURIComponent(customizedSVG);
              const dataURL = `data:image/svg+xml,${encodedSVG}`;
              navigator.clipboard.writeText(dataURL).then(() => {
                toast({
                  description: "Data URL copied to clipboard!",
                  duration: 2000
                });
                onClose();
              });
            }}
            className="flex flex-col h-20 gap-2"
            variant="outline"
          >
            <FileCode className="h-5 w-5" />
            <span className="text-xs">Copy Data URL</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}