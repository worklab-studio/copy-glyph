import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useMemo, useCallback } from 'react';
import { IconItem } from '@/lib/copy';

interface UseVirtualGridOptions {
  items: IconItem[];
  containerRef: React.RefObject<HTMLElement>;
  columnCount: number;
  cellSize: number;
  gap: number;
}

export function useVirtualGrid({
  items,
  containerRef,
  columnCount,
  cellSize,
  gap
}: UseVirtualGridOptions) {
  const rowCount = Math.ceil(items.length / columnCount);
  const rowHeight = cellSize + gap;

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => containerRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  });

  const getItemsForRow = useCallback((rowIndex: number): IconItem[] => {
    const startIndex = rowIndex * columnCount;
    const endIndex = Math.min(startIndex + columnCount, items.length);
    return items.slice(startIndex, endIndex);
  }, [items, columnCount]);

  const getItemIndex = useCallback((rowIndex: number, colIndex: number): number => {
    return rowIndex * columnCount + colIndex;
  }, [columnCount]);

  return {
    rowVirtualizer,
    getItemsForRow,
    getItemIndex,
    rowCount,
    totalHeight: rowCount * rowHeight,
  };
}

// Hook to calculate responsive column count based on container width
export function useResponsiveColumns(containerWidth: number): number {
  return useMemo(() => {
    if (containerWidth >= 1536) return Math.floor(containerWidth / 120); // 2xl
    if (containerWidth >= 1280) return Math.floor(containerWidth / 120); // xl
    if (containerWidth >= 1024) return Math.floor(containerWidth / 110); // lg
    return Math.floor(containerWidth / 88); // base
  }, [containerWidth]);
}