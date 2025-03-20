import { FC } from 'react';
import { 
  Briefcase, 
  Home, 
  Globe
} from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { OptionButton } from './OptionButton';

interface FuturePlansQuestionProps {
  value: string;
  onChange: (value: string) => void;
  isActive: boolean;
}

const plansOptions = [
  {
    label: 'Work Abroad',
    sublabel: 'Start an international career',
    Icon: Briefcase,
    value: 'Work Abroad'
  },
  {
    label: 'Return Home',
    sublabel: 'Bring knowledge back',
    Icon: Home,
    value: 'Return Home'
  },
  {
    label: 'Flexible Plans',
    sublabel: 'Keeping options open',
    Icon: Globe,
    value: 'Flexible Plans'
  }
];

export const FuturePlansQuestion: FC<FuturePlansQuestionProps> = ({
  value,
  onChange,
  isActive
}) => {
  return (
    <QuestionCard
      title="Where do you see yourself after graduating?"
      description="Your post-graduation plans help us find destinations with the right opportunities."
      progress={84}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {plansOptions.map((option) => {
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