"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: CategoryFilterProps) {
  return (
    <div className={cn(
      "flex flex-wrap items-center justify-center gap-2",
      "px-4 py-2",
      "rounded-full",
      "bg-background/50 backdrop-blur-xl",
      "border border-border/50",
      className
    )}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium",
            "transition-all duration-300",
            "hover:bg-primary/10",
            activeCategory === category
              ? "bg-primary/15 text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {category.split("-").map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(" ")}
        </button>
      ))}
    </div>
  );
} 