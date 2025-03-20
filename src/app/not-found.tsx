import Link from 'next/link'
import { Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 md:px-8">
      {/* Main Content */}
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        {/* Icon */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
          <div className="relative flex items-center justify-center w-full h-full">
            <Compass className="w-12 h-12 text-primary animate-spin-slow" />
          </div>
        </div>

        {/* 404 Indicator */}
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
          <span>Error 404</span>
          <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
        </div>

        {/* Text Content */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Lost on campus? Well, kind of...
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mt-4">
          Getting lost is basically a student tradition at this point, let's find you something better to explore 👇🏼
        </p>

        {/* Helpful Links */}
        <div className="mt-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/destinations">
                Explore Study Destinations
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/tools/destination-finder">
                Find Your Perfect Country
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/universities">
                Browse Universities
              </Link>
            </Button>
          </div>
        </div>

        {/* Home Button */}
        <div className="mt-8">
          <Button asChild variant="default" size="lg">
            <Link href="/">
              Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 