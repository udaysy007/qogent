import React from 'react'
import { cn } from "@/lib/utils"
import { UserCheck, Building2, FileCheck, Trophy, LucideIcon } from 'lucide-react'

interface TimelineStepProps {
  day: string
  title: string
  description: string
  icon: LucideIcon
  index: number
}

function TimelineStep({ day, title, description, icon: Icon, index }: TimelineStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={cn(
        "w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4",
        "relative transition-all duration-300 hover:scale-110 hover:bg-primary/5 dark:hover:bg-primary/10",
        "animate-fade-in z-10",
        "shadow-sm dark:shadow-primary/10"
      )}>
        {/* Pulsing ring effect */}
        <div className="absolute inset-0 rounded-full animate-ping-slow bg-primary/5 dark:bg-primary/10" />
        
        {/* Icon background for better contrast */}
        <div className="absolute inset-0 rounded-full bg-background" />
        
        {/* Checkpoint dot */}
        <div className="absolute -bottom-8 w-3 h-3 rounded-full bg-primary/80 animate-pulse" />
        
        <Icon 
          className="w-6 h-6 text-primary dark:text-primary transition-transform duration-300 hover:scale-110 relative z-10"
          style={{ animationDelay: `${index * 200}ms` }}
        />
      </div>
      <div className="font-semibold text-lg mb-2 text-muted-foreground mt-6">{day}</div>
      <h3 className="font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-[250px]">{description}</p>
    </div>
  )
}

export function JourneyTimeline() {
  const steps = [
    {
      day: "Step 1",
      title: "Let's Check Your Profile",
      description: "Share your academic journey with us. Your grades could unlock doors to top public universities!",
      icon: UserCheck
    },
    {
      day: "Step 2",
      title: "Find Your Perfect Match",
      description: "Discover universities where your profile stands out. Merit-based admissions only!",
      icon: Building2
    },
    {
      day: "Step 3",
      title: "Get Your Docs Ready",
      description: "Your step-by-step guide to preparing perfect documents. No detail missed!",
      icon: FileCheck
    },
    {
      day: "Step 4",
      title: "Submit & Succeed",
      description: "Your journey from application to admission. Get ready to celebrate your success!",
      icon: Trophy
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Your Path to Merit-Based Admission
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-[32px] left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 hidden md:block z-0" />
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <TimelineStep key={index} {...step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Add these styles to your globals.css or tailwind.config.js
const styles = `
@keyframes ping-slow {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.25;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

.animate-ping-slow {
  animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`; 