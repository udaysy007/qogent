'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface CallToActionProps {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  showNewsletter?: boolean
}

export function CallToAction({
  title = "Ready to Start Your Study Abroad Journey?",
  description = "Explore our tools and resources to find the perfect university and program for your academic goals.",
  buttonText = "Explore Our Tools",
  buttonLink = "/tools",
  showNewsletter = true,
}: CallToActionProps) {
  return (
    <section className="relative overflow-hidden bg-muted/40 dark:bg-muted/20 rounded-xl p-8 sm:p-10 mt-16 mb-8 border border-border/50 shadow-sm not-prose">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10 z-0 opacity-80"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">{title}</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">{description}</p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href={buttonLink}>
              {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          {showNewsletter && (
            <div className="w-full flex flex-col sm:flex-row gap-3 sm:ml-4">
              <Input 
                type="email" 
                placeholder="Enter your email for updates" 
                className="flex-grow bg-background/70 border-border focus-visible:ring-primary"
              />
              <Button variant="outline" className="bg-background/70 border-border hover:bg-background">
                Subscribe
              </Button>
            </div>
          )}
        </div>
        
        {showNewsletter && (
          <p className="text-xs text-muted-foreground mt-4">
            Join our newsletter for the latest study abroad tips, application guidance, and scholarship opportunities.
          </p>
        )}
      </div>
    </section>
  )
} 