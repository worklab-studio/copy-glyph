import React from 'react';
import { type IconItem } from '@/types/icon';
import { IconCell } from './IconCell';
import { cn } from '@/lib/utils';

interface CategorySectionProps {
  category: string;
  icons: IconItem[];
  selectedId?: string | null;
  onCopy?: (icon: IconItem) => void;
  onIconClick?: (icon: IconItem) => void;
  color?: string;
  strokeWidth?: number;
}

const categoryLabels: Record<string, string> = {
  navigation: 'Navigation',
  communication: 'Communication', 
  media: 'Media & Audio',
  files: 'Files & Storage',
  system: 'System & Settings',
  user: 'Users & People',
  security: 'Security & Privacy',
  time: 'Time & Schedule',
  finance: 'Finance & Commerce',
  social: 'Social & Interaction',
  status: 'Status & Alerts',
  actions: 'Actions & Controls',
  shopping: 'Shopping & Commerce',
  other: 'Other Icons'
};

export function CategorySection({
  category,
  icons,
  selectedId,
  onCopy,
  onIconClick,
  color = "#666",
  strokeWidth = 1.5,
}: CategorySectionProps) {
  if (icons.length === 0) return null;

  const label = categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="mb-8">
      {/* Category header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b px-6 py-3 mb-4">
        <h3 className="text-lg font-semibold text-foreground">{label}</h3>
        <p className="text-sm text-muted-foreground">{icons.length} icons</p>
      </div>
      
      {/* Icons grid */}
      <div className="px-6">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 80px)',
            justifyContent: 'start',
            gap: 0,
          }}
        >
          {icons.map((icon) => (
            <IconCell
              key={icon.id}
              icon={icon}
              isSelected={selectedId === icon.id}
              color={color}
              strokeWidth={strokeWidth}
              onCopy={onCopy}
              onIconClick={onIconClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}