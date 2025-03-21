"use client"

import { Globe } from "@/components/ui/globe"
import { Glow } from "@/components/ui/glow"

export function UniversitiesHero() {
  return (
    <section className="relative h-[40vh] w-full overflow-visible">
      {/* Background Glow */}
      <div className="absolute inset-0 -top-[100%] overflow-visible pointer-events-none">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto grid h-[40vh] grid-cols-1 items-center gap-6 px-4 py-4 md:grid-cols-2 lg:px-6">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start gap-4 -mt-8 max-w-xl mx-auto md:mx-0 md:pl-12 lg:pl-16 xl:pl-20">
          <h1 className="inline-block animate-appear bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-3xl font-bold leading-[1.15] pb-2 text-transparent drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] md:text-4xl lg:text-5xl">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent leading-[1.15] pb-1">
              University
            </span>
          </h1>
          
          <p className="text-base text-muted-foreground animate-appear opacity-0 [animation-delay:150ms] md:text-lg">
            Explore top universities worldwide. Get personalized recommendations based on your
            preferences and career goals.
          </p>
        </div>

        {/* Right Column - Globe */}
        <div className="relative order-first md:order-last animate-appear opacity-0 [animation-delay:600ms] -mt-8">
          <Globe />
        </div>
      </div>

      {/* Subtle Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.08),transparent_70%)]" />
    </section>
  )
} 