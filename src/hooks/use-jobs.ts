import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { Job, JobFilters, JobSortOption } from '@/types/job';
import { supabase } from '@/lib/supabase';

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function fetchJobs(filters?: JobFilters, sort?: JobSortOption) {
  let query = supabaseClient
    .from('jobs')
    .select('*')
    .eq('is_active', true);

  // Apply filters
  if (filters?.department) {
    query = query.eq('department', filters.department);
  }
  if (filters?.location) {
    query = query.eq('location', filters.location);
  }
  if (filters?.type) {
    query = query.eq('type', filters.type);
  }

  // Apply sorting
  switch (sort) {
    case 'newest':
      query = query.order('posted_date', { ascending: false });
      break;
    case 'oldest':
      query = query.order('posted_date', { ascending: true });
      break;
    case 'title-asc':
      query = query.order('title', { ascending: true });
      break;
    case 'title-desc':
      query = query.order('title', { ascending: false });
      break;
    default:
      query = query.order('posted_date', { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Failed to fetch jobs');
  }

  return data as Job[];
}

export function useJobs(filters?: JobFilters, sort?: JobSortOption) {
  return useQuery({
    queryKey: ['jobs', filters, sort],
    queryFn: () => fetchJobs(filters, sort),
  });
}

export function useFilteredJobs(filters: {
  departments: string[]
  locations: string[]
  types: string[]
  searchQuery: string
}) {
  const { data: jobs, isLoading, error } = useJobs();

  const filteredJobs = jobs?.filter((job) => {
    const matchesDepartment =
      filters.departments.length === 0 || filters.departments.includes(job.department);
    const matchesLocation =
      filters.locations.length === 0 || filters.locations.includes(job.location);
    const matchesType = filters.types.length === 0 || filters.types.includes(job.type);
    const matchesSearch =
      !filters.searchQuery ||
      job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesDepartment && matchesLocation && matchesType && matchesSearch;
  });

  return {
    data: filteredJobs,
    isLoading,
    error,
  };
}

export function useJobFilters(jobs: Job[] | undefined) {
  if (!jobs) {
    return {
      departments: [],
      locations: [],
      types: [],
    };
  }

  const departments = Array.from(new Set(jobs.map((job) => job.department)));
  const locations = Array.from(new Set(jobs.map((job) => job.location)));
  const types = Array.from(new Set(jobs.map((job) => job.type)));

  return {
    departments,
    locations,
    types,
  };
}

export async function fetchJobBySlug(slug: string) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Job;
}

export function useJobBySlug(slug: string) {
  return useQuery({
    queryKey: ['job', slug],
    queryFn: () => fetchJobBySlug(slug),
  });
}

// Keeping this for backward compatibility during transition
export function useJobById(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error('Failed to fetch job');
      }

      return data as Job;
    },
  });
} 