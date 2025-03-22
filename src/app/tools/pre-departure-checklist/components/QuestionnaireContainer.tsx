import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { StudyLevelQuestion } from "./StudyLevelQuestion"
import { CountryQuestion } from "./CountryQuestion"
import { DepartureTimeQuestion } from "./DepartureTimeQuestion"
import { ChecklistResults } from "./ChecklistResults"

// Total number of steps in the questionnaire
const TOTAL_STEPS = 3;

export function QuestionnaireContainer() {
  const [started, setStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState({
    studyLevel: "",
    country: "",
    departureTime: "",
  })

  const updateAnswer = (field: keyof typeof answers, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
    
    // For the last question, don't auto-advance
    if (field !== "departureTime") {
      // Auto advance to next question after a short delay
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 500)
    } else {
      // For departure time selection, we'll show the results instead
      setTimeout(() => {
        setShowResults(true)
      }, 500)
    }
  }

  const resetQuestionnaire = () => {
    setAnswers({
      studyLevel: "",
      country: "",
      departureTime: "",
    });
    setCurrentStep(0);
    setShowResults(false);
  }

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
            Pre-Departure Checklist ✈️
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground"
          >
            Get a personalized checklist of everything you need to prepare<br />
            before departing for your studies abroad.
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
    )
  }

  if (showResults) {
    return <ChecklistResults answers={answers} onReset={resetQuestionnaire} />
  }

  return (
    <div className="min-h-[80vh] w-full px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <StudyLevelQuestion
              key="study-level"
              value={answers.studyLevel}
              onChange={(value) => updateAnswer("studyLevel", value)}
              isActive={true}
            />
          )}
          
          {currentStep === 1 && (
            <CountryQuestion
              key="country"
              value={answers.country}
              onChange={(value) => updateAnswer("country", value)}
              isActive={true}
            />
          )}
          
          {currentStep === 2 && (
            <DepartureTimeQuestion
              key="departure-time"
              value={answers.departureTime}
              onChange={(value) => updateAnswer("departureTime", value)}
              isActive={true}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 