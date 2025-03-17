#!/bin/bash

# Check if the migration file is provided
if [ -z "$1" ]; then
  echo "Usage: ./migrate.sh <migration-file> [project]"
  echo "Example: ./migrate.sh supabase/migrations/20240317_initial_schema.sql ireland"
  exit 1
fi

# Check if the project is provided
if [ -z "$2" ]; then
  echo "Please specify the project (ireland or poland)"
  exit 1
fi

MIGRATION_FILE=$1
PROJECT=$2

# Set the database connection details based on the project
if [ "$PROJECT" = "ireland" ]; then
  DB_HOST="db.scpupgxqbkpielyjbdmr.supabase.co"
  echo "Running migration for MSinIreland..."
elif [ "$PROJECT" = "poland" ]; then
  DB_HOST="db.ocdserkgbbpuaugmwcjt.supabase.co"
  echo "Running migration for MSinPoland..."
else
  echo "Invalid project. Please specify 'ireland' or 'poland'"
  exit 1
fi

# Run the migration
export PGPASSWORD="E1d_1di4u:)" && psql -h $DB_HOST -p 5432 -d postgres -U postgres -f $MIGRATION_FILE

# Check if the migration was successful
if [ $? -eq 0 ]; then
  echo "Migration completed successfully!"
else
  echo "Migration failed!"
  exit 1
fi 