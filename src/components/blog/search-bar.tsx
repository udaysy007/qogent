"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBar({ value, onChange, className }: SearchBarProps) {
  return (
    <div className={cn(
      "group relative w-full max-w-2xl mx-auto",
      "transition-all duration-300",
      className
    )}>
      <div className={cn(
        "absolute inset-0 -z-10",
        "bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5",
        "rounded-full blur-xl",
        "opacity-0 group-hover:opacity-100",
        "transition-all duration-500"
      )} />
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search articles..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full py-3 pl-11 pr-4",
            "bg-background/50 backdrop-blur-xl",
            "border border-border/50",
            "rounded-full",
            "text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "transition-all duration-300"
          )}
        />
      </div>
    </div>
  );
} 