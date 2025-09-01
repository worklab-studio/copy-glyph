import React, { useState, useCallback } from "react";
import { Copy } from "lucide-react";
import { type IconItem } from "@/types/icon";
import { copyIcon } from "@/lib/copy";
import { getIconAriaLabel } from "@/lib/a11y";
import { CopyTooltip } from "@/components/ui/copy-tooltip";
import { cn } from "@/lib/utils";

interface IconCellProps {
  icon: IconItem;
  isSelected?: boolean;
  color?: string;
  strokeWidth?: number;
  onCopy?: (icon: IconItem) => void;
}

export function IconCell({ 
  icon, 
  isSelected = false, 
  color = "#666", 
  strokeWidth = 1.5,
  onCopy 
}: IconCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

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
      handleCopy(e as any);
    }
  }, [handleCopy]);

  const renderIcon = () => {
    if (typeof icon.svg === 'string') {
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: icon.svg }}
          className="h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] text-black/70 group-hover:text-black transition-colors"
          style={{ 
            color,
            '--icon-stroke': strokeWidth,
          } as React.CSSProperties}
        />
      );
    } else {
      const IconComponent = icon.svg as React.ComponentType<any>;
      return (
        <IconComponent
          size="clamp(24px,32%,40px)"
          color={color}
          strokeWidth={strokeWidth}
          className="text-black/70 group-hover:text-black transition-colors"
        />
      );
    }
  };

  return (
    <CopyTooltip showCopied={showCopied}>
      <button
        onClick={handleCopy}
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
          "hover:bg-black/5",
          "p-3",
          isSelected && "bg-black/10 border border-black/20",
          // Corner highlights on hover
          "before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200",
          "before:[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_0_8px,transparent_8px),linear-gradient(to_right,rgba(0,0,0,0.3)_0_8px,transparent_8px),linear-gradient(to_bottom,rgba(0,0,0,0.3)_0_8px,transparent_8px),linear-gradient(to_bottom,rgba(0,0,0,0.3)_0_8px,transparent_8px)]",
          "before:[background-position:left_top,right_top,left_top,left_bottom]",
          "before:[background-size:8px_2px,8px_2px,2px_8px,2px_8px]",
          "before:[background-repeat:no-repeat]"
        )}
        style={{
          willChange: 'transform, opacity',
          contain: 'content'
        }}
      >
        {renderIcon()}
        
        {/* Free badge for selected icon */}
        {isSelected && (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-black/10 px-2 py-0.5 text-[11px] font-medium text-black/90">
            Free
          </span>
        )}
        
        {/* Copy badge - shows on hover or when selected */}
        {(isHovered || isSelected) && (
          <div className="pointer-events-none absolute bottom-1.5 right-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/20 bg-black/10 text-xs text-black/90">
            {isSelected ? "+" : <Copy className="h-3 w-3" />}
          </div>
        )}
      </button>
    </CopyTooltip>
  );
}