import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "./color-picker";
import { StrokeSlider } from "./stroke-slider";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useIconCustomization } from "@/contexts/IconCustomizationContext";
import { toast } from "@/hooks/use-toast";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface ControlPanelProps {
  selectedIcon?: {
    id: string;
    name: string;
    svg: string | React.ComponentType<any>;
    style?: string;
  } | null;
}

export function ControlPanel({
  selectedIcon
}: ControlPanelProps) {
  const {
    customization
  } = useIconCustomization();

  const handleDownloadSVG = async () => {
    if (!selectedIcon) return;
    
    const isSolidIcon = selectedIcon.style === 'solid';
    
    try {
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
        
        // Only add strokeWidth for outline icons
        if (!isSolidIcon) {
          iconProps.strokeWidth = customization.strokeWidth;
        }
        
        const element = React.createElement(IconComponent, iconProps);
        svgContent = renderToStaticMarkup(element);
      }

      // Apply current customizations to the SVG (skip stroke-width for solid icons)
      let customizedSVG = svgContent.replace(/stroke="[^"]*"/g, `stroke="${customization.color}"`);
      
      if (!isSolidIcon) {
        customizedSVG = customizedSVG.replace(/stroke-width="[^"]*"/g, `stroke-width="${customization.strokeWidth}"`);
      }

      // Create and download the file
      const blob = new Blob([customizedSVG], {
        type: 'image/svg+xml'
      });
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
      
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      
      // Set canvas size to 500x500
      canvas.width = 500;
      canvas.height = 500;
      
      // Create an image from the SVG
      const img = new Image();
      const svgBlob = new Blob([customizedSVG], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        // Clear canvas with transparent background
        ctx.clearRect(0, 0, 500, 500);
        
        // Draw the image centered on the canvas
        ctx.drawImage(img, 0, 0, 500, 500);
        
        // Convert canvas to PNG blob
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
        }, 'image/png');
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        throw new Error('Failed to load SVG image');
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

  const getCustomizedSVG = () => {
    if (!selectedIcon) return '';
    
    const isSolidIcon = selectedIcon.style === 'solid';
    
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
      
      // Only add strokeWidth for outline icons
      if (!isSolidIcon) {
        iconProps.strokeWidth = customization.strokeWidth;
      }
      
      const element = React.createElement(IconComponent, iconProps);
      svgContent = renderToStaticMarkup(element);
    }

    // Apply current customizations to the SVG (skip stroke-width for solid icons)
    let customizedSVG = svgContent.replace(/stroke="[^"]*"/g, `stroke="${customization.color}"`);
    
    if (!isSolidIcon) {
      customizedSVG = customizedSVG.replace(/stroke-width="[^"]*"/g, `stroke-width="${customization.strokeWidth}"`);
    }
    
    return customizedSVG;
  };

  const handleCopySVG = async () => {
    if (!selectedIcon) {
      toast({
        description: "Please select an icon first",
        variant: "destructive",
        duration: 2000
      });
      return;
    }
    try {
      const customizedSVG = getCustomizedSVG();

      // Encode SVG as data URL
      const encodedSVG = encodeURIComponent(customizedSVG);
      const dataURL = `data:image/svg+xml,${encodedSVG}`;
      await navigator.clipboard.writeText(dataURL);
      toast({
        description: "SVG data URL copied to clipboard!",
        duration: 2000
      });
    } catch (error) {
      toast({
        description: "Failed to copy SVG",
        variant: "destructive",
        duration: 2000
      });
    }
  };

  const handleCopyXML = async () => {
    if (!selectedIcon) {
      toast({
        description: "Please select an icon first",
        variant: "destructive",
        duration: 2000
      });
      return;
    }
    try {
      const customizedSVG = getCustomizedSVG();
      await navigator.clipboard.writeText(customizedSVG);
      toast({
        description: "SVG XML copied to clipboard!",
        duration: 2000
      });
    } catch (error) {
      toast({
        description: "Failed to copy XML",
        variant: "destructive",
        duration: 2000
      });
    }
  };

  return (
    <div className="w-80 border-l bg-background h-full flex flex-col">
      {/* Fixed Header */}
      <div className="p-6 pb-4 border-b">
        <h2 className="text-lg font-semibold">Customize</h2>
      </div>
      
      {/* Scrollable Middle Section */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full scrollbar-none">
          <div className="p-6 space-y-6">
            <ColorPicker />
            
            <Separator />
            
            {/* Always show stroke slider, but hide when solid icon is selected */}
            {(!selectedIcon || selectedIcon.style !== 'solid') && (
              <>
                <StrokeSlider />
                <Separator />
              </>
            )}
          </div>
        </ScrollArea>
      </div>
      
      {/* Fixed Footer - Export Section */}
      <div className="p-6 pt-4 border-t bg-background">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Export</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopySVG} 
              disabled={!selectedIcon} 
              className="text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy SVG
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopyXML} 
              disabled={!selectedIcon} 
              className="text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy XML
            </Button>
          </div>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleDownloadSVG} 
            disabled={!selectedIcon} 
            className="w-full text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Download SVG
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadPNG} 
            disabled={!selectedIcon} 
            className="w-full text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Download PNG
          </Button>
        </div>
      </div>
    </div>
  );
}