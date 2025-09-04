import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useEffect, useState, useCallback, useRef } from 'react';
import { type IconItem } from '@/types/icon';

interface UseVirtualGridProps {
  items: IconItem[];
  containerRef: React.RefObject<HTMLDivElement>;
  enabled?: boolean;
}

export function useVirtualGrid({ items, containerRef, enabled = true }: UseVirtualGridProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize column calculation
  const columnsCount = useMemo(() => 
    Math.floor(Math.max(containerWidth, 320) / 80) || 4, 
    [containerWidth]
  );

  // Memoize row grouping with better performance
  const rows = useMemo(() => {
    if (!items.length) return [];
    
    const result: IconItem[][] = [];
    for (let i = 0; i < items.length; i += columnsCount) {
      result.push(items.slice(i, i + columnsCount));
    }
    return result;
  }, [items, columnsCount]);

  // Debounced resize handler for better performance
  const debouncedUpdateWidth = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    resizeTimeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    }, 150); // 150ms debounce
  }, [containerRef]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    // Initial width update
    updateWidth();
    
    // Add debounced resize listener
    window.addEventListener('resize', debouncedUpdateWidth, { passive: true });
    
    return () => {
      window.removeEventListener('resize', debouncedUpdateWidth);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [containerRef, debouncedUpdateWidth]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 80,
    overscan: 3, // Reduced for better performance
    enabled,
    // Add scroll margin for smoother scrolling
    scrollMargin: containerRef.current?.offsetTop ?? 0,
  });

  return {
    virtualizer,
    rows,
    columnsCount,
  };
}