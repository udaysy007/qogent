'use client'

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { UniversityCard } from '@/types/university';

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });
}

export function useCountry(slug: string) {
  return useQuery({
    queryKey: ['country', slug],
    queryFn: async () => {
      // First get the country details
      const { data: country, error: countryError } = await supabase
        .from('countries')
        .select(`
          *,
          visa_requirements(*),
          cost_of_living(*),
          work_opportunities(*),
          language_requirements(*),
          faqs(*)
        `)
        .eq('slug', slug)
        .single();
      
      if (countryError) throw countryError;
      
      // Then get the universities for this country
      const { data: universities, error: uniError } = await supabase
        .from('universities')
        .select('*')
        .eq('country_id', country.id);
      
      if (uniError) throw uniError;
      
      // Format universities as UniversityCard objects
      const formattedUniversities: UniversityCard[] = universities ? universities.map(uni => {
        return {
          id: uni.id,
          name: uni.name,
          slug: uni.slug,
          countryId: uni.country_id,
          countryName: country.name,
          logo: uni.logo_url || '',
          isPublic: uni.is_public || false,
          ranking: {
            qs: uni.ranking || undefined,
          },
          location: uni.city || '',
          featuredFields: [],
          qogentSuccessRate: '85%',
        };
      }) : [];
      
      // Add the formatted universities to the country data
      return {
        ...country,
        universities: formattedUniversities
      };
    },
    enabled: !!slug
  });
} 