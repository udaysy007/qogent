import * as React from "react"
import { cn } from "@/lib/utils"

interface ParagraphProps {
  children: React.ReactNode
  size?: "sm" | "base" | "lg"
  className?: string
}

export function Paragraph({
  children,
  size = "base",
  className,
}: ParagraphProps) {
  const sizeStyles = {
    sm: "text-sm leading-relaxed",
    base: "text-base leading-relaxed",
    lg: "text-lg leading-relaxed",
  }

  return <p className={cn(sizeStyles[size], className)}>{children}</p>
} 