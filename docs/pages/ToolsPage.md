# Qogent Tools Page Design Plan

## Overview
The Tools page will provide interactive, value-adding utilities focused on helping students make informed decisions about studying abroad. The centerpiece will be the "Which Country is Right for You?" tool, with secondary tools that support the decision-making process.

## Key Goals
1. Guide students to discover their ideal study destination through an engaging, interactive assessment
2. Provide practical, actionable insights through user-friendly tools
3. Capture qualified leads through value-first interactions
4. Showcase Qogent's expertise and data-driven approach
5. Direct users to relevant country platforms based on their results

## "Which Country is Right for You?" Tool

### Layout
- **Multi-step interactive questionnaire** with progress indicator
- **Clean, focused interface** eliminating distractions
- **Mobile-optimized experience** for on-the-go completion

### Components
- **Welcome/Introduction Card**:
  - Brief explanation of the assessment process
  - "This will take about 3 minutes" indicator
  - Animated illustration of the journey
  - "Start Assessment" CTA button with pulse animation

- **Question Screens** (5-7 questions max):
  - One question per screen with smooth transitions
  - Visual answer options where appropriate
  - Progress bar showing completion percentage
  - "Previous" and "Next" navigation options

- **Key Question Topics**:
  - Academic background and interests
  - Budget constraints/considerations
  - Language proficiency/preferences
  - Career goals/post-graduation plans
  - Preferred duration of study
  - Living environment preferences
  - Timeline for beginning studies

- **Results Dashboard**:
  - Top 3 country matches with percentage match indicators
  - Radar chart visualizing fit across different factors
  - Brief explanation of why each country matches
  - "Explore [Country]" buttons to relevant platforms
  - "Save Results" and "Share Results" options

### Content Style
- **Conversational questions**: "Do you prefer city buzz or campus calm?"
- **Encouraging progress feedback**: "Great choice! Now let's talk about your budget..."
- **Results explanation**: "Germany is your top match because of your engineering background and budget preferences"

## Cost Calculator Tool

### Layout
- **Simplified calculator interface** with country selection and basic inputs
- **Visual results display** showing breakdown of expenses
- **Comparative view option** for multiple countries

### Components
- **Input Section**:
  - Country selector with flag icons
  - Program duration selector (1 year, 2 years, etc.)
  - Lifestyle level slider (budget, comfortable, premium)
  - Special circumstances checkboxes (family, special needs)
  
- **Results Display**:
  - Pie chart breakdown of expenses
  - Monthly vs. total cost view toggle
  - Tuition, accommodation, living expenses, and other costs
  - Scholarship potential indicator

- **Optimization Tips**:
  - Cost-saving suggestions based on selections
  - Scholarship opportunities relevant to profile
  - Part-time work information where applicable

### Content Style
- **Practical tone**: "Here's a realistic monthly budget for a student in Berlin"
- **Helpful context**: "Accommodation is typically your biggest expense in Canada"
- **Actionable tips**: "Pro tip: Student housing in Poland can save you €200/month compared to private rentals"

## Application Timeline Generator

### Layout
- **Interactive calendar visualization** with customizable deadlines
- **Countdown indicators** for approaching deadlines
- **Task checklist view** as alternative display option

### Components
- **Timeline Setup**:
  - Target program start date selector (Fall 2023, Spring 2024, etc.)
  - Country/university selection
  - Optional: "I already have _____" checkboxes (language test, transcripts, etc.)

- **Visual Timeline**:
  - Color-coded phases (Preparation, Application, Visa, etc.)
  - Important deadline markers with countdown indicators
  - Expandable tasks under each phase
  - Email/calendar integration options

- **Action Items**:
  - Task cards with estimated completion time
  - "Mark Complete" functionality
  - Resource links related to specific tasks
  - Tips from successful students

### Content Style
- **Time-sensitive guidance**: "Start your language preparation now to be ready for Fall 2024 admissions"
- **Encouraging progress updates**: "You're on track for your TU Munich application!"
- **Practical advice**: "Allow at least 8 weeks for document authentication - start this phase early"

## Eligibility Checker

### Layout
- **Program-specific eligibility assessment** with instant feedback
- **Requirements visualization** showing met/unmet criteria
- **Actionable next steps** based on results

### Components
- **Program Selection**:
  - University search with autocomplete
  - Program selector with field of study filter
  - Country quick-select option

- **Profile Input Section**:
  - Academic background (degree, GPA, field)
  - Test scores (language, GRE, GMAT)
  - Work experience (if relevant)
  - Portfolio/publications (if relevant)

- **Results Visualization**:
  - Eligibility meter showing overall chance
  - Green/yellow/red indicators for individual requirements
  - "Gap analysis" highlighting what's missing
  - Similar programs with better eligibility match

### Content Style
- **Honest assessment**: "Your profile meets the core requirements but falls short on language scores"
- **Constructive guidance**: "Consider improving your GRE scores by 10 points to strengthen your application"
- **Alternative suggestions**: "While TU Munich may be challenging with your current profile, these 3 similar universities might be a better match"

## Implementation Notes

### User Flow Optimization
- Design the tools with clear entry points and next steps
- Ensure each tool can function independently yet connect to others
- Consider requiring email only at valuable moments (after showing results)
- Create smooth pathways to country-specific platforms based on tool outcomes

### Technical Approach
- Build modular, reusable components for question types
- Implement state management for multi-step tools
- Consider progressive web app capabilities for offline functionality
- Ensure all tools are fully responsive for mobile users

### Visual Identity
- Use consistent chart colors across all tools
- Implement subtle animations for transitions and results
- Ensure adequate touch targets on all interactive elements
- Maintain visual consistency with the overall Qogent brand

### Analytics Integration
- Track completion rates for each tool
- Measure click-through to country platforms from results
- Identify drop-off points in multi-step tools
- Analyze which tools generate the highest-converting leads 