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
        overflow-hidden border shadow-md bg-card/50 backdrop-blur-sm
        ${isMobile ? 'mx-auto max-w-md' : ''}
      `}>
        {/* Heading - always visible */}
        <div 
          className="bg-primary/5 p-3 border-b flex justify-between items-center cursor-pointer"
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
        <div className={`p-4 flex flex-col gap-4 ${isMobile && isCollapsed ? 'hidden' : ''}`}>
          {/* Application deadline countdown */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-l-2 border-primary pl-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Application Deadline</h4>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 hover:bg-primary/10 transition-colors">
              <p className="font-semibold text-sm mb-0.5">Next Deadline</p>
              <p className="text-sm text-muted-foreground">{getNextDeadline()}</p>
            </div>
          </div>

          {/* Tuition fees */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-l-2 border-primary pl-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Tuition Fees (Annual)</h4>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-primary/5 rounded-lg p-3 hover:bg-primary/10 transition-colors">
                <p className="font-semibold text-sm mb-0.5">International Students</p>
                <p className="text-sm text-muted-foreground">{university.costs.tuitionInternational}</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-3 hover:bg-primary/10 transition-colors">
                <p className="font-semibold text-sm mb-0.5">Domestic Students</p>
                <p className="text-sm text-muted-foreground">{university.costs.tuitionDomestic}</p>
              </div>
            </div>
          </div>

          {/* Language requirements */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-l-2 border-primary pl-2">
              <Globe className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Language Requirements</h4>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 hover:bg-primary/10 transition-colors">
              {university.admissionRequirements
                .filter(req => req.type === 'Language')
                .map((req, index) => (
                  <div key={index} className="mb-2 last:mb-0">
                    <p className="text-sm text-muted-foreground">{req.description}</p>
                    {req.qogentInsight && (
                      <p className="text-sm italic mt-1.5 text-primary/90 bg-primary/5 p-1.5 rounded">{req.qogentInsight}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Popular program */}
          {displayProgram && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-l-2 border-primary pl-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium">
                  {displayProgram.isPopular ? 'Most Popular Program' : 'Featured Program'}
                </h4>
              </div>
              <div className="bg-primary/5 rounded-lg p-3 hover:bg-primary/10 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="outline" className="text-xs bg-background/50">
                    {displayProgram.degree}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-background/50">
                    {displayProgram.language}
                  </Badge>
                </div>
                <p className="font-semibold text-sm mb-1.5">{displayProgram.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{displayProgram.duration}</span>
                </div>
              </div>
            </div>
          )}

          {/* Success rate */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-l-2 border-primary pl-2">
              <Award className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Qogent Success Rate</h4>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 hover:bg-primary/10 transition-colors">
              <p className="font-semibold text-sm mb-0.5">{university.qogentMetrics.admissionSuccessRate}</p>
              <p className="text-sm text-muted-foreground">
                {university.qogentMetrics.studentsPlaced} students placed
              </p>
            </div>
          </div>

          {/* Apply now button */}
          <Button size="default" className="w-full mt-1 font-medium text-sm">
            Apply Now
          </Button>
        </div>
      </Card>
      
      {/* Toggle button for mobile */}
      {isMobile && isSticky && <CollapseToggle />}
    </div>
  )
} 