// Auto-generated pre-processed Tabler icons
// This file contains all processed Tabler icons to avoid runtime parsing overhead
// Generated from TrablerStroke.ts

import { type IconItem } from '@/types/icon';
import { tablerIconMap } from '../../../TrablerStroke';

// Helper function to parse metadata from HTML comments
function parseIconMetadata(svgString: string): { category?: string; tags?: string[] } {
  const commentMatch = svgString.match(/<!--\s*(.*?)\s*-->/s);
  if (!commentMatch) return {};

  const commentContent = commentMatch[1];
  const categoryMatch = commentContent.match(/category:\s*([^\n]+)/);
  const tagsMatch = commentContent.match(/tags:\s*\[(.*?)\]/);

  return {
    category: categoryMatch?.[1]?.trim(),
    tags: tagsMatch?.[1]?.split(',').map(tag => tag.trim().replace(/['"]/g, '')) || []
  };
}

// Helper function to clean SVG content (remove HTML comments)
function cleanSvgContent(svgString: string): string {
  return svgString.replace(/<!--[\s\S]*?-->/g, '').trim();
}

// Process all icons from TrablerStroke.ts
const processedTablerIconsRaw = Object.entries(tablerIconMap).map(([iconName, svgContent]: [string, string]) => {
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

// Sort by style then name
export const processedTablerIcons: IconItem[] = processedTablerIconsRaw.sort((a: IconItem, b: IconItem) => {
  if (a.style !== b.style) {
    return (a.style as string).localeCompare(b.style as string);
  }
  return a.name.localeCompare(b.name);
});

// Set to true since we have processed icons
export const hasProcessedIcons = true;