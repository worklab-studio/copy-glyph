import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryHeaderProps {
  currentCategory: string;
  className?: string;
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

export function CategoryHeader({ currentCategory, className }: CategoryHeaderProps) {
  const label = categoryLabels[currentCategory] || 'Icons';
  
  return (
    <div className={cn(
      "fixed top-4 right-6 z-10 bg-background/80 backdrop-blur-sm border rounded-lg px-3 py-1.5 shadow-lg",
      "transition-all duration-200 ease-out",
      className
    )}>
      <span className="text-sm font-medium text-foreground">
        {label}
      </span>
    </div>
  );
}