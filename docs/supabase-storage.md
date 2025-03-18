# Supabase Storage Integration for Images

Qogent uses Supabase Storage for storing and serving images such as university campus photos, logos, and country flags/images.

## Overview

The Qogent project uses a hybrid approach for image handling that combines:

1. **Local storage** in the `public/images` directory during development
2. **Supabase Storage** for production deployments
3. **Specialized components** with fallback mechanisms for reliable display

This strategy ensures fast development experience while providing scalable, CDN-backed storage for production.

## Storage Structure

The storage structure in Supabase follows a consistent organization pattern:

- **Root buckets**:
  - `universities`: For university-related images
  - `countries`: For country-related images
  - `people`: For team member and testimonial images
  - `blog`: For blog-related images

- **University Bucket Structure**:
  - **Logos Folder**: `/logos/`
  - **Campus Images Folder**: `/campus/`

- **Country Bucket Structure**:
  - **Flags Folder**: `/flags/`
  - **Hero Images Folder**: `/hero/`

### Local Development Structure

For local development, you should have the following directory structure in your public folder that mirrors the Supabase structure:

```
public/images/
├── universities/
│   ├── logos/         # University logos as SVG files
│   └── campus/        # Campus photos as JPG files
├── countries/
│   ├── flags/         # Country flags as SVG files
│   └── hero/          # Country hero images as JPG files
├── people/
│   └── team/          # Team member photos as JPG files
├── blog/              # Blog post images
└── placeholders/      # Placeholder images for fallbacks
```

## Naming Conventions

All files follow a consistent naming convention:

- **University Logos**: `[university-slug].{svg|png}`
- **University Campus Images**: `[university-slug].jpg`
- **Country Flags**: `[country-code].svg` (lowercase ISO code)
- **Country Hero Images**: `[country-slug].jpg`
- **Team Member Photos**: `[team-member-id].jpg`
- **Blog Images**: `[blog-post-slug].jpg`

## Image Specifications

All images are optimized for web viewing and follow these specifications:

- **Logos**: SVG or PNG format, with transparency
- **Campus Images**: JPG format, optimized for web
- **Flags**: SVG format, optimized for web
- **Hero Images**: JPG format, optimized for web (1200×600px)

## Database Integration

University and country information in the database includes references to their respective images:

- `logo_url`: URL to the university's logo in Supabase Storage
- `campus_image_url`: URL to the university's campus image in Supabase Storage
- `flag_url`: URL to the country's flag in Supabase Storage
- `hero_image_url`: URL to the country's hero image in Supabase Storage

## Helper Functions

The `image-helpers.ts` module provides functions to get the correct image URL:

```typescript
// Import in your component
import { getUniversityLogo, getUniversityCampus, getCountryFlag, getCountryHero } from '@/lib/image-helpers'

// Use in your component
const logoUrl = getUniversityLogo('trinity-college-dublin') // Returns appropriate URL based on environment
```

These helper functions automatically handle:
- Environment detection (development vs production)
- Fallback mechanisms if image loading fails
- Multiple file format attempts (SVG → PNG → JPG) for logos

## Optimized Image Components

Qogent uses a set of optimized image components that handle loading states, fallbacks, and errors gracefully.

### Universal OptimizedImage Component

The base `OptimizedImage` component handles all the basic image loading needs with built-in error and fallback handling:

```tsx
<OptimizedImage
  src={imageUrl}
  alt="Image description"
  fallbackSrc="/path/to/fallback.jpg"
  className="custom-class"
  width={400}
  height={300}
  priority={true}
/>
```

### Specialized Image Components

1. **UniversityLogo** - For university logos with text abbreviation fallback

```tsx
<UniversityLogo
  university={{ 
    name: "University Name", 
    slug: "university-name",
    logo_url: "https://..." // Optional override
  }}
  size="md" // "sm" | "md" | "lg"
/>
```

2. **CountryFlag** - For country flags with country code fallback

```tsx
<CountryFlag
  country={{ 
    name: "Country Name", 
    code: "IE", 
    flag_url: "https://..." // Optional override
  }}
  size="md" // "sm" | "md" | "lg"
/>
```

3. **HeroImage** - For hero images with enhanced placeholder and fallback

```tsx
<HeroImage
  src="https://example.com/image.jpg"
  alt="Hero description"
  fallbackSrc="/images/placeholders/hero-placeholder.jpg"
  className="your-custom-class"
  priority={true} // For LCP optimization
/>
```

## Usage in Components

These components are used throughout the Qogent application:

- The university detail page at `src/app/(main)/universities/[slug]/university-detail.tsx` displays the campus image from Supabase Storage as a hero image.
- The university card component at `src/components/university-card.tsx` uses the `UniversityLogo` component to display the university logo.
- The country card component at `src/components/country-card.tsx` uses the `HeroImage` component for country hero images.

## Next.js Configuration

The `next.config.js` file includes configuration for remote image domains:

```javascript
images: {
  domains: [
    'kavkopyjktifvtxqgcft.supabase.co', // Supabase storage domain
    'images.unsplash.com',
    'upload.wikimedia.org',
    'placehold.co'
  ],
},
```

## Automated Upload Process

The `/scripts/enhanced-image-uploader.js` script automates the process of uploading images to Supabase Storage. The script:

1. Creates the necessary storage buckets if they don't exist
2. Uploads all campus images from the local directory 
3. Uploads all logo images from the local directory
4. Updates the database with the new image URLs

To run the uploader:

```bash
# Install dependencies and run the uploader
./scripts/setup-and-run-image-uploader.sh
```

This script:
1. Installs the Sharp library for image processing
2. Creates the necessary directory structure
3. Uploads images to Supabase Storage
4. Updates database records with new image URLs

## Error Handling

All our image components incorporate robust error handling:

1. If an image fails to load from Supabase, the component will show a fallback image
2. If both the primary and fallback images fail, a text-based placeholder is shown
3. University logos fallback to text abbreviations of the university name
4. Country flags fallback to the country code in text

## Troubleshooting

Common issues and solutions:

1. **Images not appearing**: 
   - Check that the Supabase Storage URLs are correct and the images have been properly uploaded.
   - Check if the domain is added to `next.config.js`
   - Verify the image exists in both local storage and Supabase
   - Check browser console for CORS errors

2. **Permission errors**: Ensure that the storage bucket has the correct public access policies.

3. **Missing fallbacks**: Make sure all fallback images are present in the `/public/images/placeholders/` directory.

4. **Poor image quality**:
   - Review the quality settings in the upload script
   - Ensure source images meet minimum size requirements

5. **Slow loading**:
   - Use the `priority` attribute for above-the-fold images
   - Verify proper image size optimization

### Debug Tools

The helper functions have built-in error logging to help identify issues:

```typescript
// In your component
try {
  const imageUrl = getUniversityLogo('example-university')
  console.log('Image URL:', imageUrl)
} catch (error) {
  console.error('Failed to get university logo:', error)
}
```

## Access Policies

The Supabase Storage bucket has the following Row-Level Security (RLS) policies:

1. **Allow public read access**
   - Operation: SELECT
   - Policy: `true`
   - Description: Anyone can view university images

2. **Allow service role to upload**
   - Operation: INSERT
   - Policy: `auth.role() = 'service_role'`
   - Description: Only service role can upload images

3. **Allow service role to update**
   - Operation: UPDATE
   - Policy: `auth.role() = 'service_role'`
   - Description: Only service role can update images

## Required Environment Variables

The script requires the following environment variables in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

## Best Practices

1. **Always** use the specialized components (`UniversityLogo`, `CountryFlag`, `HeroImage`) when available
2. **Always** include proper fallback strategies
3. **Optimize** images before uploading (the upload script handles this)
4. Use the `priority` attribute for important above-the-fold images
5. Use appropriate `sizes` attributes for responsive images

## Benefits of Supabase Storage

1. **Scalability**: Better handling of asset storage compared to public directory
2. **Performance**: Leverages Supabase's CDN for faster global delivery
3. **Reduced Deployment Size**: Assets aren't bundled with application code
4. **Security**: Fine-grained access control through RLS policies
5. **Consistency**: Standardized URL structure for all assets

## Migration from Public Directory

Previously, university images were stored in the public directory at:
- `/public/images/universities/` - Campus images
- `/public/images/universities/logos/` - Logo images

The migration to Supabase Storage included:
1. Creating a storage bucket
2. Setting up appropriate RLS policies
3. Uploading existing images
4. Updating database records with new URLs

## Debugging Tips

If images aren't displaying correctly:

1. Check that the correct URL is being used (inspect element)
2. Verify the image exists in Supabase Storage
3. Ensure public read access is enabled
4. Check the image format matches what's expected

## Future Improvements

Potential enhancements to consider:

1. Add image resizing/optimization through Supabase Storage transformations
2. Implement browser caching strategy for frequent assets
3. Add admin UI for uploading/managing university images
4. Implement image versioning to handle updates 