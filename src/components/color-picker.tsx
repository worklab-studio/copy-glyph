import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useIconCustomization } from "@/contexts/IconCustomizationContext";

const presetColors = [
  "#DC2626", "#EA580C", "#D97706", "#16A34A", 
  "#059669", "#0891B2", "#0284C7", "#2563EB",
  "#E91E63", "#C2185B", "#9C27B0", "#673AB7",
  "#3F51B5", "#009688", "#4CAF50", "#8BC34A"
];

// Convert HSV to RGB
const hsvToRgb = (h: number, s: number, v: number) => {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  
  let r = 0, g = 0, b = 0;
  
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }
  
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
};

// Convert RGB to Hex
const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

export function ColorPicker() {
  const { customization, updateColor } = useIconCustomization();
  const [hexInput, setHexInput] = useState(customization.color);
  const [hue, setHue] = useState(270);
  const [saturation, setSaturation] = useState(0.6);
  const [value, setValue] = useState(0.8);
  const [isDragging, setIsDragging] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

  // Memoize the current HSL color for the gradient
  const hslColor = useMemo(() => `hsl(${hue}, 100%, 50%)`, [hue]);

  const handleHexChange = (inputValue: string) => {
    setHexInput(inputValue);
    
    // Validate hex color
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(inputValue)) {
      updateColor(inputValue);
    }
  };

  const handlePresetClick = (color: string) => {
    setHexInput(color);
    updateColor(color);
  };

  // Debounced color update
  const debouncedUpdateColor = useCallback((h: number, s: number, v: number) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    updateTimeoutRef.current = setTimeout(() => {
      const [r, g, b] = hsvToRgb(h, s, v);
      const hexColor = rgbToHex(r, g, b);
      setHexInput(hexColor);
      updateColor(hexColor);
    }, 16); // ~60fps
  }, [updateColor]);

  const handleCanvasInteraction = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (!target) return;
    
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSaturation = Math.max(0, Math.min(1, x / rect.width));
    const newValue = Math.max(0, Math.min(1, 1 - (y / rect.height)));
    
    setSaturation(newSaturation);
    setValue(newValue);
    
    if (!isDragging) {
      debouncedUpdateColor(hue, newSaturation, newValue);
    }
  }, [hue, isDragging, debouncedUpdateColor]);

  const handleHueSliderInteraction = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const slider = hueSliderRef.current;
    if (!slider) return;
    
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newHue = Math.max(0, Math.min(360, (x / rect.width) * 360));
    
    setHue(newHue);
    debouncedUpdateColor(newHue, saturation, value);
  }, [saturation, value, debouncedUpdateColor]);

  // Handle mouse events for smooth dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const colorArea = document.querySelector('[data-color-area]') as HTMLDivElement;
      if (!colorArea) return;
      
      const rect = colorArea.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newSaturation = Math.max(0, Math.min(1, x / rect.width));
      const newValue = Math.max(0, Math.min(1, 1 - (y / rect.height)));
      
      setSaturation(newSaturation);
      setValue(newValue);
      debouncedUpdateColor(hue, newSaturation, newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, hue, debouncedUpdateColor]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Color</Label>
      
      {/* Main color picker area */}
      <div className="space-y-3">
        <div className="relative select-none">
          <div
            data-color-area
            className="w-full h-40 rounded-lg cursor-crosshair transition-none"
            style={{
              background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hslColor})`
            }}
            onMouseDown={(e) => {
              setIsDragging(true);
              handleCanvasInteraction(e);
            }}
            onClick={handleCanvasInteraction}
          />
          {/* Picker indicator */}
          <div
            className="absolute w-3 h-3 border-2 border-white rounded-full shadow-lg pointer-events-none transition-none"
            style={{
              left: `${saturation * 100}%`,
              top: `${(1 - value) * 100}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
        </div>
        
        {/* Hue slider */}
        <div
          ref={hueSliderRef}
          className="relative w-full h-4 rounded-lg cursor-pointer select-none"
          style={{
            background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
          }}
          onClick={handleHueSliderInteraction}
        >
          <div
            className="absolute w-4 h-4 bg-white border-2 border-gray-300 rounded-full shadow-lg transition-none"
            style={{
              left: `${(hue / 360) * 100}%`,
              transform: 'translateX(-50%)',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
        </div>
      </div>

      {/* Hex input */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-8">Hex</span>
        <Input
          type="text"
          value={hexInput}
          onChange={(e) => handleHexChange(e.target.value)}
          placeholder="#4F46E5"
          className="text-xs font-mono"
        />
      </div>
      
      {/* Presets */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Presets</Label>
        <div className="grid grid-cols-8 gap-1.5">
          {presetColors.map((color) => (
            <Button
              key={color}
              variant="ghost"
              size="sm"
              onClick={() => handlePresetClick(color)}
              className="h-7 w-7 p-0 rounded-full border-2 hover:scale-110 transition-transform duration-150"
              style={{ 
                backgroundColor: color,
                borderColor: customization.color === color ? '#ffffff' : 'transparent'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}