-- Add universities for Singapore
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url, campus_images)
VALUES 
  ('National University of Singapore', 'national-university-singapore', 
   (SELECT id FROM countries WHERE slug = 'singapore'), 
   'Singapore', true, 11, 
   'The National University of Singapore (NUS) is consistently ranked as one of the world''s top universities and the highest-ranked in Asia. Founded in 1905, it offers a global approach to education and research with a focus on Asian perspectives and expertise.',
   'https://www.nus.edu.sg/', '/images/universities/nus-logo.svg',
   ARRAY['/images/universities/nus-campus.jpg']),
   
  ('Nanyang Technological University', 'nanyang-technological-university', 
   (SELECT id FROM countries WHERE slug = 'singapore'), 
   'Singapore', true, 40, 
   'Nanyang Technological University (NTU) is one of the top universities in Asia and known for its strength in engineering and business. The university has been named the world''s top young university for several years and is known for its eco-friendly campus.',
   'https://www.ntu.edu.sg/', '/images/universities/ntu-logo.svg',
   ARRAY['/images/universities/ntu-campus.jpg']),
   
  ('Singapore Management University', 'singapore-management-university', 
   (SELECT id FROM countries WHERE slug = 'singapore'), 
   'Singapore', true, 511, 
   'Singapore Management University (SMU) is internationally recognized for its world-class research and distinguished teaching. Established in 2000, it is known for its interactive and technologically enabled pedagogy of seminar-style teaching in small class sizes.',
   'https://www.smu.edu.sg/', '/images/universities/smu-logo.svg',
   ARRAY['/images/universities/smu-campus.jpg']);

-- Add universities for United Kingdom
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url, campus_images)
VALUES 
  ('University of Oxford', 'university-oxford', 
   (SELECT id FROM countries WHERE slug = 'uk'), 
   'Oxford', true, 3, 
   'The University of Oxford is the oldest university in the English-speaking world and the world''s second-oldest university in continuous operation. It is known for its tutorial-based teaching and research across all disciplines.',
   'https://www.ox.ac.uk/', '/images/universities/oxford-logo.svg',
   ARRAY['/images/universities/oxford-campus.jpg']),
   
  ('University of Cambridge', 'university-cambridge', 
   (SELECT id FROM countries WHERE slug = 'uk'), 
   'Cambridge', true, 2, 
   'The University of Cambridge is a collegiate research university in Cambridge, United Kingdom. Founded in 1209, it is the world''s third-oldest university in continuous operation. Its reputation for outstanding academic achievement and research is known worldwide.',
   'https://www.cam.ac.uk/', '/images/universities/cambridge-logo.svg',
   ARRAY['/images/universities/cambridge-campus.jpg']),
   
  ('Imperial College London', 'imperial-college-london', 
   (SELECT id FROM countries WHERE slug = 'uk'), 
   'London', true, 6, 
   'Imperial College London is a world-class university with a focus on science, engineering, medicine, and business. Founded in 1907, it is known for its innovation, interdisciplinary approach, and collaboration with industry and healthcare partners.',
   'https://www.imperial.ac.uk/', '/images/universities/imperial-logo.svg',
   ARRAY['/images/universities/imperial-campus.jpg']);

-- Add universities for United States
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url, campus_images)
VALUES 
  ('Massachusetts Institute of Technology', 'mit', 
   (SELECT id FROM countries WHERE slug = 'usa'), 
   'Cambridge, MA', false, 1, 
   'The Massachusetts Institute of Technology (MIT) is a private research university in Cambridge, Massachusetts. Founded in 1861, MIT has played a key role in developing many technological advances and is known for its programs in engineering and physical sciences.',
   'https://www.mit.edu/', '/images/universities/mit-logo.svg',
   ARRAY['/images/universities/mit-campus.jpg']),
   
  ('Stanford University', 'stanford-university', 
   (SELECT id FROM countries WHERE slug = 'usa'), 
   'Stanford, CA', false, 5, 
   'Stanford University is a private research university in Stanford, California. Founded in 1885, it is known for its academic achievements, wealth, proximity to Silicon Valley, and its professionalism in technology and innovation.',
   'https://www.stanford.edu/', '/images/universities/stanford-logo.svg',
   ARRAY['/images/universities/stanford-campus.jpg']),
   
  ('Harvard University', 'harvard-university', 
   (SELECT id FROM countries WHERE slug = 'usa'), 
   'Cambridge, MA', false, 4, 
   'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636, it is the oldest institution of higher learning in the United States and is widely regarded as a leading university in the world.',
   'https://www.harvard.edu/', '/images/universities/harvard-logo.svg',
   ARRAY['/images/universities/harvard-campus.jpg']);

-- Add programs for National University of Singapore
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Computer Science', 
  id, 
  'master', 
  'Master of Computing in Computer Science',
  'This program offers specializations in artificial intelligence, computer graphics, networking, and parallel computing, with opportunities for research and industry collaboration.',
  '1.5 years',
  'English',
  '{"amount": 42000, "currency": "SGD", "period": "program", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'national-university-singapore';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Business Administration', 
  id, 
  'master', 
  'Master of Business Administration',
  'NUS MBA is designed to develop global business leaders with Asian insights. The program emphasizes leadership, innovation, and international business strategies.',
  '17 months',
  'English',
  '{"amount": 65000, "currency": "SGD", "period": "program", "notes": "Full-time program"}'::jsonb
FROM universities 
WHERE slug = 'national-university-singapore';

-- Add programs for Nanyang Technological University
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Electrical and Electronic Engineering', 
  id, 
  'master', 
  'Master of Science in Electrical and Electronic Engineering',
  'This program offers advanced training in areas such as microelectronics, communications, power systems, and control systems, with strong emphasis on practical applications.',
  '1 year',
  'English',
  '{"amount": 31000, "currency": "SGD", "period": "program", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'nanyang-technological-university';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Business Analytics', 
  id, 
  'master', 
  'Master of Science in Business Analytics',
  'This program combines business strategies with data analytics, preparing students for careers in data-driven decision making and business intelligence across various industries.',
  '1 year',
  'English',
  '{"amount": 38000, "currency": "SGD", "period": "program", "notes": "Full-time program"}'::jsonb
FROM universities 
WHERE slug = 'nanyang-technological-university';

-- Add programs for Singapore Management University
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Applied Finance', 
  id, 
  'master', 
  'Master of Science in Applied Finance',
  'This program provides specialized training in finance with focus on asset and wealth management, banking, and financial technology, with strong industry connections.',
  '12-16 months',
  'English',
  '{"amount": 40000, "currency": "SGD", "period": "program", "notes": "Full-time program"}'::jsonb
FROM universities 
WHERE slug = 'singapore-management-university';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Information Technology in Business', 
  id, 
  'master', 
  'Master of Science in Information Technology in Business',
  'This program combines IT and business knowledge, focusing on financial technology, data analytics, and digital solutions for business challenges.',
  '1 year',
  'English',
  '{"amount": 42000, "currency": "SGD", "period": "program", "notes": "Full-time program"}'::jsonb
FROM universities 
WHERE slug = 'singapore-management-university';

-- Add programs for University of Oxford
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Computer Science', 
  id, 
  'master', 
  'MSc in Computer Science',
  'This program covers advanced topics in computer science with a focus on research methods and emerging technologies, offering specializations in areas such as machine learning and security.',
  '12 months',
  'English',
  '{"amount": 34675, "currency": "GBP", "period": "year", "notes": "Overseas student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-oxford';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Global Business', 
  id, 
  'master', 
  'MSc in Global Business',
  'This program offers an integrated perspective on international business, with modules on global strategy, innovation, and leadership, alongside engagement with industry leaders.',
  '12 months',
  'English',
  '{"amount": 33745, "currency": "GBP", "period": "year", "notes": "Overseas student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-oxford';

-- Add programs for University of Cambridge
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Engineering', 
  id, 
  'master', 
  'Master of Engineering',
  'This advanced engineering program offers specializations in areas such as information engineering, bioengineering, civil engineering, and energy technologies, with a focus on research and innovation.',
  '1 year',
  'English',
  '{"amount": 37215, "currency": "GBP", "period": "year", "notes": "Overseas student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-cambridge';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Advanced Study in Management', 
  id, 
  'master', 
  'Master of Studies in Advanced Study in Management',
  'This program offers rigorous training in management research methods, with specializations in strategy, marketing, finance, and operations management.',
  '9 months',
  'English',
  '{"amount": 35970, "currency": "GBP", "period": "year", "notes": "Overseas student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-cambridge';

-- Add programs for Imperial College London
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Computing Science', 
  id, 
  'master', 
  'MSc Computing Science',
  'This program covers advanced computing topics including artificial intelligence, machine learning, high-performance computing, and software engineering, with opportunities for research and industry collaboration.',
  '1 year',
  'English',
  '{"amount": 36200, "currency": "GBP", "period": "year", "notes": "Overseas student rate"}'::jsonb
FROM universities 
WHERE slug = 'imperial-college-london';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Finance', 
  id, 
  'master', 
  'MSc Finance',
  'This program offers rigorous training in finance theory and practice, with specializations in corporate finance, asset pricing, portfolio management, and financial technology.',
  '1 year',
  'English',
  '{"amount": 39950, "currency": "GBP", "period": "year", "notes": "Overseas student rate"}'::jsonb
FROM universities 
WHERE slug = 'imperial-college-london';

-- Add programs for MIT
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Electrical Engineering and Computer Science', 
  id, 
  'master', 
  'Master of Engineering in Electrical Engineering and Computer Science',
  'This program offers advanced training in electrical engineering and computer science, with research opportunities in areas such as artificial intelligence, robotics, and computer systems.',
  '1 year',
  'English',
  '{"amount": 58140, "currency": "USD", "period": "year", "notes": "Full-time program"}'::jsonb
FROM universities 
WHERE slug = 'mit';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Business Analytics', 
  id, 
  'master', 
  'Master of Business Analytics',
  'This program combines data science with business applications, preparing students for careers in data-driven decision making across various industries.',
  '12 months',
  'English',
  '{"amount": 82000, "currency": "USD", "period": "program", "notes": "Full-time program"}'::jsonb
FROM universities 
WHERE slug = 'mit';

-- Add programs for Stanford University
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Computer Science', 
  id, 
  'master', 
  'Master of Science in Computer Science',
  'This program offers specializations in artificial intelligence, biocomputation, computer and network security, human-computer interaction, and theoretical computer science.',
  '1.5-2 years',
  'English',
  '{"amount": 60080, "currency": "USD", "period": "year", "notes": "Full-time program"}'::jsonb
FROM universities 
WHERE slug = 'stanford-university';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Business Administration', 
  id, 
  'master', 
  'Master of Business Administration',
  'The Stanford MBA Program helps students develop leadership skills, build global connections, and experience personal growth through a rigorous curriculum and experiential learning.',
  '2 years',
  'English',
  '{"amount": 76950, "currency": "USD", "period": "year", "notes": "Full-time program"}'::jsonb
FROM universities 
WHERE slug = 'stanford-university';

-- Add programs for Harvard University
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Public Health', 
  id, 
  'master', 
  'Master of Public Health',
  'This program trains students in public health practice and research, with specializations in epidemiology, biostatistics, health policy, and global health.',
  '1 year',
  'English',
  '{"amount": 68528, "currency": "USD", "period": "year", "notes": "Full-time program"}'::jsonb
FROM universities 
WHERE slug = 'harvard-university';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Business Administration', 
  id, 
  'master', 
  'Master of Business Administration',
  'The Harvard MBA Program uses the case method, fieldwork, and technology to prepare students for leadership in a diverse range of organizations across the globe.',
  '2 years',
  'English',
  '{"amount": 73440, "currency": "USD", "period": "year", "notes": "Full-time program"}'::jsonb
FROM universities 
WHERE slug = 'harvard-university'; 