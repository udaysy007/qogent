import { FC, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  CheckCircle2,
  RefreshCw, 
  MapPin, 
  GraduationCap,
  Building,
  Wallet,
  Home,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { scoreCountries, countryDatabase, type UserPreferences, type CountryRecommendation } from '@/lib/destination-finder-utils';

interface ResultsScreenProps {
  answers: {
    studyLevel: string;
    fieldOfStudy: string;
    academicProfile: string;
    tuitionBudget: number;
    livingExpensesBudget: number;
    futurePlans: string;
    priorities: string[];
  };
  onReset: () => void;
}

// Map for country emoji flags
const countryEmojis: Record<string, string> = {
  "Germany": "🇩🇪",
  "Netherlands": "🇳🇱",
  "Canada": "🇨🇦",
  "USA": "🇺🇸",
  "UK": "🇬🇧",
  "France": "🇫🇷",
  "Italy": "🇮🇹",
  "Australia": "🇦🇺",
  "Japan": "🇯🇵",
  "Singapore": "🇸🇬",
  "Poland": "🇵🇱",
  "Ireland": "🇮🇪",
  "New Zealand": "🇳🇿",
  "Sweden": "🇸🇪"
};

// Map for country images - using high quality images
const countryImages: Record<string, string> = {
  "Germany": "https://images.unsplash.com/photo-1501952476817-d7ae22e8ee4e?q=80&w=1920&h=400&fit=crop&auto=format",
  "Netherlands": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1920&h=400&fit=crop&auto=format",
  "Canada": "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1920&h=400&fit=crop&auto=format",
  "USA": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1920&h=400&fit=crop&auto=format",
  "UK": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1920&h=400&fit=crop&auto=format",
  "France": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1920&h=400&fit=crop&auto=format",
  "Italy": "https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=1920&h=400&fit=crop&auto=format",
  "Australia": "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?q=80&w=1920&h=400&fit=crop&auto=format",
  "Japan": "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1920&h=400&fit=crop&auto=format",
  "Singapore": "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=1920&h=400&fit=crop&auto=format",
  "Poland": "https://images.unsplash.com/photo-1606994868513-d90cb035f9a0?q=80&w=1920&h=400&fit=crop&auto=format",
  "Ireland": "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=1920&h=400&fit=crop&auto=format",
  "New Zealand": "https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=1920&h=400&fit=crop&auto=format",
  "Sweden": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=1920&h=400&fit=crop&auto=format"
};

// Helper to create slug from country name
const createSlug = (country: string): string => {
  return country.toLowerCase().replace(/\s+/g, '-');
};

export const ResultsScreen: FC<ResultsScreenProps> = ({
  answers,
  onReset
}) => {
  // Trigger confetti when the component mounts
  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    // Continuous celebration for a few seconds
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      confetti({
        particleCount: 2,
        angle: randomInRange(60, 120),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.2, 0.4) },
        colors: ['#6366F1', '#EC4899', '#22C55E', '#F97316']
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);
  
  // Convert answers to UserPreferences format for scoring
  const userPreferences: UserPreferences = {
    studyLevel: answers.studyLevel as any,
    fieldOfStudy: answers.fieldOfStudy as any,
    academicPerformance: answers.academicProfile as any,
    tuitionBudget: answers.tuitionBudget,
    livingExpensesBudget: answers.livingExpensesBudget,
    postGradPlans: answers.futurePlans as any,
    scholarshipNeeds: answers.tuitionBudget < 10000 ? "Essential - I need financial aid" : "Important - But not required",
    workPlans: "Yes, part-time work is important",
    preferredRegions: [],
    languagePreference: "English only",
    locationType: "No preference",
    importantFactors: answers.priorities.map(priority => {
      // Map user priorities to valid ImportantFactors
      switch(priority) {
        case "Quality Education": return "Education Quality";
        case "Affordable": return "Cost";
        case "Career Opportunities": return "Job Market";
        case "Easy Visa Process": return "Visa Process";
        case "Safe Environment": return "Safety";
        case "Quality of Life": return "Lifestyle";
        default: return "Education Quality"; // fallback
      }
    }) as Array<"Education Quality" | "Cost" | "Job Market" | "Visa Process" | "Safety" | "Lifestyle">
  };
  
  // Log the inputs for debugging
  console.log("User preferences passed to scoring function:", userPreferences);
  
  // Get country recommendations
  const countryRecommendations = useMemo(() => {
    // Log the inputs for debugging
    console.log("Calculating recommendations with preferences:", userPreferences);
    
    // Use the scoring function directly without try-catch fallback
    const recommendations = scoreCountries(userPreferences);
    console.log("Raw scoring results:", recommendations.map(c => `${c.country}: ${c.score}%`));
    return recommendations;
  }, [userPreferences]);
  
  // Take top 5 results
  const topResults = countryRecommendations.slice(0, 5).map(result => ({
    ...result,
    emoji: countryEmojis[result.country] || "🌍",
    slug: createSlug(result.country),
    bgImage: countryImages[result.country] || "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?q=80&w=1920&h=400&fit=crop&auto=format"
  }));
  
  // Log the top results
  console.log("Top results:", topResults.map(r => r.country));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full py-8 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 15,
              delay: 0.1
            }}
            className="mb-2 inline-block"
          >
            <span className="text-5xl">🎓</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary/50 bg-clip-text text-transparent mb-4"
          >
            Your Perfect Study Destinations
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Based on your unique preferences, we've found these destinations that align perfectly with your goals and budget.
          </motion.p>
        </div>

        {/* Your study profile summary - Improved design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6 bg-primary/5 border border-primary/20 dark:bg-card/80">
            <h3 className="font-medium text-base mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span>Your Study Profile</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Study Level</p>
                  <p className="font-medium">{answers.studyLevel}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Building className="w-4 h-4 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Field of Study</p>
                  <p className="font-medium">{answers.fieldOfStudy}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Wallet className="w-4 h-4 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Tuition Budget</p>
                  <p className="font-medium">€{answers.tuitionBudget.toLocaleString()}/year</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Home className="w-4 h-4 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Living Expenses</p>
                  <p className="font-medium">€{answers.livingExpensesBudget.toLocaleString()}/month</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-sm text-muted-foreground mb-2">Your Priorities</p>
              <div className="flex flex-wrap gap-2">
                {answers.priorities.map(priority => (
                  <Badge key={priority} variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors">
                    {priority}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="space-y-8">
          {topResults.length > 0 ? (
            topResults.map((result, index) => (
              <motion.div
                key={result.country}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.7 + (index * 0.2),
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <Card className="overflow-hidden border-transparent hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                  {/* Top banner image - Higher quality */}
                  <div 
                    className="h-40 md:h-48 w-full relative bg-cover bg-center"
                    style={{ backgroundImage: `url(${result.bgImage})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <span className="text-4xl">{result.emoji}</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">{result.country}</h3>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="absolute top-4 right-4 text-primary-foreground bg-primary border-none px-3 py-1 font-medium text-sm"
                    >
                      {result.score}% Match
                    </Badge>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {result.highlights.map((highlight) => (
                        <Badge 
                          key={highlight} 
                          className="flex items-center gap-1 p-1.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="mt-4 text-muted-foreground">
                      {result.description}
                    </p>
                    
                    <div className="mt-6">
                      <Button asChild className="w-full gap-2">
                        <Link href={`/destinations/${result.slug}`}>
                          <MapPin className="w-4 h-4" /> Explore {result.country} Programs
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center p-8">
              <p className="text-lg text-muted-foreground">No matching destinations found with your current preferences.</p>
              <Button 
                onClick={onReset}
                variant="default"
                className="mt-4"
              >
                Try Different Preferences
              </Button>
            </div>
          )}
        </div>
        
        {topResults.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 flex justify-center"
          >
            <Button 
              onClick={onReset} 
              variant="outline" 
              size="lg"
              className="gap-2 px-8"
            >
              <RefreshCw className="w-4 h-4" /> Try Again with Different Preferences
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}; 