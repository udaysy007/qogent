import { GetStartedHero } from "@/components/sections/get-started-hero"
import { RoadmapSection } from "@/components/get-started/roadmap-section"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get Started - Your Study Abroad Journey",
  description: "Start your study abroad journey with our step-by-step guide. From choosing your destination to landing in your dream country, we've got you covered.",
}

export default function GetStartedPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <GetStartedHero />
      <RoadmapSection />
    </main>
  )
} 