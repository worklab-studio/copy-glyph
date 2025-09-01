import React, { useState, useCallback, useRef } from "react";
import { Copy } from "lucide-react";
import { type IconItem } from "@/types/icon";
import { copyIcon } from "@/lib/copy";
import { getIconAriaLabel } from "@/lib/a11y";
import { CopyTooltip } from "@/components/ui/copy-tooltip";
import { cn } from "@/lib/utils";
import { useIconCustomization } from "@/contexts/IconCustomizationContext";
import { useTheme } from "next-themes";
import { renderToStaticMarkup } from "react-dom/server";

interface IconCellProps {
  icon: IconItem;
  isSelected?: boolean;
  color?: string;
  strokeWidth?: number;
  onCopy?: (icon: IconItem) => void;
  onIconClick?: (icon: IconItem) => void;
}

export function IconCell({ 
  icon, 
  isSelected = false, 
  color = "#666", 
  strokeWidth = 1.5,
  onCopy,
  onIconClick
}: IconCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { customization } = useIconCustomization();
  const { theme } = useTheme();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Convert hex color to RGB for background opacity
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 102, g: 79, b: 194 }; // fallback to default purple
  };

  const selectedColor = customization.color;
  const rgb = hexToRgb(selectedColor);
  
  // Special case: light mode + white color should use gray hover
  const isLightModeWhite = theme === 'light' && selectedColor.toLowerCase() === '#ffffff';
  // Special case: dark mode + black color should use whitish grey hover
  const isDarkModeBlack = theme === 'dark' && selectedColor.toLowerCase() === '#000000';
  
  const backgroundStyle = isLightModeWhite 
    ? 'rgba(128, 128, 128, 0.1)' // slight gray for white icons in light mode
    : isDarkModeBlack
    ? 'rgba(200, 200, 200, 0.1)' // whitish grey for black icons in dark mode
    : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
  const borderStyle = isLightModeWhite
    ? 'rgba(128, 128, 128, 0.2)' // slight gray border for white icons in light mode
    : isDarkModeBlack
    ? 'rgba(200, 200, 200, 0.2)' // whitish grey border for black icons in dark mode
    : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
  const cornerStyle = isLightModeWhite
    ? 'rgba(128, 128, 128, 0.4)' // slight gray corners for white icons in light mode
    : isDarkModeBlack
    ? 'rgba(200, 200, 200, 0.4)' // whitish grey corners for black icons in dark mode
    : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`;

  // Create dynamic corner gradients using the selected color
  const cornerGradients = [
    `linear-gradient(to right, ${cornerStyle} 0 12px, transparent 12px)`,
    `linear-gradient(to left, ${cornerStyle} 0 12px, transparent 12px)`,
    `linear-gradient(to right, ${cornerStyle} 0 12px, transparent 12px)`,
    `linear-gradient(to left, ${cornerStyle} 0 12px, transparent 12px)`,
    `linear-gradient(to bottom, ${cornerStyle} 0 12px, transparent 12px)`,
    `linear-gradient(to bottom, ${cornerStyle} 0 12px, transparent 12px)`,
    `linear-gradient(to top, ${cornerStyle} 0 12px, transparent 12px)`,
    `linear-gradient(to top, ${cornerStyle} 0 12px, transparent 12px)`
  ].join(', ');

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    onIconClick?.(icon);
  }, [icon, onIconClick]);

  const handleDoubleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Hide tooltip immediately when double-clicking
    setShowTooltip(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    try {
      let svgString: string;

      if (typeof icon.svg === 'string') {
        svgString = icon.svg;
      } else {
        // Render the React component to SVG string
        const IconComponent = icon.svg as React.ComponentType<any>;
        const element = React.createElement(IconComponent, {
          size: 24,
          strokeWidth: customization.strokeWidth,
          color: customization.color
        });
        
        svgString = renderToStaticMarkup(element);
      }

      // Apply current customizations to the SVG
      const customizedSVG = svgString
        .replace(/stroke="[^"]*"/g, `stroke="${customization.color}"`)
        .replace(/stroke-width="[^"]*"/g, `stroke-width="${customization.strokeWidth}"`);

      await navigator.clipboard.writeText(customizedSVG);
      setShowCopied(true);
      onCopy?.(icon);
      
      // Auto-hide tooltip after 1.2s
      setTimeout(() => setShowCopied(false), 1200);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  }, [icon, onCopy, customization]);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await copyIcon(icon);
      setShowCopied(true);
      onCopy?.(icon);
      
      // Auto-hide tooltip after 1.2s
      setTimeout(() => setShowCopied(false), 1200);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  }, [icon, onCopy]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as any);
    }
  }, [handleClick]);

  const renderIcon = () => {
    // Use customization context values for consistency
    const iconColor = customization.color;
    const iconStrokeWidth = customization.strokeWidth;
    
    if (typeof icon.svg === 'string') {
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: icon.svg }}
          className="h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] transition-colors"
          style={{ color: iconColor }}
        />
      );
    } else {
      const IconComponent = icon.svg as React.ComponentType<any>;
      
      // Standardized props for all icon libraries
      const iconProps: any = {
        className: "h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] transition-colors",
        style: { color: iconColor },
      };
      
      // Apply size as number (32px equivalent for consistent sizing)
      iconProps.size = 32;
      
      // Apply strokeWidth for libraries that support it (Lucide, some react-icons)
      iconProps.strokeWidth = iconStrokeWidth;
      
      // Apply color prop (most libraries support this)
      iconProps.color = iconColor;
      
      return <IconComponent {...iconProps} />;
    }
  };

  return (
    <CopyTooltip showCopied={showCopied}>
      <button
        ref={buttonRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => {
          setIsHovered(true);
          hoverTimeoutRef.current = setTimeout(() => setShowTooltip(true), 500);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowTooltip(false);
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
          }
        }}
        onDoubleClick={handleDoubleClick}
        tabIndex={0}
        role="button"
        aria-label={getIconAriaLabel(icon.name, isSelected)}
        aria-pressed={isSelected}
        data-selected={isSelected}
        className={cn(
          "group relative aspect-square flex items-center justify-center transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "p-3"
        )}
        style={{
          willChange: 'transform, opacity',
          backgroundColor: (isHovered || isSelected) ? backgroundStyle : 'transparent',
          borderColor: (isHovered || isSelected) ? borderStyle : 'transparent',
          borderWidth: (isHovered || isSelected) ? '1px' : '0px',
          borderStyle: 'solid',
        }}
      >
        {/* Dynamic corner highlights */}
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-200",
            (isHovered || isSelected) ? "opacity-100" : "opacity-0"
          )}
          style={{
            backgroundImage: cornerGradients,
            backgroundPosition: 'left top, right top, left bottom, right bottom, left top, right top, left bottom, right bottom',
            backgroundSize: '12px 2px, 12px 2px, 12px 2px, 12px 2px, 2px 12px, 2px 12px, 2px 12px, 2px 12px',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {renderIcon()}
        
        {/* Tooltip - shows after 0.5s hover, using exact same styling as copied tooltip */}
        {showTooltip && (
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none z-50"
            style={{ 
              bottom: 'calc(100% + 4px)'
            }}
          >
            Double click to copy icon
          </div>
        )}
      </button>
    </CopyTooltip>
  );
}