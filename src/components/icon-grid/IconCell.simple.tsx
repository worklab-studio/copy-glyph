import React from "react";
import { type IconItem } from "@/types/icon";

interface IconCellProps {
  icon: IconItem;
  isSelected?: boolean;
  color?: string;
  strokeWidth?: number;
  onCopy?: (icon: IconItem) => void;
  onIconClick?: (icon: IconItem) => void;
}

export function IconCellSimple({ 
  icon, 
  isSelected = false, 
  color = "#666", 
  strokeWidth = 1.5,
  onCopy,
  onIconClick
}: IconCellProps) {
  console.log('IconCellSimple rendering:', icon.id);
  
  const handleClick = () => {
    onIconClick?.(icon);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-full h-20 border border-gray-200 hover:bg-gray-100"
      style={{ backgroundColor: isSelected ? '#f0f0f0' : 'transparent' }}
    >
      {typeof icon.svg === 'string' ? (
        <div 
          dangerouslySetInnerHTML={{ __html: icon.svg }}
          className="w-8 h-8"
          style={{ color }}
        />
      ) : (
        <div className="w-8 h-8 flex items-center justify-center text-gray-400">
          Icon
        </div>
      )}
    </button>
  );
}