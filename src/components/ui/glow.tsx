import { cn } from "@/lib/utils"

interface GlowProps {
  variant?: "above" | "below"
  className?: string
}

export function Glow({ variant = "above", className }: GlowProps) {
  return (
    <div
      className={cn(
        "absolute inset-0",
        "bg-gradient-to-b from-brand/30 via-brand/10 to-transparent dark:from-brand/20 dark:via-brand/5",
        variant === "below" && "transform rotate-180",
        className
      )}
      style={{
        maskImage: "radial-gradient(circle at center, black, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(circle at center, black, transparent 80%)",
      }}
    />
  )
} 