"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { ArrowRight, Check, Globe, GraduationCap, Building, Landmark, Wallet, MapPin, Book, Users, Calendar, Sparkles, Star, HelpCircle, Home, ClipboardCheck, MessageCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Grid } from "@/components/ui/grid"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UniversityCard } from "@/components/cards/university-card"
import { CallToAction } from "@/components/call-to-action"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { useCountry } from "@/hooks/use-countries"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useUniversityCards } from "@/hooks/use-universities"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Database } from '@/types/supabase'
import { UniversityCard as UniversityCardType } from '@/types/university'
import { useState, useEffect, Suspense } from "react"
import LoadingDestination from "./loading"

// Country type from Supabase
type Country = Database['public']['Tables']['countries']['Row'];

export default function DestinationPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  // Fetch country data
  const { data: destination, isLoading, isError } = useCountry(slug)

  // Show error only if we have an explicit error and we're not loading
  if (isError && !isLoading) {
    return (
      <Section>
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <Heading level={1}>Destination Not Found</Heading>
            <Paragraph size="lg" className="mt-4 mb-8">
              We couldn't find information about this destination.
            </Paragraph>
            <Button asChild>
              <Link href="/destinations">
                Browse All Destinations
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    )
  }

  // If we're loading or don't have data yet, show loading skeleton
  if (isLoading || !destination) {
    return <LoadingDestination />
  }

  // Get country flag emoji
  const countryFlagEmojis: Record<string, string> = {
    "ireland": "🇮🇪",
    "poland": "🇵🇱",
    "canada": "🇨🇦",
    "germany": "🇩🇪",
    "australia": "🇦🇺",
    "usa": "🇺🇸",
    "netherlands": "🇳🇱",
    "japan": "🇯🇵",
    "singapore": "🇸🇬",
  }
  
  const flagEmoji = countryFlagEmojis[slug] || ""
  const heroImageUrl = `/images/destinations/${slug}-hero.jpg`

  return (
    <main>
      {/* Hero Section */}
      <div id="top" className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
          <img
            className="w-full h-full object-cover"
            src={destination.heroImageUrl || `/images/destinations/${params.slug}-hero.jpg`}
            alt={`${destination.name} hero image`}
          />
        </div>
        
        {/* Hero Content */}
        <Section className="relative z-10 pt-24 pb-16">
          <Container>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Destinations", href: "/destinations" },
                { label: destination.name, href: `/destinations/${destination.slug}` },
              ]}
            />
            
            <div className="mt-8 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{flagEmoji}</span>
                <Heading level={1} className="text-foreground">Study in {destination.name}</Heading>
              </div>
              
              <Paragraph size="lg" className="text-foreground/90 mt-4">
                {destination.description}
              </Paragraph>
              
              {destination.tags && destination.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {destination.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="bg-background/80 text-foreground border-border">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="#universities">
                    Explore Universities <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="#requirements">
                    Admission Requirements
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </div>
      
      {/* Key Facts Section */}
      <Section background="muted">
        <Container>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
            {/* Left column - Key Facts */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Key Facts</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Capital</h3>
                    <p className="text-muted-foreground">{destination.capital || "Dublin"}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Population</h3>
                    <p className="text-muted-foreground">{destination.population || "5 million"}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Language</h3>
                    <p className="text-muted-foreground">{destination.language || "English"}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Wallet className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Currency</h3>
                    <p className="text-muted-foreground">{destination.currency || "Euro (€)"}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Academic Year</h3>
                    <p className="text-muted-foreground">{destination.academicYear || "September to May"}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Book className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Education System</h3>
                    <p className="text-muted-foreground">{destination.educationSystem || "European"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Statistics */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Education Statistics</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">International Students</h3>
                    <span className="text-primary font-medium">{destination.internationalStudents || "35,000+"}</span>
                  </div>
                  <div className="w-full bg-muted-foreground/20 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Universities in Global Top 500</h3>
                    <span className="text-primary font-medium">{destination.topUniversities || "8"}</span>
                  </div>
                  <div className="w-full bg-muted-foreground/20 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">English-Taught Programs</h3>
                    <span className="text-primary font-medium">{destination.englishPrograms || "1,000+"}</span>
                  </div>
                  <div className="w-full bg-muted-foreground/20 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Post-Study Work Options</h3>
                    <span className="text-primary font-medium">{destination.postStudyWork || "Up to 2 years"}</span>
                  </div>
                  <div className="w-full bg-muted-foreground/20 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Education System Section */}
      <Section id="education">
        <Container>
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="h-6 w-6 text-primary" />
            <Heading level={2}>Education System</Heading>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <Heading level={3} className="mb-4">Degree Structure</Heading>
              <div className="space-y-4">
                <div className="bg-card rounded-lg p-5 border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold">Bachelor's Degree</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {destination.bachelorInfo || "3-4 years of study, with options for honors degrees. Entry typically requires completed secondary education."}
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-5 border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold">Master's Degree</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {destination.masterInfo || "1-2 years of specialized study. Requires a completed bachelor's degree with good academic standing."}
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-5 border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold">Doctoral Degree</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {destination.phdInfo || "3-5 years of research-focused study. Requires a relevant master's degree and research proposal."}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <Heading level={3} className="mb-4">Academic Information</Heading>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Teaching Style</h4>
                  <p className="text-muted-foreground">
                    {destination.teachingStyle || "Combines lectures, tutorials, and practical sessions. Emphasis on critical thinking and independent research, especially at higher levels."}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Grading System</h4>
                  <p className="text-muted-foreground">
                    {destination.gradingSystem || "Most universities use a percentage or GPA system. First-class honors typically awarded for scores above 70%."}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Language of Instruction</h4>
                  <p className="text-muted-foreground">
                    {destination.instructionLanguage || "Primarily English, with excellent support for international students. Some programs may offer courses in the local language."}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Academic Calendar</h4>
                  <p className="text-muted-foreground">
                    {destination.academicCalendar || "Two semesters: September to December and January to May, with exams at the end of each semester."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Universities Section */}
      <Section id="universities" background="muted">
        <Container>
          <div className="flex items-center gap-2 mb-8">
            <Building className="h-6 w-6 text-primary" />
            <Heading level={2}>Top Universities</Heading>
          </div>
          
          <Paragraph className="mb-8 max-w-3xl">
            {destination.universitiesIntro || `${destination.name} is home to several world-class universities offering a wide range of programs for international students. Here are some of the top institutions to consider:`}
          </Paragraph>
          
          <UniversitiesByCountry universities={destination.universities || []} country={destination} />
          
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href={`/destinations/${destination.slug}/universities`}>
                View All Universities <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
      
      {/* Admission Requirements Section */}
      <Section id="requirements">
        <Container>
          <div className="flex items-center gap-2 mb-8">
            <Check className="h-6 w-6 text-primary" />
            <Heading level={2}>Admission Requirements</Heading>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <Heading level={3} className="mb-4">Academic Requirements</Heading>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Educational Background</h4>
                    <p className="text-muted-foreground">
                      {destination.educationalRequirements || "Completed secondary education (for bachelor's) or relevant bachelor's degree (for master's) with good academic standing."}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Transcripts & Certificates</h4>
                    <p className="text-muted-foreground">
                      {destination.transcriptRequirements || "Official academic transcripts and degree certificates, translated to English if originally in another language."}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Entrance Exams</h4>
                    <p className="text-muted-foreground">
                      {destination.entranceExams || "Some programs may require specific entrance exams or aptitude tests, especially for competitive fields like medicine."}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Heading level={3} className="mb-4">Language Requirements</Heading>
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <div className="bg-primary/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">English Proficiency</h4>
                      <p className="text-muted-foreground">
                        {destination.englishRequirements || "IELTS: 6.0-7.0 overall (depending on program), TOEFL iBT: 80-100, or equivalent qualification."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="bg-primary/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Exemptions</h4>
                      <p className="text-muted-foreground">
                        {destination.languageExemptions || "Students from English-speaking countries or who completed previous education in English may be exempt from language requirements."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Heading level={3} className="mb-4">Visa Requirements</Heading>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Student Visa</h4>
                    <p className="text-muted-foreground">
                      {destination.visaRequirements || "International students need to apply for a student visa after receiving an acceptance letter from a recognized institution."}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Financial Proof</h4>
                    <p className="text-muted-foreground">
                      {destination.financialRequirements || "Evidence of sufficient funds to cover tuition fees and living expenses for at least one academic year."}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Health Insurance</h4>
                    <p className="text-muted-foreground">
                      {destination.healthRequirements || "Comprehensive health insurance coverage is mandatory for the duration of your studies."}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Additional Documents</h4>
                    <p className="text-muted-foreground">
                      {destination.additionalDocuments || "Valid passport, passport-sized photographs, accommodation details, and a return ticket or funds for one."}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-5 bg-primary/5 rounded-lg border border-primary/10">
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <span className="text-primary text-lg">💡</span> Insider Tip
                </h4>
                <p className="text-muted-foreground">
                  {destination.visaTip || "Apply for your visa at least 8-12 weeks before your planned departure. The process can take longer during peak application seasons (June-August)."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/contact">
                Get Visa Application Support
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
      
      {/* Cost of Living Section */}
      <Section id="costs" background="muted">
        <Container>
          <div className="flex items-center gap-2 mb-8">
            <Wallet className="h-6 w-6 text-primary" />
            <Heading level={2}>Costs & Financing</Heading>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left column - Tuition Fees */}
            <div>
              <Heading level={3} className="mb-6">Tuition Fees</Heading>
              
              <div className="space-y-6">
                <div className="bg-card rounded-lg p-6 border">
                  <h4 className="text-lg font-semibold mb-4">Bachelor's Programs</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Public Universities</span>
                      <span className="font-medium">{destination.bachelorFeePublic || "€3,000 - €15,000 / year"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Private Universities</span>
                      <span className="font-medium">{destination.bachelorFeePrivate || "€10,000 - €25,000 / year"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Medical & Specialized</span>
                      <span className="font-medium">{destination.bachelorFeeMedical || "€15,000 - €35,000 / year"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-6 border">
                  <h4 className="text-lg font-semibold mb-4">Master's Programs</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Public Universities</span>
                      <span className="font-medium">{destination.masterFeePublic || "€4,000 - €20,000 / year"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Private Universities</span>
                      <span className="font-medium">{destination.masterFeePrivate || "€12,000 - €30,000 / year"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">MBA & Business</span>
                      <span className="font-medium">{destination.masterFeeBusiness || "€15,000 - €50,000 / program"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>* Fees are approximate and vary between institutions. Some programs may have different fee structures.</p>
                </div>
              </div>
            </div>
            
            {/* Right column - Living Costs */}
            <div>
              <Heading level={3} className="mb-6">Living Costs</Heading>
              
              <div className="bg-card rounded-lg p-6 border mb-6">
                <h4 className="text-lg font-semibold mb-4">Monthly Expenses (Average)</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-muted-foreground">Accommodation</span>
                      <span className="font-medium">{destination.accommodationCost || "€400 - €1,000"}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{destination.accommodationNote || "Shared apartment to private studio. University housing often more affordable."}</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-muted-foreground">Food & Groceries</span>
                      <span className="font-medium">{destination.foodCost || "€200 - €400"}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{destination.foodNote || "Cooking at home with occasional eating out. Student canteens offer discounted meals."}</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-muted-foreground">Transportation</span>
                      <span className="font-medium">{destination.transportCost || "€50 - €100"}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{destination.transportNote || "Public transport with student discounts available in most cities."}</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-muted-foreground">Utilities & Internet</span>
                      <span className="font-medium">{destination.utilitiesCost || "€100 - €200"}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{destination.utilitiesNote || "Electricity, heating, water, and internet connection."}</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-muted-foreground">Other Expenses</span>
                      <span className="font-medium">{destination.otherCost || "€150 - €300"}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{destination.otherNote || "Books, leisure, healthcare, clothing, etc."}</div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total (Monthly)</span>
                      <span className="font-bold text-primary">{destination.totalMonthlyCost || "€900 - €2,000"}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-primary/5 rounded-lg border border-primary/10">
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <span className="text-primary text-lg">💡</span> Budget Tips
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {destination.budgetTip1 || "Student discounts are widely available - always carry your student ID"}</li>
                  <li>• {destination.budgetTip2 || "Consider shared accommodation to significantly reduce housing costs"}</li>
                  <li>• {destination.budgetTip3 || "Open a local bank account to avoid foreign transaction fees"}</li>
                  <li>• {destination.budgetTip4 || "Cook at home and use student canteens to save on food expenses"}</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Scholarships and Funding */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-6">
              <Landmark className="h-5 w-5 text-primary" />
              <Heading level={3}>Scholarships & Funding Options</Heading>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-5 border hover:border-primary/50 transition-colors">
                <h4 className="font-semibold mb-2">Government Scholarships</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {destination.governmentScholarships || `${destination.name} offers various government-funded scholarships for international students based on academic merit.`}
                </p>
                <Button variant="link" className="p-0 h-auto text-primary" asChild>
                  <Link href="#">
                    Learn More <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
              
              <div className="bg-card rounded-lg p-5 border hover:border-primary/50 transition-colors">
                <h4 className="font-semibold mb-2">University Scholarships</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {destination.universityScholarships || "Many universities offer their own scholarships and grants for international students with outstanding academic achievements."}
                </p>
                <Button variant="link" className="p-0 h-auto text-primary" asChild>
                  <Link href="#">
                    Learn More <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
              
              <div className="bg-card rounded-lg p-5 border hover:border-primary/50 transition-colors">
                <h4 className="font-semibold mb-2">External Scholarships</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {destination.externalScholarships || "Various organizations, foundations, and companies offer scholarships for students studying abroad."}
                </p>
                <Button variant="link" className="p-0 h-auto text-primary" asChild>
                  <Link href="#">
                    Learn More <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button asChild>
                <Link href="/tools/scholarship-finder">
                  Find Scholarships <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Student Life Section */}
      <Section id="student-life">
        <Container>
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="h-6 w-6 text-primary" />
            <Heading level={2}>Student Life & Culture</Heading>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Text content - 3 columns */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <Heading level={3} className="mb-4">Campus Life</Heading>
                <Paragraph className="mb-4">
                  {destination.campusLife || `Universities in ${destination.name} offer vibrant campus environments with modern facilities, libraries, sports centers, and social spaces. Most campuses are designed to support both academic excellence and balanced student life, with various clubs and societies catering to different interests.`}
                </Paragraph>
                <Paragraph>
                  {destination.campusLifeExtra || `International students are encouraged to participate in orientation programs, which help them integrate into the academic and social aspects of university life. These programs often include campus tours, information sessions, and social events to help newcomers settle in.`}
                </Paragraph>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Work Opportunities</Heading>
                <Paragraph className="mb-4">
                  {destination.workOpportunities || `International students in ${destination.name} are typically permitted to work part-time during their studies, allowing them to gain valuable experience and supplement their income. During academic terms, students can usually work up to 20 hours per week, with full-time work permitted during official holidays.`}
                </Paragraph>
                <Paragraph>
                  {destination.workOpportunitiesExtra || `Post-graduation, many students benefit from stay-back visa options that allow them to gain professional experience. This is a significant advantage for international students looking to enhance their career prospects or pursue longer-term opportunities in the country.`}
                </Paragraph>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Cultural Experience</Heading>
                <Paragraph className="mb-4">
                  {destination.culturalExperience || `Living and studying in ${destination.name} offers a rich cultural experience, with a unique blend of tradition and modernity. Students have the opportunity to explore historic sites, museums, galleries, and participate in local festivals and events throughout the year.`}
                </Paragraph>
                <Paragraph>
                  {destination.culturalExperienceExtra || `The country's diverse landscape also provides endless opportunities for outdoor activities and travel. From bustling cities to serene countryside, students can explore a variety of environments during their free time, enriching their overall international education experience.`}
                </Paragraph>
              </div>
            </div>
            
            {/* Student life gallery - 2 columns */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-3 h-full">
                <div className="space-y-3">
                  <div className="rounded-lg overflow-hidden aspect-[4/5] relative">
                    <div className="absolute inset-0 bg-primary/10"></div>
                    <img 
                      src={destination.studentLifeImage1 || "/images/placeholders/student-life-1.jpg"} 
                      alt="Campus life" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden aspect-square relative">
                    <div className="absolute inset-0 bg-primary/10"></div>
                    <img 
                      src={destination.studentLifeImage2 || "/images/placeholders/student-life-2.jpg"} 
                      alt="Student activities" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-lg overflow-hidden aspect-square relative">
                    <div className="absolute inset-0 bg-primary/10"></div>
                    <img 
                      src={destination.studentLifeImage3 || "/images/placeholders/student-life-3.jpg"} 
                      alt="Cultural experience" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden aspect-[4/5] relative">
                    <div className="absolute inset-0 bg-primary/10"></div>
                    <img 
                      src={destination.studentLifeImage4 || "/images/placeholders/student-life-4.jpg"} 
                      alt="Student social life" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Testimonials Section */}
      <Section id="testimonials" background="muted">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-4">Student Stories</Badge>
            <Heading level={2} className="mb-4">Hear from International Students</Heading>
            <Paragraph className="max-w-2xl mx-auto">
              Real experiences from students who've embarked on their educational journey in {destination.name}.
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src={destination.testimonial1Image || "/images/placeholders/testimonial-1.jpg"} 
                    alt="Student" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{destination.testimonial1Name || "Aisha Khan"}</h4>
                  <p className="text-sm text-muted-foreground">
                    {destination.testimonial1Program || "MSc in Data Science"} • {destination.testimonial1University || "University of Technology"}
                  </p>
                </div>
              </div>
              <blockquote className="text-sm italic mb-4">
                "{destination.testimonial1Quote || `Studying in ${destination.name} has been the most rewarding experience of my life. The education quality is excellent, and I've made friends from all over the world. The cultural experience alone has been worth it!`}"
              </blockquote>
              <div className="flex justify-between items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{destination.testimonial1Country || "From India"}</p>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src={destination.testimonial2Image || "/images/placeholders/testimonial-2.jpg"} 
                    alt="Student" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{destination.testimonial2Name || "Miguel Rodriguez"}</h4>
                  <p className="text-sm text-muted-foreground">
                    {destination.testimonial2Program || "BA in Business Administration"} • {destination.testimonial2University || "National Business School"}
                  </p>
                </div>
              </div>
              <blockquote className="text-sm italic mb-4">
                "{destination.testimonial2Quote || `The academic standards are high, but the support from professors is amazing. I've gained practical skills through internships that were arranged by my university. The student community is diverse and welcoming.`}"
              </blockquote>
              <div className="flex justify-between items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{destination.testimonial2Country || "From Brazil"}</p>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src={destination.testimonial3Image || "/images/placeholders/testimonial-3.jpg"} 
                    alt="Student" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{destination.testimonial3Name || "Lin Wei"}</h4>
                  <p className="text-sm text-muted-foreground">
                    {destination.testimonial3Program || "PhD in Environmental Science"} • {destination.testimonial3University || "Research University"}
                  </p>
                </div>
              </div>
              <blockquote className="text-sm italic mb-4">
                "{destination.testimonial3Quote || `The research facilities here are world-class. I've had the opportunity to work with leading experts in my field and present at international conferences. The work-life balance is also excellent with plenty of cultural activities.`}"
              </blockquote>
              <div className="flex justify-between items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{destination.testimonial3Country || "From China"}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/testimonials">
                Read More Student Stories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
      
      {/* FAQ Section */}
      <Section id="faq">
        <Container>
          <div className="flex items-center gap-2 mb-8">
            <HelpCircle className="h-6 w-6 text-primary" />
            <Heading level={2}>Frequently Asked Questions</Heading>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    {destination.faq1Question || `What are the benefits of studying in ${destination.name}?`}
                  </AccordionTrigger>
                  <AccordionContent>
                    {destination.faq1Answer || `Studying in ${destination.name} offers numerous benefits including high-quality education, internationally recognized qualifications, diverse cultural experiences, opportunities to improve language skills, and enhanced career prospects. Many institutions also offer practical learning experiences that prepare students well for their future careers.`}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    {destination.faq2Question || "How much does it cost to study and live here?"}
                  </AccordionTrigger>
                  <AccordionContent>
                    {destination.faq2Answer || `The cost of studying varies depending on the institution and program. Tuition fees generally range from €3,000 to €25,000 per year. Living expenses, including accommodation, food, transportation, and leisure activities, typically amount to €900-€2,000 per month depending on the city and lifestyle choices.`}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    {destination.faq3Question || "Do I need to speak the local language?"}
                  </AccordionTrigger>
                  <AccordionContent>
                    {destination.faq3Answer || `While knowing the local language is beneficial for daily life and integration, there are numerous English-taught programs available for international students. Many universities offer language courses to help students learn the local language during their studies.`}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    {destination.faq4Question || "Can I work while studying?"}
                  </AccordionTrigger>
                  <AccordionContent>
                    {destination.faq4Answer || `Yes, international students are typically allowed to work part-time during their studies, usually up to 20 hours per week during term time and full-time during holidays. This provides an opportunity to gain work experience and supplement income while studying.`}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    {destination.faq5Question || "What are the visa requirements?"}
                  </AccordionTrigger>
                  <AccordionContent>
                    {destination.faq5Answer || `International students generally need a student visa to study. Requirements typically include an acceptance letter from a recognized institution, proof of sufficient financial means, health insurance, and a valid passport. It's recommended to apply for a visa well in advance of your planned departure.`}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">
                    {destination.faq6Question || "Are there scholarships available?"}
                  </AccordionTrigger>
                  <AccordionContent>
                    {destination.faq6Answer || `Yes, there are various scholarships available for international students, offered by the government, universities, and private organizations. These scholarships may be based on academic merit, financial need, or specific criteria related to the student's country of origin or field of study.`}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left">
                    {destination.faq7Question || "What accommodation options are available?"}
                  </AccordionTrigger>
                  <AccordionContent>
                    {destination.faq7Answer || `Students can choose from university dormitories, private student residences, shared apartments, homestays, or private rentals. University accommodation is often the most affordable option and provides a good opportunity to meet other students, though private rentals offer more independence.`}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left">
                    {destination.faq8Question || "What healthcare provisions are there for international students?"}
                  </AccordionTrigger>
                  <AccordionContent>
                    {destination.faq8Answer || `International students are typically required to have health insurance coverage for the duration of their stay. Some countries offer public healthcare access to international students, while others require private insurance. Many universities have on-campus health services for basic medical needs.`}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/faq">
                View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
      
      {/* Navigation Component */}
      <div className="hidden lg:block fixed right-8 top-1/3 transform -translate-y-1/2 z-50">
        <div className="bg-card rounded-full shadow-lg border border-border p-3 space-y-3">
          <a 
            href="#top" 
            className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
            title="Hero Section"
          >
            <Home className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
          <a 
            href="#education" 
            className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
            title="Education System"
          >
            <GraduationCap className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
          <a 
            href="#universities" 
            className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
            title="Universities"
          >
            <Building className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
          <a 
            href="#requirements" 
            className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
            title="Requirements"
          >
            <ClipboardCheck className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
          <a 
            href="#costs" 
            className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
            title="Costs & Financing"
          >
            <Wallet className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
          <a 
            href="#student-life" 
            className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
            title="Student Life"
          >
            <Sparkles className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
          <a 
            href="#testimonials" 
            className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
            title="Testimonials"
          >
            <MessageCircle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
          <a 
            href="#faq" 
            className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
            title="FAQ"
          >
            <HelpCircle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
        </div>
      </div>
      
      {/* Call to Action */}
      <CallToAction
        title="Ready to explore your options?"
        description="Get personalized guidance on studying in this destination."
        primaryAction={{
          text: "Contact Us",
          href: "/contact"
        }}
      />
    </main>
  )
}

function UniversitiesByCountry({ universities, country }: { universities: UniversityCardType[], country: Country }) {
  // No need to filter by country name again since the universities are already filtered
  // Just limit to 3 for display
  const filteredUniversities = universities.slice(0, 3);
  
  // Use useState and useEffect for client-side rendering
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Return a simple placeholder during server rendering
  if (!isClient) {
    return (
      <section className="py-16 border-t border-border">
        <Container>
          <div className="h-8 w-64 bg-muted rounded mb-4"></div>
          <div className="h-5 w-full max-w-md bg-muted rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 border-t border-border">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Top Universities in {country.name}</h2>
            <p className="text-muted-foreground">
              Explore highly-ranked universities offering quality education to international students
            </p>
          </div>
          <Link 
            href={`/destinations/${country.slug}/universities`} 
            className="text-primary font-medium flex items-center hover:underline"
          >
            View all universities
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
 
        {filteredUniversities.length === 0 ? (
          <div className="p-12 text-center bg-muted/30 border rounded-lg">
            <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Universities Found</h3>
            <p className="text-muted-foreground">
              We couldn't find any universities for this country. Check back later as we continue to update our database.
            </p>
          </div>
        ) : (
          <Grid cols={3} gap="lg">
            {filteredUniversities.map((university) => (
              <UniversityCard
                key={university.id}
                university={{
                  id: university.id,
                  name: university.name,
                  slug: university.slug,
                  countryId: university.countryId,
                  countryName: country.name,
                  logo: university.logo,
                  isPublic: university.isPublic,
                  ranking: {
                    qs: university.ranking?.qs
                  },
                  location: country.name,
                  featuredFields: ['Business', 'Engineering', 'Computer Science'],
                  qogentSuccessRate: '85%'
                }}
                variant="default"
              />
            ))}
          </Grid>
        )}
      </Container>
    </section>
  );
} 