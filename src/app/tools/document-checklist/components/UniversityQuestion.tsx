import { GraduationCap, Search, CheckCircle } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface UniversityQuestionProps {
  value: string
  onChange: (value: string) => void
  isActive: boolean
}

const universityOptions = [
  {
    label: "I have chosen my university",
    sublabel: "I know where I want to study",
    icon: <CheckCircle className="w-5 h-5" />,
    value: "selected"
  },
  {
    label: "I need help choosing",
    sublabel: "Still exploring my options",
    icon: <Search className="w-5 h-5" />,
    value: "exploring"
  },
  {
    label: "Applying to multiple universities",
    sublabel: "Planning to apply to several institutions",
    icon: <GraduationCap className="w-5 h-5" />,
    value: "multiple"
  }
]

export function UniversityQuestion({
  value,
  onChange,
  isActive
}: UniversityQuestionProps) {
  return (
    <QuestionCard
      title="What's your university status?"
      description="Tell us about your university selection process."
      progress={100}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {universityOptions.map((option) => (
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