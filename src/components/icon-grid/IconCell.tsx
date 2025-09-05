import React, { useState, useCallback, useRef, useMemo, memo } from "react";
import { Copy } from "lucide-react";
import { type IconItem } from "@/types/icon";
import { copyIcon } from "@/lib/copy";
import { getIconAriaLabel } from "@/lib/a11y";
import { CopyTooltip } from "@/components/ui/copy-tooltip";
import { cn } from "@/lib/utils";
import { useIconCustomization } from "@/contexts/IconCustomizationContext";
import { useTheme } from "next-themes";
import { supportsStrokeWidth, getCustomizedSVG, getDisplaySVG } from "@/lib/icon-utils";
import { HapticsManager } from "@/lib/haptics";
import { useIsMobile } from "@/hooks/use-mobile";

console.log('IconCell module loading...', { memo, React });

interface IconCellProps {
  icon: IconItem;
  isSelected?: boolean;
  color?: string;
  strokeWidth?: number;
  onCopy?: (icon: IconItem) => void;
  onIconClick?: (icon: IconItem) => void;
}

// Export the component directly without memo for now
export function IconCell({ 
  icon, 
  isSelected = false, 
  color = "#666", 
  strokeWidth = 1.5,
  onCopy,
  onIconClick
}: IconCellProps) {
  console.log('IconCell rendering directly...', { icon, isSelected });
  const [isHovered, setIsHovered] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { customization } = useIconCustomization();
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Memoize expensive color calculations
  const colorStyles = useMemo(() => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 102, g: 79, b: 194 };
    };

    const selectedColor = customization.color;
    const rgb = hexToRgb(selectedColor);
    
    const isLightModeWhite = theme === 'light' && selectedColor.toLowerCase() === '#ffffff';
    const isDarkModeBlack = theme === 'dark' && selectedColor.toLowerCase() === '#000000';
    
    return {
      '--icon-bg': isLightModeWhite 
        ? '128, 128, 128' 
        : isDarkModeBlack
        ? '200, 200, 200' 
        : `${rgb.r}, ${rgb.g}, ${rgb.b}`,
      '--icon-color': selectedColor
    } as React.CSSProperties;
  }, [customization.color, theme]);

  const handleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Trigger haptic feedback on mobile
    await HapticsManager.light();
    
    onIconClick?.(icon);
  }, [icon, onIconClick]);

  const handleDoubleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Trigger medium haptic feedback for copy action
    await HapticsManager.medium();
    
    // Hide tooltip immediately when double-clicking
    setShowTooltip(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    try {
      const svgString = getCustomizedSVG(icon, customization);
      await navigator.clipboard.writeText(svgString);
      setShowCopied(true);
      onCopy?.(icon);
      
      // Trigger success haptic feedback after successful copy
      await HapticsManager.notification('success');
      
      // Auto-hide tooltip after 1.2s
      setTimeout(() => setShowCopied(false), 1200);
    } catch (error) {
      console.error('Copy failed:', error);
      // Trigger error haptic feedback on copy failure
      await HapticsManager.notification('error');
    }
  }, [icon, onCopy, customization]);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await copyIcon(icon, customization);
      setShowCopied(true);
      onCopy?.(icon);
      
      // Auto-hide tooltip after 1.2s
      setTimeout(() => setShowCopied(false), 1200);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  }, [icon, onCopy, customization]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as any);
    }
  }, [handleClick]);

  // Memoize icon rendering for performance
  const renderedIcon = useMemo(() => {
    const iconColor = customization.color;
    const iconStrokeWidth = customization.strokeWidth;
    
    console.log('Rendering icon:', icon.id, 'svg type:', typeof icon.svg, 'svg value:', icon.svg);
    
    if (!icon.svg) {
      console.warn('Icon svg is undefined for icon:', icon.id, icon.name);
      return (
        <div className="icon-loading">
          <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }
    
    const supportsStroke = supportsStrokeWidth(icon);
    const isAnimatedIcon = icon.style === 'animated';
    
    if (typeof icon.svg === 'string') {
      // For SVG strings, use the display version with currentColor
      try {
        const modifiedSvg = getDisplaySVG(icon, customization);
        
        return (
          <div 
            dangerouslySetInnerHTML={{ __html: modifiedSvg }}
            className="icon-svg"
            style={{ 
              color: iconColor,
              ['--icon-color' as any]: iconColor,
            }}
          />
        );
      } catch (error) {
        console.error('Error processing SVG for display:', icon.id, error);
        return (
          <div className="icon-error">
            <span className="text-xs">⚠</span>
          </div>
        );
      }
    } else {
      const IconComponent = icon.svg as React.ComponentType<any>;
      
      console.log('Trying to render icon component:', icon.id, 'Component:', IconComponent, 'Type:', typeof IconComponent);
      
      if (typeof IconComponent !== 'function' && typeof IconComponent !== 'object') {
        console.warn('Icon component is invalid for icon:', icon.id, icon.name, 'Type:', typeof IconComponent, 'Value:', IconComponent);
        return (
          <div className="icon-loading">
            <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
          </div>
        );
      }
      
      const iconProps: any = {
        className: "icon-component",
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
        console.log('About to render IconComponent with props:', iconProps);
        const result = <IconComponent {...iconProps} />;
        console.log('Successfully rendered IconComponent:', result);
        return result;
      } catch (error) {
        console.error('Error rendering icon component:', icon.id, error);
        return (
          <div className="icon-error">
            <span className="text-xs">⚠</span>
          </div>
        );
      }
    }
  }, [icon, customization.color, customization.strokeWidth, isHovered]);

  // Cleanup timeout on unmount
  const cleanupTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    hoverTimeoutRef.current = setTimeout(() => setShowTooltip(true), 500);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setShowTooltip(false);
    cleanupTimeout();
  }, [cleanupTimeout]);

  console.log('About to render IconCell JSX for icon:', icon.id);
  
  try {
    return (
      <CopyTooltip showCopied={showCopied}>
        <button
          ref={buttonRef}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onDoubleClick={handleDoubleClick}
          tabIndex={0}
          role="button"
          aria-label={getIconAriaLabel(icon.name, isSelected)}
          aria-pressed={isSelected}
          data-selected={isSelected}
          data-hovered={isHovered}
          data-selected-state={isSelected}
          className="icon-cell"
          style={colorStyles}
        >
          <div className={cn(
            "icon-highlight",
            (isHovered || isSelected) && "icon-highlight--active"
          )} />
          
          {renderedIcon}
          
          {!isMobile && showTooltip && (
            <div className="icon-tooltip">
              Double click to copy icon
            </div>
          )}
        </button>
      </CopyTooltip>
    );
  } catch (error) {
    console.error('Error in IconCell JSX return:', error);
    return <div>Error rendering icon: {icon.id}</div>;
  }
}

console.log('IconCell exported successfully');