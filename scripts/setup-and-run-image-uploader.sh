#!/bin/bash

echo "=========================================================================="
echo "Qogent Image Uploader - Setup and Run"
echo "=========================================================================="
echo "This script will:"
echo "1. Install necessary dependencies"
echo "2. Create required directory structures"
echo "3. Upload images to Supabase Storage"
echo "4. Update database records with new image URLs"
echo "=========================================================================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "Error: .env.local file not found!"
  echo "Please create a .env.local file with the following variables:"
  echo "NEXT_PUBLIC_SUPABASE_URL=your-supabase-url"
  echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key"
  echo "SUPABASE_SERVICE_KEY=your-service-key"
  exit 1
fi

# Install sharp library for image processing
echo "Installing Sharp image library..."
pnpm add -D sharp

# Create directory structure
echo "Creating directory structure..."
mkdir -p public/images/universities/logos
mkdir -p public/images/universities/campus
mkdir -p public/images/countries/flags
mkdir -p public/images/countries/hero
mkdir -p public/images/placeholders
mkdir -p public/images/people/team
mkdir -p public/images/blog

# Fix naming conventions for existing files
echo "Fixing naming conventions for existing files..."

# Check if there are university logos to rename
for logo in public/images/universities/logos/*-logo.svg; do
  if [ -f "$logo" ]; then
    # Extract slug from logo filename (e.g., tum-logo.svg -> tum)
    slug=$(basename "$logo" | sed 's/-logo\.svg$//')
    
    # Only create symbolic link if target file doesn't exist
    if [ ! -f "public/images/universities/logos/${slug}.svg" ]; then
      ln -sf "$(basename "$logo")" "public/images/universities/logos/${slug}.svg"
      echo "Created symbolic link for $logo -> ${slug}.svg"
    fi
  fi
done

# Check if there are campus images to rename
for campus in public/images/universities/campus/*-campus.jpg; do
  if [ -f "$campus" ]; then
    # Extract slug from campus filename (e.g., tum-campus.jpg -> tum)
    slug=$(basename "$campus" | sed 's/-campus\.jpg$//')
    
    # Only create symbolic link if target file doesn't exist
    if [ ! -f "public/images/universities/campus/${slug}.jpg" ]; then
      ln -sf "$(basename "$campus")" "public/images/universities/campus/${slug}.jpg"
      echo "Created symbolic link for $campus -> ${slug}.jpg"
    fi
  fi
done

# Run the enhanced image uploader script
echo "Running enhanced image uploader..."
node scripts/enhanced-image-uploader.js

echo "=========================================================================="
echo "Image upload and database update complete!"
echo "==========================================================================" 