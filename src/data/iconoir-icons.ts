// Simplest iconoir import - only functions with type casting
import * as IconoirIcons from 'iconoir-react';
import { type IconItem } from '@/types/icon';
import { type ComponentType } from 'react';

// Get only function exports (potential components) and cast them
const allExports = Object.entries(IconoirIcons).filter(([_, component]) => typeof component === 'function');

export const iconoirIcons: IconItem[] = allExports.map(([key, component], index) => ({
  id: `iconoir-${index}`,
  name: key,
  svg: component as ComponentType<any>,
  style: 'outline' as const,
  category: 'general',  
  tags: ['iconoir']
}));

export const iconoirIconCount = iconoirIcons.length;