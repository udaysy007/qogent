'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Award, GraduationCap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UniversityCard as UniversityCardType } from '@/types/university'
import { cn } from '@/lib/utils'

interface UniversityCardProps {
  university: UniversityCardType
  className?: string
  variant?: 'default' | 'featured' | 'compact'
  isPremium?: boolean
  onClick?: () => void
}

// Add helper function for country code mapping
const getCountryCode = (countryName: string): string => {
  const countryMap: { [key: string]: string } = {
    'United States': 'usa',
    'USA': 'usa',
    'United States of America': 'usa',
    'United Kingdom': 'uk',
    'UK': 'uk',
    'Germany': 'germany',
    'Ireland': 'ireland',
    'Canada': 'canada',
    'Poland': 'poland',
    'Australia': 'australia',
    'Netherlands': 'netherlands',
    'Japan': 'japan',
    'Singapore': 'singapore',
    'France': 'france',
    'Italy': 'italy'
  }
  return countryMap[countryName] || countryName.toLowerCase()
}

export function UniversityCard({
  university,
  className,
  variant = 'default',
  isPremium = false,
  onClick,
}: UniversityCardProps) {
  const {
    name,
    slug,
    countryName,
    logo,
    isPublic,
    ranking,
    location,
  } = university

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300',
        'min-h-[420px]', // Taller cards
        'hover:shadow-xl hover:shadow-black/10',
        variant === 'featured' ? 'md:col-span-2 min-h-[480px]' : '',
        className
      )}
      onClick={onClick}
    >
      {/* Background Image with Enhanced Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={`/images/universities/${slug}/main.jpg`}
          alt={`${name} campus`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={variant === 'featured'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />
      </div>

      {/* Top Right Badge - Country Flag Only */}
      <div className="absolute top-4 right-4 z-20">
        <div className="rounded-lg overflow-hidden shadow-lg h-8 w-12 bg-gray-100">
          <Image
            src={`/images/flags/${getCountryCode(countryName)}.svg`}
            alt={`${countryName} flag`}
            width={48}
            height={32}
            className="object-cover w-full h-full"
            onError={(e) => {
              // Fallback to png if svg doesn't exist
              const imgElement = e.target as HTMLImageElement;
              if (imgElement.src.endsWith('.svg')) {
                imgElement.src = `/images/flags/${getCountryCode(countryName)}.png`;
              }
            }}
          />
        </div>
      </div>

      {/* Top Left Badge - Public/Private */}
      <div className="absolute top-4 left-4 z-20">
        <Badge 
          variant="secondary" 
          className={cn(
            "text-[11px] font-medium py-0.5 px-2 shadow-md",
            isPublic 
              ? "bg-emerald-500/90 text-white" 
              : "bg-purple-500/90 text-white"
          )}
        >
          {isPublic ? 'Public' : 'Private'}
        </Badge>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Main Content Area */}
        <div className="mt-auto p-6 pt-32">
          {/* Logo and Title Section */}
          <div className="flex items-start gap-4 mb-6">
            <div className={cn(
              'relative flex-shrink-0 rounded-xl overflow-hidden',
              'w-16 h-16 bg-white',
              'shadow-lg border border-white/10',
              'transition-transform duration-300 group-hover:scale-110'
            )}>
              <Image
                src={logo || `/images/universities/${slug.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/logo.png`}
                alt={`${name} logo`}
                fill
                className="object-contain p-2"
                sizes="64px"
                priority
                onError={(e) => {
                  const imgElement = e.target as HTMLImageElement;
                  const originalSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  const currentPath = imgElement.src;
                  
                  // Log the attempted path
                  console.log('Failed to load logo from:', currentPath);
                  
                  // Try different path variations
                  const variations = [
                    originalSlug,
                    originalSlug.replace(/^the-/, ''),
                    originalSlug.replace('university-of-', 'university-'),
                    originalSlug.replace(/^university-/, '').replace(/-university$/, ''),
                    'university-' + originalSlug.replace(/^university-/, '').replace(/-university$/, '')
                  ];
                  
                  // Find the first variation that exists in our directory structure
                  const existingVariation = variations.find(v => {
                    const path = `/images/universities/${v}/logo.png`;
                    console.log('Trying path:', path);
                    return true; // We'll try each path
                  });
                  
                  if (existingVariation) {
                    const newPath = `/images/universities/${existingVariation}/logo.png`;
                    console.log('Using path:', newPath);
                    imgElement.src = newPath;
                  }
                }}
              />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white leading-tight mb-2 break-words">
                {name}
              </h3>
              {ranking?.qs && (
                <div className="flex items-center gap-1.5">
                  <Award 
                    className={cn(
                      "h-3.5 w-3.5 flex-shrink-0",
                      ranking.qs <= 50 ? "text-yellow-400" : "text-blue-400"
                    )}
                  />
                  <span className="text-xs font-medium text-gray-300">
                    QS #{ranking.qs}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <Button 
            variant="default"
            className={cn(
              'w-full font-medium',
              'py-4 text-sm rounded-full',
              'bg-blue-600 hover:bg-blue-500 text-white',
              'shadow-[0_4px_14px_0_rgba(0,118,255,0.39)]',
              'hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)]',
              'transition-all duration-300 hover:scale-[1.02]',
              'hover:glow-blue-500/50'
            )}
            asChild
          >
            <Link href={`/universities/${slug}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
} 