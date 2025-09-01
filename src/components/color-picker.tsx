import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
];

export function ColorPicker() {
  const { customization, updateColor } = useIconCustomization();
  const [hexInput, setHexInput] = useState(customization.color);

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
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Color</Label>
        <div className="flex items-center gap-2">
          <div 
            className="h-8 w-8 rounded-md border border-border flex-shrink-0"
            style={{ backgroundColor: customization.color }}
          />
          <Input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            placeholder="#664FC2"
            className="text-xs font-mono"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Presets</Label>
        <div className="grid grid-cols-5 gap-2">
          {presetColors.map((color) => (
            <Button
              key={color}
              variant="outline"
              size="sm"
              onClick={() => handlePresetClick(color)}
              className="h-8 w-8 p-0 border-2"
              style={{ 
                backgroundColor: color,
                borderColor: customization.color === color ? 'hsl(var(--primary))' : 'hsl(var(--border))'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}