"use client"

import Link from "next/link"
import { ArrowRight, Calculator, Globe, Compass, Wallet, BarChart, Book, Briefcase, GraduationCap, FileText, Calendar } from "lucide-react"
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
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-[800px] mx-auto">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-2">
              Student Resources
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Student Tools & Calculators
            </h1>
            <p className="text-muted-foreground md:text-lg max-w-[600px]">
              Free tools designed to help international students planning to study abroad.
              Find your ideal destination, compare costs, and make informed decisions.
            </p>
          </div>
        </div>
        
        {/* Abstract background shape */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full bg-primary/5 blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all">All Tools</TabsTrigger>
                <TabsTrigger value="destinations">Destinations</TabsTrigger>
                <TabsTrigger value="costs">Costs & ROI</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="destinations" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.filter(tool => tool.category === "destinations").map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="costs" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.filter(tool => tool.category === "costs").map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="requirements" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.filter(tool => tool.category === "requirements").map((tool) => (
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
                Destination Finder
              </h2>
              <p className="text-muted-foreground">
                Find your perfect study destination based on your academic profile, budget, career goals, 
                and preferences. Get personalized country recommendations in minutes.
              </p>
              <ul className="space-y-2">
                {[
                  "Customized country recommendations", 
                  "Budget and academic profile matching", 
                  "Career prospects consideration",
                  "Interactive results visualization"
                ].map((feature, index) => (
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
              <Button className="mt-4 bg-primary hover:bg-primary/90">
                <Link href="/tools/destination-finder" className="text-primary-foreground">
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm border">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                  <Compass className="h-16 w-16 text-primary/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-card p-8 md:p-10 rounded-xl border bg-gradient-to-br from-background to-muted/30">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Need Personalized Help?
              </h2>
              <p className="text-muted-foreground max-w-[500px]">
                Our tools are great for initial planning, but our advisors can provide customized guidance for your specific situation.
              </p>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/contact" className="text-primary-foreground">
                Contact Us
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
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-200 border bg-gradient-to-b from-card to-card/80">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-[var(--tool-color-light)] to-[var(--tool-color)] w-fit" 
               style={{ 
                 "--tool-color": tool.colorClass, 
                 "--tool-color-light": `${tool.colorClass}20` 
               } as React.CSSProperties}>
            <tool.icon className="h-6 w-6 text-[var(--tool-color)]" />
          </div>
          <h3 className="text-xl font-medium mt-3">{tool.name}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          {tool.description}
        </p>
        
        <div className="mt-auto flex justify-between items-center">
          {tool.comingSoon ? (
            <div className="inline-block rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              Coming Soon
            </div>
          ) : (
            <Link href={tool.link} className="text-primary flex items-center group-hover:underline">
              Explore Tool
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}

// Sample data for tools
const tools = [
  {
    id: 1,
    name: "Destination Finder",
    description: "Find your perfect study destination based on your academic profile, budget, and preferences.",
    icon: Compass,
    category: "destinations",
    link: "/tools/destination-finder",
    colorClass: "var(--primary)",
    comingSoon: false
  },
  {
    id: 2,
    name: "Country Comparison Dashboard",
    description: "Compare up to 3 countries side-by-side across key metrics like costs, visa requirements, and job opportunities.",
    icon: BarChart,
    category: "destinations",
    link: "/tools/country-comparison",
    colorClass: "var(--info)",
    comingSoon: true
  },
  {
    id: 3,
    name: "Education ROI Calculator",
    description: "Calculate your return on investment for studying abroad based on costs and potential earnings.",
    icon: Calculator,
    category: "costs",
    link: "/tools/roi-calculator",
    colorClass: "var(--success)",
    comingSoon: true
  },
  {
    id: 4,
    name: "Cost of Living Calculator",
    description: "Estimate your monthly expenses in different cities based on your lifestyle preferences.",
    icon: Wallet,
    category: "costs",
    link: "/tools/cost-calculator",
    colorClass: "var(--success)",
    comingSoon: true
  },
  {
    id: 5,
    name: "Program Compatibility Checker",
    description: "Check which programs across different countries you qualify for based on your academic credentials.",
    icon: GraduationCap,
    category: "requirements",
    link: "/tools/program-compatibility",
    colorClass: "var(--warning)",
    comingSoon: true
  },
  {
    id: 6,
    name: "Visa Requirements Wizard",
    description: "Get a step-by-step guide to visa requirements based on your nationality and destination country.",
    icon: FileText,
    category: "requirements",
    link: "/tools/visa-requirements",
    colorClass: "var(--warning)",
    comingSoon: true
  }
]; 