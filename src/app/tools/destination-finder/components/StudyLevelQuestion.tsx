import { GraduationCap, BookOpen, Microscope, Briefcase } from "lucide-react"
import { QuestionCard } from "./QuestionCard"
import { OptionButton } from "./OptionButton"

interface StudyLevelQuestionProps {
  value: string
  onChange: (value: string) => void
  isActive: boolean
}

const studyLevelOptions = [
  {
    label: "Bachelors",
    sublabel: "Just starting my university journey",
    icon: <GraduationCap className="w-5 h-5" />,
    value: "bachelors"
  },
  {
    label: "Masters",
    sublabel: "Ready to level up my expertise",
    icon: <BookOpen className="w-5 h-5" />,
    value: "masters"
  },
  {
    label: "PhD",
    sublabel: "Diving deep into research",
    icon: <Microscope className="w-5 h-5" />,
    value: "phd"
  },
  {
    label: "Professional",
    sublabel: "Focused on specific skills",
    icon: <Briefcase className="w-5 h-5" />,
    value: "professional"
  }
]

export function StudyLevelQuestion({
  value,
  onChange,
  isActive
}: StudyLevelQuestionProps) {
  return (
    <QuestionCard
      title="Tell me about your study plans"
      progress={14}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studyLevelOptions.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            sublabel={option.sublabel}
            icon={option.icon}
            isSelected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </QuestionCard>
  )
} 