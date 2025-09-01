import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-muted-foreground mr-2 hidden sm:inline">
        Categories:
      </span>
      
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className={cn(
          "h-7 px-3 text-xs font-medium",
          selectedCategory === null 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        All
      </Button>
      
      {categories.map(category => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={cn(
            "h-7 px-3 text-xs font-medium capitalize",
            selectedCategory === category 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {category.replace('-', ' ')}
        </Button>
      ))}
    </div>
  );
}