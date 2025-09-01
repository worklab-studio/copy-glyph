"use client";

import React, { useState, useMemo } from 'react';
import { IconGrid } from '@/components/icon-grid/IconGrid';
import { type IconItem } from '@/lib/copy';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, User, Settings, Search, Menu, Heart, Star, Check, Plus,
  Minus, Edit, Download, Upload, Mail, Phone, Calendar, Clock,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Play, Camera,
  Image, File, Globe, Lock, Eye, EyeOff, Bell, Send, Share,
  Archive, Bookmark, Sun, Activity, AlertCircle, Trash2,
  Copy, Save, Folder, Tag, Filter, Sort, Grid, List,
  MoreHorizontal, MoreVertical, Refresh, ExternalLink
} from 'lucide-react';

// Create sample icon data with Lucide icons
const sampleIcons = [
  Home, User, Settings, Search, Menu, Heart, Star, Check, Plus,
  Minus, Edit, Download, Upload, Mail, Phone, Calendar, Clock,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Play, Camera,
  Image, File, Globe, Lock, Eye, EyeOff, Bell, Send, Share,
  Archive, Bookmark, Sun, Activity, AlertCircle, Trash2,
  Copy, Save, Folder, Tag, Filter, Sort, Grid, List,
  MoreHorizontal, MoreVertical, Refresh, ExternalLink
];

// Generate 1200 sample items by repeating the base icons
const generateSampleData = (): IconItem[] => {
  const items: IconItem[] = [];
  const targetCount = 1200;
  
  for (let i = 0; i < targetCount; i++) {
    const baseIcon = sampleIcons[i % sampleIcons.length];
    const iconName = baseIcon.displayName || `icon-${i}`;
    const variant = Math.floor(i / sampleIcons.length);
    const name = variant > 0 ? `${iconName}-${variant}` : iconName;
    
    items.push({
      id: `icon-${i}`,
      name,
      svg: baseIcon,
      tags: [iconName, 'lucide', 'outline']
    });
  }
  
  return items;
};

export default function IconDemoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState([1.5]);
  const [selectedId, setSelectedId] = useState<string>('icon-10'); // Pre-select one for demo
  
  const allIcons = useMemo(() => generateSampleData(), []);
  
  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return allIcons;
    
    return allIcons.filter(icon => 
      icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      icon.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [allIcons, searchQuery]);

  const handleCopy = (icon: IconItem) => {
    console.log('Copied icon:', icon.name);
    // Could add toast notification here
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Icon Grid Demo</h1>
          <p className="mt-2 text-muted-foreground">
            High-performance virtualized icon grid with {allIcons.length.toLocaleString()} icons
          </p>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Customization Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div className="space-y-2">
                <Label htmlFor="search">Search Icons</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by name or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Color */}
              <div className="space-y-2">
                <Label htmlFor="color">Icon Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Stroke Width */}
              <div className="space-y-2">
                <Label htmlFor="stroke">Stroke Width: {strokeWidth[0]}</Label>
                <Slider
                  id="stroke"
                  min={0.25}
                  max={3}
                  step={0.25}
                  value={strokeWidth}
                  onValueChange={setStrokeWidth}
                  className="w-full"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>Total icons: {allIcons.length.toLocaleString()}</span>
              <span>Filtered: {filteredIcons.length.toLocaleString()}</span>
              <span>Selected: {selectedId ? 'icon-10' : 'none'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Icon Grid */}
        <Card>
          <CardContent className="p-0">
            <IconGrid
              items={filteredIcons}
              selectedId={selectedId}
              onCopy={handleCopy}
              color={color}
              strokeWidth={strokeWidth[0]}
              ariaLabel="Lucide icons demo grid"
              virtualized={true}
            />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Grid features: Virtualization • Keyboard Navigation • Copy to Clipboard • Responsive Design</p>
          <p className="mt-1">Try scrolling, searching, and using arrow keys to navigate</p>
        </div>
      </div>
    </div>
  );
}