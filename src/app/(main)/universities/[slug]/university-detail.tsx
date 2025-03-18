'use client'

import Link from 'next/link'
import { MapPin, Calendar, Award, School, ExternalLink, GraduationCap, BookOpen, Globe, Building, Clock, FileText, Banknote, Info, Users, MessageSquare } from 'lucide-react'
import { University, UniversityProgram, AdmissionRequirement, Scholarship } from '@/types/university'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Blockquote } from '@/components/ui/blockquote'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { UniversityOverview } from './university-overview'
import { UniversityPrograms } from './university-programs'
import { UniversityAdmissions } from './university-admissions'
import { UniversityCosts } from './university-costs'
import { UniversityLifestyle } from './university-lifestyle'
import { UniversityFAQ } from './university-faq'
import { getUniversityCampusUrl } from '@/lib/supabase-storage'
import { getUniversityCampus } from '@/lib/image-helpers'
import { HeroImage } from '@/components/shared/optimized-image'

interface UniversityDetailProps {
  university: University
}

export function UniversityDetail({ university }: UniversityDetailProps) {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Function to generate a meaningful abbreviation
  const getUniversityAbbreviation = (name: string): string => {
    // Special cases
    if (name === 'Trinity College Dublin') return 'TCD'
    if (name === 'Technical University of Munich') return 'TUM'
    if (name === 'Humboldt University of Berlin') return 'HUB'
    if (name === 'University of British Columbia') return 'UBC'
    if (name === 'University of Toronto') return 'UTO'
    if (name === 'Heidelberg University') return 'HDU'
    
    // Generic cases
    if (name.startsWith('University of')) {
      const parts = name.replace('University of ', '').split(' ')
      if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase()
      return parts.map(part => part[0]).join('').toUpperCase()
    }
    
    // For other cases, take first letter of significant words
    const words = name.split(' ').filter(word => 
      !['of', 'the', 'and', '&', 'for', 'in'].includes(word.toLowerCase())
    )
    
    return words.slice(0, Math.min(3, words.length))
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }
  
  // Get university campus image URL with fallback
  const campusImageUrl = university.image || getUniversityCampus(university.slug)
  
  // Fallback campus image
  const fallbackCampusImage = "/images/placeholders/hero-placeholder.jpg"

  const abbr = getUniversityAbbreviation(university.name)
  // Use a consistent placeholder URL for logo
  const logoUrl = `https://placehold.co/400x400/2563eb/ffffff/png?text=${abbr}`
  
  return (
    <div className="university-detail w-full max-w-7xl mx-auto px-4 py-8 md:px-6 lg:py-12">
      {/* University header with hero image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-xl overflow-hidden">
        <HeroImage
          src={campusImageUrl}
          alt={`${university.name} campus`}
          fallbackSrc={fallbackCampusImage}
          priority
          className="rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20 flex flex-col justify-end p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white">{university.name}</h1>
          <div className="flex items-center text-white/80">
            <span className="text-sm md:text-base">{university.location}, {university.countryName}</span>
          </div>
        </div>
      </div>

      {/* University content tabs */}
      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 md:grid-cols-6 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="admissions">Admissions</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <UniversityOverview university={university} />
        </TabsContent>
        
        <TabsContent value="programs">
          <UniversityPrograms programs={university.featuredPrograms} />
        </TabsContent>
        
        <TabsContent value="admissions">
          <UniversityAdmissions admissionRequirements={university.admissionRequirements} />
        </TabsContent>
        
        <TabsContent value="costs">
          <UniversityCosts costs={university.costs} scholarships={university.scholarships} />
        </TabsContent>
        
        <TabsContent value="lifestyle">
          <UniversityLifestyle studentLife={university.studentLife} />
        </TabsContent>
        
        <TabsContent value="faq">
          <UniversityFAQ faq={university.faq} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Program Card Component
function ProgramCard({ program }: { program: UniversityProgram }) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all",
      program.isPopular ? "border-primary/30" : ""
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{program.name}</CardTitle>
            <CardDescription>
              {program.degree} • {program.field}
            </CardDescription>
          </div>
          {program.isPopular && (
            <Badge variant="default">Popular</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="text-sm space-y-4">
        <p className="text-muted-foreground">{program.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Language:</p>
            <p className="font-medium">{program.language}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Duration:</p>
            <p className="font-medium">{program.duration}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Tuition Fee:</p>
            <p className="font-medium">{program.tuitionFee}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Application Deadlines:</p>
            <p className="font-medium">{program.applicationDeadlines}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Program Details
        </Button>
      </CardFooter>
    </Card>
  )
}

// Requirement Card Component
function RequirementCard({ requirement }: { requirement: AdmissionRequirement }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {requirement.type === 'Academic' && <BookOpen className="h-5 w-5 text-primary" />}
          {requirement.type === 'Language' && <Globe className="h-5 w-5 text-primary" />}
          {requirement.type === 'Documents' && <FileText className="h-5 w-5 text-primary" />}
          {requirement.type === 'Other' && <Info className="h-5 w-5 text-primary" />}
          {requirement.type} Requirements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{requirement.description}</p>
        
        {requirement.qogentInsight && (
          <div className="mt-4 bg-blue-light dark:bg-blue-primary/10 p-3 rounded-md">
            <div className="flex gap-2">
              <MessageSquare className="h-4 w-4 text-blue-primary mt-1 flex-shrink-0" />
              <p className="text-sm text-blue-dark dark:text-blue-light">
                <span className="font-medium">Qogent Insight:</span> {requirement.qogentInsight}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Scholarship Card Component
function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{scholarship.name}</CardTitle>
            <CardDescription>
              Provider: {scholarship.provider}
            </CardDescription>
          </div>
          <Badge variant="outline">{scholarship.amount}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{scholarship.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-xs text-muted-foreground mb-1">Eligibility:</p>
            <p>{scholarship.eligibility}</p>
          </div>
          <div>
            <p className="font-medium text-xs text-muted-foreground mb-1">Application Process:</p>
            <p>{scholarship.applicationProcess}</p>
          </div>
          <div>
            <p className="font-medium text-xs text-muted-foreground mb-1">Deadline:</p>
            <p>{scholarship.deadline}</p>
          </div>
          {scholarship.successRate && (
            <div>
              <p className="font-medium text-xs text-muted-foreground mb-1">Success Rate:</p>
              <p>{scholarship.successRate}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 