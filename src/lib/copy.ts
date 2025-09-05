import { type IconItem } from "@/types/icon";
import { getCustomizedSVG } from "./icon-utils";

export async function copyIcon(
  icon: IconItem, 
  customization?: { color: string; strokeWidth: number }
): Promise<void> {
  try {
    // Use default customization if not provided (for backward compatibility)
    const defaultCustomization = customization || { color: 'currentColor', strokeWidth: 2 };
    
    const svgString = getCustomizedSVG(icon, defaultCustomization);
    await navigator.clipboard.writeText(svgString);
  } catch (error) {
    console.error('Failed to copy icon:', error);
    throw new Error('Failed to copy to clipboard');
  }
}

export function canCopy(): boolean {
  return !!(navigator.clipboard && navigator.clipboard.writeText);
}