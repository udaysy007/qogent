#!/bin/bash

# Make sure we have the required dependencies
if ! which node > /dev/null; then
  echo "Node.js is required but not installed. Please install Node.js first."
  exit 1
fi

echo "=== Starting University Images Upload to Supabase Storage ==="
echo "This script will:"
echo "1. Upload campus images to Supabase Storage"
echo "2. Update the database with the new URLs"
echo "=== Make sure you have a .env.local file with your Supabase credentials ==="

# Check if env variables are set
if [ -f .env.local ]; then
  echo "Found .env.local file"
  source .env.local
  
  # Check if the variables are set
  if [ -n "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo "Supabase URL: ${NEXT_PUBLIC_SUPABASE_URL}"
  else
    echo "ERROR: NEXT_PUBLIC_SUPABASE_URL is not set in .env.local"
    exit 1
  fi
  
  if [ -n "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "Supabase Service Role Key: ${SUPABASE_SERVICE_ROLE_KEY:0:5}...${SUPABASE_SERVICE_ROLE_KEY: -5} (redacted middle for security)"
  elif [ -n "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "Supabase Anon Key: ${NEXT_PUBLIC_SUPABASE_ANON_KEY:0:5}...${NEXT_PUBLIC_SUPABASE_ANON_KEY: -5} (redacted middle for security)"
  else
    echo "ERROR: Neither SUPABASE_SERVICE_ROLE_KEY nor NEXT_PUBLIC_SUPABASE_ANON_KEY is set in .env.local"
    exit 1
  fi
else
  echo "ERROR: .env.local file not found"
  exit 1
fi

# Run the upload script
echo "Running upload script..."
node scripts/upload-images-to-supabase.js

echo "Done!" 