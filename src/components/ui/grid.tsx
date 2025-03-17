import * as React from "react"
import { cn } from "@/lib/utils"

interface GridProps {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
}

export function Grid({ children, className, cols = 3, gap = "md" }: GridProps) {
  const colsStyles = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  const gapStyles = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  }

  return (
    <div className={cn("grid", colsStyles[cols], gapStyles[gap], className)}>
      {children}
    </div>
  )
} 