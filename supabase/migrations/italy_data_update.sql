-- Update data for Italy country
UPDATE countries
SET
  -- Basic Information
  capital = 'Rome',
  population = '59.6 million (2021)',
  language = 'Italian',
  currency = 'Euro (€)',
  academic_year = 'October to September',
  education_system = 'European Credit Transfer System (ECTS)',
  
  -- Education Statistics
  international_students = '125,000+',
  top_universities = '40+ universities in global top 500',
  english_programs = '500+ programs taught in English',
  post_study_work = 'Up to 12 months',
  
  -- Education System
  bachelor_info = 'Known as "Laurea" or "Laurea Triennale", usually takes 3 years (180 ECTS). Provides a solid foundation in the field of study with both theoretical knowledge and practical skills.',
  master_info = 'Known as "Laurea Magistrale", typically 2 years (120 ECTS). Focuses on advanced knowledge and specialization in a specific field. Many programs include internships or research projects.',
  phd_info = 'Known as "Dottorato di Ricerca", typically 3-4 years. Focuses on independent research and requires original contribution to the field. Most programs include some coursework in addition to research.',
  teaching_style = 'Combines traditional lectures with seminars, laboratory work, and practical exercises depending on the field. Some programs, especially in humanities, may emphasize theoretical knowledge, while technical fields include more practical components.',
  grading_system = 'Uses a scale of 0-30, with 18 as the passing grade. Exceptional performance may receive "30 e lode" (30 with distinction). Final degree grades are on a scale of 66-110, with 110 e lode being the highest distinction.',
  instruction_language = 'Italian is the main language of instruction, but there''s a growing number of programs taught entirely in English, especially at the master''s and PhD levels and in fields like business, engineering, and international relations.',
  academic_calendar = 'Two semesters: First semester (October to January/February) and Second semester (February/March to July). Each semester is followed by an examination period.',
  universities_intro = 'Italy has one of the oldest higher education systems in the world, with the University of Bologna founded in 1088 being the oldest university in continuous operation. The country has 97 universities, including state universities, private universities, and specialized institutions.',
  
  -- Admission & Visa Requirements
  educational_requirements = 'For Bachelor''s: Secondary school diploma equivalent to Italian "Diploma di Maturità" with at least 12 years of previous education. For Master''s: A relevant bachelor''s degree equivalent to Italian "Laurea".',
  transcript_requirements = 'Official transcripts and degree certificates with their certified translations in Italian. Documents must be legalized/apostilled according to the country of origin.',
  entrance_exams = 'Many programs, especially competitive fields like medicine, dentistry, architecture, and veterinary science, require entrance exams. Some universities also conduct admission tests for courses with limited places. Some international programs may accept SAT, ACT, or GRE scores.',
  english_requirements = 'For English-taught programs:
- IELTS: Typically 5.5-6.5
- TOEFL iBT: Typically 70-90
- Cambridge English: B2 First or higher
For Italian-taught programs:
- CILS, CELI, PLIDA, or IT: Usually B1-B2 level required',
  language_exemptions = 'Students who have completed a degree program taught entirely in English or Italian may be exempt from language tests, but documentation proving the language of instruction is required.',
  visa_requirements = 'Non-EU students need to apply for a Type D (study) visa at the Italian embassy or consulate in their country of residence. Requirements include:
- Letter of acceptance from an Italian university
- Proof of accommodation
- Proof of financial means
- Health insurance
- Valid passport',
  financial_requirements = 'Students must demonstrate they have sufficient funds to cover their expenses in Italy, approximately €6,000-€7,000 per year. This can be shown through bank statements, scholarship certificates, or guarantees from sponsors.',
  health_requirements = 'All students must have health insurance coverage. EU students can use their European Health Insurance Card (EHIC). Non-EU students can either purchase private insurance in their home country that is valid in Italy or register with the Italian National Health Service (SSN) upon arrival.',
  additional_documents = '- Valid passport valid for at least 3 months beyond the visa
- Completed visa application form
- Recent passport-sized photographs
- Letter of acceptance from an Italian university
- Proof of accommodation in Italy
- Proof of financial means
- Health insurance
- Paid visa application fee
- Declaration of Value (Dichiarazione di Valore) of previous qualifications',
  visa_tip = 'Apply for your student visa at least 3 months before your intended departure. The pre-enrollment procedure through the Italian consulate/embassy (for non-EU students) must be completed before applying for a visa. After arriving in Italy, you must apply for a residence permit (Permesso di Soggiorno) within 8 days.',

  -- Tuition & Living Costs
  bachelor_fee_public = '€900-€4,000 per year (based on family income)',
  bachelor_fee_private = '€6,000-€20,000 per year',
  bachelor_fee_medical = '€3,000-€5,000 per year at public universities',
  master_fee_public = '€1,500-€3,500 per year',
  master_fee_private = '€8,000-€25,000 per year',
  master_fee_business = '€6,000-€35,000 for MBA programs',
  accommodation_cost = '€300-€700 per month',
  accommodation_note = 'University dormitories (€200-€300/month) are limited but most affordable. Shared apartments (€300-€500/month) are the most common option for students. Private rentals range from €400-€800/month depending on the city.',
  food_cost = '€150-€300 per month',
  food_note = 'University canteens offer meals at subsidized prices (€3-€7). Grocery shopping costs around €150-€200/month for basic necessities.',
  transport_cost = '€30-€60 per month',
  transport_note = 'Student discounts available on public transport. Monthly passes range from €30-€60 depending on the city.',
  utilities_cost = '€80-€150 per month',
  utilities_note = 'Includes electricity, heating, water, and internet. Often partially included in dormitory fees.',
  other_cost = '€100-€200 per month',
  other_note = 'Includes books, leisure activities, phone plans, and other personal expenses.',
  total_monthly_cost = '€660-€1,410 per month',
  budget_tip1 = 'Choose smaller cities or southern regions for lower living costs compared to Milan, Rome, or Florence.',
  budget_tip2 = 'Take advantage of student discounts for museums, transportation, and cultural events with your student ID.',
  budget_tip3 = 'Use university canteens (mense) for affordable meals. Many offer complete meals for €5-€7.',
  budget_tip4 = 'Look for rooms in shared apartments (stanze in appartamenti condivisi) for more affordable accommodation.',
  government_scholarships = 'The Italian government offers scholarships through the Ministry of Foreign Affairs for international students, covering tuition fees, accommodation, and a monthly allowance.',
  university_scholarships = 'Many Italian universities offer merit-based scholarships and tuition waivers. Regional scholarship programs (DSU - Diritto allo Studio Universitario) provide support based on financial need and academic merit.',
  external_scholarships = 'Erasmus+ Program (for EU students), EDISU regional scholarships, Fulbright Scholarships (for US students), and various foundation scholarships are available for international students in Italy.',
  
  -- Student Life
  campus_life = 'Italian university life is less campus-centered than in some countries, with students integrating into the broader urban environment. Most universities have student associations, cultural clubs, and sports facilities.',
  campus_life_extra = 'Traditional university cities like Bologna, Padua, and Pisa have a vibrant student atmosphere with events, festivals, and activities throughout the academic year. Universities often organize cultural initiatives, conferences, and workshops to enrich student experience.',
  work_opportunities = 'International students can work part-time (up to 20 hours per week) while studying. EU students have no work restrictions, while non-EU students can work with their study permit.',
  work_opportunities_extra = 'Common student jobs include tutoring, hospitality roles, and internships. Many degree programs include internship opportunities with Italian companies. After graduation, non-EU students can convert their residence permit to a work permit if they find relevant employment.',
  cultural_experience = 'Studying in Italy offers an immersive cultural experience in a country known for its art, architecture, culinary traditions, and historical heritage. Students have access to world-class museums, archaeological sites, and cultural events.',
  cultural_experience_extra = 'Italian lifestyle emphasizes social connections, food culture, and appreciation for beauty and design. The country''s diverse regions each offer unique traditions, dialects, cuisines, and landscapes – from the Alpine north to the Mediterranean south.',
  student_life_image1 = '/images/countries/italy/student-life-1.jpg',
  student_life_image2 = '/images/countries/italy/student-life-2.jpg',
  student_life_image3 = '/images/countries/italy/student-life-3.jpg',
  student_life_image4 = '/images/countries/italy/student-life-4.jpg',

  -- Testimonials
  testimonial1_name = 'Maria Gonzalez',
  testimonial1_image = '/images/testimonials/maria.jpg',
  testimonial1_program = 'Master in Art History',
  testimonial1_university = 'Università di Bologna',
  testimonial1_quote = 'Studying art history in the country with the most UNESCO World Heritage Sites has been incredible. The professors are passionate experts who often take us to see the artworks we''re studying in person. Living in Bologna, one of the oldest university cities in the world, has given me a perfect balance of academic excellence and vibrant student life. The city is affordable compared to other European capitals, and the food is amazing!',
  testimonial1_country = 'From Brazil',
  testimonial2_name = 'Ahmed Al-Farsi',
  testimonial2_image = '/images/testimonials/ahmed.jpg',
  testimonial2_program = 'Engineering Management',
  testimonial2_university = 'Politecnico di Milano',
  testimonial2_quote = 'The Politecnico di Milano has an excellent reputation in engineering fields, with strong industry connections. My program in English had students from over 30 countries, creating a truly international environment. Milan is a business hub with many opportunities for internships and networking. While the cost of living is higher than in other Italian cities, the career opportunities make it worthwhile. I''ve improved my technical skills and gained a global perspective.',
  testimonial2_country = 'From Oman',
  testimonial3_name = 'Seo-yeon Kim',
  testimonial3_image = '/images/testimonials/seo-yeon.jpg',
  testimonial3_program = 'Food Science and Technology',
  testimonial3_university = 'Università di Firenze',
  testimonial3_quote = 'Studying food science in the home of Mediterranean cuisine has been a perfect combination of science and culture. The program balances theoretical knowledge with practical applications, and we regularly visit local producers and food companies. Florence is a beautiful city with a manageable size and excellent connections to other parts of Italy. Learning Italian alongside my studies has been challenging but rewarding and opened up many opportunities to connect with locals.',
  testimonial3_country = 'From South Korea',

  -- FAQs
  faq1_question = 'What are the benefits of studying in Italy?',
  faq1_answer = 'Italy offers high-quality education at relatively affordable tuition fees compared to other Western European countries. The country has a rich cultural heritage, excellent cuisine, and high quality of life. Italian universities are among the oldest in the world with strong traditions in arts, humanities, architecture, design, and engineering. Students gain valuable international experience, language skills, and access to Europe''s job market. Many programs include practical experience through internships and industry projects.',
  faq2_question = 'How much does it cost to study in Italy?',
  faq2_answer = 'Public universities have relatively low tuition fees, typically between €900-€4,000 per year, based on the program and often on family income. Private universities and specialized institutions charge higher fees, ranging from €6,000-€20,000 annually. Living costs vary by location, with northern cities like Milan being the most expensive (€1,000-€1,500 per month) and southern cities being more affordable (€700-€1,000 per month). Students can benefit from discounted meals at university cafeterias, public transportation passes, and cultural activities.',
  faq3_question = 'Do I need to speak Italian to study in Italy?',
  faq3_answer = 'While knowing Italian enhances your experience and daily life in Italy, many universities offer programs taught entirely in English, especially at the master''s and PhD levels. There are approximately 500+ English-taught programs across various fields. However, learning at least basic Italian is recommended for daily interactions, shopping, and fully immersing in the local culture. Most universities offer Italian language courses for international students, often at reduced rates or for free.',
  faq4_question = 'What are the visa requirements for studying in Italy?',
  faq4_answer = 'EU/EEA students don''t need a visa to study in Italy. Non-EU students need to apply for a Type D (study) visa through the Italian embassy or consulate in their home country. The process includes university pre-enrollment, providing proof of accommodation, demonstrating sufficient financial resources (approximately €6,000-€7,000 per year), and having health insurance coverage. After arriving in Italy, all non-EU students must apply for a residence permit (Permesso di Soggiorno) within 8 days.',
  faq5_question = 'Can international students work while studying in Italy?',
  faq5_answer = 'Yes, international students can work part-time (up to 20 hours per week) while studying in Italy. EU students have no restrictions on working, while non-EU students can work within the terms of their study permit. Common student jobs include tutoring, hospitality, retail, and internships. During holiday periods, students can work full-time. The minimum wage varies by sector, but student jobs typically pay €8-€15 per hour.',
  faq6_question = 'What types of universities exist in Italy?',
  faq6_answer = 'Italy has several types of higher education institutions: public universities (funded by the state with lower tuition fees), private universities (higher fees but often smaller classes and more services), technical universities (polytechnics specializing in engineering and architecture), specialized schools (for design, fashion, fine arts, etc.), and higher education institutes (for specific professional training). Public universities are generally well-regarded and offer a wide range of programs, while private institutions may have stronger industry connections in certain fields.',
  faq7_question = 'What scholarships are available for international students in Italy?',
  faq7_answer = 'International students can apply for various scholarships, including Italian Government Scholarships (through the Ministry of Foreign Affairs), regional scholarships (through DSU offices), university merit scholarships, Erasmus+ funding (for EU students), and external scholarships from organizations like the Fulbright Commission. Most scholarships are awarded based on academic merit and/or financial need. Deadlines are typically several months before the academic year starts, so early application is recommended.',
  faq8_question = 'What is the academic calendar in Italian universities?',
  faq8_answer = 'The academic year in Italy typically runs from October to September, divided into two semesters. The first semester usually runs from October to January/February, followed by an examination period. The second semester runs from February/March to June/July, also followed by exams. There are breaks for Christmas, Easter, and summer (July-September). Some universities operate on a trimester system instead. Exact dates vary by institution, so check with your specific university.'
WHERE slug = 'italy'; 