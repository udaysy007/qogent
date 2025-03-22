import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { StudyLevelQuestion } from "./StudyLevelQuestion"
import { CountryQuestion } from "./CountryQuestion"
import { UniversityQuestion } from "./UniversityQuestion"
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
    university: "",
  })

  const updateAnswer = (field: keyof typeof answers, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
    
    // For the last question, don't auto-advance
    if (field !== "university") {
      // Auto advance to next question after a short delay
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 500)
    } else {
      // For university selection, we'll show the results instead
      setTimeout(() => {
        setShowResults(true)
      }, 500)
    }
  }

  const resetQuestionnaire = () => {
    setAnswers({
      studyLevel: "",
      country: "",
      university: "",
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
            Get Your Document Checklist 📋
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground"
          >
            Answer a few questions and we'll create a personalized checklist<br />
            of documents you'll need for your study abroad journey.
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
              <StudyLevelQuestion
                value={answers.studyLevel}
                onChange={(value) => updateAnswer("studyLevel", value)}
                isActive={true}
              />
            )}
            {currentStep === 1 && (
              <CountryQuestion
                value={answers.country}
                onChange={(value) => updateAnswer("country", value)}
                isActive={true}
              />
            )}
            {currentStep === 2 && (
              <UniversityQuestion
                value={answers.university}
                onChange={(value) => updateAnswer("university", value)}
                isActive={true}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
} 