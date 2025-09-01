import { type IconItem } from "@/types/icon";

export async function copyIcon(icon: IconItem): Promise<void> {
  try {
    let svgString: string;

    if (typeof icon.svg === 'string') {
      svgString = icon.svg;
    } else {
      // If it's a React component, we need to serialize it
      // For now, we'll create a basic SVG wrapper
      svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <!-- ${icon.name} -->
      </svg>`;
    }

    await navigator.clipboard.writeText(svgString);
  } catch (error) {
    console.error('Failed to copy icon:', error);
    throw new Error('Failed to copy to clipboard');
  }
}

export function canCopy(): boolean {
  return !!(navigator.clipboard && navigator.clipboard.writeText);
}