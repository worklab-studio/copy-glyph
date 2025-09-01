import React, { useState, useCallback } from "react";
import { Copy } from "lucide-react";
import { type IconItem } from "@/types/icon";
import { copyIcon } from "@/lib/copy";
import { getIconAriaLabel } from "@/lib/a11y";
import { CopyTooltip } from "@/components/ui/copy-tooltip";
import { cn } from "@/lib/utils";
import { useIconCustomization } from "@/contexts/IconCustomizationContext";
import { useTheme } from "next-themes";

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
  const { customization } = useIconCustomization();
  const { theme } = useTheme();

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
    if (typeof icon.svg === 'string') {
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: icon.svg }}
          className="h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] transition-colors"
          style={{ color }}
        />
      );
    } else {
      const IconComponent = icon.svg as React.ComponentType<any>;
      return (
        <IconComponent
          className="h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] transition-colors"
          color={color}
          strokeWidth={strokeWidth}
          size="clamp(24px,32%,40px)"
        />
      );
    }
  };

  return (
    <CopyTooltip showCopied={showCopied}>
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
          contain: 'content',
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
        
        {/* Copy badge - shows on hover only */}
        {isHovered && !isSelected && (
          <div 
            className="pointer-events-auto absolute bottom-1.5 right-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/20 bg-black/10 text-xs text-black/90 cursor-pointer hover:bg-black/20 transition-colors"
            onClick={handleCopy}
          >
            <Copy className="h-3 w-3" />
          </div>
        )}
      </button>
    </CopyTooltip>
  );
}