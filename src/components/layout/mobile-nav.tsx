'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: '/',
      label: 'Home',
      active: pathname === '/',
    },
    {
      href: '/destinations',
      label: 'Destinations',
      active: pathname?.startsWith('/destinations'),
    },
    {
      href: '/services',
      label: 'Services',
      active: pathname?.startsWith('/services'),
    },
    {
      href: '/jobs',
      label: 'Jobs',
      active: pathname?.startsWith('/jobs'),
    },
    {
      href: '/tools',
      label: 'Tools',
      active: pathname?.startsWith('/tools'),
    },
    {
      href: '/blog',
      label: 'Blog',
      active: pathname?.startsWith('/blog'),
    },
    {
      href: '/about',
      label: 'About',
      active: pathname === '/about',
    },
    {
      href: '/contact',
      label: 'Contact',
      active: pathname === '/contact',
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <HamburgerMenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <span className="font-bold">Qogent</span>
          </Link>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'px-7 py-2 text-lg font-medium transition-colors hover:text-foreground',
                route.active ? 'text-foreground' : 'text-muted-foreground'
              )}
              onClick={() => setOpen(false)}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
