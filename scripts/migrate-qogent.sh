#!/bin/bash

# Check if the migration file is provided
if [ -z "$1" ]; then
  echo "Usage: ./migrate-qogent.sh <migration-file>"
  echo "Example: ./migrate-qogent.sh supabase/migrations/20240317_initial_schema.sql"
  exit 1
fi

MIGRATION_FILE=$1

# Get the Supabase URL and service key from .env.local
SUPABASE_URL=$(grep NEXT_PUBLIC_SUPABASE_URL .env.local | cut -d '=' -f2)
SUPABASE_HOST=$(echo $SUPABASE_URL | sed 's/https:\/\///' | sed 's/\.supabase\.co//')

echo "Running migration for Qogent project..."
echo "Supabase host: $SUPABASE_HOST"

# Run the migration
export PGPASSWORD="E1d_1di4u:)" && psql -h db.$SUPABASE_HOST.supabase.co -p 5432 -d postgres -U postgres -f $MIGRATION_FILE

# Check if the migration was successful
if [ $? -eq 0 ]; then
  echo "Migration completed successfully!"
else
  echo "Migration failed!"
  exit 1
fi 