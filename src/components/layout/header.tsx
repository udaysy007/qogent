'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'Services', path: '/services' },
  { name: 'Jobs', path: '/jobs' },
  { name: 'Tools', path: '/tools' },
  { name: 'Blog', path: '/blog' },
]

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Qogent</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Button variant="outline" size="sm" className="hidden md:flex">
            Sign In
          </Button>
          
          <Button size="sm" className="hidden md:flex">
            Get Started
          </Button>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="touch-target">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col gap-6 pt-6">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary",
                      pathname === route.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                  <Button className="w-full">
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
} 