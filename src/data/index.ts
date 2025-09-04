// Central export hub for icon data
// This file provides a clean interface for importing icon libraries

export { ICON_LIBRARIES, INITIAL_BATCH_SIZE, LAZY_LOAD_BATCH_SIZE } from './config';

// Re-export types
export type { IconLibraryConfig } from './config';

// Lazy loading functions for dynamic libraries
export const loadMaterialIcons = () => import('./material-icons').then(m => m.materialIcons);
export const loadFluentIcons = () => import('./fluent-icons').then(m => m.fluentIcons);
export const loadTablerIcons = () => import('./tabler-icons').then(m => m.tablerIcons);
export const loadRemixIcons = () => import('./remix-icons').then(m => m.remixIcons);
export const loadPhosphorIcons = () => import('./phosphor-icons').then(m => m.phosphorIcons);
export const loadSolarIcons = () => import('./solar-icons').then(m => m.solarIcons);
export const loadIconnoirIcons = () => import('./iconnoir-icons').then(m => m.iconnoirIcons);
export const loadTeenyIcons = () => import('./teeny-icons').then(m => m.teenyIcons);
export const loadAntIcons = () => import('./ant-icons').then(m => m.antIcons);

// Static libraries (loaded immediately)
export { lucideIcons } from './lucide-icons';
export { radixIcons } from './radix-icons';
export { featherIcons } from './feather-icons';