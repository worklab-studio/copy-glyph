import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CopyTooltipProps {
  children: React.ReactNode;
  copied: boolean;
  defaultText?: string;
  copiedText?: string;
}

export function CopyTooltip({ 
  children, 
  copied, 
  defaultText = "Click to copy",
  copiedText = "Copied!"
}: CopyTooltipProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip open={copied ? true : undefined}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="animate-in fade-in-0 zoom-in-95"
          aria-live="polite"
        >
          <p>{copied ? copiedText : defaultText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}