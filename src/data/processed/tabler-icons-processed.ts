// Auto-generated pre-processed Tabler icons
// Generated on: ${new Date().toISOString()}
// Processing all icons from TrablerStroke.ts

import { type IconItem } from '@/types/icon';
import { tablerIconMap } from '../../../TrablerStroke';

// Helper function to parse metadata from HTML comments  
function parseIconMetadata(svgString: string) {
  const commentMatch = svgString.match(/<!--\s*(.*?)\s*-->/s);
  if (!commentMatch) return { category: undefined, tags: [] };

  const commentContent = commentMatch[1];
  const categoryMatch = commentContent.match(/category:\s*([^\n]+)/);
  const tagsMatch = commentContent.match(/tags:\s*\[(.*?)\]/);

  return {
    category: categoryMatch?.[1]?.trim(),
    tags: tagsMatch?.[1]?.split(',').map(tag => tag.trim().replace(/['"]/g, '')) || []
  };
}

// Helper function to clean SVG content (remove HTML comments)
function cleanSvgContent(svgString: string) {
  return svgString.replace(/<!--[\s\S]*?-->/g, '').trim();
}

// Process all icons from tablerIconMap
const processedIcons: IconItem[] = Object.entries(tablerIconMap).map(([iconName, svgContent]: [string, string]) => {
  const metadata = parseIconMetadata(svgContent);
  const cleanSvg = cleanSvgContent(svgContent);

  return {
    id: `tabler-${iconName}`,
    name: iconName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    svg: cleanSvg,
    tags: metadata.tags || [],
    style: 'outline' as const,
    category: metadata.category || 'General'
  };
});

// Sort icons by style then name
export const processedTablerIcons: IconItem[] = processedIcons.sort((a: IconItem, b: IconItem) => {
  if (a.style !== b.style) {
    return a.style.localeCompare(b.style);
  }
  return a.name.localeCompare(b.name);
});

export const hasProcessedIcons = true;