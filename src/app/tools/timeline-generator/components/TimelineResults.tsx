"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Check, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { getCurrentYear, getNextYear } from "@/lib/utils";
import confetti from 'canvas-confetti';
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface TimelineResultsProps {
  answers: {
    startDate?: string;
    studyLevel?: string;
    country?: string;
    currentStatus?: string[];
  };
  onReset: () => void;
}

interface TimelineEvent {
  title: string;
  description: string;
  deadline: string;
  status: "completed" | "upcoming" | "urgent";
  category: string;
}

const startDateMap = {
  "fall-2024": `Fall ${getCurrentYear()}`,
  "spring-2025": `Spring ${getNextYear()}`,
  "fall-2025": `Fall ${getNextYear()}`,
  "spring-2026": `Spring ${getNextYear() + 1}`,
} as const;

export function TimelineResults({ answers, onReset }: TimelineResultsProps) {
  // Calculate timeline based on answers
  const timeline = generateTimeline(answers);

  useEffect(() => {
    // Trigger confetti when component mounts
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366f1', '#8b5cf6', '#3b82f6']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366f1', '#8b5cf6', '#3b82f6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Your Application Timeline</h1>
          <p className="text-lg text-muted-foreground">
            Here's your personalized timeline to help you stay on track with your application process.
            Make sure to save it and set reminders for important deadlines.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {Object.entries(groupTimelineByCategory(timeline)).map(([category, events], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-4">{category}</h2>
              <div className="space-y-4">
                {events.map((event, eventIndex) => (
                  <TimelineCard
                    key={eventIndex}
                    event={event}
                    delay={categoryIndex * 0.1 + eventIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
}

function TimelineCard({ event, delay }: { event: TimelineEvent; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <Card className="p-4 relative">
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="text-xs font-medium">
            Deadline: {event.deadline}
          </Badge>
        </div>
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full ${getStatusColor(event.status)}`}>
            {getStatusIcon(event.status)}
          </div>
          <div className="flex-1 pr-24">
            <h3 className="font-medium">{event.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function getStatusColor(status: TimelineEvent["status"]) {
  switch (status) {
    case "completed":
      return "bg-green-500/10 text-green-500";
    case "urgent":
      return "bg-red-500/10 text-red-500";
    default:
      return "bg-blue-500/10 text-blue-500";
  }
}

function getStatusIcon(status: TimelineEvent["status"]) {
  switch (status) {
    case "completed":
      return <Check className="w-4 h-4" />;
    case "urgent":
      return <Clock className="w-4 h-4" />;
    default:
      return <Calendar className="w-4 h-4" />;
  }
}

function generateTimeline(answers: TimelineResultsProps["answers"]): TimelineEvent[] {
  const timeline: TimelineEvent[] = [];
  const startDate = answers.startDate || "fall-2024";
  const completedTasks = answers.currentStatus || [];
  const country = answers.country || "germany";
  const studyLevel = answers.studyLevel || "masters";

  // Add events based on start date and completed tasks
  if (!completedTasks.includes("language-test")) {
    timeline.push({
      title: "Language Test Preparation",
      description: getLanguageRequirementDescription(country, studyLevel),
      deadline: getDeadline(startDate, -8),
      status: "upcoming",
      category: "Test Preparation",
    });
  }

  if (!completedTasks.includes("standardized-tests")) {
    // Only add GRE/GMAT for Master's and PhD programs
    if (studyLevel !== "bachelors") {
      timeline.push({
        title: "Standardized Tests",
        description: "Complete GRE/GMAT if required by your program",
        deadline: getDeadline(startDate, -7),
        status: "upcoming",
        category: "Test Preparation",
      });
    }
  }

  if (!completedTasks.includes("academic-docs")) {
    timeline.push({
      title: "Academic Documents",
      description: getAcademicDocsDescription(country, studyLevel),
      deadline: getDeadline(startDate, -6),
      status: "upcoming",
      category: "Documentation",
    });
  }

  // Add common events regardless of current status
  timeline.push({
    title: "University Applications",
    description: getUniversityApplicationDescription(country, studyLevel),
    deadline: getDeadline(startDate, -5),
    status: "upcoming",
    category: "Applications",
  });

  timeline.push({
    title: "Financial Documentation",
    description: getFinancialRequirementsDescription(country),
    deadline: getDeadline(startDate, -4),
    status: "upcoming",
    category: "Documentation",
  });

  timeline.push({
    title: "Visa Application",
    description: getVisaDescription(country),
    deadline: getDeadline(startDate, country === "germany" ? -3 : -2),
    status: "upcoming",
    category: "Visa Process",
  });

  // Add country-specific requirements
  if (country === "germany") {
    timeline.push({
      title: "Health Insurance",
      description: "Arrange German health insurance coverage",
      deadline: getDeadline(startDate, -2),
      status: "upcoming",
      category: "Pre-departure",
    });
  }

  if (country === "netherlands") {
    timeline.push({
      title: "Housing Guarantee",
      description: "Secure housing guarantee document required for visa",
      deadline: getDeadline(startDate, -2),
      status: "upcoming",
      category: "Documentation",
    });
  }

  timeline.push({
    title: "Accommodation",
    description: getAccommodationDescription(country),
    deadline: getDeadline(startDate, -2),
    status: "upcoming",
    category: "Pre-departure",
  });

  timeline.push({
    title: "Travel Arrangements",
    description: "Book flights and plan your arrival",
    deadline: getDeadline(startDate, -1),
    status: "upcoming",
    category: "Pre-departure",
  });

  return timeline;
}

function getLanguageRequirementDescription(country: string, studyLevel: string): string {
  if (country === "germany") {
    return studyLevel === "bachelors" 
      ? "Register and prepare for TestDaF/DSH (C1 level required for most programs)"
      : "Register and prepare for TestDaF/DSH or IELTS/TOEFL (depending on program language)";
  }
  return studyLevel === "bachelors"
    ? "Register and prepare for IELTS/TOEFL (usually B2 level required)"
    : "Register and prepare for IELTS/TOEFL (usually C1 level required)";
}

function getAcademicDocsDescription(country: string, studyLevel: string): string {
  const baseText = country === "germany" 
    ? "Get documents certified by uni-assist: "
    : "Prepare and authenticate: ";

  switch (studyLevel) {
    case "bachelors":
      return baseText + "high school diploma, transcripts, and language certificates";
    case "masters":
      return baseText + "bachelor's degree, transcripts, and language certificates";
    case "phd":
      return baseText + "master's degree, transcripts, research proposal, and language certificates";
    default:
      return baseText + "academic documents and language certificates";
  }
}

function getBaseUniversityApplicationDescription(country: string): string {
  switch (country) {
    case "germany":
      return "Submit applications through uni-assist or directly to universities";
    case "netherlands":
      return "Submit applications through Studielink";
    case "ireland":
      return "Submit applications through individual university portals";
    default:
      return "Submit applications to your chosen universities";
  }
}

function getUniversityApplicationDescription(country: string, studyLevel: string): string {
  const baseText = getBaseUniversityApplicationDescription(country);
  
  switch (studyLevel) {
    case "bachelors":
      return baseText + " - Check NC (Numerus Clausus) requirements if applicable";
    case "masters":
      return baseText + " - Include CV and motivation letter";
    case "phd":
      return baseText + " - Include research proposal and potential supervisor contact";
    default:
      return baseText;
  }
}

function getFinancialRequirementsDescription(country: string): string {
  switch (country) {
    case "germany":
      return "Open blocked account and prepare proof of funds (€11,208)";
    case "netherlands":
      return "Prepare proof of sufficient funds (€11,000 per year)";
    case "ireland":
      return "Prepare proof of funds and apply for scholarships";
    default:
      return "Prepare proof of funds and apply for scholarships";
  }
}

function getVisaDescription(country: string): string {
  switch (country) {
    case "germany":
      return "Apply for German Student Visa (can take 6-8 weeks)";
    case "netherlands":
      return "Apply for MVV visa through university";
    case "ireland":
      return "Apply for Irish Student Visa";
    default:
      return "Apply for your student visa";
  }
}

function getAccommodationDescription(country: string): string {
  switch (country) {
    case "germany":
      return "Find accommodation through Studentenwerk or private options";
    case "netherlands":
      return "Arrange accommodation through university housing or private options";
    case "ireland":
      return "Arrange on-campus or private accommodation";
    default:
      return "Arrange your accommodation";
  }
}

function getDeadline(startDate: string, monthsOffset: number): string {
  // Parse the start date string to get semester and year
  const currentYear = getCurrentYear();
  const nextYear = getNextYear();
  
  let month: number;
  let year: number;
  
  switch (startDate) {
    case `fall-${currentYear}`:
      month = 9; // September
      year = currentYear;
      break;
    case `spring-${nextYear}`:
      month = 3; // March
      year = nextYear;
      break;
    case `fall-${nextYear}`:
      month = 9; // September
      year = nextYear;
      break;
    case `spring-${nextYear + 1}`:
      month = 3; // March
      year = nextYear + 1;
      break;
    default:
      // Default to next available semester if invalid date
      month = 9;
      year = currentYear;
  }

  const date = new Date(year, month - 1); // month is 0-based in Date constructor
  date.setMonth(date.getMonth() + monthsOffset);

  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function groupTimelineByCategory(timeline: TimelineEvent[]): Record<string, TimelineEvent[]> {
  return timeline.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {} as Record<string, TimelineEvent[]>);
} 