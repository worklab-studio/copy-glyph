import React from "react";
import { cn } from "@/lib/utils";

interface IconLoadingSkeletonProps {
  className?: string;
}

export function IconLoadingSkeleton({ className }: IconLoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "group relative aspect-square flex items-center justify-center transition-all duration-200",
        "m-0 w-[80px] h-[80px] bg-muted/20 rounded-sm",
        className
      )}
    >
      {/* Loading icon animation */}
      <div className="h-8 w-8 opacity-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        >
          <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z" />
          <path d="M10 16h6" />
          <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M4 8h3" />
          <path d="M4 12h3" />
          <path d="M4 16h3" />
        </svg>
      </div>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
    </div>
  );
}