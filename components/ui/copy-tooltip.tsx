import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CopyTooltipProps {
  children: React.ReactNode;
  copied: boolean;
  iconName: string;
}

export function CopyTooltip({ children, copied, iconName }: CopyTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip open={copied} onOpenChange={() => {}}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side="bottom" 
          className="animate-fade-in"
          aria-live="polite"
        >
          <div className="text-xs">
            {copied ? (
              <div className="font-medium text-green-600">Copied!</div>
            ) : (
              <>
                <div className="font-medium">{iconName}</div>
                <div className="text-muted-foreground">Click to copy</div>
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}