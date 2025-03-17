'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, MapPin, School, Award, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UniversityCard as UniversityCardType } from '@/types/university'
import { cn } from '@/lib/utils'

interface UniversityCardProps {
  university: UniversityCardType
  className?: string
  variant?: 'default' | 'featured'
}

export function UniversityCard({
  university,
  className,
  variant = 'default',
}: UniversityCardProps) {
  const {
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

  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all hover:shadow-sm border border-muted',
        variant === 'featured' ? 'border-primary/20 dark:border-primary/30' : '',
        className
      )}
    >
      <div className="p-5">      
        <div className="flex mb-4">
          {logo ? (
            <div className="relative h-16 w-16 mr-4 overflow-hidden p-2 bg-white dark:bg-background rounded-lg border">
              <Image
                src={logo}
                alt={`${name} logo`}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="h-16 w-16 mr-4 bg-muted flex items-center justify-center rounded-lg">
              <School className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold mb-1 leading-tight">{name}</h3>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span className="truncate">{location}, {countryName}</span>
            </div>
            
            {ranking?.qs && (
              <Badge variant="outline" className="text-xs">
                QS Rank: {ranking.qs}
              </Badge>
            )}
          </div>
        </div>
        
        {featuredFields.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {featuredFields.slice(0, 3).map((field, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {field}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <CardFooter className="p-5 pt-0 flex gap-3 justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          asChild
        >
          <Link href={`/universities/${slug}`}>
            View Details
          </Link>
        </Button>
        
        <Link 
          href={`https://ms-in-${countryName.toLowerCase().replace(/\s+/g, '')}.qogent.com/universities/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          View on {countryName} site
          <ExternalLink className="h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  )
} 