-- Update data for United Kingdom country
UPDATE countries
SET
  -- Basic Information
  capital = 'London',
  population = '67.2 million',
  language = 'English',
  currency = 'Pound Sterling (£)',
  academic_year = 'September to June',
  education_system = 'UK Credit Framework',

  -- Education Statistics
  international_students = '605,000+',
  top_universities = '90+ in global top 500',
  english_programs = '50,000+',
  post_study_work = 'Up to 2 years (Graduate Route)',

  -- Education System
  bachelor_info = 'Bachelor''s degrees in the UK typically take 3 years to complete (4 years in Scotland). They are classified as First Class Honours, Upper Second Class Honours (2:1), Lower Second Class Honours (2:2), Third Class Honours, or Ordinary degree (without honours).',
  master_info = 'Master''s degrees in the UK typically take 1 year to complete, much shorter than in many other countries. These intensive programs focus on specialized knowledge and skills in a particular field.',
  phd_info = 'PhD programs in the UK usually take 3-4 years to complete. They focus on original research and require a thesis or dissertation that makes a significant contribution to the field of study.',
  teaching_style = 'The UK education system places strong emphasis on critical thinking, independent study, and research skills. Classes typically include lectures, seminars, tutorials, and laboratory work depending on the subject. Students are expected to engage in substantial self-directed study.',
  grading_system = 'The UK uses a unique grading system for undergraduate degrees: First Class Honours (70%+), Upper Second Class Honours (60-69%), Lower Second Class Honours (50-59%), Third Class Honours (40-49%), and Fail (below 40%). For postgraduate degrees, the scale is typically: Distinction (70%+), Merit (60-69%), Pass (50-59%), and Fail (below 50%).',
  instruction_language = 'English is the primary language of instruction at all UK universities. International students must demonstrate proficiency in English through standardized tests like IELTS or TOEFL.',
  academic_calendar = 'The academic year typically runs from September to June, divided into three terms: Autumn (September-December), Spring (January-March), and Summer (April-June). Some universities follow a two-semester system instead.',
  universities_intro = 'The UK is home to some of the world''s oldest and most prestigious universities, including Oxford and Cambridge. The country has over 160 higher education institutions offering diverse programs across all academic disciplines. UK universities are known for their research excellence and high-quality teaching.',

  -- Admission & Visa Requirements
  educational_requirements = 'For undergraduate studies, students typically need to complete secondary education equivalent to UK A-levels. For postgraduate studies, a relevant bachelor''s degree is required, usually with a minimum of a 2:1 or 2:2 classification depending on the program.',
  transcript_requirements = 'Official academic transcripts and degree certificates translated into English if they are in another language. Some universities may require a credential evaluation through UK NARIC.',
  entrance_exams = 'UCAS application for undergraduate programs. Some specific programs may require additional tests like BMAT or LNAT for medicine and law respectively. For MBA programs, GMAT scores are often required.',
  english_requirements = 'IELTS: Typically 6.0-7.0 overall with no band below 5.5-6.0 for undergraduate and 6.5-7.5 for postgraduate studies.
TOEFL iBT: Typically 80-100 for undergraduate and 90-110 for postgraduate studies.
PTE Academic: Typically 55-65 for undergraduate and 62-70 for postgraduate studies.',
  language_exemptions = 'Students from majority English-speaking countries, or those who have completed their previous degree in English, may be exempt from providing English language test scores. Documentation proving English as the medium of instruction will be required.',
  visa_requirements = 'International students need to apply for a Student visa (previously Tier 4). Requirements include:
- Confirmation of Acceptance for Studies (CAS) from a licensed sponsor
- Proof of sufficient funds to cover tuition fees and living expenses
- Valid passport
- Tuberculosis test results (if applicable)
- ATAS certificate (for certain sensitive subjects)',
  financial_requirements = 'Students must demonstrate they have sufficient funds to cover tuition fees and living expenses. The requirements vary by location, but typically they need to show they have:
- Full tuition fees for the first year
- At least £1,334 per month for living expenses in London (for up to 9 months)
- At least £1,023 per month for living expenses outside London (for up to 9 months)',
  health_requirements = 'Students must pay the Immigration Health Surcharge (IHS) as part of their visa application, which gives them access to the National Health Service (NHS). The fee is currently £470 per year for students.',
  additional_documents = '- Valid passport
- Recent passport-sized photographs
- Confirmation of Acceptance for Studies (CAS)
- Proof of financial means
- Academic qualifications
- English language test results
- Immigration Health Surcharge payment receipt
- ATAS certificate (if applicable)',
  visa_tip = 'Apply for your Student visa at least 3 months before your course starts, but not more than 6 months in advance. Make sure all your documents are in the correct format as specified by UK Visas and Immigration (UKVI).',

  -- Tuition & Living Costs
  bachelor_fee_public = '£9,250 per year for UK students, £15,000-£25,000 for international students',
  bachelor_fee_private = '£15,000-£35,000 per year',
  bachelor_fee_medical = '£25,000-£45,000 per year for medicine and dentistry',
  master_fee_public = '£15,000-£35,000 per year for international students',
  master_fee_private = '£20,000-£40,000 per year',
  master_fee_business = '£20,000-£60,000 for MBA programs',
  accommodation_cost = '£400-£1,200 per month',
  accommodation_note = 'University halls of residence (£400-£800/month) are popular for first-year students. Private student accommodation costs £500-£1,000/month. Shared houses/flats range from £350-£700/month outside London and £500-£1,200/month in London.',
  food_cost = '£150-£300 per month',
  food_note = 'University cafeterias offer affordable meals. Grocery shopping costs around £160-£200/month for basic necessities. Eating out can cost £10-£25 per meal.',
  transport_cost = '£50-£200 per month',
  transport_note = 'Student discounts available on public transport. Monthly passes in London cost £100-£200, while in smaller cities they range from £50-£100.',
  utilities_cost = '£100-£200 per month',
  utilities_note = 'Includes electricity, gas, water, and internet. Often partially included in university accommodation fees.',
  other_cost = '£100-£300 per month',
  other_note = 'Includes books, socializing, phone plans, clothing, and entertainment. Many cultural attractions offer student discounts.',
  total_monthly_cost = '£800-£2,200 per month',
  budget_tip1 = 'Consider studying in cities outside London to significantly reduce your living costs.',
  budget_tip2 = 'Apply for university accommodation for your first year as it''s generally more affordable and convenient.',
  budget_tip3 = 'Get an International Student Identity Card (ISIC) and a 16-25 Railcard for discounts on travel, shopping, and entertainment.',
  budget_tip4 = 'Open a UK student bank account to avoid foreign transaction fees and access student banking benefits.',
  government_scholarships = 'The UK government offers several scholarship schemes including Chevening Scholarships, Commonwealth Scholarships, and GREAT Scholarships.',
  university_scholarships = 'Most UK universities offer merit-based and country-specific scholarships covering partial or full tuition fees for international students.',
  external_scholarships = 'Organizations like the British Council, Fulbright Commission, and various charitable foundations offer scholarships for international students studying in the UK.',
  
  -- Student Life
  campus_life = 'UK universities offer a rich and diverse campus life with numerous clubs, societies, and sports teams. Students'' unions organize various events, from cultural festivals to career fairs.',
  campus_life_extra = 'Most universities have modern facilities including libraries, sports centers, student accommodation, and dining options. The collegiate system at universities like Oxford and Cambridge offers a unique community experience.',
  work_opportunities = 'International students on a Student visa can work up to 20 hours per week during term time and full-time during holidays. Common student jobs include retail, hospitality, and on-campus roles.',
  work_opportunities_extra = 'After graduation, the Graduate Route visa allows students to work in the UK for 2 years (3 years for PhD graduates). Many universities have career services that help students find internships and graduate employment.',
  cultural_experience = 'Living in the UK offers an immersive cultural experience with access to world-class museums, art galleries, theaters, and music venues. The country has a rich history and diverse cultural landscape.',
  cultural_experience_extra = 'From the historic buildings of Edinburgh to the vibrant multicultural environment of London, students can explore different regions of the UK, each with its own distinct character and traditions.',
  student_life_image1 = '/images/countries/uk/student-life-1.jpg',
  student_life_image2 = '/images/countries/uk/student-life-2.jpg',
  student_life_image3 = '/images/countries/uk/student-life-3.jpg',
  student_life_image4 = '/images/countries/uk/student-life-4.jpg',
  
  -- Testimonials
  testimonial1_name = 'Ananya Sharma',
  testimonial1_image = '/images/testimonials/ananya.jpg',
  testimonial1_program = 'MSc Computer Science',
  testimonial1_university = 'University of Manchester',
  testimonial1_quote = 'Studying in the UK has been a transformative experience for me. The one-year master''s program was intense but incredibly rewarding. The interactive teaching style encouraged me to think critically and develop practical skills that are highly valued in the industry. The University of Manchester has exceptional facilities, and Manchester is a vibrant city with an affordable cost of living compared to London.',
  testimonial1_country = 'From India',
  testimonial2_name = 'Miguel Hernandez',
  testimonial2_image = '/images/testimonials/miguel.jpg',
  testimonial2_program = 'BA Economics',
  testimonial2_university = 'University of Edinburgh',
  testimonial2_quote = 'Edinburgh is a magical city to study in, with its historic architecture and beautiful landscapes. The University of Edinburgh has a diverse community of students from around the world, which has enriched my learning experience. The academic standards are high, but the support from tutors is excellent. I''ve particularly enjoyed the festivals and cultural events that make Edinburgh such a special place.',
  testimonial2_country = 'From Mexico',
  testimonial3_name = 'Li Wei',
  testimonial3_image = '/images/testimonials/li-wei.jpg',
  testimonial3_program = 'PhD Engineering',
  testimonial3_university = 'Imperial College London',
  testimonial3_quote = 'The research opportunities at Imperial College London are unparalleled. I''ve been able to collaborate with leading experts in my field and access cutting-edge facilities. London is an expensive city, but the networking opportunities and exposure to industry make it worthwhile. The Graduate Route visa has also given me peace of mind about being able to work in the UK after completing my PhD.',
  testimonial3_country = 'From China',
  
  -- FAQs
  faq1_question = 'What are the benefits of studying in the United Kingdom?',
  faq1_answer = 'The UK offers world-class education from some of the oldest and most prestigious universities globally. Benefits include shorter program durations (typically 3 years for bachelors and 1 year for masters), internationally recognized qualifications, diverse cultural experience, English language environment, research opportunities, and post-study work options through the Graduate Route visa.',
  faq2_question = 'How much does it cost to study in the UK?',
  faq2_answer = 'Tuition fees vary by university and program, ranging from £15,000 to £29,000 per year for undergraduate degrees and £18,000 to £35,000 for postgraduate degrees. Living costs vary significantly depending on location, with London being the most expensive (approximately £1,300-£1,800 per month) and cities in northern England, Wales, and Scotland being more affordable (£800-£1,200 per month).',
  faq3_question = 'Can international students work while studying in the UK?',
  faq3_answer = 'Yes, international students on a Student visa can work up to 20 hours per week during term time and full-time during holidays. After graduation, students can apply for the Graduate Route visa, which allows them to work in the UK for 2 years (3 years for PhD graduates).',
  faq4_question = 'What are the English language requirements for UK universities?',
  faq4_answer = 'Most universities require IELTS scores of 6.0-7.0 for undergraduate programs and 6.5-7.5 for postgraduate programs. Some universities also accept TOEFL iBT, PTE Academic, or Cambridge English qualifications. Students from majority English-speaking countries or those who have completed their previous education in English may be exempt.',
  faq5_question = 'What scholarships are available for international students in the UK?',
  faq5_answer = 'International students can apply for various scholarships, including government schemes like Chevening and Commonwealth Scholarships, university-specific scholarships based on academic merit or financial need, and external scholarships from organizations and foundations. Many scholarships are competitive, so early application is recommended.',
  faq6_question = 'What is the application process for UK universities?',
  faq6_answer = 'Undergraduate applications are typically made through UCAS (Universities and Colleges Admissions Service). Postgraduate applications are usually made directly to the university. Required documents include academic transcripts, personal statement/statement of purpose, reference letters, English language test scores, and sometimes a portfolio or interview for specific programs.',
  faq7_question = 'What is the UK student visa process?',
  faq7_answer = 'International students need to apply for a Student visa. The process includes receiving a Confirmation of Acceptance for Studies (CAS) from your university, demonstrating sufficient funds for tuition and living expenses, paying the Immigration Health Surcharge, and attending a visa application center for biometrics. Apply at least 3 months before your course starts.',
  faq8_question = 'Which are the top universities in the UK?',
  faq8_answer = 'The UK is home to many world-renowned universities. The traditional top universities include University of Oxford, University of Cambridge, Imperial College London, University College London (UCL), London School of Economics (LSE), University of Edinburgh, and University of Manchester, among others.'
WHERE slug = 'uk'; 