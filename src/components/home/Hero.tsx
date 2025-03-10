'use client'

import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, MapPin, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Main gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(59,130,246,0.1) 50%, rgba(99,102,241,0.15) 100%)',
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
            className="mb-4 text-4xl font-bold tracking-tight md:mb-6 md:text-5xl lg:text-6xl"
          >
            Study Abroad with{' '}
            <span className="text-[var(--accent)]">Confidence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[var(--foreground)]/80 mb-8 max-w-3xl text-lg md:mb-10 md:text-xl"
          >
            Not sure where to begin your international education journey?
            We&apos;ve been there, navigated the maze of applications, and
            created the resources we wish we&apos;d had. Let&apos;s find your
            perfect path together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="hover:bg-[var(--accent)]/90 bg-[var(--accent)] px-8 text-white"
            >
              Find Your Country
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[var(--accent)]/20 hover:bg-[var(--accent)]/10 text-[var(--accent)]"
            >
              Explore Universities
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
              <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                {/* Subtle gradient accent */}
                <div
                  className="absolute right-0 top-0 h-48 w-48"
                  style={{
                    background:
                      'radial-gradient(circle at top right, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 50%, transparent 70%)',
                    borderBottomLeftRadius: '5rem',
                  }}
                ></div>

                {/* Card content */}
                <div className="relative z-10">
                  <div className="mb-4">{feature.icon}</div>
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
