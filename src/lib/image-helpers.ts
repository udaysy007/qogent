/**
 * Helper functions for handling images with proper fallbacks
 */

import { getUniversityCampusUrl, getUniversityLogoUrl, getCountryFlagUrl, getCountryHeroUrl } from './supabase-storage'

// Check if running in browser environment
const isBrowser = typeof window !== 'undefined'

/**
 * Get university logo URL with proper fallback handling
 */
export function getUniversityLogo(slug: string): string {
  // Always prefer local files in development
  if (process.env.NODE_ENV === 'development') {
    return `/images/universities/${slug}/main.jpg`
  }
  
  // In production, use Supabase
  try {
    return getUniversityLogoUrl(slug)
  } catch (error) {
    // If Supabase fails, fall back to local
    return `/images/universities/${slug}/main.jpg`
  }
}

/**
 * Get university campus image URL with proper fallback handling
 */
export function getUniversityCampus(slug: string): string {
  // Always prefer local files in development
  if (process.env.NODE_ENV === 'development') {
    return `/images/universities/${slug}/main.jpg`
  }
  
  // In production, use Supabase
  try {
    return getUniversityCampusUrl(slug)
  } catch (error) {
    // If Supabase fails, fall back to local
    return `/images/universities/${slug}/main.jpg`
  }
}

/**
 * Get country flag URL with proper fallback handling
 */
export function getCountryFlag(code: string): string {
  // Always prefer local files in development
  if (process.env.NODE_ENV === 'development') {
    return `/images/countries/flags/${code.toLowerCase()}.svg`
  }
  
  // In production, use Supabase
  try {
    return getCountryFlagUrl(code)
  } catch (error) {
    // If Supabase fails, fall back to local
    return `/images/countries/flags/${code.toLowerCase()}.svg`
  }
}

/**
 * Get country hero image URL with proper fallback handling
 */
export function getCountryHero(slug: string): string {
  // Always use local files for country hero images
  return `/images/destinations/${slug}-hero.jpg`
} 