import * as React from "react"
import { cn } from "@/lib/utils"

interface BlockquoteProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "primary" | "accent"
  cite?: string
  author?: string
}

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  BlockquoteProps
>(({ children, className, variant = "default", cite, author }, ref) => {
  const variantStyles = {
    default: "border-l-4 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800",
    primary: "border-l-4 border-blue-primary bg-blue-light dark:bg-blue-dark/20",
    accent: "border-l-4 border-accent-purple bg-gray-100 dark:bg-gray-800",
  }

  return (
    <figure className={cn("my-6", className)}>
      <blockquote
        ref={ref}
        cite={cite}
        className={cn(
          "p-4 italic text-gray-700 dark:text-gray-300",
          variantStyles[variant]
        )}
      >
        <div className="relative">
          <svg
            className="absolute -top-2 -left-2 h-8 w-8 text-gray-300 dark:text-gray-700 opacity-50"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <div className="relative z-10 pl-6">
            {children}
          </div>
        </div>
      </blockquote>
      {author && (
        <figcaption className="mt-2 text-right text-sm text-gray-500 dark:text-gray-400">
          — {author}
        </figcaption>
      )}
    </figure>
  )
})

Blockquote.displayName = "Blockquote"

export { Blockquote } 