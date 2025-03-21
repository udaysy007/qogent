import * as React from "react"
import { cn } from "@/lib/utils"

type ColsType = 1 | 2 | 3 | 4;
type ResponsiveColsType = {
  default?: ColsType;
  sm?: ColsType;
  md?: ColsType;
  lg?: ColsType;
}

interface GridProps {
  children: React.ReactNode
  className?: string
  cols?: ColsType | ResponsiveColsType
  gap?: "sm" | "md" | "lg"
}

export function Grid({ children, className, cols = 3, gap = "md" }: GridProps) {
  const getColsClass = () => {
    if (typeof cols === 'number') {
      // Use predefined column styles if cols is a number
      const colsStyles = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      };
      return colsStyles[cols];
    } else {
      // Build custom responsive classes
      const colsObj = cols as ResponsiveColsType;
      let classes = [];
      
      if (colsObj.default) classes.push(`grid-cols-${colsObj.default}`);
      if (colsObj.sm) classes.push(`sm:grid-cols-${colsObj.sm}`);
      if (colsObj.md) classes.push(`md:grid-cols-${colsObj.md}`);
      if (colsObj.lg) classes.push(`lg:grid-cols-${colsObj.lg}`);
      
      return classes.join(' ');
    }
  };

  const gapStyles = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  }

  return (
    <div className={cn("grid", getColsClass(), gapStyles[gap], className)}>
      {children}
    </div>
  )
} 