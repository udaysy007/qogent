import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, GraduationCap, FileText, Calendar, PiggyBank, Plane, CheckCircle, Users } from "lucide-react"

interface RoadmapStepProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  className?: string
}

const RoadmapStep = ({ icon, title, description, href, className }: RoadmapStepProps) => {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300",
      "hover:shadow-lg hover:-translate-y-1",
      "dark:bg-gray-800/50 dark:hover:bg-gray-800/80",
      className
    )}>
      <div className="p-6">
        <div className="mb-4 inline-block rounded-full bg-primary/10 p-3 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <Button variant="link" className="group p-0" asChild>
          <a href={href}>
            Learn More
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </Card>
  )
}

export function RoadmapSection() {
  const steps: RoadmapStepProps[] = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Choose Your Destination",
      description: "Compare countries and find your ideal study destination based on your preferences and goals.",
      href: "/tools/country-comparison",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Language Requirements",
      description: "Understand language requirements and prepare for necessary tests like IELTS or TOEFL.",
      href: "/guides/language-requirements",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Document Checklist",
      description: "Get a personalized checklist of all documents needed for your applications.",
      href: "/tools/document-checklist",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Application Timeline",
      description: "Plan your applications with our interactive timeline to meet all deadlines.",
      href: "/tools/timeline-generator",
    },
    {
      icon: <PiggyBank className="h-6 w-6" />,
      title: "Financial Planning",
      description: "Calculate costs and explore scholarships, loans, and funding options.",
      href: "/tools/cost-calculator",
    },
    {
      icon: <Plane className="h-6 w-6" />,
      title: "Visa Guide",
      description: "Step-by-step guidance for your student visa application process.",
      href: "/guides/visa-process",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Pre-departure Checklist",
      description: "Everything you need to prepare before leaving for your studies abroad.",
      href: "/tools/pre-departure-checklist",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Connect",
      description: "Join our community of students and get help from those who've been there.",
      href: "/community",
    }
  ]

  return (
    <section id="roadmap" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Journey Map</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Follow these steps to turn your study abroad dream into reality. Each step comes with detailed guidance and tools to help you succeed.
          </p>
        </div>
        <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {steps.map((step, index) => (
            <RoadmapStep key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
} 