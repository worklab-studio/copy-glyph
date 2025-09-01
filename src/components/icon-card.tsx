import { useState } from "react";
import { Check, Copy01 as Copy } from "@untitled-ui/icons-react";
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
          <div
            onClick={handleCopy}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative aspect-square w-full cursor-pointer rounded-md border border-border/20 bg-background/50 p-3 transition-all duration-200 hover:border-border hover:bg-accent/10 hover:shadow-sm"
          >
            {/* Copy indicator */}
            <div className={`absolute right-1 top-1 z-10 transition-opacity duration-200 ${
              isHovered || copied ? 'opacity-100' : 'opacity-0'
            }`}>
              {copied ? (
                <div className="rounded-sm bg-green-500/10 p-0.5">
                  <Check className="h-2.5 w-2.5 text-green-500" />
                </div>
              ) : (
                <div className="rounded-sm bg-background/80 p-0.5">
                  <Copy className="h-2.5 w-2.5 text-muted-foreground" />
                </div>
              )}
            </div>
            
            {/* Icon centered in the card */}
            <div className="flex h-full w-full items-center justify-center">
              {isValidIcon ? (
                <Icon 
                  size={24} 
                  color={customization.color}
                  strokeWidth={customization.strokeWidth}
                  className="transition-all duration-200 group-hover:scale-110" 
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                  ?
                </div>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="animate-fade-in">
          <div className="text-xs">
            <div className="font-medium">{name}</div>
            <div className="text-muted-foreground">{copied ? "Copied!" : "Click to copy"}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}