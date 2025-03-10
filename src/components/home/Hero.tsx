'use client'

import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, MapPin, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroButton } from '@/components/ui/hero-button'

export function Hero() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Main gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(59,130,246,0.08) 50%, rgba(96,165,250,0.1) 100%)',
        }}
      ></div>

      {/* Decorative corner elements */}
      <div className="from-[var(--foreground)]/5 absolute right-0 top-0 h-64 w-64 rounded-bl-full bg-gradient-to-bl to-transparent"></div>
      <div className="from-[var(--foreground)]/5 absolute bottom-0 left-0 h-64 w-64 rounded-tr-full bg-gradient-to-tr to-transparent"></div>

      {/* Content */}
      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <div className="mb-10 flex flex-col items-center text-center md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="bg-[var(--accent)]/10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-[var(--accent)]">
              <GraduationCap className="h-4 w-4" />
              <span>Your Gateway to Global Education</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            Studying Abroad Made{' '}
            <span className="text-[var(--primary)]">Easy!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[var(--foreground)]/70 mb-8 max-w-2xl text-lg md:text-xl"
          >
            Get free education abroad based on merit, with guidance tailored to
            your aspirations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <HeroButton
              variant="filled"
              className="flex h-12 w-full min-w-[200px] animate-pulse-subtle items-center justify-center sm:w-auto"
            >
              <span className="mr-2 font-medium">Find Your Country</span>
              <ArrowRight className="h-4 w-4" />
            </HeroButton>

            <Button
              variant="outline"
              className="flex h-12 w-full min-w-[200px] items-center justify-center rounded-full border-white/20 bg-white/10 backdrop-blur-sm sm:w-auto"
            >
              <span className="mr-2 font-medium">Explore Universities</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {[
            {
              icon: <Globe className="h-6 w-6 text-[var(--accent)]" />,
              title: '20+ Destinations',
              description:
                'Find comprehensive guides for the most popular study abroad destinations.',
            },
            {
              icon: <GraduationCap className="h-6 w-6 text-[var(--accent)]" />,
              title: 'Merit-Based Admissions',
              description:
                'We focus on opportunities that prioritize your academic achievements, not your finances.',
            },
            {
              icon: <MapPin className="h-6 w-6 text-[var(--accent)]" />,
              title: 'Interactive Tools',
              description:
                'Discover which country and program is perfect for your academic and career goals.',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <div className="border-[var(--border)]/40 bg-[var(--background)]/30 hover:border-[var(--primary)]/30 group relative h-full overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.08)]">
                {/* Subtle gradient accent */}
                <div
                  className="absolute right-0 top-0 h-48 w-48 opacity-50 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at top right, rgba(var(--primary-rgb),0.1) 0%, rgba(var(--primary-rgb),0.05) 50%, transparent 70%)',
                    borderBottomLeftRadius: '5rem',
                  }}
                ></div>

                {/* Card content */}
                <div className="relative z-10">
                  <div className="bg-[var(--primary)]/10 group-hover:bg-[var(--primary)]/15 mb-4 w-fit rounded-xl p-3 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--foreground)]/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
