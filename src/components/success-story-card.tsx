'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface SuccessStoryCardProps {
  name: string
  university: string
  course: string
  intake: string
  imageUrl: string
  instagramUrl?: string
  className?: string
}

export function SuccessStoryCard({
  name,
  university,
  course,
  intake,
  imageUrl,
  instagramUrl,
  className,
}: SuccessStoryCardProps) {
  return (
    <Card className={cn('group relative overflow-hidden transition-all hover:shadow-lg dark:bg-gray-800/50 backdrop-blur-sm border-gray-800/30', className)}>
      {/* Intake Badge */}
      <Badge 
        className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-gray-900/90 text-foreground backdrop-blur-sm border shadow-sm" 
        variant="outline"
      >
        {intake}
      </Badge>

      {/* Image Container */}
      <div className="aspect-[3/2.5] relative overflow-hidden">
        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10 opacity-60 transition-opacity group-hover:opacity-40" />
        
        <Image
          src={imageUrl}
          alt={`${name}'s success story`}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />

        {/* Instagram Link */}
        {instagramUrl && (
          <Link 
            href={instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 z-20 transition-transform hover:scale-110"
          >
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/20"
            >
              <Instagram className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-5">
        {/* Student Name */}
        <h3 className="font-semibold text-xl mb-4 text-foreground">{name}</h3>
        
        {/* University and Course */}
        <div className="space-y-2">
          <p className="font-medium text-base text-foreground leading-snug">
            {university}
          </p>
          <p className="text-sm text-muted-foreground leading-snug">
            {course}
          </p>
        </div>

        {/* Instagram Link for Mobile */}
        {instagramUrl && (
          <div className="mt-4 sm:hidden">
            <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="w-full">
                <Instagram className="h-4 w-4 mr-2" />
                View on Instagram
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 