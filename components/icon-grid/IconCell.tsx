import React, { useState, useCallback } from 'react';
import { CopyTooltip } from '@/components/ui/copy-tooltip';
import { copyIcon, type IconItem } from '@/lib/copy';
import { getIconAriaLabel } from '@/lib/a11y';
import { Plus } from 'lucide-react';

interface IconCellProps {
  icon: IconItem;
  isSelected?: boolean;
  color?: string;
  strokeWidth?: number;
  onCopy?: (icon: IconItem) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  tabIndex?: number;
}

export function IconCell({
  icon,
  isSelected = false,
  color = 'currentColor',
  strokeWidth = 1.5,
  onCopy,
  onKeyDown,
  tabIndex = 0
}: IconCellProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await copyIcon(icon);
      setCopied(true);
      onCopy?.(icon);
      
      // Auto-hide after 1.2s
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  }, [icon, onCopy]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCopy();
    }
    onKeyDown?.(event);
  }, [handleCopy, onKeyDown]);

  const renderIcon = () => {
    const iconProps = {
      className: "h-[clamp(24px,32%,40px)] w-[clamp(24px,32%,40px)] text-black/80 group-hover:text-black transition-colors",
      style: {
        color,
        '--icon-color': color,
        '--icon-stroke': strokeWidth,
        strokeWidth
      } as React.CSSProperties
    };

    if (typeof icon.svg === 'string') {
      return (
        <div 
          className={iconProps.className}
          style={iconProps.style}
          dangerouslySetInnerHTML={{ __html: icon.svg }}
        />
      );
    } else {
      const IconComponent = icon.svg;
      return <IconComponent {...iconProps} />;
    }
  };

  return (
    <CopyTooltip copied={copied}>
      <button
        className="group relative aspect-square flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:bg-black/5 data-[selected=true]:bg-black/10 data-[selected=true]:border data-[selected=true]:border-black/20"
        data-selected={isSelected}
        onClick={handleCopy}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={tabIndex}
        role="button"
        aria-label={getIconAriaLabel(icon.name, isSelected)}
        aria-pressed={isSelected}
        style={{
          willChange: isHovered ? 'transform, opacity' : 'auto',
          contain: 'content'
        }}
      >
        {/* Icon */}
        <div className="flex items-center justify-center">
          {renderIcon()}
        </div>

        {/* Selected state badges */}
        {isSelected && (
          <>
            {/* Free pill */}
            <div className="absolute left-1.5 top-1.5 rounded-full bg-black/10 px-2 py-0.5 text-[11px] font-medium text-black/90">
              Free
            </div>
            
            {/* Plus badge */}
            <div className="pointer-events-none absolute bottom-1.5 right-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/20 bg-black/10 text-xs text-black/90">
              <Plus className="h-3 w-3" />
            </div>
          </>
        )}
      </button>
    </CopyTooltip>
  );
}