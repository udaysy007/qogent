'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Award, ExternalLink, Share2, CornerRightDown } from 'lucide-react'
import { University } from '@/types/university'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getUniversityCampus } from '@/lib/image-helpers'
import { HeroImage } from '@/components/shared/optimized-image'

interface UniversityHeroProps {
  university: University
}

export function UniversityHero({ university }: UniversityHeroProps) {
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Get university hero image URL with fallback
  const heroImageUrl = `/images/universities/${university.slug}/main.jpg`
  
  // Fallback hero image
  const fallbackHeroImage = "/images/placeholders/hero-placeholder.jpg"

  // Function to generate a meaningful abbreviation for logo placeholder
  const getUniversityAbbreviation = (name: string): string => {
    // Special cases
    if (name === 'Trinity College Dublin') return 'TCD'
    if (name === 'Technical University of Munich') return 'TUM'
    if (name === 'Humboldt University of Berlin') return 'HUB'
    if (name === 'University of British Columbia') return 'UBC'
    if (name === 'University of Toronto') return 'UTO'
    if (name === 'Heidelberg University') return 'HDU'
    
    // Generic cases
    if (name.startsWith('University of')) {
      const parts = name.replace('University of ', '').split(' ')
      if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase()
      return parts.map(part => part[0]).join('').toUpperCase()
    }
    
    // For other cases, take first letter of significant words
    const words = name.split(' ').filter(word => 
      !['of', 'the', 'and', '&', 'for', 'in'].includes(word.toLowerCase())
    )
    
    return words.slice(0, Math.min(3, words.length))
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  const abbr = getUniversityAbbreviation(university.name)
  
  // Use the new logo path format
  const logoUrl = `/images/universities/${university.slug}/logo.png`

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize() // Initial check
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Parallax effect values
  const headerOpacity = Math.min(scrollY / 200, 0.98)
  const imageParallax = Math.min(scrollY * 0.2, 100)
  
  return (
    <div className="relative w-full">
      {/* Sticky header that appears on scroll */}
      <div 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-background/90 backdrop-blur-md border-b flex items-center justify-between transition-all duration-300",
          scrollY > 100 ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ opacity: headerOpacity }}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-md overflow-hidden bg-primary/10">
            <Image 
              src={logoUrl}
              alt={university.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-semibold truncate">{university.name}</h3>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative h-[48vh] min-h-[320px] max-h-[480px] w-full overflow-hidden">
        {/* Parallax background image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${imageParallax}px)` }}
        >
          <HeroImage
            src={heroImageUrl}
            alt={`${university.name} campus`}
            fallbackSrc={fallbackHeroImage}
            priority
            className="h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
          <div className="container max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
              {/* University logo */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-24 w-24 md:h-32 md:w-32 rounded-xl overflow-hidden bg-card shadow-xl ring-2 ring-border"
              >
                <Image 
                  src={logoUrl}
                  alt={university.name}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* University info */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-white/10 text-white px-2 py-0.5">
                      {university.isPublic ? 'Public' : 'Private'}
                    </Badge>
                    <div className="flex items-center text-white/70">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      <span className="text-sm">{university.location}, {university.countryName}</span>
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">{university.name}</h1>
                </motion.div>

                {/* Quick stats */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
                >
                  {university.ranking?.qs && (
                    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-white" />
                        <span className="text-xs font-medium text-white/70">QS Ranking</span>
                      </div>
                      <p className="text-lg font-bold mt-1 text-white">#{university.ranking.qs}</p>
                    </div>
                  )}
                  
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white" />
                      <span className="text-xs font-medium text-white/70">Est.</span>
                    </div>
                    <p className="text-lg font-bold mt-1 text-white">{university.foundingYear}</p>
                  </div>
                  
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" />
                        <circle cx="12" cy="8" r="2" />
                      </svg>
                      <span className="text-xs font-medium text-white/70">Students</span>
                    </div>
                    <p className="text-lg font-bold mt-1 text-white">{university.studentPopulation.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z" />
                        <path d="M6 11c0-5.1 8-5.1 8 0" />
                        <path d="M10 11v5" />
                      </svg>
                      <span className="text-xs font-medium text-white/70">Success Rate</span>
                    </div>
                    <p className="text-lg font-bold mt-1 text-white">{university.qogentMetrics.admissionSuccessRate}</p>
                  </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-wrap gap-3"
                >
                  <Button variant="outline" size="lg" asChild>
                    <Link href={university.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Website
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 