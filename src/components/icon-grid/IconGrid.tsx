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
  color = "currentColor",
  strokeWidth = 1.5,
  ariaLabel,
  libraryName,
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

  // Enhanced smooth scrolling container with consistent styling
  return (
    <div className="relative h-full">
      {/* Fixed header to match SectionedIconGrid - shows library name when provided */}
      {libraryName && (
        <div className="absolute top-0 left-0 right-0 z-30 h-[60px] bg-background/95 backdrop-blur-sm border-b border-border/50">
          <div className="flex items-center pl-4 py-4 h-full">
            <h3 className="text-lg font-semibold text-foreground">
              {libraryName}
            </h3>
          </div>
        </div>
      )}
      
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto overflow-x-hidden"
        style={{ paddingTop: libraryName ? '60px' : '0' }}
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
                  className=""
                >
                  <div className="grid min-w-0 gap-0" style={{ gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`, height: '80px' }}>
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
                </div>
              );
            })}
          </div>
        ) : (
          // Simple grid for smaller lists
          <div className="grid min-w-0 gap-0" style={{ gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))` }}>
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
    </div>
  );
}