import { useState, useEffect, RefObject } from 'react';
import { type IconItem } from '@/types/icon';

interface UseScrollCategoryProps {
  icons: IconItem[];
  containerRef: RefObject<HTMLDivElement>;
}

export function useScrollCategory({ icons, containerRef }: UseScrollCategoryProps) {
  const [currentCategory, setCurrentCategory] = useState<string>('');

  useEffect(() => {
    if (!containerRef.current || icons.length === 0) return;

    // Group icons by category to find category positions
    const categoryGroups: Record<string, IconItem[]> = {};
    icons.forEach(icon => {
      const category = icon.category || 'other';
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      categoryGroups[category].push(icon);
    });

    // Get the first category if we have icons
    const firstCategory = icons[0]?.category || 'other';
    setCurrentCategory(firstCategory);

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      // Rough estimation of which category should be visible
      // This is a simplified approach - in a real implementation you'd want to 
      // track actual DOM positions of category sections
      const iconsPerRow = Math.floor(container.clientWidth / 80) || 4;
      const iconHeight = 80;
      const currentIconIndex = Math.floor(scrollTop / iconHeight) * iconsPerRow;
      
      if (currentIconIndex < icons.length && icons[currentIconIndex]) {
        const category = icons[currentIconIndex].category || 'other';
        setCurrentCategory(category);
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [icons, containerRef]);

  return currentCategory;
}