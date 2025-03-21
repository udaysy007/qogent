'use client'

import { useCallback } from 'react'
import { Check, ChevronsUpDown, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { JobFilters as JobFiltersType } from '@/types/job'

interface FilterOption {
  value: string
  label: string
}

interface JobFiltersProps {
  departments: FilterOption[]
  locations: FilterOption[]
  types: FilterOption[]
  filters: JobFiltersType
  onFilterChange: (filters: JobFiltersType) => void
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export function JobFilters({
  departments = [],
  locations = [],
  types = [],
  filters,
  onFilterChange,
  searchQuery = '',
  onSearchChange,
}: JobFiltersProps) {
  const handleFilterChange = useCallback(
    (key: keyof JobFiltersType, value: string | undefined) => {
      onFilterChange({
        ...filters,
        [key]: value,
      })
    },
    [filters, onFilterChange]
  )

  const handleClearFilters = useCallback(() => {
    onFilterChange({})
    if (onSearchChange) {
      onSearchChange('')
    }
  }, [onFilterChange, onSearchChange])

  const hasActiveFilters = Object.values(filters).some(Boolean) || searchQuery

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-9"
          />
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-10 px-3"
          >
            Clear
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <FilterSelect
          options={departments}
          value={filters.department}
          onChange={(value) => handleFilterChange('department', value)}
          placeholder="Department"
        />
        <FilterSelect
          options={locations}
          value={filters.location}
          onChange={(value) => handleFilterChange('location', value)}
          placeholder="Location"
        />
        <FilterSelect
          options={types}
          value={filters.type}
          onChange={(value) => handleFilterChange('type', value)}
          placeholder="Job Type"
        />
      </div>
    </div>
  )
}

interface FilterSelectProps {
  options: FilterOption[]
  value?: string
  onChange: (value: string | undefined) => void
  placeholder: string
}

function FilterSelect({ options = [], value, onChange, placeholder }: FilterSelectProps) {
  const selected = options.find((option) => option.value === value)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between md:w-[200px]"
        >
          {selected?.label ?? placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 md:w-[200px]">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="all"
                onSelect={() => onChange(undefined)}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    !value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                All {placeholder}s
              </CommandItem>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => onChange(option.value)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 