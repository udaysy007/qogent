import * as React from "react"
import { cn } from "@/lib/utils"

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

export function Heading({ level = 1, children, className }: HeadingProps) {
  const baseStyles = "font-bold leading-tight tracking-tight text-foreground"
  const sizeStyles = {
    1: "text-4xl md:text-5xl",
    2: "text-3xl md:text-4xl",
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl",
    5: "text-lg md:text-xl",
    6: "text-base md:text-lg",
  }

  switch (level) {
    case 1:
      return <h1 className={cn(baseStyles, sizeStyles[level], className)}>{children}</h1>
    case 2:
      return <h2 className={cn(baseStyles, sizeStyles[level], className)}>{children}</h2>
    case 3:
      return <h3 className={cn(baseStyles, sizeStyles[level], className)}>{children}</h3>
    case 4:
      return <h4 className={cn(baseStyles, sizeStyles[level], className)}>{children}</h4>
    case 5:
      return <h5 className={cn(baseStyles, sizeStyles[level], className)}>{children}</h5>
    case 6:
      return <h6 className={cn(baseStyles, sizeStyles[level], className)}>{children}</h6>
    default:
      return <h1 className={cn(baseStyles, sizeStyles[1], className)}>{children}</h1>
  }
} 