-- Add universities for France
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url, campus_images)
VALUES 
  ('Sorbonne University', 'sorbonne-university', 
   (SELECT id FROM countries WHERE slug = 'france'), 
   'Paris', true, 83, 
   'Sorbonne University is a public research university in Paris, France, established in 2018 by the merger of Paris-Sorbonne University and Pierre et Marie Curie University. It is one of the most prestigious universities in Europe with notable strengths in sciences, medicine, and humanities.',
   'https://www.sorbonne-universite.fr/en', '/images/universities/sorbonne-logo.svg',
   ARRAY['/images/universities/sorbonne-campus.jpg']),
   
  ('École Polytechnique', 'ecole-polytechnique', 
   (SELECT id FROM countries WHERE slug = 'france'), 
   'Palaiseau', true, 68, 
   'École Polytechnique is a leading French engineering school that combines high-level research, academics, and innovation at the cutting-edge of science and technology. It is a founding member of Institut Polytechnique de Paris.',
   'https://www.polytechnique.edu/en', '/images/universities/polytechnique-logo.svg',
   ARRAY['/images/universities/polytechnique-campus.jpg']),
   
  ('Sciences Po', 'sciences-po', 
   (SELECT id FROM countries WHERE slug = 'france'), 
   'Paris', true, 261, 
   'Sciences Po is a highly selective, public research university in France specializing in the social sciences. It has educated many notable figures in French and international politics and business.',
   'https://www.sciencespo.fr/en/', '/images/universities/sciencespo-logo.svg',
   ARRAY['/images/universities/sciencespo-campus.jpg']);

-- Add universities for Australia
INSERT INTO universities (name, slug, country_id, city, is_public, ranking, description, website, logo_url, campus_images)
VALUES 
  ('University of Melbourne', 'university-melbourne', 
   (SELECT id FROM countries WHERE slug = 'australia'), 
   'Melbourne', true, 37, 
   'The University of Melbourne is a public research university located in Melbourne, Australia. Founded in 1853, it is Australia''s second oldest university and the oldest in Victoria.',
   'https://www.unimelb.edu.au/', '/images/universities/melbourne-logo.svg',
   ARRAY['/images/universities/melbourne-campus.jpg']),
   
  ('Australian National University', 'australian-national-university', 
   (SELECT id FROM countries WHERE slug = 'australia'), 
   'Canberra', true, 30, 
   'The Australian National University is a national research university located in Canberra, the capital of Australia. Its main campus in Acton encompasses seven teaching and research colleges, in addition to several national academies and institutes.',
   'https://www.anu.edu.au/', '/images/universities/anu-logo.svg',
   ARRAY['/images/universities/anu-campus.jpg']),
   
  ('University of Sydney', 'university-sydney', 
   (SELECT id FROM countries WHERE slug = 'australia'), 
   'Sydney', true, 41, 
   'The University of Sydney is Australia''s first university and is regarded as one of the world''s leading universities. It is known for its beautiful sandstone architecture and vibrant campus life.',
   'https://www.sydney.edu.au/', '/images/universities/sydney-logo.svg',
   ARRAY['/images/universities/sydney-campus.jpg']);

-- Add programs for Sorbonne University
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Computer Science', 
  id, 
  'master', 
  'Master in Computer Science',
  'The Master''s program in Computer Science at Sorbonne University offers advanced training in algorithms, artificial intelligence, and software engineering.',
  '2 years',
  'French/English',
  '{"amount": 3770, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'sorbonne-university';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Physics', 
  id, 
  'master', 
  'Master in Physics',
  'This program covers fundamental and applied physics, with specializations including quantum physics, astrophysics, and materials science.',
  '2 years',
  'French/English',
  '{"amount": 3770, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'sorbonne-university';

-- Add programs for École Polytechnique
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Engineering Science', 
  id, 
  'master', 
  'Engineering Degree (Diplôme d''Ingénieur)',
  'The prestigious engineering program at École Polytechnique provides comprehensive training in mathematics, physics, computer science, and engineering.',
  '3 years',
  'English',
  '{"amount": 12000, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'ecole-polytechnique';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Data Science', 
  id, 
  'master', 
  'Master of Science and Technology in Data Science',
  'This program prepares students for careers in data science, machine learning, and artificial intelligence.',
  '2 years',
  'English',
  '{"amount": 15000, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'ecole-polytechnique';

-- Add programs for Sciences Po
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'International Affairs', 
  id, 
  'master', 
  'Master in International Affairs',
  'This program prepares future leaders for international careers in government, NGOs, and international organizations.',
  '2 years',
  'English',
  '{"amount": 18500, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'sciences-po';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Public Policy', 
  id, 
  'master', 
  'Master in Public Policy',
  'This program provides extensive training in policy analysis, governance, and leadership for the public sector.',
  '2 years',
  'English',
  '{"amount": 18500, "currency": "EUR", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'sciences-po';

-- Add programs for University of Melbourne
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Computer Science', 
  id, 
  'master', 
  'Master of Computer Science',
  'This program provides advanced training in computing fundamentals and specialized areas such as AI, distributed systems, and human-computer interaction.',
  '2 years',
  'English',
  '{"amount": 46000, "currency": "AUD", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-melbourne';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Business Analytics', 
  id, 
  'master', 
  'Master of Business Analytics',
  'This intensive program prepares graduates for careers in data-driven decision making and business transformation.',
  '1 year',
  'English',
  '{"amount": 53000, "currency": "AUD", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-melbourne';

-- Add programs for Australian National University
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Computing', 
  id, 
  'master', 
  'Master of Computing',
  'This program offers advanced training in computing with specializations in artificial intelligence, machine learning, and software development.',
  '2 years',
  'English',
  '{"amount": 44000, "currency": "AUD", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'australian-national-university';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'International Relations', 
  id, 
  'master', 
  'Master of International Relations',
  'This program explores contemporary international issues and provides a strong foundation for careers in diplomacy and global governance.',
  '2 years',
  'English',
  '{"amount": 42000, "currency": "AUD", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'australian-national-university';

-- Add programs for University of Sydney
INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Data Science', 
  id, 
  'master', 
  'Master of Data Science',
  'This program combines computer science and statistics to develop expertise in handling and analyzing large and complex datasets.',
  '1.5 years',
  'English',
  '{"amount": 47500, "currency": "AUD", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-sydney';

INSERT INTO programs (name, university_id, degree_level, title, description, duration, language, tuition_fee)
SELECT 
  'Engineering', 
  id, 
  'master', 
  'Master of Engineering',
  'This program offers specializations in areas such as biomedical, chemical, civil, electrical, and mechanical engineering.',
  '2 years',
  'English',
  '{"amount": 48500, "currency": "AUD", "period": "year", "notes": "International student rate"}'::jsonb
FROM universities 
WHERE slug = 'university-sydney'; 