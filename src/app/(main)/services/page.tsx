"use client"

import Link from "next/link"
import { ArrowRight, GraduationCap, FileText, Plane, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-[800px] mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How We Can Help You
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Practical support at every step of your study abroad journey
            </p>
          </div>
        </div>
        
        {/* Abstract background shape */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full bg-background dark:bg-muted/5 blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden hover-lift">
                <div className="p-6 md:p-8 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, index) => (
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
                  
                  <div className="mt-auto">
                    <Button variant="outline" asChild className="w-full">
                      <Link href={service.link}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-[600px]">
              A simple, transparent process focused on your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-lg font-medium">{index + 1}</span>
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              What Students Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <p className="italic text-muted-foreground">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center">
                      <span className="font-medium text-sm">{testimonial.initials}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.service}</p>
                    </div>
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
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground max-w-[500px]">
                Book a free consultation to discuss your study abroad plans.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">
                Book Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data for services
const services = [
  {
    id: 1,
    title: "University Admissions",
    subtitle: "Get into your dream university",
    description: "We'll help you navigate the complex application process for universities abroad, from selecting the right programs to submitting winning applications.",
    icon: GraduationCap,
    features: [
      "Personalized university shortlisting",
      "Application document preparation",
      "Personal statement & essay review",
      "Interview preparation",
      "Scholarship application support"
    ],
    link: "/services/university-admissions"
  },
  {
    id: 2,
    title: "Visa Assistance",
    subtitle: "Navigate visa requirements with confidence",
    description: "Student visa applications can be stressful. We'll guide you through each country's requirements and help you prepare a strong application.",
    icon: FileText,
    features: [
      "Document checklist & verification",
      "Financial documentation guidance",
      "Application form review",
      "Mock visa interview preparation",
      "Visa extension support"
    ],
    link: "/services/visa-assistance"
  },
  {
    id: 3,
    title: "Pre-Departure Support",
    subtitle: "Prepare for your new life abroad",
    description: "From accommodation to banking, we'll help you prepare for everything you need to settle into your new country smoothly.",
    icon: Plane,
    features: [
      "Accommodation guidance",
      "Banking & finances setup",
      "Health insurance selection",
      "Packing & preparation checklists",
      "Cultural adaptation workshops"
    ],
    link: "/services/pre-departure-support"
  },
  {
    id: 4,
    title: "Ongoing Mentorship",
    subtitle: "Support throughout your journey",
    description: "Our relationship doesn't end when you get accepted. We provide ongoing support to help you thrive during your studies abroad.",
    icon: MessageCircle,
    features: [
      "Regular check-in sessions",
      "Academic guidance",
      "Career planning support",
      "Internship & job search assistance",
      "Community events & networking"
    ],
    link: "/services/ongoing-mentorship"
  }
]

// Sample data for how it works steps
const steps = [
  {
    title: 'Free Initial Consultation',
    description: "We'll discuss your goals, academic background, and preferences to understand what you're looking for."
  },
  {
    title: 'Customized Plan',
    description: "Based on your profile, we'll create a personalized roadmap with university options and application strategy."
  },
  {
    title: 'Guided Implementation',
    description: "We'll support you through each step of the process, from applications to pre-departure preparation."
  }
]

// Sample data for testimonials
const testimonials = [
  {
    quote: "The university shortlisting was spot-on. They recommended programs I hadn't even considered that ended up being perfect for my goals.",
    name: "Priya S.",
    initials: "PS",
    service: "University Admissions"
  },
  {
    quote: "My visa interview was approved in just 2 minutes! Their mock interviews and document preparation made all the difference.",
    name: "Ahmed K.",
    initials: "AK",
    service: "Visa Assistance"
  }
] 