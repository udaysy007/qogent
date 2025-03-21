export interface Job {
  id: string
  slug: string
  title: string
  department: string
  location: string
  type: string
  description: string
  responsibilities: string[]
  requirements: string[]
  nice_to_have: string[]
  posted_date: string
  application_url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type JobFilters = {
  department?: string
  location?: string
  type?: string
}

export type JobSortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc' 