import { HeroWithMockup } from "@/components/ui/hero-with-mockup"
import { StatsSection } from "./components/home/stats/StatsSection";
import { DestinationsSection } from "./components/home/destinations/DestinationsSection";
import { SuccessStoriesSection } from "./components/home/success-stories/SuccessStoriesSection";
import { BlogPreviewSection } from "./components/home/blog-preview/BlogPreviewSection";
import { CTASection } from "./components/home/cta/CTASection";

export const metadata = {
  title: "Qogent - Your Guide to Studying Abroad",
  description: "Expert guidance for students planning to study abroad. Find universities, explore destinations, and get personalized support for your international education journey.",
};

export default function HomePage() {
  return (
    <main>
      <HeroWithMockup
        title="Your Gateway to Global Education"
        description="From applications to admits in weeks, not months. Democratizing access to international education with merit-based admissions guidance."
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
      />
      
      {/* Rest of your homepage content */}
      <StatsSection />
      <DestinationsSection />
      <SuccessStoriesSection />
      <BlogPreviewSection />
      <CTASection />
    </main>
  );
}
