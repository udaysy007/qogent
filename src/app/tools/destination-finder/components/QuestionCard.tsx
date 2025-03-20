import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface QuestionCardProps {
  title: string
  description: string
  children: React.ReactNode
  progress: number
  isActive: boolean
  className?: string
}

export function QuestionCard({
  title,
  description,
  children,
  progress,
  isActive,
  className,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 20,
        pointerEvents: isActive ? "auto" : "none",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative w-full max-w-2xl mx-auto",
        "rounded-2xl border border-border",
        "bg-card text-card-foreground",
        "shadow-lg dark:shadow-primary/5",
        "p-6 md:p-8",
        className
      )}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-muted overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Question content */}
      <div className="space-y-6">
        <div className="space-y-2">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold tracking-tight"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  )
} 