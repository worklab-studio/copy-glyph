import React, { useRef, useMemo } from "react";
import { type IconGridProps } from "@/types/icon";
import { CategorySection } from "./CategorySection";
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

  // Group icons by category
  const groupedIcons = useMemo(() => {
    const categoryOrder = ['navigation', 'communication', 'media', 'files', 'system', 'user', 'security', 'time', 'finance', 'social', 'status', 'actions', 'shopping', 'other'];
    const grouped = items.reduce((acc, icon) => {
      const category = icon.category || 'other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(icon);
      return acc;
    }, {} as Record<string, typeof items>);
    
    return categoryOrder.map(category => ({
      category,
      icons: grouped[category] || []
    })).filter(group => group.icons.length > 0);
  }, [items]);

  // For very large lists, use virtualization with simple grid
  if (items.length > 500) {
    return (
      <div 
        ref={containerRef}
        className="w-full h-[600px] overflow-auto"
        role="grid"
        aria-label={computedAriaLabel}
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
                  display: 'grid',
                  gridTemplateColumns: `repeat(${columnsCount}, 80px)`,
                  justifyContent: 'start',
                  gap: 0,
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
      </div>
    );
  }

  // For smaller lists, show grouped by category
  return (
    <div 
      className="w-full overflow-auto"
      role="grid"
      aria-label={computedAriaLabel}
    >
      {groupedIcons.map(({ category, icons }) => (
        <CategorySection
          key={category}
          category={category}
          icons={icons}
          selectedId={selectedId}
          onCopy={onCopy}
          onIconClick={onIconClick}
          color={color}
          strokeWidth={strokeWidth}
        />
      ))}
    </div>
  );
}