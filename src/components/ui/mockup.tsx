import { cn } from "@/lib/utils"

interface MockupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

export function Mockup({ className, children, ...props }: MockupProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-background shadow-lg",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Browser Controls */}
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
        <div className="flex gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
          <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
          <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
} 