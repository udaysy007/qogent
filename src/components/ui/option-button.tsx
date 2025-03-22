import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface OptionButtonProps {
  label: string
  sublabel?: string
  icon?: React.ReactNode
  isSelected?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function OptionButton({
  label,
  sublabel,
  icon,
  isSelected,
  onClick,
  className,
  disabled = false,
}: OptionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative w-full group",
        "px-4 py-3",
        "rounded-xl border",
        "transition-all duration-300 ease-in-out",
        "flex items-center gap-3",
        isSelected
          ? "bg-primary/5 dark:bg-primary/10 border-primary"
          : "bg-card/80 hover:bg-primary/[0.02] dark:hover:bg-primary/[0.05] border-border/40 hover:border-border",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Icon or checkbox */}
      <div className="flex-shrink-0">
        {icon ? (
          <div className={cn(
            "w-5 h-5",
            "transition-colors duration-300",
            isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary/80"
          )}>
            {icon}
          </div>
        ) : (
          <div
            className={cn(
              "w-5 h-5 rounded-md border-2",
              "flex items-center justify-center",
              "transition-colors duration-300",
              isSelected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground/30 group-hover:border-primary/50"
            )}
          >
            {isSelected && <Check className="w-4 h-4" />}
          </div>
        )}
      </div>

      {/* Label */}
      <div className="flex-grow text-left">
        <div className={cn(
          "font-medium transition-colors duration-300",
          isSelected ? "text-primary" : "text-foreground"
        )}>
          {label}
        </div>
        {sublabel && (
          <div className="text-sm text-muted-foreground">{sublabel}</div>
        )}
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          layoutId="selected-pill"
          className="absolute inset-0 rounded-xl border-2 border-primary"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 1
          }}
        />
      )}
    </motion.button>
  )
} 