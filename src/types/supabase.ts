export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      countries: {
        Row: {
          id: string
          name: string
          slug: string
          code: string
          region: string
          flag_url: string | null
          hero_image_url: string | null
          description: string
          long_description: string | null
          featured: boolean
          tags: string[] | null
          
          // Basic Information
          capital: string | null
          population: string | null
          language: string | null
          currency: string | null
          academic_year: string | null
          education_system: string | null
          
          // Education Statistics
          international_students: string | null
          top_universities: string | null
          english_programs: string | null
          post_study_work: string | null
          
          // Education System
          bachelor_info: string | null
          master_info: string | null
          phd_info: string | null
          teaching_style: string | null
          grading_system: string | null
          instruction_language: string | null
          academic_calendar: string | null
          universities_intro: string | null
          
          // Admission & Visa Requirements
          educational_requirements: string | null
          transcript_requirements: string | null
          entrance_exams: string | null
          english_requirements: string | null
          language_exemptions: string | null
          visa_requirements: string | null
          financial_requirements: string | null
          health_requirements: string | null
          additional_documents: string | null
          visa_tip: string | null
          
          // Tuition & Living Costs
          bachelor_fee_public: string | null
          bachelor_fee_private: string | null
          bachelor_fee_medical: string | null
          master_fee_public: string | null
          master_fee_private: string | null
          master_fee_business: string | null
          accommodation_cost: string | null
          accommodation_note: string | null
          food_cost: string | null
          food_note: string | null
          transport_cost: string | null
          transport_note: string | null
          utilities_cost: string | null
          utilities_note: string | null
          other_cost: string | null
          other_note: string | null
          total_monthly_cost: string | null
          budget_tip1: string | null
          budget_tip2: string | null
          budget_tip3: string | null
          budget_tip4: string | null
          government_scholarships: string | null
          university_scholarships: string | null
          external_scholarships: string | null
          
          // Student Life
          campus_life: string | null
          campus_life_extra: string | null
          work_opportunities: string | null
          work_opportunities_extra: string | null
          cultural_experience: string | null
          cultural_experience_extra: string | null
          student_life_image1: string | null
          student_life_image2: string | null
          student_life_image3: string | null
          student_life_image4: string | null
          
          // Testimonials
          testimonial1_name: string | null
          testimonial1_image: string | null
          testimonial1_program: string | null
          testimonial1_university: string | null
          testimonial1_quote: string | null
          testimonial1_country: string | null
          testimonial2_name: string | null
          testimonial2_image: string | null
          testimonial2_program: string | null
          testimonial2_university: string | null
          testimonial2_quote: string | null
          testimonial2_country: string | null
          testimonial3_name: string | null
          testimonial3_image: string | null
          testimonial3_program: string | null
          testimonial3_university: string | null
          testimonial3_quote: string | null
          testimonial3_country: string | null
          
          // FAQs
          faq1_question: string | null
          faq1_answer: string | null
          faq2_question: string | null
          faq2_answer: string | null
          faq3_question: string | null
          faq3_answer: string | null
          faq4_question: string | null
          faq4_answer: string | null
          faq5_question: string | null
          faq5_answer: string | null
          faq6_question: string | null
          faq6_answer: string | null
          faq7_question: string | null
          faq7_answer: string | null
          faq8_question: string | null
          faq8_answer: string | null
          
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          code: string
          region: string
          flag_url?: string | null
          hero_image_url?: string | null
          description: string
          long_description?: string | null
          featured?: boolean
          tags?: string[] | null
          
          // Basic Information
          capital?: string | null
          population?: string | null
          language?: string | null
          currency?: string | null
          academic_year?: string | null
          education_system?: string | null
          
          // Education Statistics
          international_students?: string | null
          top_universities?: string | null
          english_programs?: string | null
          post_study_work?: string | null
          
          // Education System
          bachelor_info?: string | null
          master_info?: string | null
          phd_info?: string | null
          teaching_style?: string | null
          grading_system?: string | null
          instruction_language?: string | null
          academic_calendar?: string | null
          universities_intro?: string | null
          
          // Admission & Visa Requirements
          educational_requirements?: string | null
          transcript_requirements?: string | null
          entrance_exams?: string | null
          english_requirements?: string | null
          language_exemptions?: string | null
          visa_requirements?: string | null
          financial_requirements?: string | null
          health_requirements?: string | null
          additional_documents?: string | null
          visa_tip?: string | null
          
          // Tuition & Living Costs
          bachelor_fee_public?: string | null
          bachelor_fee_private?: string | null
          bachelor_fee_medical?: string | null
          master_fee_public?: string | null
          master_fee_private?: string | null
          master_fee_business?: string | null
          accommodation_cost?: string | null
          accommodation_note?: string | null
          food_cost?: string | null
          food_note?: string | null
          transport_cost?: string | null
          transport_note?: string | null
          utilities_cost?: string | null
          utilities_note?: string | null
          other_cost?: string | null
          other_note?: string | null
          total_monthly_cost?: string | null
          budget_tip1?: string | null
          budget_tip2?: string | null
          budget_tip3?: string | null
          budget_tip4?: string | null
          government_scholarships?: string | null
          university_scholarships?: string | null
          external_scholarships?: string | null
          
          // Student Life
          campus_life?: string | null
          campus_life_extra?: string | null
          work_opportunities?: string | null
          work_opportunities_extra?: string | null
          cultural_experience?: string | null
          cultural_experience_extra?: string | null
          student_life_image1?: string | null
          student_life_image2?: string | null
          student_life_image3?: string | null
          student_life_image4?: string | null
          
          // Testimonials
          testimonial1_name?: string | null
          testimonial1_image?: string | null
          testimonial1_program?: string | null
          testimonial1_university?: string | null
          testimonial1_quote?: string | null
          testimonial1_country?: string | null
          testimonial2_name?: string | null
          testimonial2_image?: string | null
          testimonial2_program?: string | null
          testimonial2_university?: string | null
          testimonial2_quote?: string | null
          testimonial2_country?: string | null
          testimonial3_name?: string | null
          testimonial3_image?: string | null
          testimonial3_program?: string | null
          testimonial3_university?: string | null
          testimonial3_quote?: string | null
          testimonial3_country?: string | null
          
          // FAQs
          faq1_question?: string | null
          faq1_answer?: string | null
          faq2_question?: string | null
          faq2_answer?: string | null
          faq3_question?: string | null
          faq3_answer?: string | null
          faq4_question?: string | null
          faq4_answer?: string | null
          faq5_question?: string | null
          faq5_answer?: string | null
          faq6_question?: string | null
          faq6_answer?: string | null
          faq7_question?: string | null
          faq7_answer?: string | null
          faq8_question?: string | null
          faq8_answer?: string | null
          
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          code?: string
          region?: string
          flag_url?: string | null
          hero_image_url?: string | null
          description?: string
          long_description?: string | null
          featured?: boolean
          tags?: string[] | null
          
          // Basic Information
          capital?: string | null
          population?: string | null
          language?: string | null
          currency?: string | null
          academic_year?: string | null
          education_system?: string | null
          
          // Education Statistics
          international_students?: string | null
          top_universities?: string | null
          english_programs?: string | null
          post_study_work?: string | null
          
          // Education System
          bachelor_info?: string | null
          master_info?: string | null
          phd_info?: string | null
          teaching_style?: string | null
          grading_system?: string | null
          instruction_language?: string | null
          academic_calendar?: string | null
          universities_intro?: string | null
          
          // Admission & Visa Requirements
          educational_requirements?: string | null
          transcript_requirements?: string | null
          entrance_exams?: string | null
          english_requirements?: string | null
          language_exemptions?: string | null
          visa_requirements?: string | null
          financial_requirements?: string | null
          health_requirements?: string | null
          additional_documents?: string | null
          visa_tip?: string | null
          
          // Tuition & Living Costs
          bachelor_fee_public?: string | null
          bachelor_fee_private?: string | null
          bachelor_fee_medical?: string | null
          master_fee_public?: string | null
          master_fee_private?: string | null
          master_fee_business?: string | null
          accommodation_cost?: string | null
          accommodation_note?: string | null
          food_cost?: string | null
          food_note?: string | null
          transport_cost?: string | null
          transport_note?: string | null
          utilities_cost?: string | null
          utilities_note?: string | null
          other_cost?: string | null
          other_note?: string | null
          total_monthly_cost?: string | null
          budget_tip1?: string | null
          budget_tip2?: string | null
          budget_tip3?: string | null
          budget_tip4?: string | null
          government_scholarships?: string | null
          university_scholarships?: string | null
          external_scholarships?: string | null
          
          // Student Life
          campus_life?: string | null
          campus_life_extra?: string | null
          work_opportunities?: string | null
          work_opportunities_extra?: string | null
          cultural_experience?: string | null
          cultural_experience_extra?: string | null
          student_life_image1?: string | null
          student_life_image2?: string | null
          student_life_image3?: string | null
          student_life_image4?: string | null
          
          // Testimonials
          testimonial1_name?: string | null
          testimonial1_image?: string | null
          testimonial1_program?: string | null
          testimonial1_university?: string | null
          testimonial1_quote?: string | null
          testimonial1_country?: string | null
          testimonial2_name?: string | null
          testimonial2_image?: string | null
          testimonial2_program?: string | null
          testimonial2_university?: string | null
          testimonial2_quote?: string | null
          testimonial2_country?: string | null
          testimonial3_name?: string | null
          testimonial3_image?: string | null
          testimonial3_program?: string | null
          testimonial3_university?: string | null
          testimonial3_quote?: string | null
          testimonial3_country?: string | null
          
          // FAQs
          faq1_question?: string | null
          faq1_answer?: string | null
          faq2_question?: string | null
          faq2_answer?: string | null
          faq3_question?: string | null
          faq3_answer?: string | null
          faq4_question?: string | null
          faq4_answer?: string | null
          faq5_question?: string | null
          faq5_answer?: string | null
          faq6_question?: string | null
          faq6_answer?: string | null
          faq7_question?: string | null
          faq7_answer?: string | null
          faq8_question?: string | null
          faq8_answer?: string | null
          
          created_at?: string
          updated_at?: string
        }
      }
      universities: {
        Row: {
          id: string
          name: string
          slug: string
          country_id: string
          city: string
          is_public: boolean
          ranking: number | null
          description: string | null
          website: string | null
          logo_url: string | null
          campus_images: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          country_id: string
          city: string
          is_public?: boolean
          ranking?: number | null
          description?: string | null
          website?: string | null
          logo_url?: string | null
          campus_images?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          country_id?: string
          city?: string
          is_public?: boolean
          ranking?: number | null
          description?: string | null
          website?: string | null
          logo_url?: string | null
          campus_images?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          name: string
          university_id: string
          degree_level: string
          title: string
          description: string | null
          duration: string | null
          tuition_fee: Json | null
          language: string | null
          requirements: string[] | null
          application_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          university_id: string
          degree_level: string
          title: string
          description?: string | null
          duration?: string | null
          tuition_fee?: Json | null
          language?: string | null
          requirements?: string[] | null
          application_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          university_id?: string
          degree_level?: string
          title?: string
          description?: string | null
          duration?: string | null
          tuition_fee?: Json | null
          language?: string | null
          requirements?: string[] | null
          application_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      visa_requirements: {
        Row: {
          id: string
          country_id: string
          student_visa: string
          processing_time: string | null
          application_fee: Json | null
          documents: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          country_id: string
          student_visa: string
          processing_time?: string | null
          application_fee?: Json | null
          documents?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          country_id?: string
          student_visa?: string
          processing_time?: string | null
          application_fee?: Json | null
          documents?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      cost_of_living: {
        Row: {
          id: string
          country_id: string
          accommodation_low: number | null
          accommodation_high: number | null
          food_low: number | null
          food_high: number | null
          transport_low: number | null
          transport_high: number | null
          utilities_low: number | null
          utilities_high: number | null
          currency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          country_id: string
          accommodation_low?: number | null
          accommodation_high?: number | null
          food_low?: number | null
          food_high?: number | null
          transport_low?: number | null
          transport_high?: number | null
          utilities_low?: number | null
          utilities_high?: number | null
          currency: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          country_id?: string
          accommodation_low?: number | null
          accommodation_high?: number | null
          food_low?: number | null
          food_high?: number | null
          transport_low?: number | null
          transport_high?: number | null
          utilities_low?: number | null
          utilities_high?: number | null
          currency?: string
          created_at?: string
          updated_at?: string
        }
      }
      work_opportunities: {
        Row: {
          id: string
          country_id: string
          during_studies: string | null
          after_graduation: string | null
          average_salary: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          country_id: string
          during_studies?: string | null
          after_graduation?: string | null
          average_salary?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          country_id?: string
          during_studies?: string | null
          after_graduation?: string | null
          average_salary?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      language_requirements: {
        Row: {
          id: string
          country_id: string
          english_required: boolean
          english_tests: string[] | null
          english_scores: Json | null
          local_required: boolean
          local_tests: string[] | null
          local_scores: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          country_id: string
          english_required?: boolean
          english_tests?: string[] | null
          english_scores?: Json | null
          local_required?: boolean
          local_tests?: string[] | null
          local_scores?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          country_id?: string
          english_required?: boolean
          english_tests?: string[] | null
          english_scores?: Json | null
          local_required?: boolean
          local_tests?: string[] | null
          local_scores?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          student_name: string
          student_image: string | null
          country_id: string | null
          university_id: string | null
          program_id: string | null
          content: string
          rating: number | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_name: string
          student_image?: string | null
          country_id?: string | null
          university_id?: string | null
          program_id?: string | null
          content: string
          rating?: number | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_name?: string
          student_image?: string | null
          country_id?: string | null
          university_id?: string | null
          program_id?: string | null
          content?: string
          rating?: number | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          country_id: string | null
          question: string
          answer: string
          category: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          country_id?: string | null
          question: string
          answer: string
          category?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          country_id?: string | null
          question?: string
          answer?: string
          category?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          department: string
          location: string
          type: string
          description: string
          responsibilities: string[] | null
          requirements: string[] | null
          benefits: string[] | null
          posted_date: string
          application_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          department: string
          location: string
          type: string
          description: string
          responsibilities?: string[] | null
          requirements?: string[] | null
          benefits?: string[] | null
          posted_date?: string
          application_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          department?: string
          location?: string
          type?: string
          description?: string
          responsibilities?: string[] | null
          requirements?: string[] | null
          benefits?: string[] | null
          posted_date?: string
          application_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blogs: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          author: string
          published_date: string
          featured_image: string | null
          tags: string[] | null
          country_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          author: string
          published_date?: string
          featured_image?: string | null
          tags?: string[] | null
          country_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          author?: string
          published_date?: string
          featured_image?: string | null
          tags?: string[] | null
          country_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 