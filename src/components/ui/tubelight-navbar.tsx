"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { LucideIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { usePathname } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)

  // Update active tab based on current URL when component mounts
  useEffect(() => {
    setMounted(true)
    
    // Find matching nav item based on the current path
    const matchedItem = items.find(item => {
      // Check for exact match first
      if (pathname === item.url) return true
      
      // Check for section match (e.g., /destinations/any-subpage matches /destinations)
      if (item.url !== '/' && pathname.startsWith(item.url)) return true
      
      return false
    })
    
    // Set the active tab to the matched item or default to home
    setActiveTab(matchedItem?.name || items[0].name)
  }, [pathname, items])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Preload the logo images
  useEffect(() => {
    if (mounted) {
      // Use a simple preloading approach without the Image constructor
      const preloadImage = (src: string) => {
        return new Promise<void>((resolve) => {
          const img = document.createElement('img');
          img.src = src;
          img.onload = () => {
            resolve();
          };
        });
      };
      
      // Preload both logos and set loaded state when done
      Promise.all([
        preloadImage('/images/qogent_logo.png'),
        preloadImage('/images/qogent_logo_white.png')
      ]).then(() => {
        setLogoLoaded(true);
      });
    }
  }, [mounted]);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="relative w-full">
        {/* Spacer div to prevent content jump when navbar becomes fixed */}
        <div className="w-full h-24 hidden sm:block" />
        <div
          className={cn(
            "fixed top-0 left-0 right-0 z-50 pt-6 pb-6 w-full hidden sm:block",
            className,
          )}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-3 bg-background/80 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
              {/* Logo */}
              <Link href="/" className="flex items-center px-2">
                {/* Logo placeholder with exact dimensions to prevent layout shifts */}
                <div className="relative h-11 w-[150px]">
                  {(mounted && logoLoaded) ? (
                    <Image
                      src={theme === 'dark' ? '/images/qogent_logo_white.png' : '/images/qogent_logo.png'}
                      alt="Qogent Logo"
                      width={200}
                      height={60}
                      className="h-11 w-auto object-contain select-none"
                      priority
                      quality={100}
                      style={{ 
                        imageRendering: 'crisp-edges',
                        maxWidth: 'none'
                      }}
                      unoptimized
                    />
                  ) : (
                    <div className="h-11 w-full flex items-center justify-center">
                      <Skeleton className="h-7 w-[120px]" />
                    </div>
                  )}
                </div>
              </Link>

              {/* Navigation Items */}
              {items.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.name

                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    onClick={() => setActiveTab(item.name)}
                    className={cn(
                      "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                      "text-foreground/80 hover:text-primary",
                      isActive && "bg-muted text-primary",
                    )}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="lamp"
                        className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                          <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                          <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                          <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                        </div>
                      </motion.div>
                    )}
                  </Link>
                )
              })}

              {/* Right side items */}
              <div className="flex items-center gap-4 pl-4 pr-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full px-6 text-sm font-semibold text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                >
                  Sign In
                </Button>
                <Button 
                  variant="ghost"
                  size="sm" 
                  className="rounded-full px-6 text-sm font-semibold text-primary hover:bg-muted hover:text-primary/90 transition-colors"
                >
                  Get Started
                </Button>
              </div>
            </div>

            {/* Theme Toggle - Always show a placeholder while loading */}
            <div className="flex items-center justify-center bg-background/80 border border-border backdrop-blur-lg w-10 h-10 rounded-full shadow-lg group hover:bg-muted/50 transition-colors">
              {mounted ? (
                <ThemeToggle />
              ) : (
                <div className="w-5 h-5 rounded-full">
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 sm:hidden">
        <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-4 rounded-full shadow-lg">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative p-2 rounded-full transition-colors",
                  "text-foreground/80 hover:text-primary",
                  isActive && "text-primary",
                )}
              >
                <Icon size={18} strokeWidth={2.5} />
                {isActive && (
                  <motion.div
                    layoutId="lamp-mobile"
                    className="absolute inset-0 bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobile Top Logo */}
      <div className="fixed top-0 left-0 w-full z-50 sm:hidden">
        <div className="w-full flex justify-between items-center py-4 px-4 bg-transparent backdrop-blur-md">
          {/* Empty div for spacing */}
          <div className="w-8"></div>
          
          {/* Center logo */}
          <Link href="/" className="flex justify-center">
            <div className="relative h-10 w-[150px]">
              {(mounted && logoLoaded) ? (
                <Image
                  src={theme === 'dark' ? '/images/qogent_logo_white.png' : '/images/qogent_logo.png'}
                  alt="Qogent Logo"
                  width={150}
                  height={40}
                  className="h-10 w-auto object-contain select-none"
                  priority
                  quality={100}
                  style={{ 
                    imageRendering: 'crisp-edges',
                    maxWidth: 'none'
                  }}
                  unoptimized
                />
              ) : (
                <div className="h-10 w-full flex items-center justify-center">
                  <Skeleton className="h-6 w-[130px]" />
                </div>
              )}
            </div>
          </Link>
          
          {/* Theme toggle on the right */}
          <div className="w-8 h-8 flex items-center justify-center">
            {mounted ? (
              <ThemeToggle />
            ) : (
              <div className="w-5 h-5 rounded-full">
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile header spacer */}
      <div className="w-full h-20 block sm:hidden" />
    </>
  )
} 