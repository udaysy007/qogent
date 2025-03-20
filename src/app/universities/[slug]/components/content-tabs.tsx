'use client'

import { useState, useEffect, useRef } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Info, 
  GraduationCap, 
  FileText, 
  DollarSign, 
  Users, 
  HelpCircle 
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContentTabsProps {
  activeTab: string
  onChange: (value: string) => void
}

export function ContentTabs({
  activeTab,
  onChange
}: ContentTabsProps) {
  const [isSticky, setIsSticky] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)
  const prevScrollY = useRef(0)
  const [hideOnScroll, setHideOnScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Make tabs sticky after hero section (60vh)
      const shouldBeSticky = currentScrollY > window.innerHeight * 0.6 - 80

      // Hide on scroll down, show on scroll up logic
      if (currentScrollY > prevScrollY.current && currentScrollY > window.innerHeight * 0.6) {
        setHideOnScroll(true)
      } else {
        setHideOnScroll(false)
      }
      
      prevScrollY.current = currentScrollY
      setIsSticky(shouldBeSticky)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const tabs = [
    { value: 'overview', label: 'Overview', icon: <Info className="h-4 w-4" /> },
    { value: 'programs', label: 'Programs', icon: <GraduationCap className="h-4 w-4" /> },
    { value: 'admissions', label: 'Admissions', icon: <FileText className="h-4 w-4" /> },
    { value: 'costs', label: 'Costs', icon: <DollarSign className="h-4 w-4" /> },
    { value: 'student-life', label: 'Student Life', icon: <Users className="h-4 w-4" /> },
    { value: 'faq', label: 'FAQ', icon: <HelpCircle className="h-4 w-4" /> },
  ]

  return (
    <div 
      ref={tabsRef}
      className={cn(
        "w-full bg-background/80 backdrop-blur-md z-40 transition-all duration-300 border-b",
        isSticky ? "sticky top-0 shadow-sm" : "",
        hideOnScroll && isSticky ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="container max-w-7xl px-4 mx-auto">
        <Tabs 
          value={activeTab} 
          onValueChange={onChange} 
          className="w-full"
        >
          <TabsList 
            className={cn(
              "h-16 w-full justify-start overflow-x-auto overflow-y-hidden scrollbar-hide",
              "h-14 pb-0"
            )}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 h-12",
                  "transition-all duration-300 rounded-none border-b-2 border-transparent",
                  "data-[state=active]:border-primary data-[state=active]:text-primary",
                  "hover:bg-accent/5"
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
} 