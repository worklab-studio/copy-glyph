import { toast } from "@/hooks/use-toast";
import { AnimatedBookmarkIcon } from "@/components/animated-bookmark-icon";

interface FirstCopyNudgeProps {
  keyboardShortcut: string;
}

export function showFirstCopyNudge({ keyboardShortcut }: FirstCopyNudgeProps) {
  toast({
    description: (
      <div className="flex items-center gap-2">
        <AnimatedBookmarkIcon className="text-primary" />
        <span>You just stacked your first icon. Bookmark Iconstack ({keyboardShortcut}) to come back.</span>
      </div>
    ),
    duration: 5000,
  });
}