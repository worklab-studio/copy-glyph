import React, { useRef, useMemo, useState, useCallback } from "react";
import { type IconGridProps } from "@/types/icon";
import { IconCell } from "./IconCell";
import { LazyIconCell } from "./LazyIconCell";
import { IconLoadingSkeleton } from "./IconLoadingSkeleton";
import { useVirtualGrid } from "./useVirtualGrid";
import { getGridAriaLabel } from "@/lib/a11y";
import { cn } from "@/lib/utils";

interface ExtendedIconGridProps extends IconGridProps {
  totalExpected?: number;
  isLoadingRemaining?: boolean;
  onLoadMore?: (startIndex: number, count: number) => void;
}

export function IconGrid({
  items,
  selectedId,
  onCopy,
  onIconClick,
  color = "#666",
  strokeWidth = 1.5,
  ariaLabel,
  totalExpected = 0,
  isLoadingRemaining = false,
  onLoadMore
}: ExtendedIconGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lazyLoadedIcons, setLazyLoadedIcons] = useState<Set<number>>(new Set());
  
  // Create display items including placeholders for expected icons
  const displayItems = useMemo(() => {
    if (totalExpected > items.length) {
      // Create placeholders for remaining icons
      const placeholders = Array(totalExpected - items.length).fill(null);
      return [...items, ...placeholders];
    }
    return items;
  }, [items, totalExpected]);

  const { virtualizer, rows, columnsCount } = useVirtualGrid({
    items: displayItems,
    containerRef,
    enabled: displayItems.length > 100, // Only virtualize for large lists
  });

  const computedAriaLabel = useMemo(() => {
    return ariaLabel || getGridAriaLabel(displayItems.length);
  }, [ariaLabel, displayItems.length]);

  // Handle lazy loading of individual icons
  const handleLoadIcon = useCallback((index: number) => {
    if (!lazyLoadedIcons.has(index) && onLoadMore) {
      setLazyLoadedIcons(prev => new Set([...prev, index]));
      onLoadMore(index, 1);
    }
  }, [lazyLoadedIcons, onLoadMore]);

  // Fixed size container matching Lucide's exact dimensions
  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-auto"
      role="grid"
      aria-label={computedAriaLabel}
    >
      {displayItems.length > 100 ? (
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
                {row.map((icon, cellIndex) => {
                  if (!icon) {
                    // This is a placeholder - show skeleton
                    return <IconLoadingSkeleton key={`skeleton-${virtualItem.index}-${cellIndex}`} />;
                  }
                  
                  return (
                    <IconCell
                      key={icon.id}
                      icon={icon}
                      isSelected={icon.id === selectedId}
                      color={color}
                      strokeWidth={strokeWidth}
                      onCopy={onCopy}
                      onIconClick={onIconClick}
                    />
                  );
                })}
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
          {displayItems.map((icon, index) => {
            if (!icon) {
              // This is a placeholder - show skeleton
              return <IconLoadingSkeleton key={`skeleton-${index}`} />;
            }
            
            return (
              <IconCell
                key={icon.id}
                icon={icon}
                isSelected={selectedId === icon.id}
                color={color}
                strokeWidth={strokeWidth}
                onCopy={onCopy}
                onIconClick={onIconClick}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}