import { toast } from "@/hooks/use-toast";
import { AnimatedBookmarkIcon } from "@/components/animated-bookmark-icon";

interface FirstCopyNudgeProps {
  keyboardShortcut: string;
}

export function showFirstCopyNudge({ keyboardShortcut }: FirstCopyNudgeProps) {
  toast({
    title: "🎉 First Icon Stacked!",
    description: (
      <div className="flex items-center gap-3 text-base">
        <AnimatedBookmarkIcon className="text-primary w-5 h-5" />
        <span className="font-medium">Bookmark Iconstack ({keyboardShortcut}) to come back anytime.</span>
      </div>
    ),
    duration: 7000,
    className: "min-h-[80px] text-lg"
  });
}