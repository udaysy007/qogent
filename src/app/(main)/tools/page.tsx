"use client"

import Link from "next/link"
import { ArrowRight, Calculator, Calendar, FileText, Globe, Compass, Wallet, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function ToolsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-[800px] mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Free Tools for Students
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Practical calculators and resources to help plan your study abroad journey
            </p>
          </div>
        </div>
        
        {/* Abstract background shape */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full bg-background dark:bg-muted/5 blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Tools</TabsTrigger>
                <TabsTrigger value="calculators">Calculators</TabsTrigger>
                <TabsTrigger value="planners">Planners</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="calculators" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.filter(tool => tool.category === "calculator").map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="planners" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.filter(tool => tool.category === "planner").map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="guides" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.filter(tool => tool.category === "guide").map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Tool */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                Featured Tool
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Cost of Living Comparison
              </h2>
              <p className="text-muted-foreground">
                Compare living expenses between your home city and potential study destinations. Get accurate estimates for accommodation, food, transportation, and more.
              </p>
              <ul className="space-y-2">
                {["Compare multiple cities simultaneously", "Adjust for your lifestyle preferences", "See monthly and annual cost breakdowns", "Updated data from reliable sources"].map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link href="/tools/cost-comparison">
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Interactive Tool Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Coming Soon
            </h2>
            <p className="text-muted-foreground max-w-[600px]">
              We're constantly developing new tools to help make your study abroad journey easier
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingTools.map((tool, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <tool.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                  <div className="inline-block rounded-full bg-muted px-3 py-1 text-xs">
                    Coming {tool.eta}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-card p-8 md:p-10 rounded-xl">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Need Personalized Help?
              </h2>
              <p className="text-muted-foreground max-w-[500px]">
                Our tools are great for initial planning, but our advisors can provide customized guidance for your specific situation.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Tool Card Component
function ToolCard({ tool }) {
  return (
    <Card className="overflow-hidden hover-lift">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <tool.icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium">{tool.name}</h3>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          {tool.description}
        </p>
        
        <div className="mt-auto">
          <Button variant="outline" asChild className="w-full">
            <Link href={tool.link}>
              Use Tool
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}

// Sample data for tools
const tools = [
  {
    id: 1,
    name: "Tuition Fee Calculator",
    description: "Estimate your total tuition costs based on program type, duration, and destination country.",
    icon: Calculator,
    category: "calculator",
    link: "/tools/tuition-calculator"
  },
  {
    id: 2,
    name: "Cost of Living Comparison",
    description: "Compare living expenses between your home city and potential study destinations.",
    icon: Wallet,
    category: "calculator",
    link: "/tools/cost-comparison"
  },
  {
    id: 3,
    name: "Application Timeline Planner",
    description: "Create a personalized timeline with important deadlines for your applications.",
    icon: Calendar,
    category: "planner",
    link: "/tools/timeline-planner"
  },
  {
    id: 4,
    name: "Document Checklist Generator",
    description: "Generate a customized checklist of required documents for your visa and university applications.",
    icon: FileText,
    category: "planner",
    link: "/tools/document-checklist"
  },
  {
    id: 5,
    name: "University Matcher",
    description: "Find universities that match your academic profile, budget, and preferences.",
    icon: Compass,
    category: "guide",
    link: "/tools/university-matcher"
  },
  {
    id: 6,
    name: "Visa Requirements Guide",
    description: "Get detailed information about student visa requirements for different countries.",
    icon: Globe,
    category: "guide",
    link: "/tools/visa-guide"
  }
]

// Sample data for upcoming tools
const upcomingTools = [
  {
    name: "Scholarship Finder",
    description: "Discover scholarships you're eligible for based on your profile and destination.",
    icon: Wallet,
    eta: "Next Month"
  },
  {
    name: "Language Test Prep",
    description: "Free resources to help you prepare for IELTS, TOEFL, and other language tests.",
    icon: FileText,
    eta: "Q3 2023"
  },
  {
    name: "Accommodation Comparison",
    description: "Compare on-campus and off-campus housing options in your destination city.",
    icon: Building,
    eta: "Q4 2023"
  }
] 