-- Rename benefits column to nice_to_have
ALTER TABLE jobs 
RENAME COLUMN benefits TO nice_to_have;

-- Update Digital Marketer position to move benefits to nice_to_have
UPDATE jobs 
SET nice_to_have = ARRAY[
    'Having an active social media following on any of the platforms is a plus',
    'Previous experience with Sales or customer handling',
    'Experience with social media account with large number of followers',
    'An youtube channel with more than 1,000 subscribers'
]
WHERE title = 'Digital Marketer'; 