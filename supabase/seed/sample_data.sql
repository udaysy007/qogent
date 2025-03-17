-- Sample data for countries
INSERT INTO countries (name, slug, code, region, flag_url, hero_image_url, description, long_description, featured, tags)
VALUES 
  ('Ireland', 'ireland', 'IE', 'Europe', '/images/flags/ireland.svg', '/images/destinations/ireland-hero.jpg', 
   'Known for its welcoming culture and post-study work opportunities, Ireland offers high-quality education in a safe, English-speaking environment.',
   'Ireland has become one of the most popular study destinations in Europe, offering world-class education in a friendly, English-speaking environment. With its rich cultural heritage, stunning landscapes, and vibrant cities, Ireland provides an exceptional student experience. The country''s education system is internationally recognized for its excellence, with many universities ranking among the top in the world. Additionally, Ireland''s growing economy offers excellent post-graduation employment opportunities, particularly in technology, pharmaceuticals, and financial services.',
   true, ARRAY['english-taught', 'work-opportunities', 'immigration-pathway']),
   
  ('Germany', 'germany', 'DE', 'Europe', '/images/flags/germany.svg', '/images/destinations/germany-hero.jpg', 
   'Germany offers tuition-free education at public universities with strong industry connections and post-graduation work opportunities.',
   'Germany is renowned for its high-quality education system and is one of the few European countries that offers tuition-free education at public universities for all students, regardless of nationality. The country is home to some of the world''s oldest and most prestigious universities, with a strong focus on research and innovation. German degrees are highly respected by employers worldwide, and the country''s strong economy provides excellent career opportunities for graduates. Additionally, Germany''s central location in Europe makes it an ideal base for exploring the continent.',
   true, ARRAY['tuition-free', 'engineering-focus', 'research-opportunities']),
   
  ('Canada', 'canada', 'CA', 'North America', '/images/flags/canada.svg', '/images/destinations/canada-hero.jpg', 
   'Canada offers a high standard of living, multicultural environment, and quality education with work opportunities during and after studies.',
   'Canada is consistently ranked as one of the best countries in the world for quality of life and is known for its welcoming attitude toward international students. The Canadian education system is renowned for its excellence, with universities regularly ranking among the world''s best. International students in Canada can work part-time during their studies and may be eligible for post-graduation work permits, which can lead to permanent residency. The country''s diverse, multicultural society and stunning natural landscapes make it an attractive destination for students from around the world.',
   true, ARRAY['immigration-pathway', 'multicultural', 'work-opportunities']);

-- Sample data for universities
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url)
VALUES 
  ('Trinity College Dublin', 'trinity-college-dublin', 
   (SELECT id FROM countries WHERE slug = 'ireland'), 
   'Dublin', true, 101, 
   'Ireland''s oldest and most prestigious university, known for its historic campus and strong programs in humanities and sciences.',
   'https://www.tcd.ie', '/images/universities/trinity-college-dublin.jpg'),
   
  ('University College Dublin', 'university-college-dublin', 
   (SELECT id FROM countries WHERE slug = 'ireland'), 
   'Dublin', true, 173, 
   'Ireland''s largest university with a diverse international community and strong research focus.',
   'https://www.ucd.ie', '/images/universities/ucd.jpg'),
   
  ('Technical University of Munich', 'technical-university-of-munich', 
   (SELECT id FROM countries WHERE slug = 'germany'), 
   'Munich', true, 50, 
   'One of Germany''s top technical universities with strong industry connections and research opportunities.',
   'https://www.tum.de', '/images/universities/tum.jpg'),
   
  ('University of Toronto', 'university-of-toronto', 
   (SELECT id FROM countries WHERE slug = 'canada'), 
   'Toronto', true, 18, 
   'Canada''s top-ranked university with a diverse student body and comprehensive range of programs.',
   'https://www.utoronto.ca', '/images/universities/toronto.jpg');

-- Sample data for visa requirements
INSERT INTO visa_requirements (country_id, student_visa, processing_time, application_fee, documents)
VALUES 
  ((SELECT id FROM countries WHERE slug = 'ireland'), 
   'Required for non-EU students', '4-8 weeks', 
   '{"amount": 60, "currency": "EUR"}', 
   ARRAY['Letter of acceptance from an Irish institution', 'Proof of tuition payment', 'Evidence of sufficient funds (at least €7,000)', 'Private medical insurance', 'Valid passport']),
   
  ((SELECT id FROM countries WHERE slug = 'germany'), 
   'Required for non-EU students', '4-12 weeks', 
   '{"amount": 75, "currency": "EUR"}', 
   ARRAY['Letter of acceptance from a German institution', 'Proof of financial resources (€10,332 per year)', 'Health insurance', 'Valid passport']),
   
  ((SELECT id FROM countries WHERE slug = 'canada'), 
   'Study permit required', '8-12 weeks', 
   '{"amount": 150, "currency": "CAD"}', 
   ARRAY['Letter of acceptance from a Canadian institution', 'Proof of financial support', 'Police clearance certificate', 'Medical examination results', 'Valid passport']);

-- Sample data for cost of living
INSERT INTO cost_of_living (country_id, accommodation_low, accommodation_high, food_low, food_high, transport_low, transport_high, utilities_low, utilities_high, currency)
VALUES 
  ((SELECT id FROM countries WHERE slug = 'ireland'), 
   500, 1000, 250, 350, 80, 120, 100, 150, 'EUR'),
   
  ((SELECT id FROM countries WHERE slug = 'germany'), 
   300, 700, 200, 300, 70, 100, 80, 120, 'EUR'),
   
  ((SELECT id FROM countries WHERE slug = 'canada'), 
   600, 1200, 300, 500, 100, 150, 100, 200, 'CAD');

-- Sample data for work opportunities
INSERT INTO work_opportunities (country_id, during_studies, after_graduation, average_salary)
VALUES 
  ((SELECT id FROM countries WHERE slug = 'ireland'), 
   '20 hours per week during term, 40 hours during holidays', 
   'Stay Back Option: 1 year for Bachelor''s, 2 years for Master''s/PhD', 
   '{"low": 30000, "high": 45000, "currency": "EUR", "period": "year"}'),
   
  ((SELECT id FROM countries WHERE slug = 'germany'), 
   '120 full days or 240 half days per year', 
   '18-month job-seeker visa after graduation', 
   '{"low": 35000, "high": 55000, "currency": "EUR", "period": "year"}'),
   
  ((SELECT id FROM countries WHERE slug = 'canada'), 
   '20 hours per week during term, full-time during breaks', 
   'Post-Graduation Work Permit: up to 3 years', 
   '{"low": 40000, "high": 60000, "currency": "CAD", "period": "year"}');

-- Sample data for language requirements
INSERT INTO language_requirements (country_id, english_required, english_tests, english_scores, local_required, local_tests, local_scores)
VALUES 
  ((SELECT id FROM countries WHERE slug = 'ireland'), 
   true, ARRAY['IELTS', 'TOEFL'], '{"IELTS": "6.0", "TOEFL": "80"}', 
   false, ARRAY[]::text[], '{}'),
   
  ((SELECT id FROM countries WHERE slug = 'germany'), 
   true, ARRAY['IELTS', 'TOEFL'], '{"IELTS": "6.5", "TOEFL": "85"}', 
   true, ARRAY['TestDaF', 'DSH'], '{"TestDaF": "TDN 4", "DSH": "DSH-2"}'),
   
  ((SELECT id FROM countries WHERE slug = 'canada'), 
   true, ARRAY['IELTS', 'TOEFL', 'CELPIP'], '{"IELTS": "6.5", "TOEFL": "90", "CELPIP": "7"}', 
   false, ARRAY[]::text[], '{}');

-- Sample data for FAQs
INSERT INTO faqs (country_id, question, answer, category)
VALUES 
  ((SELECT id FROM countries WHERE slug = 'ireland'), 
   'Do I need to know Irish to study in Ireland?', 
   'No, English is widely spoken in Ireland and all university programs are taught in English. While learning some Irish phrases can enhance your cultural experience, it''s not necessary for your studies.', 
   'Language'),
   
  ((SELECT id FROM countries WHERE slug = 'ireland'), 
   'How much money do I need to show for a student visa?', 
   'You need to demonstrate access to at least €7,000 at the time of your visa application, plus your full tuition fees for the first year.', 
   'Visa'),
   
  ((SELECT id FROM countries WHERE slug = 'germany'), 
   'Are there really no tuition fees in Germany?', 
   'Public universities in Germany generally do not charge tuition fees for undergraduate and most graduate programs, regardless of nationality. However, there is usually a semester fee of €100-350 that covers administrative costs and public transportation.', 
   'Costs'),
   
  ((SELECT id FROM countries WHERE slug = 'canada'), 
   'Can I stay in Canada after graduation?', 
   'Yes, international students who complete a program of at least 8 months at a designated learning institution may be eligible for a Post-Graduation Work Permit (PGWP). The PGWP can be valid for up to 3 years, depending on the length of your study program.', 
   'Immigration');

-- Sample data for jobs
INSERT INTO jobs (title, department, location, type, description, responsibilities, requirements, benefits, is_active)
VALUES 
  ('Student Advisor', 'Student Services', 'Dublin, Ireland', 'Full-time', 
   'Join our team as a Student Advisor to help international students navigate their educational journey in Ireland.',
   ARRAY['Provide guidance on university applications', 'Assist with visa processes', 'Organize orientation programs', 'Support students with accommodation search'],
   ARRAY['Bachelor''s degree in Education or related field', 'Previous experience in student services', 'Excellent communication skills', 'Knowledge of Irish education system'],
   ARRAY['Competitive salary', 'Health insurance', 'Paid time off', 'Professional development opportunities'],
   true),
   
  ('Marketing Specialist', 'Marketing', 'Remote', 'Full-time', 
   'We are looking for a Marketing Specialist to promote our services to prospective international students.',
   ARRAY['Develop marketing campaigns', 'Manage social media presence', 'Create content for website and blog', 'Analyze marketing metrics'],
   ARRAY['Bachelor''s degree in Marketing or related field', 'Minimum 2 years of experience in digital marketing', 'Experience with SEO and content marketing', 'Knowledge of international education sector'],
   ARRAY['Flexible work hours', 'Remote work option', 'Performance bonuses', 'Health benefits'],
   true);

-- Sample data for blogs
INSERT INTO blogs (title, slug, content, excerpt, author, tags, country_id)
VALUES 
  ('Guide to Student Life in Ireland', 'guide-to-student-life-in-ireland', 
   '# Guide to Student Life in Ireland

## Introduction

Ireland has become one of the most popular destinations for international students, and for good reason. With its world-class universities, friendly locals, rich culture, and stunning landscapes, studying in Ireland offers a unique and rewarding experience.

## Accommodation

Finding the right accommodation is one of the most important aspects of student life. In Ireland, you have several options:

### University Accommodation
Most universities offer on-campus housing, which is convenient but can be limited and competitive. Apply early to secure a spot.

### Private Rentals
Renting an apartment or house is common, especially for mature students or those who prefer more independence. Websites like Daft.ie and Rent.ie are popular platforms for finding rentals.

### Homestays
Living with an Irish family can be a great way to immerse yourself in the local culture and improve your English skills.

## Transportation

Ireland has a well-developed public transportation system:

- **Dublin Bus** and other city bus services
- **Luas** (tram system in Dublin)
- **DART** (Dublin Area Rapid Transit)
- **Irish Rail** for intercity travel

Students can get discounted fares with a Student Leap Card.

## Cost of Living

Ireland, especially Dublin, can be expensive. Here''s a rough monthly budget:

- Accommodation: €500-€1,000
- Food: €250-€350
- Transportation: €80-€120
- Utilities: €100-€150
- Entertainment: €150-€200

## Working While Studying

Non-EU students can work up to 20 hours per week during the academic term and full-time during scheduled breaks. The minimum wage in Ireland is €11.30 per hour, which can help offset some of your expenses.

## Healthcare

International students staying for more than 90 days must have health insurance. Some universities offer health insurance plans, or you can purchase one from private providers.

## Social Life and Culture

Ireland is known for its vibrant social scene. From traditional pubs with live music to modern clubs, there''s something for everyone. Don''t miss out on:

- Traditional Irish music sessions
- Cultural festivals throughout the year
- Exploring historic sites and natural landscapes
- Joining university clubs and societies

## Conclusion

Studying in Ireland offers more than just academic excellence; it''s a chance to experience a unique culture, make international connections, and create memories that will last a lifetime. With proper planning and an open mind, your Irish educational journey can be truly transformative.',
   'Discover what it''s like to be a student in Ireland, from accommodation options and transportation to social life and working opportunities.',
   'Sarah O''Connor',
   ARRAY['student life', 'accommodation', 'working in ireland'],
   (SELECT id FROM countries WHERE slug = 'ireland')),
   
  ('Understanding German University Applications', 'understanding-german-university-applications', 
   '# Understanding German University Applications

## Introduction

Germany''s tuition-free public universities attract thousands of international students each year. However, the application process can be complex and differs significantly from other countries. This guide will help you navigate the German university application system.

## Types of Universities in Germany

Germany has three main types of higher education institutions:

1. **Universities (Universitäten)** - Focus on theoretical and research-oriented education
2. **Universities of Applied Sciences (Fachhochschulen)** - Offer practice-oriented education
3. **Colleges of Art, Film, and Music** - Specialized in artistic disciplines

## Application Platforms

Depending on the university and program, you may need to apply through one of these platforms:

- **uni-assist** - The most common application portal for international students
- **Hochschulstart** - Mainly for medicine, dentistry, pharmacy, and veterinary medicine
- **Direct application** to the university

## Required Documents

Most applications require:

- Certified copies of your high school diploma or previous university degrees
- Transcript of records
- Proof of language proficiency (German and/or English)
- Motivation letter
- CV
- Copy of your passport
- Passport photos

## Application Timeline

The German academic year consists of two semesters:

- **Winter semester**: October to March (application deadline: usually July 15)
- **Summer semester**: April to September (application deadline: usually January 15)

Start your application process at least 6 months before the deadline.

## Language Requirements

For programs taught in German, you''ll need to prove your German language proficiency through tests like:

- TestDaF (Test Deutsch als Fremdsprache)
- DSH (Deutsche Sprachprüfung für den Hochschulzugang)
- Goethe-Zertifikat

For English-taught programs, tests like IELTS or TOEFL are required.

## Admission Restrictions (Numerus Clausus)

Some programs have limited spots and use a grade-based selection system called Numerus Clausus (NC). Programs with NC are more competitive and may require higher grades.

## Studienkolleg (Preparatory College)

If your high school diploma isn''t recognized as equivalent to the German Abitur, you may need to attend a Studienkolleg for one year before applying to a university.

## Visa Process

Once accepted, non-EU students will need to apply for a student visa. Requirements include:

- Acceptance letter from a German university
- Proof of financial resources (approximately €10,332 per year)
- Health insurance
- Valid passport

## Conclusion

While the German university application process may seem daunting, the reward of quality, tuition-free education makes it worthwhile. Start early, stay organized, and don''t hesitate to contact university international offices for guidance.',
   'A comprehensive guide to navigating the German university application process, from required documents and deadlines to language requirements and visa procedures.',
   'Dr. Klaus Schmidt',
   ARRAY['university applications', 'study in germany', 'admission process'],
   (SELECT id FROM countries WHERE slug = 'germany')); 