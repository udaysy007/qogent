import { FC } from 'react';
import { 
  Award, 
  Bookmark, 
  Hammer, 
  Scale
} from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { OptionButton } from './OptionButton';

interface AcademicProfileQuestionProps {
  value: string;
  onChange: (value: string) => void;
  isActive: boolean;
}

const profileOptions = [
  {
    label: 'High Achiever',
    sublabel: 'Rocking those 85%+ grades',
    Icon: Award,
    value: 'High Achiever'
  },
  {
    label: 'Strong',
    sublabel: 'Solid 75-85% performance',
    Icon: Bookmark,
    value: 'Strong'
  },
  {
    label: 'Projects Focus',
    sublabel: 'Great grades plus hands-on work',
    Icon: Hammer,
    value: 'Projects Focus'
  },
  {
    label: 'Well Rounded',
    sublabel: 'Balanced academics and experience',
    Icon: Scale,
    value: 'Well Rounded'
  }
];

export const AcademicProfileQuestion: FC<AcademicProfileQuestionProps> = ({
  value,
  onChange,
  isActive
}) => {
  return (
    <QuestionCard
      title="How would you describe yourself?"
      description="Let us know about your academic background to find the right fit."
      progress={42}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {profileOptions.map((option) => {
          const IconComponent = option.Icon;
          return (
            <OptionButton
              key={option.value}
              label={option.label}
              sublabel={option.sublabel}
              icon={<IconComponent className="w-6 h-6" />}
              isSelected={value === option.value}
              onClick={() => onChange(option.value)}
            />
          );
        })}
      </div>
    </QuestionCard>
  );
}; 