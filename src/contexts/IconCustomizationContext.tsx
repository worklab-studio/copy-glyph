import React, { createContext, useContext, useState, useEffect } from 'react';

interface IconCustomization {
  color: string;
  strokeWidth: number;
  size: number;
}

interface IconCustomizationContextType {
  customization: IconCustomization;
  updateColor: (color: string) => void;
  updateStrokeWidth: (width: number) => void;
  updateSize: (size: number) => void;
  resetToDefaults: () => void;
}

const defaultCustomization: IconCustomization = {
  color: '#ffffff',
  strokeWidth: 2,
  size: 24,
};

const IconCustomizationContext = createContext<IconCustomizationContextType | undefined>(undefined);

export function IconCustomizationProvider({ children }: { children: React.ReactNode }) {
  const [customization, setCustomization] = useState<IconCustomization>(defaultCustomization);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('icon-customization');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCustomization({ ...defaultCustomization, ...parsed });
      } catch (error) {
        console.error('Failed to parse saved customization:', error);
      }
    }
  }, []);

  // Save to localStorage when customization changes
  useEffect(() => {
    localStorage.setItem('icon-customization', JSON.stringify(customization));
  }, [customization]);

  const updateColor = (color: string) => {
    setCustomization(prev => ({ ...prev, color }));
  };

  const updateStrokeWidth = (strokeWidth: number) => {
    setCustomization(prev => ({ ...prev, strokeWidth }));
  };

  const updateSize = (size: number) => {
    setCustomization(prev => ({ ...prev, size }));
  };

  const resetToDefaults = () => {
    setCustomization(defaultCustomization);
  };

  return (
    <IconCustomizationContext.Provider
      value={{
        customization,
        updateColor,
        updateStrokeWidth,
        updateSize,
        resetToDefaults,
      }}
    >
      {children}
    </IconCustomizationContext.Provider>
  );
}

export function useIconCustomization() {
  const context = useContext(IconCustomizationContext);
  if (context === undefined) {
    throw new Error('useIconCustomization must be used within an IconCustomizationProvider');
  }
  return context;
}