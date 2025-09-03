import React, { useState } from "react";
import { lucideIcons } from "@/data/lucide-icons";
import { IconGrid } from "@/components/icon-grid/IconGrid";
import { IconCustomizationProvider, useIconCustomization } from "@/contexts/IconCustomizationContext";
import { type IconItem } from "@/types/icon";

function IconGridPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { customization } = useIconCustomization();

  const handleCopy = (icon: IconItem) => {
    setSelectedId(icon.id);
  };

  const handleIconClick = (icon: IconItem) => {
    setSelectedId(prevId => prevId === icon.id ? null : icon.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-6 md:px-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Icon Browser</h1>
          <p className="text-muted-foreground">
            {lucideIcons.length} Lucide icons available
          </p>
        </div>
      </div>
      
      <div className="px-0 md:px-6">
        <IconGrid
          items={lucideIcons}
          selectedId={selectedId}
          onCopy={handleCopy}
          onIconClick={handleIconClick}
          color={customization.color}
          strokeWidth={customization.strokeWidth}
        />
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <IconCustomizationProvider>
      <IconGridPage />
    </IconCustomizationProvider>
  );
};

export default Index;