import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRef, useEffect } from "react";

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchClear?: () => void;
}

export function SearchSection({ searchQuery, onSearchChange, onSearchClear }: SearchSectionProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
      
      // Clear search on Escape key
      if (event.key === 'Escape' && searchQuery) {
        event.preventDefault();
        onSearchClear?.();
        searchInputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery, onSearchClear]);

  // Detect if user is on Mac for the right key indicator
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const shortcutKey = searchQuery ? 'Esc' : (isMac ? '⌘K' : 'Ctrl+K');

  return (
    <div className="p-4 border-b bg-background">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Search Icons</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 pl-10 pr-16 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              {shortcutKey}
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
}