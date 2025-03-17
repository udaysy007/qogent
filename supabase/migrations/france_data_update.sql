-- Update data for France country
UPDATE countries
SET
  -- Basic Information
  capital = 'Paris',
  population = '67.8 million',
  language = 'French',
  currency = 'Euro (€)',
  academic_year = 'September to June',
  education_system = 'European Credit Transfer System (ECTS)',

  -- Education Statistics
  international_students = '370,000+',
  top_universities = '35+ in global top 500',
  english_programs = '1,600+',
  post_study_work = 'Up to 1 year (APS - Autorisation Provisoire de Séjour)',

  -- Education System
  bachelor_info = 'Bachelor''s degrees in France, known as "Licence," typically take 3 years to complete (180 ECTS credits). They provide a solid foundation in a field of study and can be general or professionally oriented. Public universities are heavily subsidized by the government, making tuition fees affordable.',
  master_info = 'Master''s degrees in France take 2 years to complete (120 ECTS credits) and are divided into M1 (first year) and M2 (second year). The final semester usually includes an internship or thesis. There are two types: research masters (leading to PhD) and professional masters (preparing for specific careers).',
  phd_info = 'Doctoral programs in France typically take 3 years to complete and focus on original research. PhD students are usually attached to a research laboratory or team and must publish their work in international journals. The degree concludes with a public defense of the dissertation before a jury.',
  teaching_style = 'The French education system places strong emphasis on theoretical knowledge and critical thinking. Teaching methods include lectures (cours magistraux), tutorials (travaux dirigés), and practical work (travaux pratiques). Students are expected to be independent and self-motivated in their studies.',
  grading_system = 'France uses a 20-point grading scale, with 10 being the passing grade. Grades 16-20 are considered excellent and rarely awarded, 14-15 is very good, 12-13 is good, 10-11 is satisfactory, and below 10 is failing. The ECTS system is also used for credit transfer within Europe.',
  instruction_language = 'While French is the primary language of instruction at most universities, there''s a growing number of programs taught partially or entirely in English, especially at the master''s and doctoral levels. International students are encouraged to learn French for daily life, even if their program is in English.',
  academic_calendar = 'The academic year typically runs from September to June, divided into two semesters: Fall (September-January) and Spring (February-June). Each semester ends with an examination period. There are breaks for Christmas, winter (February), and spring (April-May).',
  universities_intro = 'France has a diverse higher education system with different types of institutions: public universities (accessible to all with a high school diploma), Grandes Écoles (elite, selective schools), specialized schools, and institutes of technology. The country has over the 3,500 public and private higher education institutions offering programs in all academic disciplines.',

  -- Admission & Visa Requirements
  educational_requirements = 'For undergraduate studies, students need a high school diploma equivalent to the French Baccalauréat. For postgraduate studies, a relevant bachelor''s degree is required. Admission to Grandes Écoles requires preparatory classes and competitive entrance exams.',
  transcript_requirements = 'Official academic transcripts and degree certificates translated into French or English. Documents must be authenticated by your country''s French embassy or through the Apostille process if applicable.',
  entrance_exams = 'Public universities generally don''t have entrance exams for undergraduate programs (except for medicine and some specialized fields). Grandes Écoles require competitive entrance exams. Some graduate programs may require GRE or GMAT scores.',
  english_requirements = 'For English-taught programs:
TOEFL iBT: Typically 80-90
IELTS: Typically 6.0-6.5
Cambridge English: B2 First or higher
For French-taught programs:
TCF/TEF: B1-B2 level
DELF/DALF: B1-C1 level depending on the program',
  language_exemptions = 'Students from countries where French or English is an official language may be exempt from providing language test scores. Students who have completed their previous degree in the required language of instruction may also be exempt with proper documentation.',
  visa_requirements = 'International students from non-EU/EEA countries need to apply for a long-stay student visa (VLS-TS) through Campus France. Requirements include:
- Acceptance letter from a French educational institution
- Proof of sufficient funds
- Valid passport
- Proof of accommodation in France
- Health insurance',
  financial_requirements = 'Students must demonstrate they have sufficient funds to cover their expenses in France, approximately €615 per month (€7,380 per year). This can be shown through a bank statement, scholarship certificate, guarantee from a financial sponsor, or a blocked bank account.',
  health_requirements = 'Students must have health insurance coverage. EU students can use their European Health Insurance Card (EHIC). Non-EU students are automatically enrolled in the French social security system upon registration at their university. Additional private insurance is recommended for comprehensive coverage.',
  additional_documents = '- Valid passport
- Visa application form
- Acceptance letter from a French educational institution
- Proof of financial means
- Academic qualifications
- Language test results
- Proof of accommodation (if available)
- Birth certificate
- Passport photos
- CVEC payment receipt (student life and campus fee)',
  visa_tip = 'Begin your visa application process at least 3 months before your planned departure. Create an account on the Campus France website of your country (where available) to start the application procedure. The VLS-TS student visa serves as a residence permit for the first year when validated online within 3 months of arrival in France.',

  -- Tuition & Living Costs
  bachelor_fee_public = '€170-€380 per year for EU students, €2,770-€3,770 for non-EU students',
  bachelor_fee_private = '€3,000-€10,000 per year',
  bachelor_fee_medical = '€2,770-€3,770 per year for public medical schools',
  master_fee_public = '€243-€380 per year for EU students, €3,770 for non-EU students',
  master_fee_private = '€4,000-€15,000 per year',
  master_fee_business = '€15,000-€45,000 per program for top business schools',
  accommodation_cost = '€350-€1,000 per month',
  accommodation_note = 'University residence halls (CROUS) cost €250-€400/month and are the most affordable option. Private student residences cost €450-€700/month. Private rentals range from €400-€1,000/month depending on location.',
  food_cost = '€200-€400 per month',
  food_note = 'University restaurants (RU) offer complete meals for about €3.30. Grocery shopping costs around €200-€300/month for basic necessities.',
  transport_cost = '€30-€75 per month',
  transport_note = 'Student discounts available on public transport. Monthly passes in Paris cost €75, while in smaller cities they range from €30-€50.',
  utilities_cost = '€80-€150 per month',
  utilities_note = 'Includes electricity, heating, water, and internet. Often partially included in student residence fees.',
  other_cost = '€100-€250 per month',
  other_note = 'Includes books, phone plans, leisure activities, and health insurance (if not covered by student social security).',
  total_monthly_cost = '€760-€1,875 per month',
  budget_tip1 = 'Apply for housing assistance (CAF) which can reduce accommodation costs by up to 30%.',
  budget_tip2 = 'Consider studying in cities outside Paris to significantly reduce your living costs.',
  budget_tip3 = 'Take advantage of student discounts for restaurants, museums, cinemas, and public transportation with your student card.',
  budget_tip4 = 'Open a French bank account to avoid foreign transaction fees and facilitate rent payments and CAF applications.',
  government_scholarships = 'The French government offers several scholarship programs including Eiffel Excellence Scholarship Program, French Embassy Scholarships, and "Make Our Planet Great Again" Scholarships.',
  university_scholarships = 'Many French universities and Grandes Écoles offer merit-based scholarships, foundation scholarships, and regional council grants for international students.',
  external_scholarships = 'Organizations like Erasmus+, Fulbright Program, and various international organizations offer scholarships for students studying in France.',
  
  -- Student Life
  campus_life = 'French university campuses offer diverse student life with numerous clubs, associations, and cultural events. The approach is less campus-centered than in some countries, with students often integrating into the broader city life.',
  campus_life_extra = 'University facilities typically include libraries, computer labs, sports facilities, and student restaurants (RU) that offer affordable meals. Student unions organize regular social events, cultural activities, and excursions.',
  work_opportunities = 'International students in France can work up to 964 hours per year (about 20 hours per week during term time) with their student visa. Common student jobs include tutoring, service industry positions, internships, and campus jobs.',
  work_opportunities_extra = 'Many programs, especially at the master''s level, include mandatory internships. After graduation, international students can apply for a temporary residence permit (APS) allowing them to stay for up to one year to look for work related to their studies.',
  cultural_experience = 'Studying in France offers an immersive cultural experience with access to world-renowned museums, historical sites, and vibrant arts scenes. The country is famous for its gastronomy, fashion, cinema, and architecture.',
  cultural_experience_extra = 'Students can explore diverse regions, from the Mediterranean coast to the Alps, each with distinct traditions and landscapes. France''s central location in Europe makes it an excellent base for traveling to neighboring countries. The French way of life, with its café culture and appreciation for leisure time, provides a balanced student experience.',
  student_life_image1 = '/images/countries/france/student-life-1.jpg',
  student_life_image2 = '/images/countries/france/student-life-2.jpg',
  student_life_image3 = '/images/countries/france/student-life-3.jpg',
  student_life_image4 = '/images/countries/france/student-life-4.jpg',

  -- Testimonials
  testimonial1_name = 'Sofia Rodriguez',
  testimonial1_image = '/images/testimonials/sofia.jpg',
  testimonial1_program = 'Master in International Business',
  testimonial1_university = 'EDHEC Business School',
  testimonial1_quote = 'Studying in France has been an incredible journey. The program at EDHEC combines academic rigor with practical business applications. Living in Nice offers a perfect balance of beautiful beaches and vibrant city life. The international environment on campus has allowed me to build a global network of friends and future business partners. Although challenging at first, learning French has opened up many cultural and professional opportunities.',
  testimonial1_country = 'From Colombia',
  testimonial2_name = 'Raj Patel',
  testimonial2_image = '/images/testimonials/raj.jpg',
  testimonial2_program = 'MSc Computer Science',
  testimonial2_university = 'Université Paris-Saclay',
  testimonial2_quote = 'The quality of education and research opportunities at Paris-Saclay exceeded my expectations. The professors are experts in their fields and very approachable. While living costs in the Paris region are high, there are many support systems for students, like housing assistance. The multicultural environment and proximity to tech companies have been invaluable for my career development. My advice to new students would be to start learning French before arrival!',
  testimonial2_country = 'From India',
  testimonial3_name = 'Yuki Tanaka',
  testimonial3_image = '/images/testimonials/yuki.jpg',
  testimonial3_program = 'BA French Literature',
  testimonial3_university = 'Sorbonne Université',
  testimonial3_quote = 'Studying French literature at the historic Sorbonne has been a dream come true. Paris is the perfect city for humanities students, with countless libraries, bookshops, and cultural events. The teaching style encourages critical thinking and in-depth analysis. Although university bureaucracy can be challenging, the educational experience is worth it. The student community is diverse and welcoming, and I''ve made friends from all over the world while improving my French immensely.',
  testimonial3_country = 'From Japan',

  -- FAQs
  faq1_question = 'What are the benefits of studying in France?',
  faq1_answer = 'France offers high-quality education with relatively low tuition fees, especially at public universities. The country has a rich cultural heritage, central location in Europe, excellent healthcare system, and high quality of life. French degrees are internationally recognized, and many programs include internships to develop professional skills. After graduation, there are opportunities to stay and work through the post-study work visa (APS).',
  faq2_question = 'How much does it cost to study in France?',
  faq2_answer = 'Public universities have low tuition fees (€170-€380 per year for EU students, €2,770-€3,770 for non-EU), while private institutions and Grandes Écoles charge €3,000-€15,000 annually. Living costs vary by location, with Paris being the most expensive (€1,200-€1,800 per month) and smaller cities being more affordable (€800-€1,200 per month). Students can benefit from housing assistance (CAF) and discounts on transportation, meals, and cultural activities.',
  faq3_question = 'Do I need to speak French to study in France?',
  faq3_answer = 'While knowing French is beneficial for daily life, many institutions offer programs partially or entirely in English, especially at the graduate level (over 1,600 programs). However, some basic French knowledge will enhance your experience and integration. Most universities offer French language courses for international students. For French-taught programs, you''ll need to demonstrate French proficiency through tests like TCF, TEF, or DELF/DALF.',
  faq4_question = 'What are the visa requirements for studying in France?',
  faq4_answer = 'Non-EU/EEA students need a long-stay student visa (VLS-TS). The application process involves creating an account on the Campus France website (where available), getting an acceptance letter from a French institution, proving sufficient funds (minimum €615 per month), showing health insurance coverage, and attending a visa interview. The VLS-TS needs to be validated online within three months of arrival in France to serve as a residence permit for the first year.',
  faq5_question = 'Can international students work while studying in France?',
  faq5_answer = 'Yes, international students can work up to 964 hours per year (approximately 20 hours per week during term time) with their student visa. No additional work permit is required. The minimum hourly wage (SMIC) is about €11 gross. On-campus jobs, tutoring, and service industry positions are common student jobs. During official school holidays, students can work full-time.',
  faq6_question = 'What types of higher education institutions exist in France?',
  faq6_answer = 'France has several types of higher education institutions: public universities (accessible with a high school diploma, offering diverse programs), Grandes Écoles (elite, selective schools for engineering, business, political science, etc.), specialized schools (art, architecture, etc.), and institutes of technology. Public universities have very low tuition fees, while Grandes Écoles and private institutions charge higher fees but often include internships and career services.',
  faq7_question = 'What scholarships are available for international students in France?',
  faq7_answer = 'International students can apply for various scholarships, including French government scholarships (Eiffel Excellence Program, French Embassy Scholarships), university-specific scholarships, regional council grants, and external scholarships from organizations like the EU (Erasmus+), home country governments, or international organizations. Most scholarships are competitive and have specific eligibility criteria based on academic merit, country of origin, or field of study.',
  faq8_question = 'How is the healthcare system for international students in France?',
  faq8_answer = 'France has an excellent healthcare system. EU students can use their European Health Insurance Card (EHIC). Non-EU students are automatically enrolled in the French social security system (Sécurité sociale) upon registration at their university, providing basic health coverage. Many students also take complementary health insurance (mutuelle) for additional coverage. Before the social security registration is complete, students should have temporary health insurance coverage for the first few months.'
WHERE slug = 'france'; 