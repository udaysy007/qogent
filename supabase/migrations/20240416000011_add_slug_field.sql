-- Add slug column
ALTER TABLE jobs
ADD COLUMN slug TEXT UNIQUE;

-- Create slugs for existing jobs
UPDATE jobs 
SET slug = LOWER(
    REGEXP_REPLACE(
        REGEXP_REPLACE(
            title,
            '[^a-zA-Z0-9\s-]',
            ''
        ),
        '\s+',
        '-'
    )
)
WHERE slug IS NULL;

-- Make slug column required
ALTER TABLE jobs
ALTER COLUMN slug SET NOT NULL; 