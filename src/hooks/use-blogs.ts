import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useBlogs(countryId?: string) {
  return useQuery({
    queryKey: ['blogs', countryId],
    queryFn: async () => {
      let query = supabase
        .from('blogs')
        .select('*')
        .lte('published_date', new Date().toISOString());
      
      if (countryId) {
        query = query.eq('country_id', countryId);
      }
      
      const { data, error } = await query.order('published_date', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          countries(*)
        `)
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });
} 