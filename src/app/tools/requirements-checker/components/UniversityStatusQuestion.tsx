import { Building2, GraduationCap, Search } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface UniversityStatusQuestionProps {
  value: string
  onChange: (value: string) => void
  isActive: boolean
}

const universityStatusOptions = [
  {
    label: "Selected University",
    sublabel: "I have chosen my university and program",
    icon: <GraduationCap className="h-5 w-5" />,
    value: "selected"
  },
  {
    label: "Exploring Options",
    sublabel: "I'm researching universities and programs",
    icon: <Search className="h-5 w-5" />,
    value: "exploring"
  },
  {
    label: "Multiple Applications",
    sublabel: "I'm applying to multiple universities",
    icon: <Building2 className="h-5 w-5" />,
    value: "multiple"
  }
]

export function UniversityStatusQuestion({
  value,
  onChange,
  isActive
}: UniversityStatusQuestionProps) {
  return (
    <QuestionCard
      title="What's your university application status?"
      description="Tell us about your university selection process to get relevant requirements."
      progress={75}
      isActive={isActive}
    >
      <div className="grid gap-4">
        {universityStatusOptions.map((option) => (
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