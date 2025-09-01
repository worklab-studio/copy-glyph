import React, { useRef, useState, useCallback, useMemo } from 'react';
import { IconCell } from './IconCell';
import { useVirtualGrid } from './useVirtualGrid';
import { handleGridKeyNavigation, getGridAriaDescription } from '@/lib/a11y';
import { type IconItem } from '@/lib/copy';

export interface IconGridProps {
  items: IconItem[];
  selectedId?: string | null;
  onCopy?: (icon: IconItem) => void;
  color?: string;
  strokeWidth?: number;
  ariaLabel?: string;
  virtualized?: boolean;
  className?: string;
}

export function IconGrid({
  items,
  selectedId = null,
  onCopy,
  color = 'currentColor',
  strokeWidth = 1.5,
  ariaLabel = "Icon results grid",
  virtualized = true,
  className = ""
}: IconGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  
  const {
    virtualizer,
    columnsPerRow,
    rowCount,
    getItemsForRow
  } = useVirtualGrid({
    items,
    containerRef,
    enabled: virtualized && items.length > 100
  });

  const handleKeyNavigation = useCallback((event: React.KeyboardEvent) => {
    handleGridKeyNavigation(
      event,
      focusedIndex,
      items.length,
      columnsPerRow,
      setFocusedIndex
    );
  }, [focusedIndex, items.length, columnsPerRow]);

  const renderCell = (icon: IconItem, index: number) => (
    <IconCell
      key={icon.id}
      icon={icon}
      isSelected={selectedId === icon.id}
      color={color}
      strokeWidth={strokeWidth}
      onCopy={onCopy}
      onKeyDown={handleKeyNavigation}
      tabIndex={index === focusedIndex ? 0 : -1}
    />
  );

  const gridContent = useMemo(() => {
    if (virtualized && virtualizer.getVirtualItems().length > 0) {
      // Virtualized rendering
      return (
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const rowItems = getItemsForRow(virtualRow.index);
            return (
              <div
                key={virtualRow.index}
                className="absolute top-0 left-0 w-full grid [grid-template-columns:repeat(auto-fit,minmax(88px,1fr))] lg:[grid-template-columns:repeat(auto-fit,minmax(110px,1fr))] xl:[grid-template-columns:repeat(auto-fit,minmax(120px,1fr))] gap-0"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {rowItems.map((icon, cellIndex) => {
                  const globalIndex = virtualRow.index * columnsPerRow + cellIndex;
                  return renderCell(icon, globalIndex);
                })}
              </div>
            );
          })}
        </div>
      );
    } else {
      // Standard rendering
      return items.map((icon, index) => renderCell(icon, index));
    }
  }, [items, virtualizer, virtualized, columnsPerRow, getItemsForRow, selectedId, color, strokeWidth, onCopy, focusedIndex, handleKeyNavigation]);

  if (items.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No icons found</p>
      </div>
    );
  }

  return (
    <div className={`mx-auto max-w-[1400px] px-4 lg:px-6 ${className}`}>
      <div
        ref={containerRef}
        className="relative grid [grid-template-columns:repeat(auto-fit,minmax(88px,1fr))] lg:[grid-template-columns:repeat(auto-fit,minmax(110px,1fr))] xl:[grid-template-columns:repeat(auto-fit,minmax(120px,1fr))] gap-0 before:absolute before:inset-0 before:pointer-events-none before:[background-image:repeating-linear-gradient(to_right,rgba(0,0,0,.08)_0_1px,transparent_1px_100%),repeating-linear-gradient(to_bottom,rgba(0,0,0,.08)_0_1px,transparent_1px_100%)] before:content-['']"
        role="grid"
        aria-label={ariaLabel}
        aria-description={getGridAriaDescription(items.length)}
        style={{
          minHeight: virtualized ? `${Math.ceil(items.length / columnsPerRow) * 88}px` : 'auto'
        }}
      >
        {gridContent}
      </div>
    </div>
  );
}