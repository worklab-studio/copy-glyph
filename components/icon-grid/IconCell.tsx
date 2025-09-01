import React, { useState, useCallback } from 'react';
import { IconItem, copyIcon } from '@/lib/copy';
import { getIconCellAriaLabel } from '@/lib/a11y';
import { CopyTooltip } from '@/components/ui/copy-tooltip';

interface IconCellProps {
  icon: IconItem;
  isSelected?: boolean;
  onCopy?: (icon: IconItem) => void;
  color?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

export function IconCell({ 
  icon, 
  isSelected = false, 
  onCopy, 
  color = 'currentColor',
  strokeWidth = 1.5,
  style 
}: IconCellProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await copyIcon(icon);
      setCopied(true);
      onCopy?.(icon);
      
      // Auto-hide tooltip after 1.2s
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error('Failed to copy icon:', error);
    }
  }, [icon, onCopy]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCopy();
    }
  }, [handleCopy]);

  const renderIcon = () => {
    if (typeof icon.svg === 'string') {
      return (
        <div 
          className="h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] text-black/80 group-hover:text-black transition-colors"
          dangerouslySetInnerHTML={{ __html: icon.svg }}
          style={{ 
            color,
            '--icon-stroke': strokeWidth 
          } as React.CSSProperties}
        />
      );
    } else {
      const IconComponent = icon.svg;
      return (
        <IconComponent 
          className="h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] text-black/80 group-hover:text-black transition-colors"
          style={{ 
            color,
            strokeWidth 
          }}
        />
      );
    }
  };

  return (
    <CopyTooltip copied={copied} iconName={icon.name}>
      <button
        className="group relative aspect-square flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:bg-black/5 data-[selected=true]:bg-black/10 data-[selected=true]:border data-[selected=true]:border-black/20"
        data-selected={isSelected}
        onClick={handleCopy}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={getIconCellAriaLabel(icon.name, isSelected)}
        aria-pressed={isSelected}
        role="button"
        tabIndex={0}
        style={{
          ...style,
          color,
          '--icon-color': color,
          '--icon-stroke': strokeWidth,
          contain: 'content',
          willChange: isHovered ? 'transform, opacity' : 'auto'
        } as React.CSSProperties}
      >
        {renderIcon()}
        
        {/* Selected state badges */}
        {isSelected && (
          <>
            {/* "Free" pill - top left */}
            <div className="absolute left-1.5 top-1.5 rounded-full bg-black/10 px-2 py-0.5 text-[11px] font-medium text-black/90">
              Free
            </div>
            
            {/* Plus badge - bottom right */}
            <div className="pointer-events-none absolute bottom-1.5 right-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/20 bg-black/10 text-xs text-black/90">
              +
            </div>
          </>
        )}
      </button>
    </CopyTooltip>
  );
}