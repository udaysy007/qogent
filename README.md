# Qogent

Qogent is a comprehensive platform designed to help international students make informed decisions about studying abroad. Visit us at [https://qogent.in](https://qogent.in).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Documentation

Detailed documentation is available in the `docs` folder:

- [Supabase Storage](./docs/supabase-storage.md) - Documentation for image storage using Supabase
- [Project Setup](./docs/project-setup.md) - Details on project initialization and dependencies
- [Style Guide](./docs/styleguide.md) - Design system and styling guidelines

## Supabase Integration

This project uses Supabase for:

- Database (PostgreSQL)
- Auth
- Storage (for images)

### Database Migrations

Database migrations are stored in `supabase/migrations/` but have been archived to save space. The archive can be found at `archives/supabase-migrations-archive.tar.gz`.

#### Applying Migrations to MSinIreland Database

```bash
export PGPASSWORD="E1d_1di4u:)" && psql -h db.scpupgxqbkpielyjbdmr.supabase.co -p 5432 -d postgres -U postgres -f supabase/migrations/migration-file.sql
```

#### Applying Migrations to MSinPoland Database

```bash
export PGPASSWORD="E1d_1di4u:)" && psql -h db.ocdserkgbbpuaugmwcjt.supabase.co -p 5432 -d postgres -U postgres -f supabase/migrations/migration-file.sql
```

#### Verifying Migrations

After applying a migration, verify it was successful by checking the table structure:

```sql
-- Run this query in the Supabase SQL Editor
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'table_name' 
ORDER BY ordinal_position;
```

### Supabase Storage

University images (campus photos and logos) are stored in Supabase Storage. To upload all images to Supabase:

```bash
pnpm upload-images
```

See the [Supabase Storage documentation](./docs/supabase-storage.md) for implementation details.

## Image System

Qogent uses a comprehensive image system with the following components:

- **Optimized Image Components**: Located in `src/components/shared/optimized-image.tsx`
  - `OptimizedImage`: Universal image component with loading, error, and fallback handling
  - `UniversityLogo`: Specialized for university logos with text abbreviation fallbacks
  - `CountryFlag`: Specialized for country flags with country code fallbacks
  - `HeroImage`: Specialized for hero images with enhanced placeholders

- **Image Storage**: Supabase Storage with a structured approach:
  - University images (campus photos and logos) stored in `/universities` bucket
  - Country images (flags and hero images) stored in `/countries` bucket
  - Team member avatars stored in `/people` bucket
  - Blog post images stored in `/blog` bucket
  
- **Image Management**: The project includes a unified image manager script (`scripts/image-manager.js`) that handles:
  - **Image Optimization**: Reduces image size for faster loading while creating backups of originals
  - **Image Uploading**: Uploads optimized images to Supabase Storage
  - **Error Handling**: Provides robust fallbacks and reporting

### Image Optimization

Images are optimized directly, replacing the originals after creating backups:

```bash
# Optimize images (original high-resolution images are backed up first)
pnpm optimize-images

# Upload optimized images to Supabase Storage
pnpm upload-images

# Both optimize and upload in one command
pnpm images
```

### Image Backups

Original high-resolution images are automatically backed up to:
- `/public/images/backup/destinations/` - Original destination hero images
- `/public/images/backup/universities/` - Original university images

This ensures we have access to the original assets if needed, while serving optimized images for better performance.

## Project Structure

```
src/
├── app/                   # Next.js app router pages
├── components/            # React components
│   ├── ui/                # Base UI components (shadcn)
│   └── shared/            # Shared components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
└── providers/             # React context providers

public/                    # Static assets
└── images/                # Images used in the application
    ├── destinations/      # Optimized destination hero images
    ├── universities/      # University logos and campus images
    ├── countries/         # Country flags
    └── backup/            # Backup of original high-resolution images

scripts/                   # Utility scripts
└── image-manager.js       # Unified image optimization and upload script

supabase/                  # Supabase configuration
├── migrations/            # SQL migrations (archived)
└── seed/                  # Seed data

docs/                      # Project documentation
```

## Development Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run linting checks
- `pnpm optimize-images`: Optimize images for web
- `pnpm upload-images`: Upload images to Supabase
- `pnpm images`: Optimize and upload images

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## Deployment

The site is deployed via Netlify. For configuration details, see the `netlify.toml` file.

## SEO and Sitemap

The website's sitemap is automatically generated and updated through GitHub Actions:

- Updates daily at midnight UTC
- Updates when new pages are added or modified
- Updates when the sitemap generator is modified

The sitemap can be found at:
- XML format: https://qogent.in/sitemap.xml
- Text format: https://qogent.in/robots.txt

### Manual Sitemap Generation

If needed, you can manually generate the sitemap:

```bash
pnpm generate-sitemap
```

This will create/update:
- `public/sitemap.xml` - Contains all website URLs
- `public/robots.txt` - Contains search engine instructions and sitemap location

## Live Site

The live site can be accessed at [https://qogent.in](https://qogent.in)
