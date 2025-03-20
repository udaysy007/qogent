'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { useUniversity } from '@/hooks/use-universities'
import { University, UniversityProgram } from '@/types/university'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { UniversityHero } from './components/university-hero'
import { ContentTabs } from './components/content-tabs'
import { QuickOverviewPanel } from './components/quick-overview-panel'
import { UniversityOverview } from './components/university-overview'
import { UniversityPrograms } from './components/university-programs'
import { UniversityAdmissions } from './components/university-admissions'
import { UniversityCosts } from './components/university-costs'
import { UniversityStudentLife } from './components/university-student-life'
import { UniversityFAQ } from './components/university-faq'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function UniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [activeProgram, setActiveProgram] = useState<UniversityProgram | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Use React.use() to unwrap params
  const { slug } = React.use(params)
  
  // Use the hook to fetch university data
  const { data: university, isLoading } = useUniversity(slug)

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Loading state
  if (isLoading || !isClient) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // 404 if university not found
  if (!university) {
    notFound()
  }

  // Handle program selection
  const handleProgramSelect = (program: UniversityProgram) => {
    setActiveProgram(program)
    setActiveTab('programs')
  }

  return (
    <main className="min-h-screen pb-16">
      {/* Hero section */}
      <UniversityHero university={university} />

      {/* Tab navigation */}
      <ContentTabs 
        activeTab={activeTab} 
        onChange={setActiveTab} 
      />

      {/* Main content */}
      <div className="container max-w-7xl px-4 mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-8">
          {/* Main content area */}
          <div>
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="overview" className="mt-0">
                <UniversityOverview university={university} />
              </TabsContent>
              
              <TabsContent value="programs" className="mt-0">
                <UniversityPrograms 
                  university={university} 
                  onProgramSelect={handleProgramSelect}
                />
              </TabsContent>
              
              <TabsContent value="admissions" className="mt-0">
                <UniversityAdmissions university={university} />
              </TabsContent>
              
              <TabsContent value="costs" className="mt-0">
                <UniversityCosts university={university} />
              </TabsContent>
              
              <TabsContent value="student-life" className="mt-0">
                <UniversityStudentLife university={university} />
              </TabsContent>
              
              <TabsContent value="faq" className="mt-0">
                <UniversityFAQ university={university} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <aside className="order-first lg:order-last">
            <QuickOverviewPanel 
              university={university} 
              activeProgram={activeProgram}
            />
          </aside>
        </div>
      </div>
    </main>
  )
} 