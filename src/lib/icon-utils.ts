import { type IconItem } from "@/types/icon";

/**
 * Determines if an icon supports stroke width customization
 * Excludes filled, solid, bold, bulk icons and BoxIcons (which are primarily filled)
 */
export function supportsStrokeWidth(icon: IconItem): boolean {
  // If no style is defined, assume it supports stroke width
  if (!icon.style) {
    // Exception: BoxIcons don't have explicit style but are primarily filled
    if (icon.id.startsWith('box-')) {
      return false;
    }
    return true;
  }

  // List of styles that don't support stroke width (filled variants)
  const nonStrokeStyles = [
    'solid',
    'filled', 
    'bold',
    'bulk',
    'fill'
  ];

  return !nonStrokeStyles.includes(icon.style.toLowerCase());
}

/**
 * Determines if an icon library primarily uses filled icons
 * Used for libraries that don't have explicit style definitions
 */
export function isFilledIconLibrary(iconId: string): boolean {
  const filledLibraryPrefixes = [
    'box-', // BoxIcons are primarily filled
    'ant-', // Many Ant Design icons are filled
  ];

  return filledLibraryPrefixes.some(prefix => iconId.startsWith(prefix));
}