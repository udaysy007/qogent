'use client'

import { useState, useEffect } from 'react'
import { University, UniversityProgram } from '@/types/university'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CalendarClock, 
  GraduationCap, 
  Globe, 
  BookOpen, 
  Clock, 
  Award, 
  PanelRightOpen
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

interface QuickOverviewPanelProps {
  university: University
  activeProgram?: UniversityProgram | null
}

export function QuickOverviewPanel({ 
  university, 
  activeProgram 
}: QuickOverviewPanelProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)

  // Get the most popular program or first program
  const popularProgram = university.featuredPrograms.find(p => p.isPopular) || 
    university.featuredPrograms[0]

  // Deadline calculation (for future implementation)
  const getNextDeadline = () => {
    // For demo purposes, create a deadline 3 months from now
    const deadline = new Date()
    deadline.setMonth(deadline.getMonth() + 3)
    
    // Format the date as Month Day, Year
    return deadline.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const displayProgram = activeProgram || popularProgram

  useEffect(() => {
    const handleScroll = () => {
      // Set sticky when scrolled past the hero section (approx 60vh)
      setIsSticky(window.scrollY > window.innerHeight * 0.6)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      // Auto-collapse on mobile
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
      }
    }

    handleResize() // Initial check
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Mobile collapse toggle button
  const CollapseToggle = () => (
    <Button 
      variant="outline" 
      size="sm" 
      className="absolute -left-10 top-4 lg:hidden"
      onClick={() => setIsCollapsed(!isCollapsed)}
      aria-label={isCollapsed ? "Expand quick overview" : "Collapse quick overview"}
    >
      <PanelRightOpen className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
    </Button>
  )

  return (
    <div 
      className={`
        relative z-30 w-full lg:w-72 transition-all duration-300
        ${isSticky ? 'lg:sticky lg:top-24' : ''}
        ${isCollapsed && isMobile ? 'h-14 overflow-hidden' : ''}
      `}
    >
      <Card className={`
        overflow-hidden border shadow-md
        ${isMobile ? 'mx-auto max-w-md' : ''}
      `}>
        {/* Heading - always visible */}
        <div 
          className="bg-primary/5 p-4 border-b flex justify-between items-center cursor-pointer"
          onClick={() => isMobile && setIsCollapsed(!isCollapsed)}
        >
          <h3 className="font-semibold text-sm">Quick Overview</h3>
          {isMobile && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <PanelRightOpen className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
            </Button>
          )}
        </div>

        {/* Collapsible content */}
        <div className={`p-4 flex flex-col gap-5 ${isMobile && isCollapsed ? 'hidden' : ''}`}>
          {/* Application deadline countdown */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              <h4 className="text-xs font-medium">Application Deadline</h4>
            </div>
            <div className="bg-primary/5 rounded-md p-3">
              <p className="text-sm font-semibold mb-1">Next Deadline</p>
              <p className="text-xs text-muted-foreground">{getNextDeadline()}</p>
            </div>
          </div>

          {/* Tuition fees */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <h4 className="text-xs font-medium">Tuition Fees (Annual)</h4>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-primary/5 rounded-md p-3">
                <p className="text-sm font-semibold mb-1">International Students</p>
                <p className="text-xs text-muted-foreground">{university.costs.tuitionInternational}</p>
              </div>
              <div className="bg-primary/5 rounded-md p-3">
                <p className="text-sm font-semibold mb-1">Domestic Students</p>
                <p className="text-xs text-muted-foreground">{university.costs.tuitionDomestic}</p>
              </div>
            </div>
          </div>

          {/* Language requirements */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <h4 className="text-xs font-medium">Language Requirements</h4>
            </div>
            <div className="bg-primary/5 rounded-md p-3">
              {university.admissionRequirements
                .filter(req => req.type === 'Language')
                .map((req, index) => (
                  <div key={index} className="mb-2 last:mb-0">
                    <p className="text-xs text-muted-foreground">{req.description}</p>
                    {req.qogentInsight && (
                      <p className="text-xs italic mt-1 text-primary">{req.qogentInsight}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Popular program */}
          {displayProgram && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <h4 className="text-xs font-medium">
                  {displayProgram.isPopular ? 'Most Popular Program' : 'Featured Program'}
                </h4>
              </div>
              <div className="bg-primary/5 rounded-md p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {displayProgram.degree}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {displayProgram.language}
                  </Badge>
                </div>
                <p className="text-sm font-semibold mb-1">{displayProgram.name}</p>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{displayProgram.duration}</span>
                </div>
              </div>
            </div>
          )}

          {/* Success rate */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <h4 className="text-xs font-medium">Qogent Success Rate</h4>
            </div>
            <div className="bg-primary/5 rounded-md p-3">
              <p className="text-sm font-semibold mb-1">{university.qogentMetrics.admissionSuccessRate}</p>
              <p className="text-xs text-muted-foreground">
                {university.qogentMetrics.studentsPlaced} students placed
              </p>
            </div>
          </div>

          {/* Apply now button */}
          <Button className="w-full mt-2">Apply Now</Button>
        </div>
      </Card>
      
      {/* Toggle button for mobile */}
      {isMobile && isSticky && <CollapseToggle />}
    </div>
  )
} 