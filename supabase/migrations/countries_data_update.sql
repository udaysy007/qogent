-- Combined script to update all country data
-- This script will ensure countries exist and then update them with detailed information

-- First, execute the script to ensure all countries exist
\echo 'Checking and inserting any missing countries...'
\i 'supabase/migrations/countries_insert_script.sql'
\echo 'Country insertion check completed.'

-- Then proceed with updates for each country
\echo 'Starting country data updates...'

-- Ireland update
\echo 'Updating Ireland data...'
BEGIN;
    \i 'supabase/migrations/ireland_data_update.sql'
    \echo 'Ireland data updated successfully.'
COMMIT;

-- Germany update
\echo 'Updating Germany data...'
BEGIN;
    \i 'supabase/migrations/germany_data_update.sql'
    \echo 'Germany data updated successfully.'
COMMIT;

-- Canada update
\echo 'Updating Canada data...'
BEGIN;
    \i 'supabase/migrations/canada_data_update.sql'
    \echo 'Canada data updated successfully.'
COMMIT;

-- Poland update
\echo 'Updating Poland data...'
BEGIN;
    \i 'supabase/migrations/poland_data_update.sql'
    \echo 'Poland data updated successfully.'
COMMIT;

-- Australia update
\echo 'Updating Australia data...'
BEGIN;
    \i 'supabase/migrations/australia_data_update.sql'
    \echo 'Australia data updated successfully.'
COMMIT;

-- USA update
\echo 'Updating USA data...'
BEGIN;
    \i 'supabase/migrations/usa_data_update.sql'
    \echo 'USA data updated successfully.'
COMMIT;

-- Netherlands update
\echo 'Updating Netherlands data...'
BEGIN;
    \i 'supabase/migrations/netherlands_data_update.sql'
    \echo 'Netherlands data updated successfully.'
COMMIT;

-- Japan update
\echo 'Updating Japan data...'
BEGIN;
    \i 'supabase/migrations/japan_data_update.sql'
    \echo 'Japan data updated successfully.'
COMMIT;

-- Singapore update
\echo 'Updating Singapore data...'
BEGIN;
    \i 'supabase/migrations/singapore_data_update.sql'
    \echo 'Singapore data updated successfully.'
COMMIT;

-- UK update
\echo 'Updating United Kingdom data...'
BEGIN;
    \i 'supabase/migrations/uk_data_update.sql'
    \echo 'United Kingdom data updated successfully.'
COMMIT;

-- France update
\echo 'Updating France data...'
BEGIN;
    \i 'supabase/migrations/france_data_update.sql'
    \echo 'France data updated successfully.'
COMMIT;

-- Italy update
\echo 'Updating Italy data...'
BEGIN;
    \i 'supabase/migrations/italy_data_update.sql'
    \echo 'Italy data updated successfully.'
COMMIT;

\echo 'All country data updates completed successfully!' 