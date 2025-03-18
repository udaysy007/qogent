-- Add universities for Netherlands
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url, campus_images)
VALUES 
  ('University of Amsterdam', 'university-amsterdam', 
   (SELECT id FROM countries WHERE slug = 'netherlands'), 
   'Amsterdam', true, 55, 
   'The University of Amsterdam is the largest university in the Netherlands and one of the largest research universities in Europe. Founded in 1632, it has a rich history and is known for its diverse and international student body.',
   'https://www.uva.nl/en', '/images/universities/uva-logo.svg',
   ARRAY['/images/universities/uva-campus.jpg']),
   
  ('Delft University of Technology', 'delft-university-technology', 
   (SELECT id FROM countries WHERE slug = 'netherlands'), 
   'Delft', true, 57, 
   'TU Delft is the oldest and largest Dutch public technical university, established in 1842. It is known for its high-quality research and education in engineering and technical sciences, particularly in civil engineering and architecture.',
   'https://www.tudelft.nl/en/', '/images/universities/tudelft-logo.svg',
   ARRAY['/images/universities/tudelft-campus.jpg']),
   
  ('Utrecht University', 'utrecht-university', 
   (SELECT id FROM countries WHERE slug = 'netherlands'), 
   'Utrecht', true, 124, 
   'Utrecht University is one of Europe''s leading research universities, recognized internationally for its high-quality, innovative approach to both research and teaching. Founded in 1636, it has a long tradition of high-quality education.',
   'https://www.uu.nl/en', '/images/universities/utrecht-logo.svg',
   ARRAY['/images/universities/utrecht-campus.jpg']);

-- Add universities for Poland
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url, campus_images)
VALUES 
  ('University of Warsaw', 'university-warsaw', 
   (SELECT id FROM countries WHERE slug = 'poland'), 
   'Warsaw', true, 284, 
   'The University of Warsaw is Poland''s largest and one of its most prestigious institutions of higher education, established in 1816. It offers programs in humanities, social sciences, and natural sciences, and has a strong research profile.',
   'https://en.uw.edu.pl/', '/images/universities/warsaw-logo.svg',
   ARRAY['/images/universities/warsaw-campus.jpg']),
   
  ('Warsaw University of Technology', 'warsaw-university-technology', 
   (SELECT id FROM countries WHERE slug = 'poland'), 
   'Warsaw', true, 511, 
   'Warsaw University of Technology is one of the leading technical universities in Poland and Central Europe. Founded in 1826, it is known for its programs in engineering, particularly in computer science, electrical engineering, and mechanical engineering.',
   'https://www.pw.edu.pl/engpw', '/images/universities/wut-logo.svg',
   ARRAY['/images/universities/wut-campus.jpg']),
   
  ('Jagiellonian University', 'jagiellonian-university', 
   (SELECT id FROM countries WHERE slug = 'poland'), 
   'Kraków', true, 293, 
   'Founded in 1364, Jagiellonian University is the oldest university in Poland and one of the oldest in Europe. It is known for its programs in humanities, sciences, and medicine, and has educated many notable alumni, including Nicolaus Copernicus.',
   'https://en.uj.edu.pl/', '/images/universities/jagiellonian-logo.svg',
   ARRAY['/images/universities/jagiellonian-campus.jpg']);

-- Add programs for University of Amsterdam
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Artificial Intelligence', 
  id, 
  'master', 
  'Master of Science in Artificial Intelligence',
  'This program covers advanced topics in AI, machine learning, and cognitive science, with opportunities for research in areas such as computer vision and natural language processing.',
  '2 years',
  'English',
  '{"amount": 15000, "currency": "EUR", "period": "year", "notes": "Non-EU/EEA student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-amsterdam';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'International Relations', 
  id, 
  'master', 
  'Master of Science in International Relations',
  'This program examines global political, economic, and security issues, with specializations in European studies, international political economy, and human rights.',
  '1 year',
  'English',
  '{"amount": 15000, "currency": "EUR", "period": "year", "notes": "Non-EU/EEA student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-amsterdam';

-- Add programs for Delft University of Technology
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Computer Science', 
  id, 
  'master', 
  'Master of Science in Computer Science',
  'This program offers specializations in data science, artificial intelligence, cybersecurity, and software engineering, with strong industry connections and research opportunities.',
  '2 years',
  'English',
  '{"amount": 18750, "currency": "EUR", "period": "year", "notes": "Non-EU/EEA student rate"}'::jsonb
FROM universities 
WHERE slug = 'delft-university-technology';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Architecture, Urbanism and Building Sciences', 
  id, 
  'master', 
  'Master of Science in Architecture, Urbanism and Building Sciences',
  'This program integrates design, technology, and social aspects of the built environment, with opportunities for specialization in architecture, urbanism, and building technology.',
  '2 years',
  'English',
  '{"amount": 18750, "currency": "EUR", "period": "year", "notes": "Non-EU/EEA student rate"}'::jsonb
FROM universities 
WHERE slug = 'delft-university-technology';

-- Add programs for Utrecht University
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Artificial Intelligence', 
  id, 
  'master', 
  'Master of Science in Artificial Intelligence',
  'This program offers advanced training in AI research and applications, with specializations in cognitive science, intelligent systems, and data science.',
  '2 years',
  'English',
  '{"amount": 17500, "currency": "EUR", "period": "year", "notes": "Non-EU/EEA student rate"}'::jsonb
FROM universities 
WHERE slug = 'utrecht-university';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Sustainable Development', 
  id, 
  'master', 
  'Master of Science in Sustainable Development',
  'This interdisciplinary program addresses global sustainability challenges, combining perspectives from environmental sciences, economics, and governance studies.',
  '2 years',
  'English',
  '{"amount": 17500, "currency": "EUR", "period": "year", "notes": "Non-EU/EEA student rate"}'::jsonb
FROM universities 
WHERE slug = 'utrecht-university';

-- Add programs for University of Warsaw
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'American Studies', 
  id, 
  'master', 
  'Master of Arts in American Studies',
  'This program offers comprehensive understanding of American culture, politics, and society, with interdisciplinary approaches from history, literature, and political science.',
  '2 years',
  'English',
  '{"amount": 3000, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-warsaw';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Data Science and Business Analytics', 
  id, 
  'master', 
  'Master of Data Science and Business Analytics',
  'This program combines data science techniques with business applications, preparing students for careers in data-driven decision making and business intelligence.',
  '2 years',
  'English',
  '{"amount": 3500, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-warsaw';

-- Add programs for Warsaw University of Technology
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Computer Science', 
  id, 
  'master', 
  'Master of Science in Computer Science',
  'This program offers specializations in software engineering, artificial intelligence, and computer systems, with strong emphasis on practical skills and research opportunities.',
  '1.5 years',
  'English',
  '{"amount": 3000, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'warsaw-university-technology';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Power Engineering', 
  id, 
  'master', 
  'Master of Science in Power Engineering',
  'This program covers conventional and renewable energy systems, power electronics, and smart grids, preparing students for careers in the evolving energy sector.',
  '1.5 years',
  'English',
  '{"amount": 3000, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'warsaw-university-technology';

-- Add programs for Jagiellonian University
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'International Relations', 
  id, 
  'master', 
  'Master of Arts in International Relations',
  'This program examines contemporary global issues, with specializations in European studies, international security, and diplomacy, in the context of Central and Eastern Europe.',
  '2 years',
  'English',
  '{"amount": 2500, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'jagiellonian-university';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Drug Discovery and Development', 
  id, 
  'master', 
  'Master of Science in Drug Discovery and Development',
  'This interdisciplinary program combines pharmaceutical sciences, chemistry, and biology to train students in modern approaches to drug discovery and pharmaceutical development.',
  '2 years',
  'English',
  '{"amount": 3000, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'jagiellonian-university'; 