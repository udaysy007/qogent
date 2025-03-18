-- Add more universities for Germany, Canada, and Ireland
-- Adding 2 more German universities
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url)
VALUES 
  ('Heidelberg University', 'heidelberg-university', 
   (SELECT id FROM countries WHERE slug = 'germany'), 
   'Heidelberg', true, 64, 
   'Founded in 1386, Heidelberg University is Germany''s oldest university and one of Europe''s most research-intensive institutions. It maintains a strong emphasis on research-oriented teaching and has a particularly strong reputation in medicine, physics, and humanities.',
   'https://www.uni-heidelberg.de/en', '/images/universities/heidelberg-logo.svg'),
   
  ('Humboldt University of Berlin', 'humboldt-university-berlin', 
   (SELECT id FROM countries WHERE slug = 'germany'), 
   'Berlin', true, 131, 
   'Founded in 1810, Humboldt University is one of Berlin''s oldest universities and was the model for many modern research universities. Located in the heart of Berlin, it offers a vibrant academic environment with strengths in humanities, social sciences, and natural sciences.',
   'https://www.hu-berlin.de/en', '/images/universities/humboldt-logo.svg');

-- Add campus images for the German universities
UPDATE universities 
SET campus_images = ARRAY['/images/universities/heidelberg-campus.jpg']
WHERE slug = 'heidelberg-university';

UPDATE universities 
SET campus_images = ARRAY['/images/universities/humboldt-campus.jpg']
WHERE slug = 'humboldt-university-berlin';

-- Adding 2 more Canadian universities
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url)
VALUES 
  ('University of British Columbia', 'university-british-columbia', 
   (SELECT id FROM countries WHERE slug = 'canada'), 
   'Vancouver', true, 41, 
   'The University of British Columbia is a global centre for teaching, learning and research, consistently ranked among the top 20 public universities in the world. Located in Vancouver, one of the world''s most livable cities, UBC combines exceptional research, innovative teaching, and a vibrant campus life.',
   'https://www.ubc.ca/', '/images/universities/ubc-logo.svg'),
   
  ('McGill University', 'mcgill-university', 
   (SELECT id FROM countries WHERE slug = 'canada'), 
   'Montreal', true, 31, 
   'Founded in 1821, McGill University is one of Canada''s oldest and most prestigious institutions, known for its excellence in teaching and research. Located in the vibrant and multicultural city of Montreal, McGill offers a unique blend of North American and European cultures.',
   'https://www.mcgill.ca/', '/images/universities/mcgill-logo.svg');

-- Add campus images for the Canadian universities
UPDATE universities 
SET campus_images = ARRAY['/images/universities/ubc-campus.jpg']
WHERE slug = 'university-british-columbia';

UPDATE universities 
SET campus_images = ARRAY['/images/universities/mcgill-campus.jpg']
WHERE slug = 'mcgill-university';

-- Adding NUI Galway (check if UCD already exists)
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url)
VALUES 
  ('National University of Ireland Galway', 'national-university-ireland-galway', 
   (SELECT id FROM countries WHERE slug = 'ireland'), 
   'Galway', true, 258, 
   'Founded in 1845, NUI Galway is known for its vibrant campus life, beautiful coastal location, and strong programs in medicine, engineering, and humanities. The university combines a rich history with modern research facilities.',
   'https://www.nuigalway.ie/', '/images/universities/nuig-logo.svg')
ON CONFLICT (slug) DO NOTHING;

-- Add or update the campus image for NUI Galway
UPDATE universities 
SET campus_images = ARRAY['/images/universities/nuig-campus.jpg']
WHERE slug = 'national-university-ireland-galway';

-- Make sure UCD has campus images
UPDATE universities 
SET campus_images = ARRAY['/images/universities/ucd-campus.jpg']
WHERE slug = 'university-college-dublin';

-- Add programs for Heidelberg University
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
VALUES 
  ('Physics', 
   (SELECT id FROM universities WHERE slug = 'heidelberg-university'), 
   'master', 
   'Master of Science in Physics',
   'The Master''s program in Physics focuses on fundamental physics principles with opportunities for specialization in fields like particle physics, cosmology, and quantum mechanics.',
   '2 years (4 semesters)',
   'English',
   '{"amount": 0, "currency": "EUR", "period": "semester", "notes": "Semester fee of €171.80 only"}'),
   
  ('International Health', 
   (SELECT id FROM universities WHERE slug = 'heidelberg-university'), 
   'master', 
   'Master of Science in International Health',
   'The Master''s program in International Health addresses global health challenges, tropical medicine, and health systems management in low and middle-income countries.',
   '1 year',
   'English',
   '{"amount": 14100, "currency": "EUR", "period": "program", "notes": "Entire program"}');

-- Add programs for Humboldt University
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
VALUES 
  ('Economics', 
   (SELECT id FROM universities WHERE slug = 'humboldt-university-berlin'), 
   'master', 
   'Master of Science in Economics',
   'The Master''s program in Economics provides advanced training in economic theory and methods with opportunities to specialize in various fields of economics.',
   '2 years (4 semesters)',
   'English',
   '{"amount": 0, "currency": "EUR", "period": "semester", "notes": "Semester fee of €315.64 only"}'),
   
  ('Data Science', 
   (SELECT id FROM universities WHERE slug = 'humboldt-university-berlin'), 
   'master', 
   'Master of Science in Data Science',
   'The Master''s program in Data Science focuses on statistical methods, machine learning, and data analysis with applications across various domains.',
   '2 years (4 semesters)',
   'English',
   '{"amount": 0, "currency": "EUR", "period": "semester", "notes": "Semester fee of €315.64 only"}');

-- Add programs for UBC
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
VALUES 
  ('Computer Science', 
   (SELECT id FROM universities WHERE slug = 'university-british-columbia'), 
   'master', 
   'Master of Science in Computer Science',
   'The Master''s program in Computer Science offers specializations in artificial intelligence, machine learning, human-computer interaction, and software engineering.',
   '2 years',
   'English',
   '{"amount": 11000, "currency": "CAD", "period": "year", "notes": "International student rate"}'),
   
  ('Business Administration', 
   (SELECT id FROM universities WHERE slug = 'university-british-columbia'), 
   'master', 
   'Master of Business Administration',
   'The MBA program at UBC Sauder School of Business offers a comprehensive business education with opportunities for specialization and international experience.',
   '16 months',
   'English',
   '{"amount": 80000, "currency": "CAD", "period": "program", "notes": "Full program for international students"}');

-- Add programs for McGill
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
VALUES 
  ('Computer Science', 
   (SELECT id FROM universities WHERE slug = 'mcgill-university'), 
   'master', 
   'Master of Science in Computer Science',
   'The Master''s program in Computer Science focuses on advanced algorithms, artificial intelligence, bioinformatics, and computer graphics.',
   '2 years',
   'English',
   '{"amount": 31000, "currency": "CAD", "period": "year", "notes": "International student rate"}'),
   
  ('Management', 
   (SELECT id FROM universities WHERE slug = 'mcgill-university'), 
   'master', 
   'Master of Management',
   'The Master of Management program provides comprehensive training in management principles and practices for students without previous business education.',
   '1 year',
   'English',
   '{"amount": 49000, "currency": "CAD", "period": "year", "notes": "International student rate"}');

-- Add programs for UCD
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Computer Science', 
  id, 
  'master', 
  'MSc in Computer Science',
  'The MSc in Computer Science program focuses on advanced software engineering, data analytics, and artificial intelligence.',
  '1 year',
  'English',
  '{"amount": 25600, "currency": "EUR", "period": "year", "notes": "Non-EU student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-college-dublin';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Business Analytics', 
  id, 
  'master', 
  'MSc in Business Analytics',
  'This program combines business knowledge with data analytics skills to prepare students for careers in data-driven decision making.',
  '1 year',
  'English',
  '{"amount": 24800, "currency": "EUR", "period": "year", "notes": "Non-EU student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-college-dublin';

-- Add programs for NUI Galway
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Data Analytics', 
  id, 
  'master', 
  'MSc in Data Analytics',
  'The MSc in Data Analytics program provides comprehensive training in statistical analysis, machine learning, and big data technologies.',
  '1 year',
  'English',
  '{"amount": 19850, "currency": "EUR", "period": "year", "notes": "Non-EU student rate"}'::jsonb
FROM universities 
WHERE slug = 'national-university-ireland-galway';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Biomedical Engineering', 
  id, 
  'master', 
  'MSc in Biomedical Engineering',
  'This program combines engineering principles with medical sciences to develop innovative medical technologies and solutions.',
  '1 year',
  'English',
  '{"amount": 22350, "currency": "EUR", "period": "year", "notes": "Non-EU student rate"}'::jsonb
FROM universities 
WHERE slug = 'national-university-ireland-galway'; 