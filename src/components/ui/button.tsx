import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive backdrop-blur-sm",
  {
    variants: {
      variant: {
        default:
          'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] hover:bg-[var(--primary)]/15 hover:border-[var(--primary)]/30 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.25)]',
        destructive:
          'bg-[var(--destructive)]/10 text-[var(--destructive)] border border-[var(--destructive)]/20 shadow-[0_0_15px_rgba(var(--destructive-rgb),0.15)] hover:bg-[var(--destructive)]/15 hover:border-[var(--destructive)]/30 hover:shadow-[0_0_20px_rgba(var(--destructive-rgb),0.25)]',
        outline:
          'bg-[var(--background)]/30 border border-[var(--border)] hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 hover:text-[var(--primary)] hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]',
        secondary:
          'bg-[var(--secondary)]/10 text-[var(--secondary-foreground)] border border-[var(--secondary)]/20 hover:bg-[var(--secondary)]/20 hover:border-[var(--secondary)]/30',
        ghost: 'hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]',
        link: 'text-[var(--primary)] underline-offset-4 hover:underline',
        solid:
          'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md hover:bg-[var(--primary)]/90 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]',
      },
      size: {
        default: 'h-10 px-5 py-2 has-[>svg]:px-4',
        sm: 'h-9 gap-1.5 px-3 has-[>svg]:px-2.5 text-xs rounded-lg',
        lg: 'h-12 rounded-xl px-8 has-[>svg]:px-6 text-base',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
