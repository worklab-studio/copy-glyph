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
console.log('🔍 Starting Tabler icon processing...');
console.log(`📊 Initial tablerIconMap entries: ${Object.keys(tablerIconMap).length}`);

let successCount = 0;
let errorCount = 0;
const errors: Array<{ name: string; error: string }> = [];

export const tablerIcons: IconItem[] = Object.entries(tablerIconMap)
  .map(([name, svgString]: [string, string]) => {
    try {
      // Validate SVG string
      if (!svgString || typeof svgString !== 'string') {
        throw new Error(`Invalid SVG string for icon: ${name}`);
      }

      // Check for basic SVG structure
      if (!svgString.includes('<svg') || !svgString.includes('</svg>')) {
        throw new Error(`Malformed SVG for icon: ${name}`);
      }

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

      // Validate component creation
      const component = createIconComponent(name, svgString);
      if (!component) {
        throw new Error(`Failed to create component for icon: ${name}`);
      }

      successCount++;
      return {
        id: `tabler-${name}`,
        name: name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' '),
        svg: component as IconItem['svg'],
        tags,
        style,
        category
      } as IconItem;
    } catch (error) {
      errorCount++;
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      errors.push({ name, error: errorMsg });
      console.warn(`⚠️ Failed to process icon "${name}": ${errorMsg}`);
      return null;
    }
  })
  .filter((icon): icon is NonNullable<IconItem> => icon !== null);

// Log final results
console.log(`✅ Successfully processed: ${successCount} icons`);
console.log(`❌ Failed to process: ${errorCount} icons`);
console.log(`📋 Final tablerIcons array length: ${tablerIcons.length}`);

if (errorCount > 0) {
  console.group('🚨 Processing Errors:');
  errors.slice(0, 10).forEach(({ name, error }) => {
    console.log(`  - ${name}: ${error}`);
  });
  if (errors.length > 10) {
    console.log(`  ... and ${errors.length - 10} more errors`);
  }
  console.groupEnd();
}

// Performance check
if (tablerIcons.length < Object.keys(tablerIconMap).length * 0.9) {
  console.warn(`🔥 WARNING: Significant icon loss detected! Expected ~${Object.keys(tablerIconMap).length}, got ${tablerIcons.length}`);
}