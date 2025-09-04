import { type IconItem } from "@/types/icon";

/**
 * Determines if an icon supports stroke width customization
 * Excludes filled, solid, bold, bulk icons and BoxIcons (which are primarily filled)
 */
export function supportsStrokeWidth(icon: IconItem): boolean {
  // If no style is defined, check against known filled library prefixes
  if (!icon.style) {
    // Exception: BoxIcons and Ant icons don't have explicit style but are primarily filled
    if (icon.id.startsWith('box-') || icon.id.startsWith('ant-')) {
      return false;
    }
    // Default: icons without style support stroke width (like Line icons, Radix icons)
    return true;
  }

  // List of styles that explicitly support stroke width (outline/line variants)
  const strokeSupportStyles = [
    'outline',
    'regular', 
    'line',
    'thin',
    'light',
    'stroke'
  ];

  // List of styles that don't support stroke width (filled variants)
  const nonStrokeStyles = [
    'solid',
    'filled', 
    'bold',
    'bulk',
    'fill'
  ];

  const style = icon.style.toLowerCase();
  
  // First check if it's explicitly a stroke-supporting style
  if (strokeSupportStyles.includes(style)) {
    return true;
  }
  
  // Then check if it's explicitly a non-stroke style
  if (nonStrokeStyles.includes(style)) {
    return false;
  }
  
  // Default: assume it supports stroke width for unknown styles
  return true;
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