import React, { useRef, useMemo } from "react";
import { type IconGridProps } from "@/types/icon";
import { IconCell } from "./IconCell";
import { useVirtualGrid } from "./useVirtualGrid";
import { getGridAriaLabel } from "@/lib/a11y";
import { cn } from "@/lib/utils";

export function IconGrid({
  items,
  selectedId,
  onCopy,
  color = "#666",
  strokeWidth = 1.5,
  ariaLabel,
}: IconGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { virtualizer, rows, columnsCount } = useVirtualGrid({
    items,
    containerRef,
    enabled: items.length > 100, // Only virtualize for large lists
  });

  const gridLabel = useMemo(() => {
    return ariaLabel || getGridAriaLabel(items.length);
  }, [ariaLabel, items.length]);

  // For small lists, render without virtualization
  if (items.length <= 100) {
    return (
      <div 
        className="w-full"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(88px, 1fr))',
          backgroundImage: `
            repeating-linear-gradient(to right, rgba(0,0,0,0.1) 0 0.5px, transparent 0.5px 100%),
            repeating-linear-gradient(to bottom, rgba(0,0,0,0.1) 0 0.5px, transparent 0.5px 100%)
          `,
        }}
        role="grid"
        aria-label={gridLabel}
      >
        {items.map((icon) => (
          <IconCell
            key={icon.id}
            icon={icon}
            isSelected={icon.id === selectedId}
            color={color}
            strokeWidth={strokeWidth}
            onCopy={onCopy}
          />
        ))}
      </div>
    );
  }

  // Virtualized rendering for large lists
  return (
    <div 
      ref={containerRef}
      className="h-[600px] overflow-auto w-full"
      role="grid"
      aria-label={gridLabel}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
          backgroundImage: `
            repeating-linear-gradient(to right, rgba(0,0,0,0.1) 0 0.5px, transparent 0.5px 100%),
            repeating-linear-gradient(to bottom, rgba(0,0,0,0.1) 0 0.5px, transparent 0.5px 100%)
          `,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const row = rows[virtualItem.index];
          if (!row) return null;

          return (
            <div
              key={virtualItem.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
                display: 'grid',
                gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
              }}
            >
              {row.map((icon) => (
                <IconCell
                  key={icon.id}
                  icon={icon}
                  isSelected={icon.id === selectedId}
                  color={color}
                  strokeWidth={strokeWidth}
                  onCopy={onCopy}
                />
              ))}
              
              {/* Fill empty cells in the last row */}
              {row.length < columnsCount && 
                Array.from({ length: columnsCount - row.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}