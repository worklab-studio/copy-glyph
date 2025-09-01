export function getIconCellAriaLabel(name: string, isSelected: boolean): string {
  return `Copy icon: ${name}${isSelected ? ' (selected)' : ''}`;
}

export function getGridAriaLabel(itemCount: number, customLabel?: string): string {
  return customLabel || `Icon grid with ${itemCount} icons`;
}

export const GRID_KEYBOARD_INSTRUCTIONS = 'Use arrow keys to navigate, Enter to copy icon, Tab to move to next focusable element';