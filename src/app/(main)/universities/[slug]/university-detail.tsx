'use client'

import Image from 'next/image'
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

interface UniversityDetailProps {
  university: University
}

export function UniversityDetail({ university }: UniversityDetailProps) {
  const [activeTab, setActiveTab] = useState('overview')
  
  return (
    <div className="py-12">
      <Container>
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-12">
          {university.image ? (
            <div className="relative w-full h-80">
              <Image
                src={university.image}
                alt={university.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/20"></div>
            </div>
          ) : (
            <div className="w-full h-80 bg-primary/10 flex items-center justify-center">
              <School className="h-24 w-24 text-primary/30" />
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              {university.logo ? (
                <div className="relative w-16 h-16 bg-white rounded-md p-2 shadow-md">
                  <Image
                    src={university.logo}
                    alt={`${university.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center shadow-md">
                  <School className="h-10 w-10 text-primary" />
                </div>
              )}
              
              <div>
                <Badge variant="outline" className="bg-white/90 mb-2">
                  {university.isPublic ? 'Public University' : 'Private University'}
                </Badge>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                  {university.name}
                </h1>
                <div className="flex items-center text-gray-200 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{university.location}, {university.countryName}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              {university.ranking?.qs && (
                <Badge variant="secondary" className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5" />
                  QS Rank: {university.ranking.qs}
                </Badge>
              )}
              {university.ranking?.the && (
                <Badge variant="secondary" className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5" />
                  THE Rank: {university.ranking.the}
                </Badge>
              )}
              <Badge variant="secondary" className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Founded: {university.foundingYear}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {university.studentPopulation.toLocaleString()} Students
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                {university.internationalStudentPercentage}% International
              </Badge>
              <a href={university.website} target="_blank" rel="noopener noreferrer">
                <Badge variant="outline" className="bg-white/90 text-primary flex items-center gap-1.5">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Visit Website
                </Badge>
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="overview" className="flex items-center gap-1.5">
                  <Info className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="programs" className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  Programs
                </TabsTrigger>
                <TabsTrigger value="admission" className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  Admission
                </TabsTrigger>
                <TabsTrigger value="costs" className="flex items-center gap-1.5">
                  <Banknote className="h-4 w-4" />
                  Costs
                </TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About {university.name}</h2>
                  <p className="text-muted-foreground">{university.description}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Popular Fields of Study</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(university.featuredPrograms.map(p => p.field))).map((field, i) => (
                      <Badge key={i} variant="secondary" className="text-sm py-1">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Student Life</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Building className="h-5 w-5 text-primary" />
                          Housing
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{university.studentLife.housing}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          Campus Life
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">{university.studentLife.clubs}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {university.studentLife.campusFacilities.slice(0, 4).map((facility, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {facility}
                            </Badge>
                          ))}
                          {university.studentLife.campusFacilities.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{university.studentLife.campusFacilities.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Programs Tab */}
              <TabsContent value="programs" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Featured Programs</h2>
                  <p className="text-muted-foreground mb-6">
                    Below are some of the most popular programs for international students at {university.name}.
                    This is not a complete list of all available programs.
                  </p>
                  
                  <div className="space-y-6">
                    {university.featuredPrograms.map(program => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Admission Tab */}
              <TabsContent value="admission" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Admission Requirements</h2>
                  <p className="text-muted-foreground mb-6">
                    Below are the admission requirements for {university.name}. These requirements
                    may vary by program, so always check the specific program page for detailed information.
                  </p>
                  
                  <div className="space-y-6">
                    {university.admissionRequirements.map(req => (
                      <RequirementCard key={req.id} requirement={req} />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Qogent Insights</h3>
                  <Card className="bg-blue-light dark:bg-blue-primary/10 border-blue-primary/30">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-primary" />
                        Insider Tips for Admission Success
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {university.admissionRequirements
                          .filter(req => req.qogentInsight)
                          .map((req, index) => (
                            <li key={index} className="flex gap-2">
                              <span className="text-blue-primary font-bold mt-1">•</span>
                              <p className="text-muted-foreground">{req.qogentInsight}</p>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Costs Tab */}
              <TabsContent value="costs" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Tuition & Costs</h2>
                  <p className="text-muted-foreground mb-6">
                    Below is a breakdown of the costs associated with studying at {university.name}.
                    These costs are estimates and may vary depending on your specific situation.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Tuition Fees</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Domestic Students:</p>
                            <p className="font-bold">{university.costs.tuitionDomestic}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">International Students:</p>
                            <p className="font-bold">{university.costs.tuitionInternational}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Additional Fees</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Application Fee:</p>
                            <p className="font-bold">{university.costs.applicationFee || 'None'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Other Fees:</p>
                            <p className="font-bold">{university.costs.otherFees || 'None'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Health Insurance:</p>
                            <p className="font-bold">{university.costs.healthInsurance}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Living Expenses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Accommodation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-bold">{university.costs.livingExpenses.accommodation}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Food</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-bold">{university.costs.livingExpenses.food}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Transportation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-bold">{university.costs.livingExpenses.transportation}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Other Expenses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-bold">{university.costs.livingExpenses.other}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {university.scholarships.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Available Scholarships</h3>
                    <div className="space-y-6">
                      {university.scholarships.map(scholarship => (
                        <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* FAQ */}
            {university.faq.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {university.faq.map((item, i) => (
                    <div key={i}>
                      <h4 className="font-medium mb-1">{item.question}</h4>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                      {i < university.faq.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ask a Question
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </Container>
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