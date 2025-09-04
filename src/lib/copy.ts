import { type IconItem } from "@/types/icon";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { supportsStrokeWidth } from "./icon-utils";

export async function copyIcon(icon: IconItem): Promise<void> {
  try {
    let svgString: string;

    if (typeof icon.svg === 'string') {
      svgString = icon.svg;
    } else {
      // Render the React component to SVG string
      const IconComponent = icon.svg as React.ComponentType<any>;
      const iconProps: any = {
        size: 24,
        color: "currentColor"
      };
      
      // Only add strokeWidth for icons that support it
      if (supportsStrokeWidth(icon)) {
        iconProps.strokeWidth = 2;
      }
      
      const element = React.createElement(IconComponent, iconProps);
      svgString = renderToStaticMarkup(element);
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