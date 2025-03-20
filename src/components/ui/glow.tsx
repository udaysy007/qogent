import { cn } from "@/lib/utils"

interface GlowProps {
  variant?: "above" | "below"
  className?: string
}

export function Glow({ variant = "above", className }: GlowProps) {
  return (
    <div
      className={cn(
        "fixed inset-0",
        "bg-gradient-to-b from-blue-500/50 via-blue-400/30 to-transparent",
        variant === "below" && "transform rotate-180",
        className
      )}
      style={{
        maskImage: "radial-gradient(ellipse at top, black, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at top, black, transparent 85%)",
        opacity: 1,
        background: "radial-gradient(ellipse at top, rgba(59, 130, 246, 0.5), rgba(59, 130, 246, 0.3) 50%, transparent 85%)",
        filter: "blur(40px)",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  )
} 