import { type ComponentType } from 'react';

export type IconItem = {
  id: string;
  name: string;
  svg: string | ComponentType<any>;
  tags?: string[];
};

export type IconGridProps = {
  items: IconItem[];
  selectedId?: string | null;
  onCopy?: (icon: IconItem) => void;
  color?: string;
  strokeWidth?: number;
  ariaLabel?: string;
};