import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { type SectionedIconGridProps, type LibrarySection, type IconItem } from '@/types/icon';
import { IconCell } from './IconCell';

// Flatten sections for virtualization while keeping track of section headers
type VirtualItem = {
  type: 'header' | 'icons-row';
  sectionIndex: number;
  rowIndex?: number;
  icons?: IconItem[];
  libraryName?: string;
};

export function SectionedIconGrid({
  sections,
  selectedId,
  onCopy,
  onIconClick,
  color = "currentColor",
  strokeWidth = 1.5,
  ariaLabel
}: SectionedIconGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Calculate columns based on container width (80px per icon)
  const columnsCount = Math.floor(Math.max(containerWidth, 320) / 80) || 4;

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
  }, []);

  // Create flattened virtual items array with proper row grouping
  const virtualItems = useMemo(() => {
    const items: VirtualItem[] = [];
    
    sections.forEach((section, sectionIndex) => {
      // Add section header
      items.push({
        type: 'header',
        sectionIndex,
        libraryName: section.libraryName
      });
      
      // Group icons into rows
      for (let i = 0; i < section.icons.length; i += columnsCount) {
        const rowIcons = section.icons.slice(i, i + columnsCount);
        items.push({
          type: 'icons-row',
          sectionIndex,
          rowIndex: Math.floor(i / columnsCount),
          icons: rowIcons
        });
      }
    });
    
    return items;
  }, [sections, columnsCount]);

  const virtualizer = useVirtualizer({
    count: virtualItems.length,
    getScrollElement: () => containerRef.current,
    estimateSize: (index) => {
      const item = virtualItems[index];
      return item?.type === 'header' ? 60 : 80; // Headers are 60px, icon rows are 80px
    },
    overscan: 5,
  });

  const computedAriaLabel = useMemo(() => {
    if (ariaLabel) return ariaLabel;
    const totalIcons = sections.reduce((sum, section) => sum + section.icons.length, 0);
    return `Icon results grid with ${totalIcons} icons across ${sections.length} libraries`;
  }, [ariaLabel, sections]);

  if (sections.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">No icons found</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full overflow-auto"
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
          const item = virtualItems[virtualItem.index];
          
          if (item?.type === 'header') {
            return (
              <div
                key={`header-${item.sectionIndex}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                className="flex items-center px-6 py-4 bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {item.libraryName}
                </h3>
              </div>
            );
          }

          if (item?.type === 'icons-row' && item.icons) {
            return (
              <div
                key={`row-${item.sectionIndex}-${item.rowIndex}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                className="px-6"
              >
                <div className="grid gap-2 h-full" style={{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }}>
                  {item.icons.map((icon) => (
                    <IconCell
                      key={icon.id}
                      icon={icon}
                      isSelected={selectedId === icon.id}
                      color={color}
                      strokeWidth={strokeWidth}
                      onCopy={onCopy}
                      onIconClick={onIconClick}
                    />
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
