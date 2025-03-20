import { useState } from "react"
import { StudyLevelQuestion } from "./StudyLevelQuestion"
import { FieldOfStudyQuestion } from "./FieldOfStudyQuestion"
import { AcademicProfileQuestion } from "./AcademicProfileQuestion"
import { BudgetRangeQuestion } from "./BudgetRangeQuestion"
import { LivingExpensesQuestion } from "./LivingExpensesQuestion"
import { FuturePlansQuestion } from "./FuturePlansQuestion"
import { PrioritiesQuestion } from "./PrioritiesQuestion"
import { ResultsScreen } from "./ResultsScreen"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"

// Total number of steps in the questionnaire
const TOTAL_STEPS = 7;

export function QuestionnaireContainer() {
  const [started, setStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState({
    studyLevel: "",
    fieldOfStudy: "",
    academicProfile: "",
    tuitionBudget: 0,
    livingExpensesBudget: 0,
    futurePlans: "",
    priorities: [] as string[],
  })

  const updateAnswer = (field: keyof typeof answers, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
    
    // For the last question, don't auto-advance
    if (field !== "priorities") {
      // Auto advance to next question after a short delay
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 500)
    } else {
      // For priorities, we'll show the results instead
      setTimeout(() => {
        setShowResults(true)
      }, 500)
    }
  }

  const resetQuestionnaire = () => {
    setAnswers({
      studyLevel: "",
      fieldOfStudy: "",
      academicProfile: "",
      tuitionBudget: 0,
      livingExpensesBudget: 0,
      futurePlans: "",
      priorities: [] as string[],
    });
    setCurrentStep(0);
    setShowResults(false);
  }

  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
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
            Find Your Perfect Study Destination 🌎
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground"
          >
            2000+ students found their path with us.<br />
            Let's find yours in just 2 minutes!
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
    return <ResultsScreen answers={answers} onReset={resetQuestionnaire} />
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
              <FieldOfStudyQuestion
                value={answers.fieldOfStudy}
                onChange={(value) => updateAnswer("fieldOfStudy", value)}
                isActive={true}
              />
            )}
            {currentStep === 2 && (
              <AcademicProfileQuestion
                value={answers.academicProfile}
                onChange={(value) => updateAnswer("academicProfile", value)}
                isActive={true}
              />
            )}
            {currentStep === 3 && (
              <BudgetRangeQuestion
                value={answers.tuitionBudget}
                onChange={(value) => updateAnswer("tuitionBudget", value)}
                isActive={true}
              />
            )}
            {currentStep === 4 && (
              <LivingExpensesQuestion
                value={answers.livingExpensesBudget}
                onChange={(value) => updateAnswer("livingExpensesBudget", value)}
                isActive={true}
              />
            )}
            {currentStep === 5 && (
              <FuturePlansQuestion
                value={answers.futurePlans}
                onChange={(value) => updateAnswer("futurePlans", value)}
                isActive={true}
              />
            )}
            {currentStep === 6 && (
              <PrioritiesQuestion
                value={answers.priorities}
                onChange={(value) => updateAnswer("priorities", value)}
                isActive={true}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {/* Back button */}
          {currentStep > 0 && (
            <Button
              variant="ghost"
              onClick={goToPreviousStep}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          )}
          
          {/* Progress dots */}
          <div className="flex-1 flex justify-center gap-3">
            {Array.from({ length: TOTAL_STEPS }).map((_, step) => (
              <motion.button
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  step === currentStep
                    ? "bg-primary scale-125"
                    : step < currentStep
                    ? "bg-primary/50"
                    : "bg-muted"
                }`}
                onClick={() => step < currentStep && setCurrentStep(step)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                disabled={step > currentStep}
              />
            ))}
          </div>
          
          {/* Spacer to keep alignment */}
          <div className="w-[72px]"></div>
        </div>
      </div>
    </div>
  )
} 