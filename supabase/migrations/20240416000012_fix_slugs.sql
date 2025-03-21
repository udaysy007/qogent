-- Fix existing slugs to be URL-friendly
UPDATE jobs 
SET slug = LOWER(
    REGEXP_REPLACE(
        REGEXP_REPLACE(
            REGEXP_REPLACE(
                title,
                '[^a-zA-Z0-9\s-]',  -- Remove all special characters except spaces and hyphens
                ''
            ),
            '\s+',                   -- Replace one or more spaces with a single hyphen
            '-'
        ),
        '-+',                        -- Replace multiple consecutive hyphens with a single hyphen
        '-'
    )
); 