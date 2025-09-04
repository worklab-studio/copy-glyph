import React, { useRef, useMemo } from "react";
import { type IconGridProps } from "@/types/icon";
import { IconCellSimple } from "./IconCell.simple";
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

  const computedAriaLabel = useMemo(() => {
    return ariaLabel || getGridAriaLabel(items.length);
  }, [ariaLabel, items.length]);

  // Enhanced smooth scrolling container
  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full h-full overflow-auto",
        "virtual-grid-container smooth-scroll scroll-optimized"
      )}
      role="grid"
      aria-label={computedAriaLabel}
      style={{
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {items.length > 100 ? (
        // Virtualized rendering for large lists
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
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
                  gridTemplateColumns: `repeat(${columnsCount}, 80px)`,
                  justifyContent: 'start',
                  gap: 0,
                }}
              >
                {row.map((icon) => (
                  <IconCellSimple
                    key={icon.id}
                    icon={icon}
                    isSelected={icon.id === selectedId}
                    color={color}
                    strokeWidth={strokeWidth}
                    onCopy={onCopy}
                    onIconClick={onIconClick}
                  />
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        // Simple grid for smaller lists
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 80px)',
            justifyContent: 'start',
            gap: 0,
          }}
        >
          {items.map((icon) => (
            <IconCellSimple
              key={icon.id}
              icon={icon}
              isSelected={selectedId === icon.id}
              color={color}
              strokeWidth={strokeWidth}
              onCopy={onCopy}
              onIconClick={onIconClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}