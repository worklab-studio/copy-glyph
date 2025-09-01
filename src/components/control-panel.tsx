import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ColorPicker } from "./color-picker";
import { StrokeSlider } from "./stroke-slider";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useIconCustomization } from "@/contexts/IconCustomizationContext";
import { toast } from "@/hooks/use-toast";

export function ControlPanel() {
  const { customization } = useIconCustomization();

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
                disabled
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