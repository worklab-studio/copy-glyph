import React, { useState, useEffect, useRef } from "react";
import { type IconItem } from "@/types/icon";
import { IconCell } from "./IconCell";
import { IconLoadingSkeleton } from "./IconLoadingSkeleton";

interface LazyIconCellProps {
  icon: IconItem | null;
  isSelected?: boolean;
  color?: string;
  strokeWidth?: number;
  onCopy?: (icon: IconItem) => void;
  onIconClick?: (icon: IconItem) => void;
  onLoadIcon?: (index: number) => void;
  index: number;
}

export function LazyIconCell({
  icon,
  isSelected = false,
  color = "#666",
  strokeWidth = 1.5,
  onCopy,
  onIconClick,
  onLoadIcon,
  index
}: LazyIconCellProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Trigger icon loading
            if (onLoadIcon) {
              onLoadIcon(index);
            }
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.1,
      }
    );

    if (cellRef.current) {
      observer.observe(cellRef.current);
    }

    return () => {
      if (cellRef.current) {
        observer.unobserve(cellRef.current);
      }
    };
  }, [isVisible, onLoadIcon, index]);

  // Mark as loaded when icon is available
  useEffect(() => {
    if (icon && !isLoaded) {
      // Add a small delay for smooth fade-in effect
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
    }
  }, [icon, isLoaded]);

  return (
    <div ref={cellRef} className="relative">
      {isLoaded && icon ? (
        <div className="animate-fade-in">
          <IconCell
            icon={icon}
            isSelected={isSelected}
            color={color}
            strokeWidth={strokeWidth}
            onCopy={onCopy}
            onIconClick={onIconClick}
          />
        </div>
      ) : (
        <IconLoadingSkeleton />
      )}
    </div>
  );
}