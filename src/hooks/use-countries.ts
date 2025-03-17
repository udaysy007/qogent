import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

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
      const { data, error } = await supabase
        .from('countries')
        .select(`
          *,
          universities(*),
          visa_requirements(*),
          cost_of_living(*),
          work_opportunities(*),
          language_requirements(*),
          faqs(*)
        `)
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });
} 