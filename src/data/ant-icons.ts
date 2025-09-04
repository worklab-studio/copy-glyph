import { type IconItem } from '@/types/icon';
import { iconMap } from './raw/ant-icons-raw';

// Helper function to format icon names from kebab-case to Title Case
function formatIconName(key: string): string {
  return key
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to categorize icons based on their names
function categorizeIcon(iconName: string): string {
  const name = iconName.toLowerCase();
  
  if (name.includes('arrow') || name.includes('direction') || name.includes('navigate')) return 'navigation';
  if (name.includes('user') || name.includes('person') || name.includes('profile')) return 'user';
  if (name.includes('home') || name.includes('house') || name.includes('building')) return 'places';
  if (name.includes('file') || name.includes('document') || name.includes('folder')) return 'files';
  if (name.includes('setting') || name.includes('config') || name.includes('gear')) return 'system';
  if (name.includes('phone') || name.includes('mail') || name.includes('message')) return 'communication';
  if (name.includes('play') || name.includes('music') || name.includes('video')) return 'media';
  if (name.includes('cart') || name.includes('shop') || name.includes('store')) return 'commerce';
  if (name.includes('calendar') || name.includes('clock') || name.includes('time')) return 'time';
  if (name.includes('weather') || name.includes('sun') || name.includes('cloud')) return 'weather';
  
  return 'general';
}

// Helper function to generate tags for icons
function generateTags(iconName: string): string[] {
  const category = categorizeIcon(iconName);
  const words = iconName.toLowerCase().split(/[-_\s]/);
  return [category, ...words, iconName];
}

// Helper function to ensure SVG uses currentColor
function processSvg(svg: string): string {
  return svg
    .replace(/fill="(?!none|currentColor)[^"]*"/g, 'fill="currentColor"')
    .replace(/stroke="(?!none|currentColor)[^"]*"/g, 'stroke="currentColor"');
}

// Transform the iconMap into IconItem array
export const antIcons: IconItem[] = Object.entries(iconMap).map(([iconName, svgContent]) => {
  return {
    id: `ant-${iconName}`,
    name: formatIconName(iconName),
    svg: processSvg(svgContent as string),
    tags: generateTags(iconName),
    style: 'mixed',
    category: categorizeIcon(iconName)
  };
});