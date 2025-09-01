import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { useIconCustomization } from "@/contexts/IconCustomizationContext";

interface IconCardProps {
  icon: any;
  name: string;
  set: string;
}

export function IconCard({ icon: Icon, name, set }: IconCardProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { customization } = useIconCustomization();

  // Validate icon component
  const isValidIcon = Icon && typeof Icon === 'function';
  
  if (!isValidIcon) {
    console.warn(`Invalid icon component for ${name}:`, Icon);
    return null;
  }

  const handleCopy = async () => {
    try {
      // Generate SVG string with current customization
      const svgString = `<${Icon.displayName || name} 
  size={${customization.size}} 
  color="${customization.color}" 
  strokeWidth={${customization.strokeWidth}} 
/>`;
      
      await navigator.clipboard.writeText(svgString);
      setCopied(true);
      
      toast({
        description: "Icon copied to clipboard!",
        duration: 2000,
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        description: "Failed to copy icon",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={handleCopy}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative h-20 w-full flex-col gap-2 rounded-lg border border-transparent p-4 transition-all duration-200 hover:border-border hover:bg-hover-bg hover:shadow-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center">
              {isValidIcon ? (
                <Icon 
                  size={customization.size} 
                  color={customization.color}
                  strokeWidth={customization.strokeWidth}
                  className="transition-colors" 
                />
              ) : (
                <div className="w-6 h-6 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                  ?
                </div>
              )}
            </div>
            
            {/* Copy indicator */}
            <div className={`absolute right-2 top-2 transition-opacity duration-200 ${
              isHovered || copied ? 'opacity-100' : 'opacity-0'
            }`}>
              {copied ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3 text-muted-foreground" />
              )}
            </div>
            
            <span className="text-xs text-muted-foreground truncate w-full text-center">
              {name}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="animate-fade-in">
          <p>{copied ? "Copied!" : "Click to copy"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}