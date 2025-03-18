-- Add universities for Italy
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url, campus_images)
VALUES 
  ('University of Bologna', 'university-bologna', 
   (SELECT id FROM countries WHERE slug = 'italy'), 
   'Bologna', true, 160, 
   'Founded in 1088, the University of Bologna is the oldest university in continuous operation in the world. It is renowned for its humanities, law, and engineering programs, and has a rich academic heritage spanning nearly a millennium.',
   'https://www.unibo.it/en', '/images/universities/bologna-logo.svg',
   ARRAY['/images/universities/bologna-campus.jpg']),
   
  ('Politecnico di Milano', 'politecnico-milano', 
   (SELECT id FROM countries WHERE slug = 'italy'), 
   'Milan', true, 123, 
   'Politecnico di Milano is Italy''s largest technical university, specializing in engineering, architecture, and design. It is consistently ranked as one of the world''s best engineering schools.',
   'https://www.polimi.it/en/', '/images/universities/polimi-logo.svg',
   ARRAY['/images/universities/polimi-campus.jpg']),
   
  ('Sapienza University of Rome', 'sapienza-university-rome', 
   (SELECT id FROM countries WHERE slug = 'italy'), 
   'Rome', true, 171, 
   'Sapienza University of Rome is one of the oldest universities in the world and the largest European university by enrollments. It offers an extensive range of courses, from engineering to humanities, and has a strong reputation for research.',
   'https://www.uniroma1.it/en/', '/images/universities/sapienza-logo.svg',
   ARRAY['/images/universities/sapienza-campus.jpg']);

-- Add universities for Japan
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url, campus_images)
VALUES 
  ('University of Tokyo', 'university-tokyo', 
   (SELECT id FROM countries WHERE slug = 'japan'), 
   'Tokyo', true, 24, 
   'The University of Tokyo, established in 1877, is Japan''s most prestigious university and consistently ranks among the top universities in Asia. It excels in both scientific research and the humanities.',
   'https://www.u-tokyo.ac.jp/en/', '/images/universities/tokyo-logo.svg',
   ARRAY['/images/universities/tokyo-campus.jpg']),
   
  ('Kyoto University', 'kyoto-university', 
   (SELECT id FROM countries WHERE slug = 'japan'), 
   'Kyoto', true, 33, 
   'Kyoto University is one of Japan''s premier research institutions, known for its liberal academic culture and diverse research activities. The university has produced numerous Nobel laureates and other notable researchers.',
   'https://www.kyoto-u.ac.jp/en', '/images/universities/kyoto-logo.svg',
   ARRAY['/images/universities/kyoto-campus.jpg']),
   
  ('Osaka University', 'osaka-university', 
   (SELECT id FROM countries WHERE slug = 'japan'), 
   'Osaka', true, 75, 
   'Osaka University is a leading research university in Japan, particularly strong in medicine, science, and engineering. It is known for its innovative research and international collaborations.',
   'https://www.osaka-u.ac.jp/en', '/images/universities/osaka-logo.svg',
   ARRAY['/images/universities/osaka-campus.jpg']);

-- Add programs for University of Bologna
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Computer Science and Engineering', 
  id, 
  'master', 
  'Master in Computer Science and Engineering',
  'This program offers advanced training in algorithms, software engineering, and computer systems design, with opportunities for specialization in artificial intelligence and data science.',
  '2 years',
  'English',
  '{"amount": 3000, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-bologna';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'International Relations', 
  id, 
  'master', 
  'Master in International Relations',
  'This program provides advanced knowledge of international politics, economics, and law, preparing students for careers in diplomacy, international organizations, and global business.',
  '2 years',
  'English',
  '{"amount": 3000, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-bologna';

-- Add programs for Politecnico di Milano
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Computer Science and Engineering', 
  id, 
  'master', 
  'Master of Science in Computer Science and Engineering',
  'This program offers specializations in artificial intelligence, cybersecurity, and software engineering, with strong industry connections and research opportunities.',
  '2 years',
  'English',
  '{"amount": 4000, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'politecnico-milano';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Architecture', 
  id, 
  'master', 
  'Master of Science in Architecture',
  'This internationally recognized program integrates design, technology, and urban planning, with opportunities for specialization in sustainable architecture and historic preservation.',
  '2 years',
  'English',
  '{"amount": 4000, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'politecnico-milano';

-- Add programs for Sapienza University of Rome
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Artificial Intelligence and Robotics', 
  id, 
  'master', 
  'Master of Science in Artificial Intelligence and Robotics',
  'This program covers advanced topics in AI, machine learning, computer vision, and robotics, with opportunities for research and industry collaboration.',
  '2 years',
  'English',
  '{"amount": 2800, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'sapienza-university-rome';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Economics', 
  id, 
  'master', 
  'Master of Science in Economics',
  'This program provides advanced training in economic theory and quantitative methods, with specializations in development economics, public policy, and international economics.',
  '2 years',
  'English',
  '{"amount": 2800, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'sapienza-university-rome';

-- Add programs for University of Tokyo
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Information Science and Technology', 
  id, 
  'master', 
  'Master of Information Science and Technology',
  'This program offers cutting-edge education in computer science, information systems, and artificial intelligence, with access to world-class research facilities.',
  '2 years',
  'English',
  '{"amount": 535800, "currency": "JPY", "period": "year", "notes": "Standard fee for international students"}'::jsonb
FROM universities 
WHERE slug = 'university-tokyo';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'International Public Policy', 
  id, 
  'master', 
  'Master of Public Policy, International Program',
  'This program prepares students for leadership roles in public policy at the global level, with coursework in economics, policy analysis, and international relations.',
  '2 years',
  'English',
  '{"amount": 535800, "currency": "JPY", "period": "year", "notes": "Standard fee for international students"}'::jsonb
FROM universities 
WHERE slug = 'university-tokyo';

-- Add programs for Kyoto University
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Energy Science', 
  id, 
  'master', 
  'Master of Energy Science',
  'This interdisciplinary program explores sustainable energy systems, combining engineering, economics, and environmental studies to address global energy challenges.',
  '2 years',
  'English',
  '{"amount": 535800, "currency": "JPY", "period": "year", "notes": "Standard fee for international students"}'::jsonb
FROM universities 
WHERE slug = 'kyoto-university';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Environmental Management', 
  id, 
  'master', 
  'Master of Environmental Management',
  'This program takes an interdisciplinary approach to environmental sustainability, with coursework in ecology, economics, policy analysis, and sustainable development.',
  '2 years',
  'English',
  '{"amount": 535800, "currency": "JPY", "period": "year", "notes": "Standard fee for international students"}'::jsonb
FROM universities 
WHERE slug = 'kyoto-university';

-- Add programs for Osaka University
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Information and Physical Sciences', 
  id, 
  'master', 
  'Master of Information and Physical Sciences',
  'This program bridges computer science and physics, with research opportunities in areas such as quantum computing, intelligent systems, and data science.',
  '2 years',
  'English',
  '{"amount": 535800, "currency": "JPY", "period": "year", "notes": "Standard fee for international students"}'::jsonb
FROM universities 
WHERE slug = 'osaka-university';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Biotechnology', 
  id, 
  'master', 
  'Master of Biotechnology',
  'This program covers advanced topics in biotechnology, including genetic engineering, pharmaceutical development, and biomedical applications, with extensive lab experience.',
  '2 years',
  'English',
  '{"amount": 535800, "currency": "JPY", "period": "year", "notes": "Standard fee for international students"}'::jsonb
FROM universities 
WHERE slug = 'osaka-university'; 