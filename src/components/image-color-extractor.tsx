import React, { useCallback, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Palette } from 'lucide-react';
import { useIconCustomization } from '@/contexts/IconCustomizationContext';
import { toast } from '@/hooks/use-toast';
import ColorThief from 'colorthief';

interface ExtractedColor {
  rgb: [number, number, number];
  hex: string;
}

export function ImageColorExtractor() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { updateColor } = useIconCustomization();

  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${[r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('')}`;
  };

  const processImage = useCallback(async (file: File) => {
    setIsProcessing(true);
    
    try {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Could not get canvas context');

      img.onload = () => {
        try {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const colorThief = new ColorThief();
          const palette = colorThief.getPalette(img, 8, 10);
          
          const colors: ExtractedColor[] = palette.map((rgb: [number, number, number]) => ({
            rgb,
            hex: rgbToHex(rgb[0], rgb[1], rgb[2])
          }));

          setExtractedColors(colors);
          
          toast({
            description: `Extracted ${colors.length} colors from your image!`,
            duration: 2000
          });
        } catch (error) {
          console.error('Error extracting colors:', error);
          toast({
            description: 'Failed to extract colors from image',
            variant: 'destructive',
            duration: 2000
          });
        } finally {
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        toast({
          description: 'Failed to load image',
          variant: 'destructive',
          duration: 2000
        });
        setIsProcessing(false);
      };

      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      img.src = imageUrl;
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        description: 'Failed to process image',
        variant: 'destructive',
        duration: 2000
      });
      setIsProcessing(false);
    }
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        description: 'Please upload a PNG, JPEG, SVG, or WebP image',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        description: 'Image must be smaller than 5MB',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    processImage(file);
  }, [processImage]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast({
          description: 'Please upload a PNG, JPEG, SVG, or WebP image',
          variant: 'destructive',
          duration: 2000
        });
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          description: 'Image must be smaller than 5MB',
          variant: 'destructive',
          duration: 2000
        });
        return;
      }

      processImage(file);
    }
  }, [processImage]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleColorClick = (color: ExtractedColor) => {
    updateColor(color.hex);
    toast({
      description: `Applied color ${color.hex} to icons!`,
      duration: 2000
    });
  };

  const clearImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setExtractedColors([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Extract from Logo</h4>
        {uploadedImage && (
          <Button variant="ghost" size="sm" onClick={clearImage}>
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {!uploadedImage ? (
        <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <div
              className="text-center space-y-2 cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                <p>Drop your logo here or click to upload</p>
                <p className="text-xs">PNG, JPEG, SVG, WebP (max 5MB)</p>
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded logo"
              className="w-full h-20 object-contain bg-muted rounded-md"
            />
          </div>

          {isProcessing ? (
            <div className="flex items-center justify-center py-4">
              <Palette className="h-4 w-4 animate-spin mr-2" />
              <span className="text-sm text-muted-foreground">Extracting colors...</span>
            </div>
          ) : extractedColors.length > 0 ? (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Click a color to apply:</p>
              <div className="grid grid-cols-4 gap-2">
                {extractedColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorClick(color)}
                    className="group relative aspect-square rounded-md border-2 border-border hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    style={{ backgroundColor: color.hex }}
                    title={color.hex}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-sm transition-colors" />
                    <span className="absolute bottom-0 left-0 right-0 text-[10px] bg-black/70 text-white px-1 py-0.5 rounded-b-sm opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                      {color.hex.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}