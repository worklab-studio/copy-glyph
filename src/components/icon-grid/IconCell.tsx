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
import { supportsStrokeWidth } from "@/lib/icon-utils";

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
    
    // Check if this icon supports stroke width customization
    const supportsStroke = supportsStrokeWidth(icon);
    
    try {
      let svgString: string;

      if (typeof icon.svg === 'string') {
        svgString = icon.svg;
      } else {
        // Render the React component to SVG string
        const IconComponent = icon.svg as React.ComponentType<any>;
        const iconProps: any = {
          size: 24,
          color: customization.color
        };
        
        // Only add strokeWidth for icons that support it
        if (supportsStroke) {
          iconProps.strokeWidth = customization.strokeWidth;
        }
        
        const element = React.createElement(IconComponent, iconProps);
        svgString = renderToStaticMarkup(element);
      }

      // Apply current customizations to the SVG - comprehensive color replacement
      let customizedSVG = svgString
        // Replace all instances of #292D32 (main Iconsax color)
        .replace(/#292D32/gi, customization.color)
        // Handle Atlas-specific colors
        .replace(/#020202/gi, customization.color)
        // Handle other common hardcoded colors
        .replace(/#2F2F2F/gi, customization.color)
        .replace(/#333333/gi, customization.color)
        .replace(/#000000/gi, customization.color)
        .replace(/#000/gi, customization.color)
        // Replace ALL hex colors in attributes
        .replace(/fill="#[0-9A-Fa-f]{3,6}"/gi, `fill="${customization.color}"`)
        .replace(/stroke="#[0-9A-Fa-f]{3,6}"/gi, `stroke="${customization.color}"`)
        // Handle CSS style attributes with any hex colors
        .replace(/style="([^"]*?)fill:\s*#[0-9A-Fa-f]{3,6}([^"]*?)"/gi, `style="$1fill: ${customization.color}$2"`)
        .replace(/style="([^"]*?)stroke:\s*#[0-9A-Fa-f]{3,6}([^"]*?)"/gi, `style="$1stroke: ${customization.color}$2"`)
        // Handle stop-color in gradients with any hex colors
        .replace(/stop-color="#[0-9A-Fa-f]{3,6}"/gi, `stop-color="${customization.color}"`)
        // Handle CSS classes within SVG (common in Atlas icons)
        .replace(/<style[^>]*>([^<]*\.cls-\d+[^}]*fill:\s*#[0-9A-Fa-f]{3,6}[^<]*)<\/style>/gi, 
          (match, content) => match.replace(/#[0-9A-Fa-f]{3,6}/g, customization.color))
        .replace(/<style[^>]*>([^<]*\.cls-\d+[^}]*stroke:\s*#[0-9A-Fa-f]{3,6}[^<]*)<\/style>/gi, 
          (match, content) => match.replace(/#[0-9A-Fa-f]{3,6}/g, customization.color))
        // Handle currentColor replacement for copy (Atlas icons)
        .replace(/stroke="currentColor"/gi, `stroke="${customization.color}"`)
        .replace(/fill="currentColor"/gi, `fill="${customization.color}"`)
        // Preserve fill="none" and stroke="none"
        .replace(new RegExp(`fill="${customization.color}"([^>]*?)stroke="${customization.color}"`, 'gi'), `fill="none"$1stroke="${customization.color}"`);
      
      if (supportsStroke) {
        // Replace existing stroke-width attributes
        customizedSVG = customizedSVG
          .replace(/stroke-width="[^"]*"/g, `stroke-width="${customization.strokeWidth}"`)
          .replace(/strokeWidth="[^"]*"/g, `strokeWidth="${customization.strokeWidth}"`)
          .replace(/stroke-width:\s*[^;"\s]+/g, `stroke-width: ${customization.strokeWidth}`);
        
        // Add stroke-width to elements that have stroke but no stroke-width
        customizedSVG = customizedSVG.replace(/(<[^>]*stroke="[^"]*"[^>]*?)(?![^>]*stroke-width)([^>]*>)/g, `$1 stroke-width="${customization.strokeWidth}"$2`);
        
        // If no stroke-width exists anywhere, inject it into the root SVG element
        if (!customizedSVG.includes('stroke-width')) {
          customizedSVG = customizedSVG.replace(/<svg([^>]*?)>/g, `<svg$1 stroke-width="${customization.strokeWidth}">`);
        }
      }

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
    
    // Check if icon.svg exists and is valid
    if (!icon.svg) {
      console.warn('Icon svg is undefined for icon:', icon.id, icon.name);
      return (
        <div className="h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }
    
    // Check if this icon supports stroke width customization
    const supportsStroke = supportsStrokeWidth(icon);
    // Check if this is an animated icon
    const isAnimatedIcon = icon.style === 'animated';
    
    if (typeof icon.svg === 'string') {
      // For SVG strings, we need to modify the stroke-width attribute and colors
      let modifiedSvg = icon.svg;
      
      // Comprehensive color replacement for all icon libraries
      modifiedSvg = modifiedSvg
        // Replace all instances of #292D32 (main Iconsax color) with currentColor
        .replace(/#292D32/gi, 'currentColor')
        // Handle Atlas-specific colors
        .replace(/#020202/gi, 'currentColor')
        .replace(/#020202/gi, 'currentColor')
        // Handle other common hardcoded colors that might exist
        .replace(/#2F2F2F/gi, 'currentColor')
        .replace(/#333333/gi, 'currentColor')
        .replace(/#000000/gi, 'currentColor')
        .replace(/#000/gi, 'currentColor')
        // Replace ALL 6-digit hex colors in fill and stroke
        .replace(/fill="#[0-9A-Fa-f]{6}"/gi, 'fill="currentColor"')
        .replace(/stroke="#[0-9A-Fa-f]{6}"/gi, 'stroke="currentColor"')
        // Replace ALL 3-digit hex colors in fill and stroke
        .replace(/fill="#[0-9A-Fa-f]{3}"/gi, 'fill="currentColor"')
        .replace(/stroke="#[0-9A-Fa-f]{3}"/gi, 'stroke="currentColor"')
        // Handle CSS style attributes with any hex colors
        .replace(/style="([^"]*?)fill:\s*#[0-9A-Fa-f]{3,6}([^"]*?)"/gi, 'style="$1fill: currentColor$2"')
        .replace(/style="([^"]*?)stroke:\s*#[0-9A-Fa-f]{3,6}([^"]*?)"/gi, 'style="$1stroke: currentColor$2"')
        // Handle stop-color in gradients with any hex colors
        .replace(/stop-color="#[0-9A-Fa-f]{3,6}"/gi, 'stop-color="currentColor"')
        // Handle CSS classes within SVG (common in Atlas icons)
        .replace(/<style[^>]*>([^<]*\.cls-\d+[^}]*fill:\s*#[0-9A-Fa-f]{3,6}[^<]*)<\/style>/gi, 
          (match, content) => match.replace(/#[0-9A-Fa-f]{3,6}/g, 'currentColor'))
        .replace(/<style[^>]*>([^<]*\.cls-\d+[^}]*stroke:\s*#[0-9A-Fa-f]{3,6}[^<]*)<\/style>/gi, 
          (match, content) => match.replace(/#[0-9A-Fa-f]{3,6}/g, 'currentColor'))
        // Preserve fill="none" and stroke="none"
        .replace(/fill="currentColor"([^>]*?)stroke="currentColor"/gi, 'fill="none"$1stroke="currentColor"');
      
      // Apply stroke width to SVG string only for icons that support it
      if (supportsStroke) {        
        // Replace existing stroke-width attributes
        modifiedSvg = modifiedSvg
          .replace(/stroke-width="[^"]*"/g, `stroke-width="${iconStrokeWidth}"`)
          .replace(/strokeWidth="[^"]*"/g, `strokeWidth="${iconStrokeWidth}"`)
          .replace(/stroke-width:\s*[^;"\s]+/g, `stroke-width: ${iconStrokeWidth}`);
        
        // Add stroke-width to elements that have stroke but no stroke-width
        modifiedSvg = modifiedSvg.replace(/(<[^>]*stroke="[^"]*"[^>]*?)(?![^>]*stroke-width)([^>]*>)/g, `$1 stroke-width="${iconStrokeWidth}"$2`);
        
        // If no stroke-width exists anywhere, inject it into the root SVG element
        if (!modifiedSvg.includes('stroke-width')) {
          modifiedSvg = modifiedSvg.replace(/<svg([^>]*?)>/g, `<svg$1 stroke-width="${iconStrokeWidth}">`);
        }
      }
      
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: modifiedSvg }}
          className="h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] transition-colors"
          style={{ 
            color: iconColor,
            // Force color inheritance for Atlas icons that use currentColor
            ['--icon-color' as any]: iconColor,
          }}
        />
      );
    } else {
      const IconComponent = icon.svg as React.ComponentType<any>;
      
      // Additional safety check for component validity
      if (typeof IconComponent !== 'function' && typeof IconComponent !== 'object') {
        console.warn('Icon component is invalid for icon:', icon.id, icon.name, 'Type:', typeof IconComponent, 'Value:', IconComponent);
        return (
          <div className="h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
          </div>
        );
      }
      
      // Standardized props for all icon libraries
      const iconProps: any = {
        className: "h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] transition-colors",
        style: { color: iconColor },
      };
      
      // Apply size as number (32px equivalent for consistent sizing)
      iconProps.size = 32;
      
      // Apply strokeWidth only for icons that support it
      if (supportsStroke) {
        iconProps.strokeWidth = iconStrokeWidth;
      }
      
      // Apply color prop (most libraries support this)
      iconProps.color = iconColor;
      
      // Pass hover state to animated icons
      if (isAnimatedIcon) {
        iconProps.isHovered = isHovered;
      }
      
      try {
        return <IconComponent {...iconProps} />;
      } catch (error) {
        console.error('Error rendering icon component:', icon.id, error);
        return (
          <div className="h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] flex items-center justify-center text-muted-foreground">
            <span className="text-xs">⚠</span>
          </div>
        );
      }
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
          "group relative flex items-center justify-center transition-all duration-200 m-0 p-0 border-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
        style={{
          width: '100%',
          height: '80px',
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
            className="absolute left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none z-[9999]"
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