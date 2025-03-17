'use client'

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { University, UniversityCard, UniversityFilterOptions } from '@/types/university';

// Function to fetch all universities (in a real app, would be an API call)
async function getUniversities(): Promise<University[]> {
  // In a real implementation, this would be an API call
  const data = await import('@/data/universities.json').then(
    (module) => module.default
  );
  return data as University[];
}

// Function to fetch a single university by slug
async function getUniversityBySlug(slug: string): Promise<University | undefined> {
  const universities = await getUniversities();
  return universities.find((university) => university.slug === slug);
}

// Function to fetch universities by country
async function getUniversitiesByCountry(countryId: number): Promise<University[]> {
  const universities = await getUniversities();
  return universities.filter((university) => university.countryId === countryId);
}

// Function to fetch simplified university card data
async function getUniversityCards(): Promise<UniversityCard[]> {
  const universities = await getUniversities();
  
  return universities.map((university) => ({
    id: university.id,
    name: university.name,
    slug: university.slug,
    countryId: university.countryId,
    countryName: university.countryName,
    logo: university.logo,
    isPublic: university.isPublic,
    ranking: university.ranking ? { qs: university.ranking.qs } : undefined,
    location: university.location,
    featuredFields: Array.from(new Set(university.featuredPrograms.map(program => program.field))),
    qogentSuccessRate: university.qogentMetrics.admissionSuccessRate
  }));
}

// Function to fetch filtered university cards
async function getFilteredUniversityCards(
  filters: UniversityFilterOptions
): Promise<UniversityCard[]> {
  const cards = await getUniversityCards();
  
  return cards.filter((card) => {
    // Filter by country
    if (filters.countries.length > 0 && !filters.countries.includes(card.countryName)) {
      return false;
    }
    
    // Filter by public/private
    if (filters.isPublic !== undefined && card.isPublic !== filters.isPublic) {
      return false;
    }
    
    // Filter by fields (any match)
    if (filters.fields.length > 0 && !card.featuredFields.some(field => filters.fields.includes(field))) {
      return false;
    }
    
    return true;
  });
}

// Hook for accessing all universities
export function useUniversities() {
  return useQuery({
    queryKey: ['universities'],
    queryFn: getUniversities,
  });
}

// Hook for accessing a single university by slug
export function useUniversity(slug: string) {
  return useQuery({
    queryKey: ['university', slug],
    queryFn: () => getUniversityBySlug(slug),
    enabled: !!slug,
  });
}

// Hook for accessing universities by country
export function useUniversitiesByCountry(countryId: number) {
  return useQuery({
    queryKey: ['universities', 'country', countryId],
    queryFn: () => getUniversitiesByCountry(countryId),
    enabled: !!countryId,
  });
}

// Hook for accessing simplified university card data
export function useUniversityCards() {
  return useQuery({
    queryKey: ['universityCards'],
    queryFn: getUniversityCards,
  });
}

// Hook for accessing filtered university card data
export function useFilteredUniversityCards(filters: UniversityFilterOptions) {
  return useQuery({
    queryKey: ['universityCards', 'filtered', filters],
    queryFn: () => getFilteredUniversityCards(filters),
  });
} 