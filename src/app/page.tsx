import { HeroWithMockup } from "@/components/ui/hero-with-mockup"
import { DestinationsSection } from "./components/home/destinations/DestinationsSection";
import { SuccessStoriesSection } from "./components/home/success-stories/SuccessStoriesSection";
import { BlogPreviewSection } from "./components/home/blog-preview/BlogPreviewSection";
import { CTASection } from "./components/home/cta/CTASection";
import { StudyAbroadComparison } from "@/components/sections/study-abroad-comparison"
import { JourneyTimeline } from "@/components/sections/journey-timeline"
import SmartAdmission from "@/components/sections/smart-admission"

export const metadata = {
  title: "Qogent - Your Guide to Studying Abroad",
  description: "Expert guidance for students planning to study abroad. Find universities, explore destinations, and get personalized support for your international education journey.",
};

export default function HomePage() {
  return (
    <main>
      <HeroWithMockup
        title="Studying Abroad Made Simple!"
        description="We've helped 2000+ students get into top universities abroad in weeks, not months. You're next!"
        primaryCta={{
          text: "Find Your Perfect Country",
          href: "/tools/destination-finder",
        }}
        secondaryCta={{
          text: "Explore Destinations",
          href: "/destinations",
        }}
        mockupImage={{
          src: "/images/hero-mockup.jpg",
          alt: "Students studying in a modern university library",
          width: 1920,
          height: 1080,
        }}
        avatarCircles={{
          avatarUrls: [
            "/images/avatars/avatar1.jpg",
            "/images/avatars/avatar2.jpg",
            "/images/avatars/avatar3.jpg",
            "/images/avatars/avatar4.jpg",
          ],
          numPeople: 2000
        }}
      />
      
      <StudyAbroadComparison />
      <JourneyTimeline />
      <SmartAdmission />
      
      <DestinationsSection />
      <SuccessStoriesSection />
      <BlogPreviewSection />
      <CTASection />
    </main>
  );
}
