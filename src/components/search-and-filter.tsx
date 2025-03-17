import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

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
}

export function SearchAndFilter({
  placeholder = "Search...",
  filters = [],
  onSearch,
  onFilter
}: SearchAndFilterProps) {
  const [query, setQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  
  const handleSearch = () => {
    onSearch?.(query)
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }
  
  const handleFilterChange = (id: string, value: string) => {
    const newFilters = { ...activeFilters, [id]: value }
    setActiveFilters(newFilters)
    onFilter?.(newFilters)
  }
  
  const clearFilters = () => {
    setActiveFilters({})
    onFilter?.({})
  }
  
  const hasActiveFilters = Object.keys(activeFilters).length > 0
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={handleSearch}
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
                <SelectTrigger className="w-[180px]">
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
                onClick={clearFilters}
                title="Clear filters"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
      
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          {Object.entries(activeFilters).map(([id, value]) => {
            if (value === "all") return null
            const filter = filters.find(f => f.id === id)
            const option = filter?.options.find(o => o.value === value)
            if (!filter || !option) return null
            
            return (
              <div key={id} className="bg-muted px-2 py-1 rounded-md flex items-center gap-1">
                <span>{filter.label}: {option.label}</span>
                <button
                  onClick={() => handleFilterChange(id, "all")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove filter</span>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
} 