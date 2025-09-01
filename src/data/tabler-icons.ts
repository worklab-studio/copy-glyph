import React from 'react';
import { type IconItem } from '@/types/icon';
import { tablerIconMap } from '../../Tabler';

// Helper function to parse metadata from SVG comments
function parseIconMetadata(svgString: string) {
  const commentMatch = svgString.match(/<!--\n([\s\S]*?)\n-->/);
  if (!commentMatch) return {};

  const comment = commentMatch[1];
  const metadata: Record<string, any> = {};

  // Parse category
  const categoryMatch = comment.match(/category:\s*(.+)/);
  if (categoryMatch) {
    metadata.category = categoryMatch[1].trim().replace(/"/g, '');
  }

  // Parse tags
  const tagsMatch = comment.match(/tags:\s*\[([^\]]+)\]/);
  if (tagsMatch) {
    metadata.tags = tagsMatch[1]
      .split(',')
      .map(tag => tag.trim().replace(/"/g, ''))
      .filter(tag => tag.length > 0);
  }

  // Parse version and unicode
  const versionMatch = comment.match(/version:\s*"([^"]+)"/);
  if (versionMatch) {
    metadata.version = versionMatch[1];
  }

  const unicodeMatch = comment.match(/unicode:\s*"([^"]+)"/);
  if (unicodeMatch) {
    metadata.unicode = unicodeMatch[1];
  }

  return metadata;
}

// Helper function to map Tabler categories to our category system
function mapCategory(tablerCategory?: string): string {
  if (!tablerCategory) return 'general';
  
  const categoryMap: Record<string, string> = {
    'Text': 'text',
    'System': 'system',
    'Brand': 'brand',
    'Design': 'design',
    'Devices': 'devices',
    'Communication': 'communication',
    'Media': 'media',
    'E-commerce': 'ecommerce',
    'Buildings': 'buildings',
    'Transportation': 'transportation',
    'Weather': 'weather',
    'Sports': 'sports',
    'Food': 'food',
    'Health': 'health',
    'Finance': 'finance',
    'Security': 'security',
    'Education': 'education',
    'Entertainment': 'entertainment',
    'Nature': 'nature',
    'Technology': 'technology',
    'Business': 'business',
    'Social': 'social',
    'Navigation': 'navigation',
    'Photography': 'photography',
    'Mood': 'mood',
    'Gestures': 'gestures',
    'Symbols': 'symbols',
    'Currencies': 'currencies',
    'Development': 'development',
    'Gaming': 'gaming',
    'Medical': 'medical'
  };

  return categoryMap[tablerCategory] || tablerCategory.toLowerCase();
}

// Create React component for each icon
function createIconComponent(name: string, svgString: string) {
  return React.memo((props: { 
    color?: string; 
    strokeWidth?: number; 
    size?: number;
    className?: string;
  }) => {
    const { color = 'currentColor', strokeWidth = 2, size = 24, className = '' } = props;
    
    // Extract SVG content without the wrapper
    const svgMatch = svgString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    const svgContent = svgMatch ? svgMatch[1] : '';
    
    // Check if it's a filled icon
    const isFilled = svgString.includes('fill="currentColor"');
    
    return React.createElement('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: isFilled ? color : 'none',
      stroke: isFilled ? 'none' : color,
      strokeWidth: isFilled ? 0 : strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className,
      dangerouslySetInnerHTML: { __html: svgContent }
    });
  });
}

// Process all Tabler icons
export const tablerIcons: IconItem[] = Object.entries(tablerIconMap).map(([name, svgString]: [string, string]) => {
  const metadata = parseIconMetadata(svgString);
  const category = mapCategory(metadata.category);
  
  // Determine style based on SVG content
  const style = svgString.includes('fill="currentColor"') ? 'solid' : 'outline';
  
  // Create tags array
  const tags = [
    name.replace(/-/g, ' '),
    ...(metadata.tags || []),
    category,
    'tabler',
    style
  ].filter((tag, index, arr) => arr.indexOf(tag) === index);

  return {
    id: `tabler-${name}`,
    name: name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' '),
    svg: createIconComponent(name, svgString),
    tags,
    style,
    category
  };
});