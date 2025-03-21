-- Fix slugs by directly setting them for each position
UPDATE jobs SET slug = 'business-development-executive' WHERE title ILIKE 'Business Development Executive';
UPDATE jobs SET slug = 'digital-marketer' WHERE title ILIKE 'Digital Marketer';
UPDATE jobs SET slug = 'video-editor' WHERE title ILIKE 'Video Editor';
UPDATE jobs SET slug = 'human-resource-manager' WHERE title ILIKE 'HR Manager';
UPDATE jobs SET slug = 'operations-manager' WHERE title ILIKE 'Operations Manager';
UPDATE jobs SET slug = 'admissions-counsellor' WHERE title ILIKE 'Admissions Counsellor';
UPDATE jobs SET slug = 'academic-content-writer' WHERE title ILIKE 'Academic Content Writer';
UPDATE jobs SET slug = 'overseas-education-consultant' WHERE title ILIKE 'Overseas Education Consultant';
UPDATE jobs SET slug = 'statement-of-purpose-writer' WHERE title ILIKE 'SOP Writer';
UPDATE jobs SET slug = 'full-stack-developer' WHERE title ILIKE 'Full Stack Developer'; 