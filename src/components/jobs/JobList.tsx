'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { JobCard } from './JobCard'
import { JobFilters } from './JobFilters'
import { useJobs } from '@/hooks/use-jobs'
import { JobFilters as JobFiltersType, JobSortOption } from '@/types/job'

interface FilterOption {
  value: string
  label: string
}

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' },
]

export function JobList() {
  const [filters, setFilters] = useState<JobFiltersType>({})
  const [sort, setSort] = useState<JobSortOption>('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const { data: jobs, isLoading, error } = useJobs(filters, sort)

  // Filter jobs based on search query
  const filteredJobs = jobs?.filter(job => {
    if (!searchQuery) return true
    const searchLower = searchQuery.toLowerCase()
    return (
      job.title.toLowerCase().includes(searchLower) ||
      job.department.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower)
    )
  })

  // Extract unique values for filters from filtered jobs
  const departments = Array.from(new Set(filteredJobs?.map((job) => job.department) ?? [])).map(
    (dept) => ({ value: dept, label: dept })
  )
  const locations = Array.from(new Set(filteredJobs?.map((job) => job.location) ?? [])).map(
    (loc) => ({ value: loc, label: loc })
  )
  const types = Array.from(new Set(filteredJobs?.map((job) => job.type) ?? [])).map(
    (type) => ({ value: type, label: type })
  )

  if (error) {
    return (
      <div className="text-center text-destructive">
        Failed to load jobs. Please try again later.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <JobFilters
          departments={departments}
          locations={locations}
          types={types}
          filters={filters}
          onFilterChange={setFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <div className="flex justify-end">
          <Select value={sort} onValueChange={(value) => setSort(value as JobSortOption)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] animate-pulse rounded-lg border bg-muted"
            />
          ))}
        </div>
      ) : filteredJobs?.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No jobs found. Try adjusting your filters or search query.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
} 