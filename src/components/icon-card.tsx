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
            className="relative aspect-square w-full cursor-pointer rounded-lg border border-transparent bg-card transition-all duration-200 hover:border-border hover:bg-accent/5 hover:shadow-sm"
          >
            {/* Copy indicator */}
            <div className={`absolute right-1.5 top-1.5 transition-opacity duration-200 ${
              isHovered || copied ? 'opacity-100' : 'opacity-0'
            }`}>
              {copied ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3 text-muted-foreground" />
              )}
            </div>
            
            {/* Icon area - takes up 75% of card height */}
            <div className="flex h-3/4 w-full items-center justify-center">
              {isValidIcon ? (
                <Icon 
                  size={Math.max(20, customization.size)} 
                  color={customization.color}
                  strokeWidth={customization.strokeWidth}
                  className="transition-colors" 
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                  ?
                </div>
              )}
            </div>
            
            {/* Text area - bottom 25% */}
            <div className="flex h-1/4 w-full items-center justify-center px-1">
              <span className="truncate text-xs text-muted-foreground">
                {name}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="animate-fade-in">
          <p>{copied ? "Copied!" : "Click to copy"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}