import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useEffect, useState } from 'react';
import { type IconItem } from '@/types/icon';

interface UseVirtualGridProps {
  items: IconItem[];
  containerRef: React.RefObject<HTMLDivElement>;
  enabled?: boolean;
}

export function useVirtualGrid({ items, containerRef, enabled = true }: UseVirtualGridProps) {
  // Calculate responsive columns based on container width
  const [columnsCount, setColumnsCount] = useState(6);
  
  // Calculate columns based on container width
  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const padding = 32; // 16px each side
      const availableWidth = containerWidth - padding;
      
      // Minimum cell width of 80px for responsive behavior
      const minCellWidth = 80;
      const columns = Math.max(3, Math.floor(availableWidth / minCellWidth));
      setColumnsCount(columns);
    };

    updateColumns();
    
    const resizeObserver = new ResizeObserver(updateColumns);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [containerRef]);

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
    estimateSize: () => 100, // Fixed row height for consistency
    overscan: 5,
    enabled,
  });

  return {
    virtualizer,
    rows,
    columnsCount,
  };
}