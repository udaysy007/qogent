"use client"

import { lazy, Suspense, useMemo, useState, useEffect, useRef } from 'react'
import { Glow } from "@/components/ui/glow"
import { motion, AnimatePresence } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

// Defer lazy loading to avoid blocking the main thread
const WorldMap = lazy(() => import("@/components/ui/world-map"))

// Skeleton component just for the map area
const MapSkeleton = () => (
  <div className="h-full w-full bg-muted/10 flex justify-center items-center">
    <div className="w-40 h-40 rounded-full bg-muted/30 animate-pulse"></div>
  </div>
)

export function DestinationsHero() {
  const [isMounted, setIsMounted] = useState(false)
  
  // Client-side only mounting to avoid SSR issues
  useEffect(() => {
    // Set mounted immediately
    setIsMounted(true)
  }, [])
  
  // Define key study destinations - memoized to prevent recalculation
  const destinations = useMemo(() => [
    // Europe
    {
      start: { lat: 51.5074, lng: -0.1278, label: "UK" }, // London
      end: { lat: 40.7128, lng: -74.0060 }, // New York
    },
    // North America
    {
      start: { lat: 40.7128, lng: -74.0060, label: "USA" }, // New York
      end: { lat: 51.5074, lng: -0.1278 }, // London
    },
    // Asia
    {
      start: { lat: 35.6762, lng: 139.6503, label: "Japan" }, // Tokyo
      end: { lat: -33.8688, lng: 151.2093 }, // Sydney
    },
    // Oceania
    {
      start: { lat: -33.8688, lng: 151.2093, label: "Australia" }, // Sydney
      end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
    },
    // South America
    {
      start: { lat: -23.5505, lng: -46.6333, label: "Brazil" }, // Sao Paulo
      end: { lat: 40.7128, lng: -74.0060 }, // New York
    },
    // Asia (South)
    {
      start: { lat: 28.6139, lng: 77.2090, label: "India" }, // New Delhi
      end: { lat: 51.5074, lng: -0.1278 }, // London
    },
  ], []);
  
  // Memoize animation variants to reduce re-renders
  const tagVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        delay: 0.3 + (i * 0.1) 
      }
    })
  }), []);

  return (
    <section className="relative min-h-[50vh] w-full overflow-hidden bg-background">
      {/* World Map Background - render with Suspense */}
      <div className="absolute inset-0 z-0">
        {isMounted && (
          <Suspense fallback={<MapSkeleton />}>
            <WorldMap dots={destinations} lineColor="#0e7ff8" />
          </Suspense>
        )}
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 -top-[100%] overflow-visible pointer-events-none z-0">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>

      {/* Content Container - always render immediately */}
      <div className="container relative z-10 mx-auto flex flex-col justify-center min-h-[50vh] px-4 py-12 lg:px-6">
        {/* Text Content with background blur - always visible */}
        <div className="max-w-2xl bg-background/30 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h1 className="animate-appear bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-4xl font-bold leading-tight text-transparent drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] md:text-5xl lg:text-6xl">
            Explore Global
            <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Destinations
            </span>
          </h1>
          
          <p className="text-base text-muted-foreground animate-appear opacity-0 [animation-delay:150ms] md:text-lg mt-4 max-w-xl">
            Discover exciting study destinations around the world. Find the perfect 
            location that aligns with your academic and lifestyle goals.
          </p>

          {/* Animated Tags - with optimized animation */}
          <div className="flex flex-wrap gap-2 mt-4">
            <AnimatePresence>
              {['Europe', 'Asia', 'Americas', 'Africa', 'Oceania'].map((region, index) => (
                <motion.span
                  key={region}
                  className="px-3 py-1.5 rounded-full text-sm bg-blue-500/10 backdrop-blur-sm border border-blue-500/20"
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={tagVariants}
                >
                  {region}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Subtle Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.08),transparent_70%)]" />
    </section>
  )
} 