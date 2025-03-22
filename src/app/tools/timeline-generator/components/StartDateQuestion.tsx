"use client";

import { Calendar } from "lucide-react";
import { QuestionCard } from "@/components/ui/question-card";
import { OptionButton } from "@/components/ui/option-button";
import { getCurrentYear, getNextYear } from "@/lib/utils";

interface StartDateQuestionProps {
  value: string;
  onChange: (value: string) => void;
  isActive: boolean;
}

// Get current month to determine if we should show current year's fall semester
const currentMonth = new Date().getMonth(); // 0-11
const showCurrentYearFall = currentMonth < 7; // Show if before August

const startDateOptions = [
  ...(showCurrentYearFall ? [{
    label: `Fall ${getCurrentYear()}`,
    sublabel: "September - October",
    value: `fall-${getCurrentYear()}`,
  }] : []),
  {
    label: `Spring ${getNextYear()}`,
    sublabel: "March - April",
    value: `spring-${getNextYear()}`,
  },
  {
    label: `Fall ${getNextYear()}`,
    sublabel: "September - October",
    value: `fall-${getNextYear()}`,
  },
  {
    label: `Spring ${getNextYear() + 1}`,
    sublabel: "March - April",
    value: `spring-${getNextYear() + 1}`,
  },
];

export function StartDateQuestion({
  value,
  onChange,
  isActive,
}: StartDateQuestionProps) {
  return (
    <QuestionCard
      title="When do you plan to start your studies?"
      description="Choose your intended semester to get a personalized timeline for your application process."
      icon={Calendar}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {startDateOptions.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            sublabel={option.sublabel}
            isSelected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </QuestionCard>
  );
} 