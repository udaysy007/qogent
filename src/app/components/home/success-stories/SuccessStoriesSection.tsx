"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SuccessStoryCard } from "./SuccessStoryCard";
import { VideoTestimonial } from "./VideoTestimonial";

// Sample success stories data - this would typically come from an API or CMS
const successStories = [
  {
    id: "1",
    name: "Arjun Patel",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320&h=320&fit=crop&auto=format",
    university: "Technical University of Munich",
    country: "Germany",
    countryFlag: "/images/flags/germany.svg",
    course: "MSc Computer Science",
    year: "2022",
    quote: "Qogent helped me navigate the complex application process and secure a scholarship. Their guidance was invaluable in my journey to studying in Germany.",
    videoSrc: "",
    hasVideo: false
  },
  {
    id: "2",
    name: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=320&h=320&fit=crop&auto=format",
    university: "University College Dublin",
    country: "Ireland",
    countryFlag: "/images/flags/ireland.svg",
    course: "MBA",
    year: "2021",
    quote: "From visa preparation to finding accommodation, Qogent provided end-to-end support that made my transition to studying abroad smooth and stress-free.",
    videoSrc: "",
    hasVideo: false
  },
  {
    id: "3",
    name: "Mohammed Ahmed",
    image: "https://images.unsplash.com/photo-1563833717765-00462801314e?w=320&h=320&fit=crop&auto=format",
    university: "Warsaw University of Technology",
    country: "Poland",
    countryFlag: "/images/flags/poland.svg",
    course: "MSc Mechanical Engineering",
    year: "2023",
    quote: "With Qogent's help, I was able to find a program that perfectly matched my career goals and budget. Their personalized approach made all the difference.",
    videoSrc: "",
    hasVideo: false
  }
];

export function SuccessStoriesSection() {
  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    title: string;
    isOpen: boolean;
  }>({
    src: "",
    title: "",
    isOpen: false
  });

  const handleVideoClick = (story: typeof successStories[0]) => {
    if (!story.hasVideo) return;
    
    setSelectedVideo({
      src: story.videoSrc,
      title: `${story.name}'s Experience at ${story.university}`,
      isOpen: true
    });
  };

  const closeVideoModal = () => {
    setSelectedVideo(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 relative bg-[hsl(var(--secondary))/5 dark:bg-[hsl(var(--secondary))]/10]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-radial from-[hsl(var(--chart-2))/20] to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-radial from-[hsl(var(--chart-5))/20] to-transparent blur-3xl" />
      </div>
      
      <div className="container relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl mb-4">
            Student Success Stories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real students who achieved their dreams with our guidance. Learn from their experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SuccessStoryCard
                name={story.name}
                image={story.image}
                university={story.university}
                country={story.country}
                countryFlag={story.countryFlag}
                course={story.course}
                year={story.year}
                quote={story.quote}
                hasVideo={story.hasVideo}
                onVideoClick={() => handleVideoClick(story)}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Button 
            asChild
            size="lg"
            className="rounded-full hover-lift transition-all duration-300"
          >
            <motion.a
              href="/success-stories"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Read More Success Stories
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
      
      {/* Video testimonial modal */}
      <VideoTestimonial
        videoSrc={selectedVideo.src}
        title={selectedVideo.title}
        isOpen={selectedVideo.isOpen}
        onClose={closeVideoModal}
      />
    </section>
  );
} 