"use client"

import Link from "next/link"
import { ArrowRight, Calculator, Globe, Compass, Wallet, BarChart, Book, Briefcase, GraduationCap, FileText, Calendar, Plane, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ToolsHero } from "@/components/sections/tools-hero"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { LucideIcon } from "lucide-react"

interface Tool {
  id: number
  name: string
  description: string
  icon: LucideIcon
  category: string
  link: string
  colorClass: string
  comingSoon: boolean
}

export default function ToolsPage() {
  return (
    <div className="flex flex-col">
      <ToolsHero />

      {/* Tools Grid */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tool */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
                Featured Tool
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Destination Finder</h2>
              <p className="text-muted-foreground text-lg">
                Find your perfect study destination based on your academic profile, budget,
                career goals, and preferences. Get personalized country recommendations in
                minutes.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Customized country recommendations
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Budget and academic profile matching
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Career prospects consideration
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Interactive results visualization
                </li>
              </ul>

              <Button asChild size="lg" className="rounded-full">
                <Link href="/tools/destination-finder">Try It Now</Link>
              </Button>
            </div>

            {/* GIF Preview */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
              <img
                src="/images/tools/destination_finder_tool.gif"
                alt="Destination Finder Tool Preview"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-card/50 to-muted/20 p-8 md:p-10 rounded-xl border">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Need Personalized Help?
              </h2>
              <p className="text-muted-foreground max-w-[500px]">
                Our tools are great for initial planning, but our advisors can provide customized guidance for your specific situation.
              </p>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 whitespace-nowrap">
              <Link href="/contact" className="text-primary-foreground flex items-center">
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
function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link 
      href={tool.comingSoon ? "#" : tool.link}
      className={`block ${!tool.comingSoon && "cursor-pointer"}`}
    >
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-background/50 to-background h-full border-0">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[var(--tool-color-light)] to-[var(--tool-color)] w-fit" 
                   style={{ 
                     "--tool-color": tool.colorClass, 
                     "--tool-color-light": `${tool.colorClass}20` 
                   } as React.CSSProperties}>
                <tool.icon className="h-5 w-5 text-[var(--tool-color)]" />
              </div>
              <h3 className="text-lg font-semibold mt-4 line-clamp-1">{tool.name}</h3>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted/30">
              {tool.category}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {tool.description}
          </p>
          
          <div className="mt-auto">
            {tool.comingSoon ? (
              <div className="inline-flex items-center rounded-full bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                Coming Soon
              </div>
            ) : (
              <div className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                Try Now
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            )}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-muted/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Card>
    </Link>
  )
}

// Sample data for tools - arranged in chronological order
const tools = [
  {
    id: 1,
    name: "Destination Finder",
    description: "Find your ideal study destination based on your profile and preferences.",
    icon: Compass,
    category: "Destinations",
    link: "/tools/destination-finder",
    colorClass: "var(--primary)",
    comingSoon: false
  },
  {
    id: 2,
    name: "Country Comparison",
    description: "Compare countries across key metrics like costs, visas, and opportunities.",
    icon: BarChart,
    category: "Destinations",
    link: "/tools/country-comparison",
    colorClass: "var(--info)",
    comingSoon: false
  },
  {
    id: 3,
    name: "Cost Calculator",
    description: "Estimate monthly expenses in different cities worldwide.",
    icon: Wallet,
    category: "Costs",
    link: "/tools/cost-calculator",
    colorClass: "var(--success)",
    comingSoon: false
  },
  {
    id: 4,
    name: "ROI Calculator",
    description: "Calculate your education return on investment abroad.",
    icon: Calculator,
    category: "Costs",
    link: "/tools/roi-calculator",
    colorClass: "var(--success)",
    comingSoon: false
  },
  {
    id: 5,
    name: "Requirements Checker",
    description: "Check if you meet the requirements for your chosen study program and get personalized guidance.",
    icon: ClipboardCheck,
    category: "Planning",
    link: "/tools/requirements-checker",
    colorClass: "bg-gradient-to-r from-emerald-500 to-teal-500",
    comingSoon: false
  },
  {
    id: 6,
    name: "Timeline Generator",
    description: "Create your personalized application timeline with key deadlines and tasks.",
    icon: Calendar,
    category: "Planning",
    link: "/tools/timeline-generator",
    colorClass: "var(--secondary)",
    comingSoon: false
  },
  {
    id: 7,
    name: "Document Checklist",
    description: "Get a personalized checklist of required documents for your study abroad journey.",
    icon: FileText,
    category: "Requirements",
    link: "/tools/document-checklist",
    colorClass: "var(--warning)",
    comingSoon: false
  },
  {
    id: 8,
    name: "Pre-departure Checklist",
    description: "Get a personalized checklist of tasks to complete before departing for your studies.",
    icon: Plane,
    category: "Requirements",
    link: "/tools/pre-departure-checklist",
    colorClass: "var(--warning)",
    comingSoon: false
  },
  {
    id: 9,
    name: "Career Explorer",
    description: "Explore career paths based on your study choices and preferences. Get personalized recommendations aligned with your goals.",
    icon: Briefcase,
    category: "Planning",
    link: "/tools/career-explorer",
    colorClass: "var(--secondary)",
    comingSoon: false
  }
]; 