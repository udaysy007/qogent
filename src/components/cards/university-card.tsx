'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Award, GraduationCap, Users, Building2 } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UniversityCard as UniversityCardType } from '@/types/university'
import { cn } from '@/lib/utils'
import { getUniversityLogoUrl } from '@/lib/supabase-storage'

interface UniversityCardProps {
  university: UniversityCardType
  className?: string
  variant?: 'default' | 'featured'
  isPremium?: boolean
  onClick?: () => void
}

export function UniversityCard({
  university,
  className,
  variant = 'default',
  isPremium = false,
  onClick,
}: UniversityCardProps) {
  const {
    id,
    name,
    slug,
    countryName,
    logo,
    isPublic,
    ranking,
    location,
    featuredFields,
    qogentSuccessRate,
  } = university

  // Function to generate a meaningful abbreviation
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

  const abbr = getUniversityAbbreviation(name)
  
  // Generate placeholder image URL - always return the same value on both server and client
  const getImageUrl = () => {
    // If it's a full URL, use it directly
    if (logo && (logo.startsWith('http') || logo.startsWith('https'))) {
      return logo;
    }
    
    // Try to get the logo from Supabase Storage
    try {
      return getUniversityLogoUrl(slug);
    } catch (error) {
      // If Supabase Storage URL fails, use a placeholder
      return `https://placehold.co/400x400/2563eb/ffffff/png?text=${abbr}`;
    }
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://placehold.co/400x400/2563eb/ffffff/png?text=${abbr}`;
  };

  // Avoid any client-specific logic in the render function
  const logoUrl = getImageUrl()

  return (
    <Card
      className={cn(
        'flex flex-col justify-between min-h-[320px] transition-all duration-200',
        isPremium
          ? 'border-primary dark:border-primary hover:scale-[1.03] hover:shadow-md cursor-pointer'
          : 'hover:scale-[1.01]',
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <div className={cn(
          'relative flex-shrink-0 rounded-xl overflow-hidden',
          'w-20 h-20 bg-white dark:bg-gray-800',
          'shadow-sm border border-border/10',
          'transition-transform duration-300 group-hover:scale-105'
        )}>
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            fill
            className="object-contain p-2.5"
            sizes="80px"
            priority={variant === 'featured'}
            onError={handleImageError}
          />
        </div>
        <div>
          <CardTitle className="text-base">{name}</CardTitle>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{location}, {countryName}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex flex-wrap gap-3 mb-4">
              {ranking?.qs && (
                <Badge variant="outline" className="px-3 py-1 border-primary/30">
                  <Award className="h-4 w-4 mr-1.5 text-primary" />
                  QS Rank #{ranking.qs}
                </Badge>
              )}
              
              {isPublic && (
                <Badge variant="secondary" className="px-3 py-1">
                  <Building2 className="h-4 w-4 mr-1.5" />
                  Public University
                </Badge>
              )}

              {qogentSuccessRate && (
                <Badge variant="outline" className="px-3 py-1 border-green-500/30 text-green-500">
                  <Users className="h-4 w-4 mr-1.5" />
                  {qogentSuccessRate}% Success Rate
                </Badge>
              )}
            </div>
          </div>
          {featuredFields.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <GraduationCap className="h-4 w-4" />
                <span>Popular Programs</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {featuredFields.slice(0, 3).map((field, i) => (
                  <Badge 
                    key={i} 
                    variant="secondary" 
                    className="bg-secondary/20 hover:bg-secondary/30"
                  >
                    {field}
                  </Badge>
                ))}
                {featuredFields.length > 3 && (
                  <Badge variant="outline" className="text-muted-foreground">
                    +{featuredFields.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground flex justify-between">
        <Button 
          variant="default"
          className="w-full bg-primary hover:bg-primary/90"
          asChild
        >
          <Link href={`/universities/${slug}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 