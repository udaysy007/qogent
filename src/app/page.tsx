"use client"

import Image from "next/image"
import { ArrowRight, GraduationCap, Globe, Briefcase, Calculator } from "lucide-react"
import { Hero } from "@/components/hero"
import { FeatureSection } from "@/components/feature-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CallToAction } from "@/components/call-to-action"

export default function HomePage() {
  return (
    <main>
      <Hero
        title="Your Journey to Study Abroad Starts Here"
        description="Qogent helps students navigate the complex process of studying abroad with personalized guidance, visa support, and career opportunities."
        primaryAction={{
          text: "Explore Destinations",
          href: "/destinations"
        }}
        secondaryAction={{
          text: "Find Universities",
          href: "/universities"
        }}
        image={
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
            <Image
              src="/images/hero-image.jpg"
              alt="Students studying abroad"
              fill
              className="object-cover"
              priority
            />
          </div>
        }
      />

      <FeatureSection
        title="How We Help You Succeed"
        description="We provide comprehensive information throughout your study abroad journey"
        features={[
          {
            icon: <GraduationCap className="h-6 w-6" />,
            title: "University Exploration",
            description: "Explore top universities across multiple countries with detailed information about programs and requirements."
          },
          {
            icon: <Globe className="h-6 w-6" />,
            title: "Country Information",
            description: "Learn about different study destinations, their education systems, and what makes them unique."
          },
          {
            icon: <Briefcase className="h-6 w-6" />,
            title: "Student Stories",
            description: "Read success stories from students who have navigated the international education journey."
          },
          {
            icon: <Calculator className="h-6 w-6" />,
            title: "Interactive Tools",
            description: "Use our specialized tools to find the right country, calculate costs, and check eligibility requirements."
          }
        ]}
        background="muted"
      />

      <StatsSection
        stats={[
          {
            value: "1,000+",
            label: "Students Placed",
            description: "Successfully placed in top universities"
          },
          {
            value: "95%",
            label: "Visa Success Rate",
            description: "Approved visa applications"
          },
          {
            value: "20+",
            label: "Destination Countries",
            description: "Across Europe, North America, and Asia"
          },
          {
            value: "500+",
            label: "Partner Universities",
            description: "Worldwide university network"
          }
        ]}
      />

      <TestimonialsSection
        testimonials={[
  {
    id: 1,
            content: "Qogent made my dream of studying in Ireland a reality. Their guidance throughout the application and visa process was invaluable.",
            author: "Priya Sharma",
            role: "Computer Science Student, Dublin",
            rating: 5
  },
  {
    id: 2,
            content: "The team at Qogent provided personalized support that helped me secure admission to my top-choice university in Poland.",
            author: "Rahul Patel",
            role: "Engineering Student, Warsaw",
            rating: 5
  },
  {
    id: 3,
            content: "Their job placement services helped me find a part-time position that perfectly complements my studies.",
            author: "Ananya Singh",
            role: "Business Student, Galway",
            rating: 4
          }
        ]}
        background="muted"
      />

      <CallToAction
        title="Ready to Begin Your International Education Journey?"
        description="Take the first step towards your global education and career goals with Qogent's expert guidance."
        primaryAction={{
          text: "Get Started",
          href: "/contact"
        }}
        secondaryAction={{
          text: "Learn More",
          href: "/about"
        }}
      />
    </main>
  )
}
