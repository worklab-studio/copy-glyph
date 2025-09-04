import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ColorPicker } from "@/components/color-picker";
import { StrokeSlider } from "@/components/stroke-slider";
import { Separator } from "@/components/ui/separator";

interface MobileCustomizeSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileCustomizeSheet({
  isOpen,
  onClose,
}: MobileCustomizeSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader className="pb-4">
          <SheetTitle>Customize Icons</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Color</h3>
            <ColorPicker />
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-3">Stroke Width</h3>
            <StrokeSlider />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}