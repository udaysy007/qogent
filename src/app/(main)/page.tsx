import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Globe, GraduationCap, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Study Abroad Without the Confusion
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                We're the friends who've made all the mistakes so you don't have to. Get straight-talking advice on admissions, visas, and everything in between.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="animate-fade-in">
                Find Your Path
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Explore Countries
              </Button>
            </div>
          </div>
        </div>
        
        {/* Abstract background shape */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full bg-background dark:bg-muted/5 blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Where Will You Go?
            </h2>
            <p className="text-muted-foreground max-w-[600px]">
              From tuition-free Germany to research powerhouse USA, find the country that matches your ambitions (and budget).
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {destinations.map((destination) => (
              <Link 
                key={destination.id} 
                href={`/destinations/${destination.slug}`}
                className="group"
              >
                <Card className="overflow-hidden h-full hover-lift">
                  <div className="relative h-48 w-full">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 flex items-center justify-center">
                      <span className="text-4xl">{destination.emoji}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{destination.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {destination.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/destinations">
                See All Destinations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How We Make Study Abroad Easier
            </h2>
            <p className="text-muted-foreground max-w-[600px]">
              Think of us as your study abroad bestie who's been there, done that, and is ready to spill all the secrets.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4 space-y-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium">No-Nonsense Country Guides</h3>
              <p className="text-sm text-muted-foreground">
                We won't just tell you a country is "culturally rich" – we'll tell you what it's actually like to live there as a student.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 space-y-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium">Decode Application Mysteries</h3>
              <p className="text-sm text-muted-foreground">
                That moment when you're staring at your fifth application portal and your coffee's gone cold? We've been there, and we'll help you through it.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 space-y-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium">Find Student Jobs That Don't Suck</h3>
              <p className="text-sm text-muted-foreground">
                Because ramen for every meal gets old fast. We'll help you find work that fits your schedule and builds your resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Students Like You Who Made It Happen
            </h2>
            <p className="text-muted-foreground max-w-[600px]">
              No cherry-picked success stories here – real experiences from real students, challenges and all.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <div className="space-y-4">
                <p className="italic text-muted-foreground">
                  "I was so overwhelmed by all the application requirements until I found Qogent. Their step-by-step guide for German universities saved me from a complete meltdown."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center">
                    <span className="font-medium text-sm">RP</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Rahul P.</p>
                    <p className="text-xs text-muted-foreground">Computer Science, TU Munich</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="space-y-4">
                <p className="italic text-muted-foreground">
                  "The visa interview tips were spot on! I walked in feeling prepared instead of panicked, and got my Canadian student visa approved on the first try."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center">
                    <span className="font-medium text-sm">AM</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Aisha M.</p>
                    <p className="text-xs text-muted-foreground">Business, University of Toronto</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="space-y-4">
                <p className="italic text-muted-foreground">
                  "Finding a part-time job seemed impossible until I used Qogent's job board. Now I'm working at a research lab that's actually relevant to my degree!"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center">
                    <span className="font-medium text-sm">VK</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Vikram K.</p>
                    <p className="text-xs text-muted-foreground">Biotechnology, UC Berkeley</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to Stop Stressing and Start Planning?
            </h2>
            <p className="text-muted-foreground max-w-[600px]">
              Let's figure out which country fits your goals, budget, and that weird food preference you're too embarrassed to tell anyone about.
            </p>
            <Button size="lg" className="mt-2">
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data for destinations
const destinations = [
  {
    id: 1,
    name: 'Germany',
    slug: 'germany',
    description: 'Tuition-free public universities and world-class engineering programs. Beer and pretzels are just a bonus.',
    emoji: '🇩🇪',
  },
  {
    id: 2,
    name: 'Canada',
    slug: 'canada',
    description: 'Friendly vibes, post-graduation work permits, and a path to immigration (if you can handle the winters).',
    emoji: '🇨🇦',
  },
  {
    id: 3,
    name: 'United States',
    slug: 'usa',
    description: 'Top-ranked universities with incredible facilities and research opportunities (but yes, the tuition is eye-watering).',
    emoji: '🇺🇸',
  },
] 