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

  const computedAriaLabel = useMemo(() => {
    return ariaLabel || getGridAriaLabel(items.length);
  }, [ariaLabel, items.length]);

  // Always use fixed height container with consistent layout
  return (
    <div 
      ref={containerRef}
      className="h-[calc(100vh-200px)] overflow-auto w-full"
      role="grid"
      aria-label={computedAriaLabel}
    >
      {items.length > 100 ? (
        // Virtualized rendering for large lists
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
                  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
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
              </div>
            );
          })}
        </div>
      ) : (
        // Simple grid for smaller lists
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '0',
            backgroundImage: `
              repeating-linear-gradient(to right, rgba(0,0,0,0.1) 0 0.5px, transparent 0.5px 100%),
              repeating-linear-gradient(to bottom, rgba(0,0,0,0.1) 0 0.5px, transparent 0.5px 100%)
            `,
            backgroundSize: '1fr 1fr'
          }}
        >
          {items.map((icon) => (
            <IconCell
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