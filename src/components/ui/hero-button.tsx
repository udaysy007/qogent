'use client'

import React, { ElementType, ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

interface HeroButtonProps<T extends ElementType> {
  as?: T
  variant?: 'default' | 'filled'
  className?: string
  children: React.ReactNode
}

export function HeroButton<T extends ElementType = 'button'>({
  as,
  variant = 'default',
  className,
  children,
  ...props
}: HeroButtonProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof HeroButtonProps<T>>) {
  const Component = as || 'button'

  return (
    <Component
      className={cn(
        'relative overflow-hidden rounded-full px-6 py-3',
        'transition-all duration-500 ease-in-out',
        variant === 'filled'
          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
          : 'border border-white/20 bg-white/10 backdrop-blur-sm',
        'shadow-[0_0_20px_rgba(56,189,248,0.2)]',
        'hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]',
        className
      )}
      {...props}
    >
      {/* Clean inner content */}
      <div className="relative z-10 flex w-full items-center justify-center">
        {children}
      </div>
    </Component>
  )
}
