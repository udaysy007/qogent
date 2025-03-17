import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: "default" | "muted" | "accent"
}

export function Section({
  children,
  className,
  id,
  background = "default",
}: SectionProps) {
  const backgroundStyles = {
    default: "bg-background",
    muted: "bg-muted",
    accent: "bg-accent/10",
  }

  return (
    <section
      id={id}
      className={cn("py-12 md:py-16", backgroundStyles[background], className)}
    >
      {children}
    </section>
  )
} 