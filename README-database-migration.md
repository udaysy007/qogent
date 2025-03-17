# Database Migration Guide

This document provides instructions on how to apply the database migrations for the Qogent project.

## Available Migrations

- `20240317_update_countries_table.sql`: Adds all fields required for the destination page to the countries table.

## Applying Migrations to MSinIreland Database

Run the following command to apply the migration to the MSinIreland database:

```bash
export PGPASSWORD="E1d_1di4u:)" && psql -h db.scpupgxqbkpielyjbdmr.supabase.co -p 5432 -d postgres -U postgres -f supabase/migrations/20240317_update_countries_table.sql
```

## Applying Migrations to MSinPoland Database

Run the following command to apply the migration to the MSinPoland database:

```bash
export PGPASSWORD="E1d_1di4u:)" && psql -h db.ocdserkgbbpuaugmwcjt.supabase.co -p 5432 -d postgres -U postgres -f supabase/migrations/20240317_update_countries_table.sql
```

## Verifying the Migration

After applying the migration, you can verify that it was successful by checking the table structure:

```sql
-- Run this query in the Supabase SQL Editor
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'countries' 
ORDER BY ordinal_position;
```

## Populating Initial Data

Once the migration is applied, you can start populating the table with initial data. Here's an example of how to update an existing country:

```sql
UPDATE countries 
SET 
  capital = 'Dublin',
  population = '5 million',
  language = 'English, Irish (Gaelic)',
  currency = 'Euro (€)',
  academic_year = 'September to May',
  education_system = 'European',
  international_students = '35,000+',
  top_universities = '8',
  english_programs = '1,000+',
  post_study_work = 'Up to 2 years',
  bachelor_info = '3-4 years of study, with options for honors degrees. Entry typically requires completed secondary education.',
  master_info = '1-2 years of specialized study. Requires a completed bachelor''s degree with good academic standing.',
  phd_info = '3-5 years of research-focused study. Requires a relevant master''s degree and research proposal.'
WHERE slug = 'ireland';
```

## Rolling Back Migrations

If you need to roll back a migration, you can run the following SQL command:

```sql
-- Example rollback for removing specific columns
ALTER TABLE countries 
  DROP COLUMN capital,
  DROP COLUMN population;
  -- Add more columns to drop as needed
```

## Troubleshooting

If you encounter any issues during migration, check the following:

1. Ensure you have the correct database credentials
2. Verify that you're connecting to the right database
3. Check for syntax errors in the migration file
4. Ensure you have sufficient privileges to alter the table

For more help, contact the database administrator. 