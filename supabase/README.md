# Supabase Integration for Qogent.in

This directory contains all the necessary files for setting up and managing the Supabase database for Qogent.in.

## Directory Structure

- `/migrations`: SQL migration files for creating and updating the database schema
- `/seed`: Sample data for populating the database

## Getting Started

### Prerequisites

- Supabase account and project
- PostgreSQL client (psql)

### Environment Setup

1. Copy the `.env.example` file to `.env.local` in the root directory:

```bash
cp .env.example .env.local
```

2. Update the Supabase credentials in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Running Migrations

Use the migration script to apply database migrations:

```bash
# For MSinIreland project
./scripts/migrate.sh supabase/migrations/20240317_initial_schema.sql ireland

# For MSinPoland project
./scripts/migrate.sh supabase/migrations/20240317_initial_schema.sql poland
```

### Seeding the Database

After running migrations, you can seed the database with sample data:

```bash
# For MSinIreland project
./scripts/migrate.sh supabase/seed/sample_data.sql ireland

# For MSinPoland project
./scripts/migrate.sh supabase/seed/sample_data.sql poland
```

## Database Schema

The database schema includes the following tables:

- `countries`: Information about study destinations
- `universities`: Universities in each country
- `programs`: Academic programs offered by universities
- `visa_requirements`: Visa information for each country
- `cost_of_living`: Cost of living details for each country
- `work_opportunities`: Work-related information for each country
- `language_requirements`: Language requirements for each country
- `testimonials`: Student testimonials and success stories
- `faqs`: Frequently asked questions for each country
- `jobs`: Job listings for the job portal
- `blogs`: Blog posts and articles

For detailed information about the database structure, refer to the `docs/database-structure.md` file.

## Security

The database uses Row-Level Security (RLS) policies to control access to data:

- Public read-only access for most tables
- Admin access for all CRUD operations

## Maintenance

Regular backups of the database are recommended. You can use Supabase's built-in backup functionality or export the data manually. 