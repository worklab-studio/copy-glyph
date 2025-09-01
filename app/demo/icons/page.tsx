import React, { useState, useMemo } from 'react';
import { IconGrid } from '@/components/icon-grid/IconGrid';
import { IconItem } from '@/lib/copy';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

// Sample SVG icons for demonstration
const sampleSvgs = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
];

const iconNames = [
  'home', 'user', 'search', 'menu', 'heart', 'star', 'check', 'plus',
  'edit', 'download', 'upload', 'mail', 'phone', 'calendar', 'clock', 'camera',
  'image', 'file', 'globe', 'lock', 'eye', 'bell', 'send', 'share',
  'archive', 'bookmark', 'sun', 'moon', 'activity', 'alert', 'arrow-right', 'arrow-left'
];

// Generate 1200+ sample icons
function generateSampleIcons(): IconItem[] {
  const icons: IconItem[] = [];
  
  for (let i = 0; i < 1200; i++) {
    const nameIndex = i % iconNames.length;
    const svgIndex = i % sampleSvgs.length;
    const baseName = iconNames[nameIndex];
    const uniqueName = i < iconNames.length ? baseName : `${baseName}-${Math.floor(i / iconNames.length) + 1}`;
    
    icons.push({
      id: `icon-${i}`,
      name: uniqueName,
      svg: sampleSvgs[svgIndex],
      tags: [baseName, 'ui', 'interface']
    });
  }
  
  return icons;
}

export default function IconDemoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>('icon-42'); // Pre-select one for demo
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState([1.5]);
  
  const allIcons = useMemo(() => generateSampleIcons(), []);
  
  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return allIcons;
    
    const query = searchQuery.toLowerCase();
    return allIcons.filter(icon => 
      icon.name.toLowerCase().includes(query) ||
      icon.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }, [allIcons, searchQuery]);
  
  const handleCopy = (icon: IconItem) => {
    console.log('Copied icon:', icon.name);
    // Could show a toast notification here
  };
  
  const selectRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * filteredIcons.length);
    setSelectedId(filteredIcons[randomIndex].id);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Icon Grid Demo</h1>
          <p className="text-muted-foreground">
            High-performance icon grid with {allIcons.length.toLocaleString()} icons
          </p>
        </div>
        
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-card">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Icons</Label>
            <Input
              id="search"
              placeholder="Search by name or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Color */}
          <div className="space-y-2">
            <Label htmlFor="color">Icon Color</Label>
            <Input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10"
            />
          </div>
          
          {/* Stroke Width */}
          <div className="space-y-2">
            <Label>Stroke Width: {strokeWidth[0]}</Label>
            <Slider
              value={strokeWidth}
              onValueChange={setStrokeWidth}
              min={0.25}
              max={3}
              step={0.25}
              className="w-full"
            />
          </div>
          
          {/* Actions */}
          <div className="space-y-2">
            <Label>Actions</Label>
            <div className="flex gap-2">
              <Button onClick={selectRandomIcon} variant="outline" size="sm">
                Random Select
              </Button>
              <Button 
                onClick={() => setSelectedId(null)} 
                variant="outline" 
                size="sm"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredIcons.length.toLocaleString()} of {allIcons.length.toLocaleString()} icons
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
            {selectedId && (
              <p className="text-sm text-muted-foreground">
                Selected: {filteredIcons.find(i => i.id === selectedId)?.name}
              </p>
            )}
          </div>
          
          {/* Icon Grid */}
          <IconGrid
            items={filteredIcons}
            selectedId={selectedId}
            onCopy={handleCopy}
            color={color}
            strokeWidth={strokeWidth[0]}
            ariaLabel={`Icon search results${searchQuery ? ` for "${searchQuery}"` : ''}`}
          />
        </div>
      </div>
    </div>
  );
}