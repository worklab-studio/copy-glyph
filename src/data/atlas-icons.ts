import { type IconItem } from "@/types/icon";
import { iconMap } from "../../atlas";

// Complete Atlas Icons Collection
// Auto-imported from atlas.ts - Contains thousands of professionally designed icons

// Convert iconMap to IconItem format with proper theming
export const atlasIcons: IconItem[] = Object.entries(iconMap).map(([key, svg]) => {
  // Ensure svg is a string and convert ALL hardcoded colors to currentColor for proper theming
  const svgString = String(svg);
  const themedSvg = svgString
    // Replace all hex colors in fill attributes
    .replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="currentColor"')
    .replace(/fill="#[0-9A-Fa-f]{3}"/g, 'fill="currentColor"')
    // Replace all hex colors in stroke attributes  
    .replace(/stroke="#[0-9A-Fa-f]{6}"/g, 'stroke="currentColor"')
    .replace(/stroke="#[0-9A-Fa-f]{3}"/g, 'stroke="currentColor"')
    // Replace specific known colors
    .replace(/fill="#020202"/g, 'fill="currentColor"')
    .replace(/fill="#292D32"/g, 'fill="currentColor"')
    .replace(/stroke="#292D32"/g, 'stroke="currentColor"')
    // Keep fill="none" as is
    .replace(/fill="currentColor" stroke="currentColor"/g, 'fill="none" stroke="currentColor"');

  // Determine category based on key prefix
  let category = 'general';
  if (key.includes('achievement')) category = 'achievement';
  else if (key.includes('arrow') || key.includes('direction')) category = 'navigation';
  else if (key.includes('communication') || key.includes('message') || key.includes('mail')) category = 'communication';
  else if (key.includes('business') || key.includes('finance') || key.includes('money')) category = 'business';
  else if (key.includes('device') || key.includes('computer') || key.includes('mobile')) category = 'device';
  else if (key.includes('media') || key.includes('video') || key.includes('audio') || key.includes('music')) category = 'media';
  else if (key.includes('security') || key.includes('lock') || key.includes('shield')) category = 'security';
  else if (key.includes('weather') || key.includes('sun') || key.includes('cloud') || key.includes('rain')) category = 'weather';
  else if (key.includes('medical') || key.includes('health')) category = 'medical';
  else if (key.includes('transport') || key.includes('car') || key.includes('plane')) category = 'transport';
  else if (key.includes('social') || key.includes('people') || key.includes('user')) category = 'social';
  else if (key.includes('file') || key.includes('document') || key.includes('folder')) category = 'file';
  else if (key.includes('edit') || key.includes('design') || key.includes('tool')) category = 'design';

  return {
    id: `atlas-${key}`,
    name: key
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/\s+/g, ' ')
      .trim(),
    svg: themedSvg,
    tags: [
      key.replace(/[-_]/g, ' '),
      ...key.split(/[-_]/).filter(tag => tag.length > 2)
    ],
    style: 'outline',
    category
  };
});