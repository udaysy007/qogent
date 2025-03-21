-- Set inactive status for all positions except BDA, Digital Marketer, and Video Editor
UPDATE jobs 
SET active = false
WHERE title NOT IN ('Business Development Executive', 'Digital Marketer', 'Video Editor');

-- Ensure the active positions are marked as active
UPDATE jobs 
SET active = true
WHERE title IN ('Business Development Executive', 'Digital Marketer', 'Video Editor'); 