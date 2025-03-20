'use client'

import { useState, useMemo } from 'react'
import { University, UniversityProgram } from '@/types/university'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  Filter, 
  Clock, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  Globe,
  ChevronDown,
  Grid,
  List
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils'

interface UniversityProgramsProps {
  university: University
  onProgramSelect?: (program: UniversityProgram) => void
}

export function UniversityPrograms({ 
  university,
  onProgramSelect
}: UniversityProgramsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDegree, setSelectedDegree] = useState<string>('all')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Extract unique degrees and languages from programs
  const degrees = useMemo(() => {
    const uniqueDegrees = Array.from(
      new Set(university.featuredPrograms.map(program => program.degree))
    )
    return uniqueDegrees
  }, [university.featuredPrograms])
  
  const languages = useMemo(() => {
    const uniqueLanguages = Array.from(
      new Set(university.featuredPrograms.map(program => program.language))
    )
    return uniqueLanguages
  }, [university.featuredPrograms])
  
  // Filter programs based on search and filters
  const filteredPrograms = useMemo(() => {
    return university.featuredPrograms.filter(program => {
      // Search query filter
      const matchesSearch = 
        searchQuery === '' || 
        program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.field.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Degree filter
      const matchesDegree = 
        selectedDegree === 'all' || 
        program.degree === selectedDegree
      
      // Language filter
      const matchesLanguage = 
        selectedLanguage === 'all' || 
        program.language === selectedLanguage
      
      return matchesSearch && matchesDegree && matchesLanguage
    })
  }, [university.featuredPrograms, searchQuery, selectedDegree, selectedLanguage])

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('')
    setSelectedDegree('all')
    setSelectedLanguage('all')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Programs at {university.name}</h2>
        <p className="text-muted-foreground">
          Explore {university.featuredPrograms.length} academic programs offered by {university.name}
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search programs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              className="h-9 w-9 rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              className="h-9 w-9 rounded-l-none border-l-0"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>

          <Select
            value={selectedDegree}
            onValueChange={setSelectedDegree}
          >
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Degrees</SelectItem>
              {degrees.map((degree) => (
                <SelectItem key={degree} value={degree}>
                  {degree}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
          >
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(searchQuery || selectedDegree !== 'all' || selectedLanguage !== 'all') && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={resetFilters}
              className="h-9"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredPrograms.length} of {university.featuredPrograms.length} programs
      </div>

      {/* Programs grid/list */}
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
          : "flex flex-col gap-4"
      )}>
        {filteredPrograms.map((program) => (
          viewMode === 'grid' 
            ? <ProgramCard 
                key={program.id} 
                program={program} 
                onSelect={onProgramSelect}
              />
            : <ProgramListItem 
                key={program.id} 
                program={program} 
                onSelect={onProgramSelect}
              />
        ))}
      </div>

      {/* No results */}
      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No programs match your search criteria</p>
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}

interface ProgramCardProps {
  program: UniversityProgram
  onSelect?: (program: UniversityProgram) => void
}

function ProgramCard({ program, onSelect }: ProgramCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:border-primary/50 transition-colors">
      <CardContent className="pt-6 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="bg-primary/5">
            {program.degree}
          </Badge>
          {program.isPopular && (
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Popular
            </Badge>
          )}
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{program.name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {program.duration}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            {program.language}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {program.description}
        </p>
        
        <div className="mt-auto space-y-2">
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 mt-0.5 text-primary" />
            <div>
              <p className="text-xs font-medium">Application Deadline</p>
              <p className="text-xs text-muted-foreground">{program.applicationDeadlines}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <GraduationCap className="h-4 w-4 mt-0.5 text-primary" />
            <div>
              <p className="text-xs font-medium">Tuition Fees</p>
              <p className="text-xs text-muted-foreground">{program.tuitionFee}</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4 bg-muted/30">
        <Button 
          className="w-full"
          onClick={() => onSelect && onSelect(program)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

function ProgramListItem({ program, onSelect }: ProgramCardProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={program.id.toString()} className="border rounded-lg overflow-hidden">
        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-left">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/5">
                {program.degree}
              </Badge>
              {program.isPopular && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  Popular
                </Badge>
              )}
            </div>
            
            <h3 className="font-semibold">{program.name}</h3>
            
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {program.duration}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {program.language}
              </Badge>
            </div>
          </div>
        </AccordionTrigger>
        
        <AccordionContent className="px-4 pb-4">
          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-4">
              {program.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <p className="text-xs font-medium">Application Deadline</p>
                  <p className="text-xs text-muted-foreground">{program.applicationDeadlines}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <GraduationCap className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <p className="text-xs font-medium">Tuition Fees</p>
                  <p className="text-xs text-muted-foreground">{program.tuitionFee}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <p className="text-xs font-medium">Field of Study</p>
                  <p className="text-xs text-muted-foreground">{program.field}</p>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full sm:w-auto"
              onClick={() => onSelect && onSelect(program)}
            >
              View Details
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
} 