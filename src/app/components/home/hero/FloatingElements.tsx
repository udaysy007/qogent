"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FloatingElements() {
  return (
    <div className="relative h-full w-full">
      <motion.div
        className="absolute top-[20%] left-[10%] z-10"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
      >
        <div className="bg-[hsl(var(--chart-1))] p-4 rounded-lg shadow-lg">
          <Image
            src="/images/sections/graduation-cap.png"
            alt="Graduation Cap"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute top-[40%] right-[20%] z-20"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="bg-[hsl(var(--chart-2))] p-4 rounded-lg shadow-lg">
          <Image
            src="/images/sections/globe.png"
            alt="Globe"
            width={70}
            height={70}
            className="object-contain"
          />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-[30%] left-[30%] z-30"
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, 8, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 4.5,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="bg-[hsl(var(--chart-3))] p-4 rounded-lg shadow-lg">
          <Image
            src="/images/sections/books.png"
            alt="Books"
            width={65}
            height={65}
            className="object-contain"
          />
        </div>
      </motion.div>
      
      {/* Hero Background Image */}
      <motion.div
        className="absolute inset-0 z-0 rounded-lg overflow-hidden shadow-2xl border border-[hsl(var(--border))]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <Image
          src="/images/sections/hero-students.jpg"
          alt="International Students"
          fill
          className="object-cover opacity-70"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] to-transparent"></div>
      </motion.div>
    </div>
  );
} 