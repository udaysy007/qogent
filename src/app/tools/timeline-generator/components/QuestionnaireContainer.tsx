"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { StartDateQuestion } from "./StartDateQuestion";
import { StudyLevelQuestion } from "./StudyLevelQuestion";
import { CountryQuestion } from "./CountryQuestion";
import { CurrentStatusQuestion } from "./CurrentStatusQuestion";
import { TimelineResults } from "./TimelineResults";

// Total number of steps in the questionnaire
const TOTAL_STEPS = 4;

interface TimelineAnswers {
  startDate?: string;
  studyLevel?: string;
  country?: string;
  currentStatus?: string[];
}

export function QuestionnaireContainer() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<TimelineAnswers>({});

  const updateAnswer = (field: keyof TimelineAnswers, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    
    // For the last question, don't auto-advance
    if (field !== "currentStatus") {
      // Auto advance to next question after a short delay
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 500);
    } else {
      // For current status, we'll show the results instead
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };

  const resetQuestionnaire = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 py-12"
      >
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            Timeline Generator 📅
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground"
          >
            Get a personalized timeline for your study abroad journey.<br />
            We'll help you plan your application process and meet all important deadlines.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              size="lg"
              onClick={() => setStarted(true)}
              className="mt-8 text-lg px-8 py-6 rounded-full"
            >
              Start Now <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (showResults) {
    return <TimelineResults answers={answers} onReset={resetQuestionnaire} />;
  }

  return (
    <div className="min-h-[80vh] w-full relative px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/2 to-background" />
      </div>

      {/* Container for questions */}
      <div className="w-full py-8 md:py-12 max-w-4xl mx-auto">
        {/* Question components */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {currentStep === 0 && (
              <StartDateQuestion
                value={answers.startDate}
                onChange={(value) => updateAnswer("startDate", value)}
                isActive={true}
              />
            )}
            {currentStep === 1 && (
              <StudyLevelQuestion
                value={answers.studyLevel}
                onChange={(value) => updateAnswer("studyLevel", value)}
                isActive={true}
              />
            )}
            {currentStep === 2 && (
              <CountryQuestion
                value={answers.country}
                onChange={(value) => updateAnswer("country", value)}
                isActive={true}
              />
            )}
            {currentStep === 3 && (
              <CurrentStatusQuestion
                value={answers.currentStatus}
                onChange={(value) => updateAnswer("currentStatus", value)}
                isActive={true}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 