import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ColorPicker } from "./color-picker";
import { StrokeSlider } from "./stroke-slider";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useIconCustomization } from "@/contexts/IconCustomizationContext";
import { toast } from "@/hooks/use-toast";

interface ControlPanelProps {
  selectedIcon?: {
    id: string;
    name: string;
    svg: string | React.ComponentType<any>;
  } | null;
}

export function ControlPanel({ selectedIcon }: ControlPanelProps) {
  const { customization } = useIconCustomization();

  const handleDownloadSVG = async () => {
    if (!selectedIcon) return;
    
    try {
      let svgContent = '';
      
      if (typeof selectedIcon.svg === 'string') {
        svgContent = selectedIcon.svg;
      } else {
        // For React components, create a temporary SVG
        const IconComponent = selectedIcon.svg as React.ComponentType<any>;
        // This is a simplified approach - in a real app you'd want to render the component to get the actual SVG
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${customization.color}" stroke-width="${customization.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
          <!-- ${selectedIcon.name} icon -->
          <circle cx="12" cy="12" r="10"/>
        </svg>`;
      }
      
      // Apply current customizations to the SVG
      const customizedSVG = svgContent
        .replace(/stroke="[^"]*"/g, `stroke="${customization.color}"`)
        .replace(/stroke-width="[^"]*"/g, `stroke-width="${customization.strokeWidth}"`);
      
      // Create and download the file
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
        duration: 2000,
      });
    } catch (error) {
      toast({
        description: "Failed to download SVG",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleCopySettings = async () => {
    try {
      const settings = `color: ${customization.color}, stroke: ${customization.strokeWidth}px`;
      await navigator.clipboard.writeText(settings);
      toast({
        description: "Settings copied to clipboard!",
        duration: 2000,
      });
    } catch (error) {
      toast({
        description: "Failed to copy settings",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="w-80 border-l border-border bg-background">
      <Card className="border-0 rounded-none h-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Customize</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <ColorPicker />
          
          <Separator />
          
          <StrokeSlider />
          
          <Separator />
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Export</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopySettings}
                className="text-xs"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy CSS
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadSVG}
                disabled={!selectedIcon}
                className="text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                SVG
              </Button>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
            <div className="space-y-1">
              <div>Color: <span className="font-mono">{customization.color}</span></div>
              <div>Stroke: <span className="font-mono">{customization.strokeWidth}px</span></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}