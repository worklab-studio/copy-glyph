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
  onIconClick,
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

  // Always use fixed grid columns (consistent with virtualized mode)
  const fixedColumnsCount = 13; // Fixed number of columns for consistency
  
  // For small lists, render without virtualization but with fixed columns
  if (items.length <= 100) {
    return (
      <div 
        className="w-full"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${fixedColumnsCount}, 1fr)`,
          gap: '0',
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
              onIconClick={onIconClick}
            />
        ))}
        {/* Fill remaining cells to maintain grid structure */}
        {Array.from({ length: fixedColumnsCount - (items.length % fixedColumnsCount) }).map((_, index) => (
          items.length % fixedColumnsCount !== 0 && (
            <div key={`empty-${index}`} className="aspect-square" />
          )
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
                gridTemplateColumns: `repeat(${fixedColumnsCount}, 1fr)`,
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
                  onIconClick={onIconClick}
                />
              ))}
              
              {/* Fill empty cells in the last row */}
              {row.length < fixedColumnsCount && 
                Array.from({ length: fixedColumnsCount - row.length }).map((_, index) => (
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