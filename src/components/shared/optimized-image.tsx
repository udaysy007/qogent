'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getUniversityLogo, getCountryFlag } from '@/lib/image-helpers'

export interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
  placeholder?: React.ReactNode
  sizes?: string
  priority?: boolean
  quality?: number
  showLoadingIndicator?: boolean
}

/**
 * A universal image component that handles loading, errors, and fallbacks
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc,
  placeholder,
  sizes,
  priority = false,
  quality,
  showLoadingIndicator = true,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Default placeholder is a gray background
  const defaultPlaceholder = showLoadingIndicator ? (
    <div className="absolute inset-0 bg-muted animate-pulse" />
  ) : null

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (placeholder || defaultPlaceholder)}
      
      {!error ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setError(true)
          }}
        />
      ) : fallbackSrc ? (
        <Image
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          quality={quality}
          className="w-full h-full"
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-center p-4">
          <span>{alt || 'Image not available'}</span>
        </div>
      )}
    </div>
  )
}

/**
 * Specialized component for university logos with text abbreviation fallback
 */
export function UniversityLogo({
  university,
  size = 'md',
  className,
  ...props
}: {
  university: {
    name: string
    logo_url?: string
    slug?: string
  }
  size?: 'sm' | 'md' | 'lg'
  className?: string
} & Omit<OptimizedImageProps, 'src' | 'alt' | 'width' | 'height' | 'placeholder'>) {
  const [error, setError] = useState(false)
  const { name, logo_url, slug } = university
  
  // First try to use directly provided logo_url (highest priority)
  // Then fallback to our helper function if slug exists
  let logoSrc: string | undefined
  
  if (logo_url) {
    logoSrc = logo_url
  } else if (slug) {
    try {
      logoSrc = getUniversityLogo(slug)
    } catch (e) {
      // If helper fails, we'll show the abbreviation (handled by error state)
      console.error(`Failed to get logo for ${slug}:`, e)
      setError(true)
    }
  }
  
  // Generate abbreviation from university name
  const generateAbbreviation = (name: string): string => {
    // Common university abbreviations
    const abbreviations: Record<string, string> = {
      'Trinity College Dublin': 'TCD',
      'University of Toronto': 'UofT',
      'Technical University of Munich': 'TUM',
      'University College Dublin': 'UCD',
      'Massachusetts Institute of Technology': 'MIT',
      'University of British Columbia': 'UBC',
      'University of Cambridge': 'CAM',
      'University of Oxford': 'OX',
    }
    
    if (abbreviations[name]) {
      return abbreviations[name]
    }
    
    // Generate from words
    const words = name.split(' ')
    if (words.length === 1) {
      return words[0].substring(0, 3).toUpperCase()
    }
    
    // Handle "University of X"
    if (words.length > 2 && words[0] === 'University' && words[1] === 'of') {
      return words.slice(2, 4).map(word => word.charAt(0)).join('').toUpperCase()
    }
    
    // Take first letter of meaningful words
    return words
      .filter(word => word.length > 2)
      .slice(0, 3)
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
  }
  
  // Size mappings
  const sizes = {
    sm: { width: 32, height: 32, textSize: 'text-xs' },
    md: { width: 48, height: 48, textSize: 'text-sm' },
    lg: { width: 64, height: 64, textSize: 'text-base' },
  }
  
  const { width, height, textSize } = sizes[size]
  
  // If there's no logo or an error occurred, show abbreviation
  if (!logoSrc || error) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-muted rounded-md',
          className
        )}
        style={{ width, height }}
      >
        <span className={cn('font-medium', textSize)}>
          {generateAbbreviation(name)}
        </span>
      </div>
    )
  }
  
  return (
    <Image
      src={logoSrc}
      alt={`${name} logo`}
      width={width}
      height={height}
      className={cn('object-contain', className)}
      onError={() => setError(true)}
      {...props}
    />
  )
}

/**
 * Specialized component for country flags
 */
export function CountryFlag({
  country,
  size = 'md',
  className,
  ...props
}: {
  country: {
    name: string
    code: string
    flag_url?: string
  }
  size?: 'sm' | 'md' | 'lg'
  className?: string
} & Omit<OptimizedImageProps, 'src' | 'alt' | 'width' | 'height' | 'placeholder'>) {
  const [error, setError] = useState(false)
  const { name, code, flag_url } = country
  
  // Size mappings
  const sizes = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
  }
  
  const { width, height } = sizes[size]
  
  // First try to use the provided flag_url, then fallback to helper function
  let src: string
  
  if (flag_url) {
    src = flag_url
  } else {
    try {
      src = getCountryFlag(code)
    } catch (e) {
      // If helper fails, we'll show the country code (handled by error state)
      console.error(`Failed to get flag for ${code}:`, e)
      setError(true)
      src = '' // This will trigger the error handler in the Image component
    }
  }
  
  // If there's an error loading the flag, show the country code
  if (error) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-muted rounded-sm',
          className
        )}
        style={{ width, height }}
      >
        <span className="font-medium text-xs">
          {code}
        </span>
      </div>
    )
  }
  
  return (
    <Image
      src={src}
      alt={`${name} flag`}
      width={width}
      height={height}
      className={cn('object-cover', className)}
      onError={() => setError(true)}
      {...props}
    />
  )
}

/**
 * Specialized component for hero images with better fallbacks
 */
export function HeroImage({
  src,
  alt,
  className,
  fallbackSrc = '/images/placeholders/hero-placeholder.jpg',
  priority = false,
  ...props
}: {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  priority?: boolean
} & Omit<React.ComponentProps<typeof Image>, 'src' | 'alt' | 'placeholder'>) {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if the URL is remote or local
  const isRemoteUrl = src?.startsWith('http') || src?.startsWith('//')
  
  // Use local fallback if we get an unsupported URL format
  const imageSource = error ? fallbackSrc : src
  
  // When using a remote URL in dev without domain config, use a local fallback
  useEffect(() => {
    if (isRemoteUrl && process.env.NODE_ENV === 'development') {
      try {
        // Test if domain is in allowed list
        new URL(src)
      } catch (e) {
        setError(true)
      }
    }
  }, [src, isRemoteUrl])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted/80 to-muted animate-pulse" />
      )}
      
      <Image
        src={imageSource}
        alt={alt}
        priority={priority}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        className={cn(
          'object-cover',
          isLoading ? 'opacity-0' : 'opacity-100',
          'transition-opacity duration-300'
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setError(true)
        }}
        {...props}
      />
    </div>
  )
} 