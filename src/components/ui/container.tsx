import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "default" | "lg"
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  const sizeStyles = {
    sm: "max-w-3xl",
    default: "max-w-5xl",
    lg: "max-w-7xl",
  }

  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className
      )}
    >
      {children}
    </div>
  )
} 