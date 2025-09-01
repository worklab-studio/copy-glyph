/**
 * Generate ARIA label for icon cell
 */
export function getIconAriaLabel(iconName: string, isSelected: boolean = false): string {
  const baseLabel = `Copy icon: ${iconName}`;
  return isSelected ? `${baseLabel}, selected` : baseLabel;
}

/**
 * Generate ARIA description for grid
 */
export function getGridAriaDescription(totalItems: number, filteredItems?: number): string {
  if (filteredItems !== undefined && filteredItems !== totalItems) {
    return `Icon grid showing ${filteredItems} of ${totalItems} icons. Use arrow keys to navigate, Enter to copy.`;
  }
  return `Icon grid with ${totalItems} icons. Use arrow keys to navigate, Enter to copy.`;
}

/**
 * Handle keyboard navigation in grid
 */
export function handleGridKeyNavigation(
  event: React.KeyboardEvent,
  currentIndex: number,
  totalItems: number,
  columnsPerRow: number,
  onNavigate: (newIndex: number) => void
): boolean {
  const { key } = event;
  let newIndex = currentIndex;
  let handled = false;

  switch (key) {
    case 'ArrowRight':
      newIndex = Math.min(currentIndex + 1, totalItems - 1);
      handled = true;
      break;
    case 'ArrowLeft':
      newIndex = Math.max(currentIndex - 1, 0);
      handled = true;
      break;
    case 'ArrowDown':
      newIndex = Math.min(currentIndex + columnsPerRow, totalItems - 1);
      handled = true;
      break;
    case 'ArrowUp':
      newIndex = Math.max(currentIndex - columnsPerRow, 0);
      handled = true;
      break;
    case 'Home':
      newIndex = 0;
      handled = true;
      break;
    case 'End':
      newIndex = totalItems - 1;
      handled = true;
      break;
  }

  if (handled && newIndex !== currentIndex) {
    event.preventDefault();
    onNavigate(newIndex);
    return true;
  }

  return false;
}

/**
 * Get the number of columns based on container width and breakpoints
 */
export function getColumnsFromWidth(containerWidth: number): number {
  if (containerWidth >= 1280) { // xl
    return Math.floor(containerWidth / 120);
  } else if (containerWidth >= 1024) { // lg
    return Math.floor(containerWidth / 110);
  } else {
    return Math.floor(containerWidth / 88);
  }
}