import React from 'react';
import { type IconItem } from '@/types/icon';
import { tablerIconMap } from '../../Tabler';

// Helper function to parse metadata from SVG comments
const parseMetadata = (svgString: string) => {
  const commentMatch = svgString.match(/<!--\n([\s\S]*?)\n-->/);
  if (!commentMatch) return { category: 'general', tags: [] };
  
  const metadata = commentMatch[1];
  const categoryMatch = metadata.match(/category:\s*([^\n]+)/);
  const tagsMatch = metadata.match(/tags:\s*\[(.*?)\]/);
  
  const category = categoryMatch ? categoryMatch[1].trim() : 'general';
  const tags = tagsMatch ? 
    tagsMatch[1].split(',').map(tag => tag.trim().replace(/['"]/g, '')) : 
    [];
  
  return { category: category.toLowerCase(), tags };
};

// Helper function to create React component from SVG string
const createIconComponent = (svgString: string, iconName: string) => {
  const svgMatch = svgString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (!svgMatch) return null;
  
  const svgContent = svgMatch[1];
  
  return React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement> & { size?: number; strokeWidth?: number; color?: string }>((props, ref) => {
    const { 
      color = 'currentColor', 
      strokeWidth = 2, 
      size = 24,
      width = size,
      height = size,
      ...otherProps 
    } = props;
    
    return React.createElement('svg', {
      ref,
      xmlns: 'http://www.w3.org/2000/svg',
      width,
      height,
      viewBox: '0 0 24 24',
      fill: svgString.includes('fill="currentColor"') ? color : 'none',
      stroke: color,
      strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      ...otherProps,
      dangerouslySetInnerHTML: { __html: svgContent }
    });
  });
};

// Map Tabler categories to our existing category system
const mapCategory = (tablerCategory: string): string => {
  const categoryMap: Record<string, string> = {
    'brand': 'brand',
    'system': 'system',
    'communication': 'communication',
    'media': 'media',
    'navigation': 'navigation',
    'design': 'design',
    'text': 'text',
    'devices': 'devices',
    'e-commerce': 'commerce',
    'buildings': 'buildings',
    'gestures': 'gestures',
    'mood': 'social',
    'photography': 'media',
    'currencies': 'finance',
    'symbols': 'symbols',
    'transport': 'transportation',
    'weather': 'weather',
    'health': 'health',
    'food': 'food',
    'gaming': 'gaming',
    'sport': 'sport'
  };
  
  return categoryMap[tablerCategory.toLowerCase()] || 'general';
};

// Transform Tabler icons to IconItem format (using a subset for performance)
const iconEntries = Object.entries(tablerIconMap);
const maxIcons = 1000; // Limit to first 1000 icons for performance
const selectedEntries = iconEntries.slice(0, maxIcons);

export const tablerIcons: IconItem[] = selectedEntries
  .map(([iconName, svgString]) => {
    const { category, tags } = parseMetadata(svgString);
    const IconComponent = createIconComponent(svgString, iconName);
    
    if (!IconComponent) return null;
    
    const mappedCategory = mapCategory(category);
    
    // Clean up icon name for display
    const displayName = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Create comprehensive tags
    const allTags = [
      iconName,
      iconName.replace(/-/g, ' '),
      mappedCategory,
      'outline',
      'tabler',
      ...tags,
      ...iconName.split('-') // Add individual words as tags
    ];
    
    return {
      id: `tabler-${iconName}`,
      name: displayName,
      svg: IconComponent,
      style: 'outline',
      category: mappedCategory,
      tags: [...new Set(allTags.filter(Boolean))]
    };
  })
  .filter((icon) => icon !== null) as IconItem[];