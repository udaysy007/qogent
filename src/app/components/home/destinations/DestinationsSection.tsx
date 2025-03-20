"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CountryCard } from "./CountryCard";
import { DestinationCarousel } from "./DestinationCarousel";
import { Button } from "@/components/ui/button";

// Sample destination data - this would typically come from an API or CMS
const destinations = [
  {
    name: "Germany",
    slug: "germany",
    flagSrc: "/images/flags/germany.svg",
    imageSrc: "/images/destinations/germany-hero.jpg",
    universityCount: 150,
    description: "Study in Germany, a top destination for international students offering world-class education, diverse programs, and innovation opportunities."
  },
  {
    name: "Ireland",
    slug: "ireland",
    flagSrc: "/images/flags/ireland.svg",
    imageSrc: "/images/destinations/ireland-hero.jpg",
    universityCount: 34,
    description: "Discover Ireland's welcoming culture, renowned universities, and excellent higher education system with English-taught programs."
  },
  {
    name: "Poland",
    slug: "poland",
    flagSrc: "/images/flags/poland.svg",
    imageSrc: "/images/destinations/poland-hero.jpg",
    universityCount: 72,
    description: "Experience Poland's growing education hub with affordable tuition, high-quality programs, and a rich cultural heritage."
  },
  {
    name: "Canada",
    slug: "canada",
    flagSrc: "/images/flags/canada.svg",
    imageSrc: "/images/destinations/canada-hero.jpg",
    universityCount: 96,
    description: "Canada offers internationally recognized degrees, diverse culture, and post-graduation work opportunities in a safe environment."
  },
  {
    name: "United States",
    slug: "usa",
    flagSrc: "/images/flags/usa.svg",
    imageSrc: "/images/destinations/usa-hero.jpg",
    universityCount: 200,
    description: "Study in the USA for cutting-edge research, diverse campus experiences, and global networking opportunities."
  },
  {
    name: "United Kingdom",
    slug: "uk",
    flagSrc: "/images/flags/uk.svg",
    imageSrc: "/images/destinations/uk-hero.jpg",
    universityCount: 130,
    description: "The UK offers prestigious institutions, tradition of academic excellence, and a vibrant cultural landscape for international students."
  }
];

export function DestinationsSection() {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--background))] to-transparent -z-10" />
      
      <div className="container">
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl mb-4">
            Study Destinations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore premier education opportunities across the globe. Find the perfect destination for your academic journey.
          </p>
        </motion.div>
        
        {isMobile ? (
          // Mobile carousel view
          <div className="mb-8">
            <DestinationCarousel>
              {destinations.map((destination) => (
                <div key={destination.slug} className="px-4">
                  <CountryCard
                    name={destination.name}
                    slug={destination.slug}
                    flagSrc={destination.flagSrc}
                    imageSrc={destination.imageSrc}
                    universityCount={destination.universityCount}
                    description={destination.description}
                  />
                </div>
              ))}
            </DestinationCarousel>
          </div>
        ) : (
          // Desktop grid view
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: Math.min(index * 0.1, 0.3) 
                }}
              >
                <CountryCard
                  name={destination.name}
                  slug={destination.slug}
                  flagSrc={destination.flagSrc}
                  imageSrc={destination.imageSrc}
                  universityCount={destination.universityCount}
                  description={destination.description}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="flex justify-center mt-8">
          <Button 
            asChild
            variant="outline" 
            size="lg"
            className="rounded-full hover-lift transition-all duration-300"
          >
            <motion.a
              href="/destinations"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Explore All Destinations
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </motion.a>
          </Button>
        </div>
      </div>
    </section>
  );
} 