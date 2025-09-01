import React, { useRef, useCallback } from 'react';
import { IconItem } from '@/lib/copy';
import { getGridAriaLabel } from '@/lib/a11y';
import { IconCell } from './IconCell';

export interface IconGridProps {
  items: IconItem[];
  selectedId?: string | null;
  onCopy?: (icon: IconItem) => void;
  color?: string;
  strokeWidth?: number;
  ariaLabel?: string;
  className?: string;
}

export function IconGrid({
  items,
  selectedId,
  onCopy,
  color = 'currentColor',
  strokeWidth = 1.5,
  ariaLabel,
  className = ''
}: IconGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback((icon: IconItem) => {
    onCopy?.(icon);
  }, [onCopy]);

  if (items.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-center">
        <div className="space-y-2">
          <p className="text-lg text-muted-foreground">No icons found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-6">
      <div
        ref={gridRef}
        className={`
          relative grid
          [grid-template-columns:repeat(auto-fit,minmax(88px,1fr))]
          lg:[grid-template-columns:repeat(auto-fit,minmax(110px,1fr))]
          xl:[grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]
          gap-0
          before:absolute before:inset-0 before:pointer-events-none
          before:[background-image:repeating-linear-gradient(to_right,rgba(0,0,0,.08)_0_1px,transparent_1px_100%),repeating-linear-gradient(to_bottom,rgba(0,0,0,.08)_0_1px,transparent_1px_100%)]
          before:content-['']
          ${className}
        `}
        role="grid"
        aria-label={getGridAriaLabel(items.length, ariaLabel)}
      >
        {items.map((icon) => (
          <IconCell
            key={icon.id}
            icon={icon}
            isSelected={icon.id === selectedId}
            onCopy={handleCopy}
            color={color}
            strokeWidth={strokeWidth}
          />
        ))}
      </div>
    </div>
  );
}