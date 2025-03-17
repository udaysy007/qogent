"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Search, Briefcase, Building, MapPin, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedJobType, setSelectedJobType] = useState("all")
  
  // Filter jobs based on search query and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCountry = selectedCountry === "all" || job.country === selectedCountry
    const matchesJobType = selectedJobType === "all" || job.type === selectedJobType
    
    return matchesSearch && matchesCountry && matchesJobType
  })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-[800px] mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Find Student Jobs Abroad
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Discover part-time opportunities that fit your schedule and help fund your studies
            </p>
          </div>
        </div>
        
        {/* Abstract background shape */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full bg-background dark:bg-muted/5 blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, or locations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="hidden md:flex gap-4 w-full md:w-auto">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="ireland">Ireland</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="part-time">Part-Time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                  <SelectItem value="campus">On-Campus</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Narrow down jobs by country and type
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Country</h4>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        <SelectItem value="ireland">Ireland</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Job Type</h4>
                    <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="part-time">Part-Time</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="seasonal">Seasonal</SelectItem>
                        <SelectItem value="campus">On-Campus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
            </h2>
          </div>
          
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card key={job.id} className="overflow-hidden hover-lift">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant={job.type === 'part-time' ? 'default' : 
                                          job.type === 'internship' ? 'secondary' : 
                                          job.type === 'seasonal' ? 'outline' : 'destructive'}>
                            {job.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">Posted {job.posted}</span>
                        </div>
                        
                        <h3 className="text-xl font-medium">{job.title}</h3>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                          <div className="flex items-center gap-1.5">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{job.company}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{job.hours}</span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          {job.skills.map((skill, index) => (
                            <Badge key={index} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0">
                        <Button asChild>
                          <Link href={`/jobs/${job.id}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-[600px]">
              Common questions about student jobs abroad
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-card p-8 md:p-10 rounded-xl">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Need Help Finding a Job?
              </h2>
              <p className="text-muted-foreground max-w-[500px]">
                Our advisors can help you find opportunities that match your skills and schedule.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">
                Get Personalized Help
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data for jobs
const jobs = [
  {
    id: 1,
    title: "Barista - Student Friendly Hours",
    company: "Coffee Culture",
    location: "Dublin, Ireland",
    country: "ireland",
    type: "part-time",
    hours: "15-20 hours/week",
    posted: "2 days ago",
    description: "Looking for energetic students to join our team. Flexible hours that work around your class schedule. No previous experience required, training provided.",
    skills: ["Customer Service", "Food Handling", "English Fluency"],
  },
  {
    id: 2,
    title: "Marketing Intern",
    company: "TechStart",
    location: "London, UK",
    country: "uk",
    type: "internship",
    hours: "20 hours/week",
    posted: "1 week ago",
    description: "Gain valuable marketing experience at a fast-growing tech startup. Help with social media, content creation, and campaign analysis. Perfect for Marketing or Business students.",
    skills: ["Social Media", "Content Creation", "Analytics"],
  },
  {
    id: 3,
    title: "Campus Ambassador",
    company: "StudentLife App",
    location: "Berlin, Germany",
    country: "germany",
    type: "campus",
    hours: "5-10 hours/week",
    posted: "3 days ago",
    description: "Represent StudentLife App on your campus. Organize events, spread awareness, and help grow our user base. Very flexible hours and great networking opportunity.",
    skills: ["Communication", "Event Planning", "Networking"],
  },
  {
    id: 4,
    title: "Summer Camp Counselor",
    company: "Adventure Outdoors",
    location: "Vancouver, Canada",
    country: "canada",
    type: "seasonal",
    hours: "Full-time (Summer)",
    posted: "2 weeks ago",
    description: "Join our team for an unforgettable summer experience. Lead activities for children aged 8-14 in our outdoor adventure camp. Room and board included.",
    skills: ["Childcare", "Outdoor Activities", "First Aid"],
  },
  {
    id: 5,
    title: "Library Assistant",
    company: "University of Melbourne",
    location: "Melbourne, Australia",
    country: "australia",
    type: "part-time",
    hours: "12 hours/week",
    posted: "5 days ago",
    description: "Work at the university library helping students find resources, managing book returns, and maintaining the study areas. Perfect quiet job for focused students.",
    skills: ["Organization", "Research", "Customer Service"],
  },
  {
    id: 6,
    title: "Retail Sales Associate",
    company: "Urban Fashion",
    location: "Dublin, Ireland",
    country: "ireland",
    type: "part-time",
    hours: "16-24 hours/week",
    posted: "1 day ago",
    description: "Join our team at Urban Fashion. Help customers find the perfect outfit, manage inventory, and create engaging displays. Employee discount included!",
    skills: ["Sales", "Customer Service", "Visual Merchandising"],
  },
]

// Sample data for FAQs
const faqs = [
  {
    question: "Can international students work while studying abroad?",
    answer: "Yes, but regulations vary by country. Most student visas allow for part-time work (typically 15-20 hours per week during term time and full-time during holidays). Always check the specific rules for your destination country and visa type."
  },
  {
    question: "Do I need a separate work permit?",
    answer: "In most countries, your student visa will include limited work rights without needing a separate permit. However, some countries may require additional documentation or registration with tax authorities before you can begin working."
  },
  {
    question: "How many hours can I work as a student?",
    answer: "This varies by country. Common limits are: Ireland (20 hours/week during term, 40 hours/week during holidays), UK (20 hours/week for degree students), Canada (20 hours/week off-campus), Australia (40 hours per fortnight during term time)."
  },
  {
    question: "What types of jobs are best for international students?",
    answer: "On-campus jobs, retail, hospitality, tutoring, and administrative roles are often ideal as they typically offer flexible hours. Tech-related roles like web development or digital marketing can also provide relevant experience and better pay."
  },
  {
    question: "How much can I expect to earn?",
    answer: "Earnings vary by country, city, and job type. Most student jobs pay minimum wage or slightly above. This is typically enough to cover living expenses but not tuition fees. Research the minimum wage and average student earnings in your destination country for more specific information."
  }
] 