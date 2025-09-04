// Icon Library Configuration
export interface IconLibraryConfig {
  id: string;
  name: string;
  description?: string;
  count: number;
  style: string;
  priority: number; // Higher priority loads first
  source: 'static' | 'dynamic'; // Static = immediate load, dynamic = lazy load
}

export const ICON_LIBRARIES: Record<string, IconLibraryConfig> = {
  lucide: {
    id: 'lucide',
    name: 'Lucide React',
    description: 'Beautiful & consistent icon toolkit',
    count: 1500,
    style: 'outline',
    priority: 100,
    source: 'static'
  },
  material: {
    id: 'material',
    name: 'Material Design',
    description: 'Google Material Design icons',
    count: 7000,
    style: 'filled',
    priority: 90,
    source: 'dynamic'
  },
  radix: {
    id: 'radix',
    name: 'Radix Icons',
    description: 'Crisp set of 15×15 icons',
    count: 318,
    style: 'solid',
    priority: 85,
    source: 'static'
  },
  fluent: {
    id: 'fluent',
    name: 'Fluent System',
    description: 'Microsoft Fluent UI icons',
    count: 2000,
    style: 'mixed',
    priority: 80,
    source: 'dynamic'
  },
  feather: {
    id: 'feather',
    name: 'Feather Icons',
    description: 'Simply beautiful open source icons',
    count: 287,
    style: 'outline',
    priority: 75,
    source: 'static'
  },
  tabler: {
    id: 'tabler',
    name: 'Tabler Icons',
    description: 'Free SVG icons for web interfaces',
    count: 4000,
    style: 'outline',
    priority: 70,
    source: 'dynamic'
  },
  remix: {
    id: 'remix',
    name: 'Remix Icon',
    description: 'Open source neutral style icon system',
    count: 2800,
    style: 'mixed',
    priority: 65,
    source: 'dynamic'
  },
  phosphor: {
    id: 'phosphor',
    name: 'Phosphor Icons',
    description: 'Flexible icon family',
    count: 1248,
    style: 'mixed',
    priority: 60,
    source: 'dynamic'
  },
  iconnoir: {
    id: 'iconnoir',
    name: 'IconNoir',
    description: 'High quality SVG icons',
    count: 1671,
    style: 'outline',
    priority: 55,
    source: 'dynamic'
  },
  solar: {
    id: 'solar',
    name: 'Solar Icons',
    description: 'Bold, outline and broken icons',
    count: 7000,
    style: 'mixed',
    priority: 50,
    source: 'dynamic'
  },
  teeny: {
    id: 'teeny',
    name: 'Teeny Icons',
    description: 'Tiny minimal SVG icons',
    count: 360,
    style: 'outline',
    priority: 45,
    source: 'dynamic'
  },
  ant: {
    id: 'ant',
    name: 'Ant Design',
    description: 'Enterprise-class UI design icons',
    count: 789,
    style: 'mixed',
    priority: 40,
    source: 'dynamic'
  }
};

export const INITIAL_BATCH_SIZE = 100;
export const LAZY_LOAD_BATCH_SIZE = 50;