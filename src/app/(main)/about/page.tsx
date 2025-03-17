"use client"

import Link from "next/link"
import { ArrowRight, Users, GraduationCap, Globe, Award, Heart, Coffee, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-[800px] mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Qogent
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Your trusted partner for international education
            </p>
          </div>
        </div>
        
        {/* Abstract background shape */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full bg-background dark:bg-muted/5 blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Qogent was founded in 2018 by a group of international students who experienced firsthand the challenges of studying abroad. What started as a small community of mentors has grown into a comprehensive education consultancy.
                </p>
                <p>
                  Our founders faced numerous obstacles during their own study abroad journeys - from navigating complex application processes to adjusting to new cultures. These experiences shaped our mission to make international education accessible and straightforward for students worldwide.
                </p>
                <p>
                  Today, we help thousands of students achieve their academic dreams through personalized guidance, innovative tools, and a supportive community.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-xl overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Team Photo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-sm md:text-base font-medium">{stat.label}</p>
                    </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-[600px]">
              The principles that guide everything we do
            </p>
        </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="overflow-hidden hover-lift">
                <div className="p-6 md:p-8 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">{value.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
                </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-[600px]">
              Dedicated professionals with firsthand international education experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.background}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-card p-8 md:p-10 rounded-xl">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to Start Your Journey?
              </h2>
              <p className="text-muted-foreground max-w-[500px]">
                Book a free consultation with our team to discuss your study abroad plans.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 

// Sample data for stats
const stats = [
  {
    value: "2000+",
    label: "Students Placed"
  },
  {
    value: "50+",
    label: "University Partners"
  },
  {
    value: "95%",
    label: "Visa Success Rate"
  },
  {
    value: "10+",
    label: "Countries Served"
  }
]

// Sample data for values
const values = [
  {
    icon: Heart,
    title: "Student-First Approach",
    description: "We prioritize your educational goals and well-being above all else, providing personalized guidance that aligns with your unique aspirations."
  },
  {
    icon: Award,
    title: "Excellence & Integrity",
    description: "We maintain the highest standards of professionalism and ethical conduct, providing honest advice even when it's not what you might want to hear."
  },
  {
    icon: Coffee,
    title: "Supportive Community",
    description: "We foster a welcoming environment where students can connect, share experiences, and support each other throughout their educational journey."
  }
]

// Sample data for team
const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    background: "MSc from Oxford University",
    initials: "SJ"
  },
  {
    name: "David Chen",
    role: "Head of Admissions",
    background: "PhD from University of Toronto",
    initials: "DC"
  },
  {
    name: "Priya Patel",
    role: "Visa Specialist",
    background: "Former visa officer",
    initials: "PP"
  },
  {
    name: "Michael Kim",
    role: "Student Mentor",
    background: "MBA from INSEAD",
    initials: "MK"
  }
] 