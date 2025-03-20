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
  
  // Generate placeholder image URL
  const getImageUrl = () => {
    if (logo && (logo.startsWith('http') || logo.startsWith('https'))) {
      return logo;
    }
    
    try {
      return getUniversityLogoUrl(slug);
    } catch (error) {
      return `https://placehold.co/400x400/2563eb/ffffff/png?text=${abbr}`;
    }
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://placehold.co/400x400/2563eb/ffffff/png?text=${abbr}`;
  };

  const logoUrl = getImageUrl()

  return (
    <Card
      className={cn(
        'group flex flex-col justify-between min-h-[320px] transition-all duration-300',
        'bg-white dark:bg-gray-900/50 backdrop-blur-sm',
        'border border-border/5 dark:border-border/10',
        isPremium
          ? 'hover:border-primary/50 dark:hover:border-primary/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5'
          : 'hover:scale-[1.01] hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5',
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <div className={cn(
          'relative flex-shrink-0 rounded-xl overflow-hidden',
          'w-20 h-20 bg-blue-50 dark:bg-blue-950/50',
          'shadow-sm border border-blue-100/50 dark:border-blue-900/50',
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
        <div className="space-y-1.5">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">{name}</CardTitle>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{location}, {countryName}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 space-y-6">
        <div className="flex flex-wrap gap-2">
          {ranking?.qs && (
            <Badge variant="outline" className="bg-blue-50/50 dark:bg-blue-950/50 border-primary/20 dark:border-primary/20 text-primary dark:text-primary-foreground">
              <Award className="h-3.5 w-3.5 mr-1" />
              QS #{ranking.qs}
            </Badge>
          )}
          
          {isPublic && (
            <Badge variant="secondary" className="bg-secondary/10 dark:bg-secondary/20">
              <Building2 className="h-3.5 w-3.5 mr-1" />
              Public
            </Badge>
          )}

          {qogentSuccessRate && (
            <Badge variant="outline" className="bg-green-50/50 dark:bg-green-950/50 border-green-500/20 dark:border-green-400/20 text-green-600 dark:text-green-400">
              <Users className="h-3.5 w-3.5 mr-1" />
              {qogentSuccessRate}% Success
            </Badge>
          )}
        </div>

        {featuredFields.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-gray-100">
              <GraduationCap className="h-4 w-4" />
              <span>Popular Programs</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {featuredFields.slice(0, 3).map((field, i) => (
                <Badge 
                  key={i} 
                  variant="secondary" 
                  className="bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                >
                  {field}
                </Badge>
              ))}
              {featuredFields.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800"
                >
                  +{featuredFields.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          variant="default"
          className={cn(
            'w-full transition-all duration-300',
            'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
            'text-white font-medium'
          )}
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