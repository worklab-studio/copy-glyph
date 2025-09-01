import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIconCustomization } from "@/contexts/IconCustomizationContext";

const presetColors = [
  "#664FC2", // Default purple
  "#000000", // Black
  "#6B7280", // Gray
  "#DC2626", // Red
  "#EA580C", // Orange
  "#CA8A04", // Yellow
  "#16A34A", // Green
  "#0EA5E9", // Blue
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#3B82F6", // Blue
  "#6366F1", // Indigo
  "#8B5A2B", // Brown
];

export function ColorPicker() {
  const { customization, updateColor } = useIconCustomization();
  const [hexInput, setHexInput] = useState(customization.color);
  const [open, setOpen] = useState(false);

  const handleHexChange = (value: string) => {
    setHexInput(value);
    
    // Validate hex color
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(value)) {
      updateColor(value);
    }
  };

  const handlePresetClick = (color: string) => {
    setHexInput(color);
    updateColor(color);
    setOpen(false); // Close popover after selection
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Color</Label>
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-8 w-8 rounded-md border border-border flex-shrink-0 p-0 hover:scale-105 transition-transform"
              style={{ backgroundColor: customization.color }}
              aria-label="Open color picker"
            />
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4" side="bottom" align="start">
            <div className="space-y-4">
              {/* Hex Input */}
              <div className="space-y-2">
                <Label htmlFor="hex-input" className="text-sm font-medium">Hex Code</Label>
                <Input
                  id="hex-input"
                  value={hexInput}
                  onChange={(e) => handleHexChange(e.target.value)}
                  placeholder="#664FC2"
                  className="text-xs font-mono"
                />
              </div>

              {/* Color Presets */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Presets</Label>
                <div className="grid grid-cols-8 gap-2">
                  {presetColors.map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      onClick={() => handlePresetClick(color)}
                      className="h-8 w-8 p-0 hover:scale-110 transition-transform focus:ring-2 focus:ring-primary"
                      style={{ 
                        backgroundColor: color,
                        borderColor: customization.color === color ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                        borderWidth: customization.color === color ? '2px' : '1px'
                      }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <span className="text-xs text-muted-foreground font-mono">
          {customization.color}
        </span>
      </div>
    </div>
  );
}