import { cn } from "@/lib/utils"
import { UserCheck, Building2, FileCheck, Trophy } from 'lucide-react'

interface TimelineStepProps {
  day: string
  title: string
  description: string
  icon: React.ReactNode
}

function TimelineStep({ day, title, description, icon }: TimelineStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center mb-4 backdrop-blur-sm">
        {icon}
      </div>
      <div className="font-semibold text-lg mb-2 text-white/90 dark:text-white/90">{day}</div>
      <h3 className="font-bold mb-2 text-white dark:text-white">{title}</h3>
      <p className="text-sm text-white/80 dark:text-white/70 max-w-[250px]">{description}</p>
    </div>
  )
}

export function JourneyTimeline() {
  const steps = [
    {
      day: "Step 1",
      title: "Let's Check Your Profile",
      description: "Share your academic journey with us. Your grades could unlock doors to top public universities!",
      icon: <UserCheck className="w-10 h-10 text-white" />
    },
    {
      day: "Step 2",
      title: "Find Your Perfect Match",
      description: "Discover universities where your profile stands out. Merit-based admissions only!",
      icon: <Building2 className="w-10 h-10 text-white" />
    },
    {
      day: "Step 3",
      title: "Get Your Docs Ready",
      description: "Your step-by-step guide to preparing perfect documents. No detail missed!",
      icon: <FileCheck className="w-10 h-10 text-white" />
    },
    {
      day: "Step 4",
      title: "Submit & Succeed",
      description: "Your journey from application to admission. Get ready to celebrate your success!",
      icon: <Trophy className="w-10 h-10 text-white" />
    }
  ]

  return (
    <section className="py-20 bg-blue-600 dark:bg-blue-900 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-600/20 dark:from-blue-800/20 dark:to-blue-900/20 pointer-events-none" />
      
      <div className="container relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white dark:text-white">
          Your Path to Merit-Based Admission
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-10 left-0 right-0 h-[1px] bg-white/20 dark:bg-white/10 hidden md:block" />
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <TimelineStep key={index} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 