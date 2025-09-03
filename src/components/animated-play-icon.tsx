import { Play } from "lucide-react";

export function AnimatedPlayIcon({ className }: { className?: string }) {
  return (
    <Play className={`animate-pulse ${className}`} />
  );
}