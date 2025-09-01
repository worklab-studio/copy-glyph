import { useMemo, useRef, useEffect, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { getColumnsFromWidth } from '@/lib/a11y';

export interface UseVirtualGridOptions {
  items: any[];
  containerRef: React.RefObject<HTMLElement>;
  enabled?: boolean;
  estimateSize?: number;
}

export interface VirtualGridResult {
  virtualizer: ReturnType<typeof useVirtualizer>;
  columnsPerRow: number;
  rowCount: number;
  getItemsForRow: (rowIndex: number) => any[];
}

export function useVirtualGrid({
  items,
  containerRef,
  enabled = true,
  estimateSize = 88
}: UseVirtualGridOptions): VirtualGridResult {
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Track container width for responsive columns
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    
    updateWidth();
    
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);
    
    return () => resizeObserver.disconnect();
  }, [containerRef]);

  const columnsPerRow = useMemo(() => {
    if (containerWidth === 0) return 4; // fallback
    return Math.max(3, Math.min(8, getColumnsFromWidth(containerWidth)));
  }, [containerWidth]);

  const rowCount = useMemo(() => {
    return Math.ceil(items.length / columnsPerRow);
  }, [items.length, columnsPerRow]);

  const virtualizer = useVirtualizer({
    count: enabled ? rowCount : 0,
    getScrollElement: () => containerRef.current,
    estimateSize: () => estimateSize,
    overscan: 5,
    enabled
  });

  const getItemsForRow = (rowIndex: number) => {
    const startIndex = rowIndex * columnsPerRow;
    const endIndex = Math.min(startIndex + columnsPerRow, items.length);
    return items.slice(startIndex, endIndex);
  };

  return {
    virtualizer,
    columnsPerRow,
    rowCount,
    getItemsForRow
  };
}