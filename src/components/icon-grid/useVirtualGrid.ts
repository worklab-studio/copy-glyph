import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useEffect, useState } from 'react';
import { type IconItem } from '@/types/icon';

interface UseVirtualGridProps {
  items: IconItem[];
  containerRef: React.RefObject<HTMLDivElement>;
  enabled?: boolean;
}

export function useVirtualGrid({ items, containerRef, enabled = true }: UseVirtualGridProps) {
  const [containerWidth, setContainerWidth] = useState(0);

  // Calculate columns based on container width (80px per icon)
  const columnsCount = Math.floor(Math.max(containerWidth, 320) / 80) || 4;

  // Group items into rows with calculated column count
  const rows = useMemo(() => {
    const result: IconItem[][] = [];
    for (let i = 0; i < items.length; i += columnsCount) {
      result.push(items.slice(i, i + columnsCount));
    }
    return result;
  }, [items, columnsCount]);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [containerRef]);

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