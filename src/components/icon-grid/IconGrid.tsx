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
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
        <div
          role="grid"
          aria-label={gridLabel}
          className={cn(
            "relative grid gap-0",
            "[grid-template-columns:repeat(auto-fit,minmax(88px,1fr))]",
            "lg:[grid-template-columns:repeat(auto-fit,minmax(110px,1fr))]",
            "xl:[grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]",
            "before:absolute before:inset-0 before:pointer-events-none",
            "before:[background-image:repeating-linear-gradient(to_right,rgba(0,0,0,.08)_0_1px,transparent_1px_100%),repeating-linear-gradient(to_bottom,rgba(0,0,0,.08)_0_1px,transparent_1px_100%)]",
            "before:content-['']"
          )}
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
      </div>
    );
  }

  // Virtualized rendering for large lists
  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
      <div 
        ref={containerRef}
        className="h-[600px] overflow-auto"
        role="grid"
        aria-label={gridLabel}
      >
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
                }}
              >
                <div 
                  className={cn(
                    "grid gap-0 h-full",
                    `grid-cols-${columnsCount}`,
                    "before:absolute before:inset-0 before:pointer-events-none",
                    "before:[background-image:repeating-linear-gradient(to_right,rgba(0,0,0,.08)_0_1px,transparent_1px_100%),repeating-linear-gradient(to_bottom,rgba(0,0,0,.08)_0_1px,transparent_1px_100%)]",
                    "before:content-[''] relative"
                  )}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}