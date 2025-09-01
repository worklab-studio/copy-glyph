import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef, useEffect, useState } from 'react';
import { type IconItem } from '@/types/icon';

interface UseVirtualGridProps {
  items: IconItem[];
  containerRef: React.RefObject<HTMLDivElement>;
  enabled?: boolean;
}

export function useVirtualGrid({ items, containerRef, enabled = true }: UseVirtualGridProps) {
  const [columnsCount, setColumnsCount] = useState(6);
  
  // Calculate columns based on container width
  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const padding = 32; // 16px each side
      const availableWidth = containerWidth - padding;
      
      // Base cell size: 88px, lg: 110px, xl: 120px
      let cellSize = 88;
      if (containerWidth >= 1280) cellSize = 120; // xl
      else if (containerWidth >= 1024) cellSize = 110; // lg
      
      const columns = Math.max(3, Math.min(8, Math.floor(availableWidth / cellSize)));
      setColumnsCount(columns);
    };

    updateColumns();
    
    const resizeObserver = new ResizeObserver(updateColumns);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [containerRef]);

  // Group items into rows
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
    estimateSize: () => {
      // Estimate row height based on current breakpoint
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width >= 1280) return 120; // xl
        if (width >= 1024) return 110; // lg
      }
      return 88; // base
    },
    overscan: 5,
    enabled,
  });

  return {
    virtualizer,
    rows,
    columnsCount,
  };
}