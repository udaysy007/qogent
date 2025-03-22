import { HeroWithMockup } from "@/components/ui/hero-with-mockup"
import { RoadmapSection } from "@/components/get-started/roadmap-section"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get Started - Your Study Abroad Journey",
  description: "Start your study abroad journey with our step-by-step guide. From choosing your destination to landing in your dream country, we've got you covered.",
}

export default function GetStartedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroWithMockup
        title="Your Study Abroad Journey Starts Here"
        description="Ready to turn your study abroad dream into reality? We'll guide you through every step of the way - from choosing your destination to landing in your dream country. No jargon, just real advice from those who've been there."
        primaryCta={{
          text: "Start Planning",
          href: "#roadmap",
        }}
        secondaryCta={{
          text: "Compare Destinations",
          href: "/tools/country-comparison",
        }}
        mockupImage={{
          src: "/images/get-started/journey-map.png",
          alt: "Interactive study abroad journey map",
          width: 1200,
          height: 800,
        }}
        avatarCircles={{
          avatarUrls: [
            "/images/avatars/avatar1.jpg",
            "/images/avatars/avatar2.jpg",
            "/images/avatars/avatar3.jpg",
            "/images/avatars/avatar4.jpg",
            "/images/avatars/avatar5.jpg",
            "/images/avatars/avatar6.jpg",
          ],
          numPeople: 5000,
        }}
      />
      <RoadmapSection />
    </main>
  )
} 