import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useEffect, useState } from 'react';
import { type IconItem } from '@/types/icon';

interface UseVirtualGridProps {
  items: IconItem[];
  containerRef: React.RefObject<HTMLDivElement>;
  enabled?: boolean;
}

export function useVirtualGrid({ items, containerRef, enabled = true }: UseVirtualGridProps) {
  // Fixed columns count matching Lucide's layout
  const columnsCount = 10;

  // Group items into rows with fixed column count
  const rows = useMemo(() => {
    const result: IconItem[][] = [];
    for (let i = 0; i < items.length; i += columnsCount) {
      result.push(items.slice(i, i + columnsCount));
    }
    return result;
  }, [items, columnsCount]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 80, // Match cell width for no spacing
    overscan: 5,
    enabled,
  });

  return {
    virtualizer,
    rows,
    columnsCount,
  };
}