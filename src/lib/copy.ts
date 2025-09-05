import { type IconItem } from "@/types/icon";
import { buildCustomizedSvg, copyToClipboard } from "./svg-build";

export async function copyIcon(icon: IconItem): Promise<void> {
  try {
    const svgString = buildCustomizedSvg(icon, 'currentColor', 2);
    await copyToClipboard(svgString);
  } catch (error) {
    console.error('Failed to copy icon:', error);
    throw new Error('Failed to copy to clipboard');
  }
}

export function canCopy(): boolean {
  return !!(navigator.clipboard && navigator.clipboard.writeText);
}