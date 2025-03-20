import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterOption {
  id: string
  label: string
  options: {
    value: string
    label: string
  }[]
}

interface SearchAndFilterProps {
  placeholder?: string
  filters?: FilterOption[]
  onSearch?: (query: string) => void
  onFilter?: (filters: Record<string, string>) => void
  className?: string
}

export function SearchAndFilter({
  placeholder = "Search...",
  filters = [],
  onSearch,
  onFilter,
  className
}: SearchAndFilterProps) {
  const [query, setQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  
  // Apply search in real-time as user types
  useEffect(() => {
    // Debounce search to avoid too many updates while typing
    const timeoutId = setTimeout(() => {
      onSearch?.(query)
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [query, onSearch])
  
  const handleClearSearch = () => {
    setQuery("")
    onSearch?.("")
  }
  
  const handleFilterChange = (id: string, value: string) => {
    const newFilters = { ...activeFilters, [id]: value }
    if (value === "all") {
      delete newFilters[id]
    }
    setActiveFilters(newFilters)
    onFilter?.(newFilters)
  }
  
  const clearFilters = () => {
    setActiveFilters({})
    onFilter?.({})
  }
  
  const hasActiveFilters = Object.keys(activeFilters).length > 0
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-20 rounded-full border-muted-foreground/20"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-10 top-0 h-full hover:bg-transparent"
              onClick={handleClearSearch}
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full hover:bg-transparent"
            title="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        {filters.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <Select
                key={filter.id}
                value={activeFilters[filter.id] || "all"}
                onValueChange={(value) => handleFilterChange(filter.id, value)}
              >
                <SelectTrigger className="w-[180px] rounded-full border-muted-foreground/20">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {filter.label}</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
            
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-muted-foreground/20"
                onClick={clearFilters}
                title="Clear filters"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 