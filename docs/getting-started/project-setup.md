# Qogent.in Project Setup

## Initial Setup Checklist

### 1. Project Initialization ✅

```bash
# Create new Next.js project with recommended configuration
pnpm create next-app@latest qogent
  √ TypeScript
  √ TailwindCSS
  √ App Router
  √ Import alias (@/*)
  √ Use src/ directory
```

### 2. Essential Dependencies ✅

```bash
# Core dependencies
pnpm add @tanstack/react-query @tanstack/react-query-devtools
pnpm add class-variance-authority tailwind-merge clsx
pnpm add zod @hookform/resolvers/zod react-hook-form
pnpm add resend
pnpm add lucide-react
pnpm add next-themes
pnpm add framer-motion
pnpm add geist

# Important: Use Tailwind CSS v3.3.0 for better compatibility with Next.js 15
# Avoid using Tailwind CSS v4 as it has compatibility issues with TypeScript in Next.js 15
pnpm remove tailwindcss postcss autoprefixer
pnpm add -D tailwindcss@3.3.0 postcss autoprefixer

# shadcn/ui setup
pnpm dlx shadcn-ui@latest init

# Development dependencies
pnpm add -D @types/node @types/react @types/react-dom
pnpm add -D eslint eslint-config-next
pnpm add -D prettier prettier-plugin-tailwindcss
pnpm add -D husky lint-staged
pnpm add -D jest @testing-library/react @testing-library/jest-dom
pnpm add -D cypress
```

### 3. shadcn/ui Components Installation ✅

```bash
# Install basic components
pnpm dlx shadcn-ui@latest add button
pnpm dlx shadcn-ui@latest add card
pnpm dlx shadcn-ui@latest add form
pnpm dlx shadcn-ui@latest add input
pnpm dlx shadcn-ui@latest add select
pnpm dlx shadcn-ui@latest add dialog
pnpm dlx shadcn-ui@latest add switch
pnpm dlx shadcn-ui@latest add separator
pnpm dlx shadcn-ui@latest add tooltip
pnpm dlx shadcn-ui@latest add navigation-menu
pnpm dlx shadcn-ui@latest add dropdown-menu
pnpm dlx shadcn-ui@latest add tabs
pnpm dlx shadcn-ui@latest add sheet
```

### 4. Configuration Files ✅

#### TypeScript Config (tsconfig.json) ✅

```json
{
  "compilerOptions": {
    "target": "es2015",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### PostCSS Config (postcss.config.js) ✅

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### Tailwind CSS Config (tailwind.config.js) ✅

```javascript
/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

#### ESLint Config (.eslintrc.json) ✅

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-explicit-any": ["error"]
  }
}
```

#### Prettier Config (.prettierrc) ✅

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 5. Project Structure Setup ✅

```
src/
├── app/                    # Next.js app router pages
│   ├── (main)/             # Main site routes
│   │   ├── page.tsx        # Home page
│   │   ├── about/          # About page
│   │   ├── destinations/   # Destinations pages
│   │   ├── services/       # Services pages
│   │   ├── jobs/           # Job portal pages
│   │   ├── tools/          # Interactive tools
│   │   └── blog/           # Blog section
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
│
├── pages/                  # Next.js pages router (minimal setup for compatibility)
│   ├── _app.js             # Minimal app setup for compatibility
│   ├── _document.js        # Minimal document setup for compatibility
│   └── dummy.js            # Non-conflicting placeholder
│
├── components/
│   ├── ui/                 # Base UI components (shadcn)
│   ├── layout/             # Layout components
│   │   ├── header.tsx      # Site header
│   │   ├── footer.tsx      # Site footer
│   │   └── mobile-nav.tsx  # Mobile navigation
│   ├── destinations/       # Destination components
│   ├── tools/              # Tools components
│   │   └── country-selector/ # Country selector tool
│   ├── jobs/               # Job portal components
│   └── shared/             # Shared components
│
├── lib/                    # Utility functions
│   ├── constants/          # Constants and config
│   │   ├── routes.ts       # Route definitions
│   │   ├── countries.ts    # Country data
│   │   └── site-config.ts  # Site configuration
│   └── utils/             # Helper functions
│       ├── form-helpers.ts # Form utilities
│       └── validators.ts   # Validation utilities
│
├── hooks/                  # Custom React hooks
│   ├── use-countries.ts    # Hook for country data
│   ├── use-jobs.ts         # Hook for job data
│   └── use-form.ts         # Form handling hooks
│
├── types/                  # TypeScript types
│   ├── country.ts          # Country types
│   └── job.ts              # Job listing types
│
├── config/                 # Configuration
│   ├── site.ts             # Site metadata
│   └── dashboad.ts         # Dashboard config
│
├── providers/              # React Context Providers
│   ├── theme-provider.tsx  # Theme provider
│   └── query-provider.tsx  # React Query provider
│
├── data/                   # Static JSON data
│   ├── countries.json      # Countries data
│   ├── universities.json   # Universities data
│   └── jobs.json           # Job listings data
│
└── styles/                # Component styles
```

### 6. Core Component Templates ✅

#### Theme Provider (src/providers/theme-provider.tsx) ✅

```tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

#### Root Layout (src/app/layout.tsx) ✅

```tsx
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/providers/theme-provider'
import { cn } from '@/lib/utils'
import './globals.css'

export const metadata = {
  title: {
    default: 'Qogent | Your Gateway to Global Education',
    template: '%s | Qogent',
  },
  description:
    'Democratizing access to international education with merit-based admissions guidance.',
  keywords: [
    'study abroad',
    'international education',
    'university admissions',
    'global education',
    'Qogent',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

#### Utils (src/lib/utils.ts) ✅

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 7. Compatibility Files for Deployment (Pages Router) ✅

These files help solve deployment issues with platforms like Netlify that might expect a Pages Router structure:

#### Minimal \_app.js (src/pages/\_app.js) ✅

```jsx
export default function App({ Component, pageProps }) {
  // Do not use router during build time
  if (typeof window !== 'undefined') {
    // This won't actually render in the app router setup
  }
  return <Component {...pageProps} />
}
```

#### Minimal \_document.js (src/pages/\_document.js) ✅

```jsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

#### Non-Conflicting Placeholder (src/pages/dummy.js) ✅

```jsx
// This file is only here to establish a Pages Router structure
// without conflicting with the App Router.

export default function DummyPage() {
  return null
}

export function getStaticProps() {
  return {
    props: {},
    notFound: true,
  }
}
```

### 8. Environment Variables (.env.example)

```
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Qogent

# Email (Resend)
RESEND_API_KEY=your-resend-api-key

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### 9. Git Setup for Version Control ✅

```bash
# Initialize git repository
git init

# Add .gitignore
cat > .gitignore << EOL
# dependencies
node_modules
.pnpm-store

# next.js
.next/
out/
build
dist

# environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# testing
coverage
cypress/videos
cypress/screenshots

# logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# misc
.DS_Store
*.pem
.idea
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
!.vscode/launch.json
EOL

# Setup Husky for pre-commit hooks
pnpm husky init
pnpm husky add .husky/pre-commit "pnpm lint-staged"

# Create lint-staged.config.js for running linting/formatting on staged files
cat > lint-staged.config.js << EOL
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,css,md}': ['prettier --write'],
}
EOL

# Initial commit
git add .
git commit -m "Initial commit: Project setup"

# Set up remote repository (after creating on GitHub/GitLab)
git remote add origin <your-repository-url>
git branch -M main
git push -u origin main
```

## Quality Assurance Setup ✅

### 1. Testing Configuration (jest.config.js) ✅

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### 2. Jest Setup (jest.setup.js) ✅

```javascript
import '@testing-library/jest-dom'
```

### 3. Cypress Configuration (cypress.config.ts) ✅

```typescript
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
```

## Netlify Deployment Setup ✅

Netlify will be used for deploying the Qogent.in website. Here's how to configure the deployment:

### 1. Netlify Configuration (netlify.toml) ✅

```toml
[build]
  command = "pnpm build:netlify"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20.9.0"
  NEXT_USE_NETLIFY_EDGE = "true"
  NETLIFY_NEXT_PLUGIN_SKIP = "true"
  NEXT_FORCE_APP_ROUTER = "true"
  NEXT_SKIP_ROUTER_VALIDATION = "true"
  NODE_ENV = "production"
  NEXT_PREFER_APP_ROUTER = "true"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://analytics.google.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://*.netlify.app; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.netlify.app https://analytics.google.com;"
```

### 2. Package.json Scripts for Netlify Deployment ✅

Add these scripts to package.json:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:netlify": "NETLIFY=true NEXT_SKIP_ROUTER_VALIDATION=true next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "test": "jest",
    "test:watch": "jest --watch",
    "cypress": "cypress open",
    "cypress:headless": "cypress run",
    "type-check": "tsc --noEmit"
  }
}
```

### 3. Netlify Deployment Process

1. **Sign up/login to Netlify**: Create an account at [netlify.com](https://www.netlify.com/) if you don't have one.

2. **Connect Repository**:

   - Click "New site from Git" on the Netlify dashboard
   - Connect to your Git provider (GitHub)
   - Select the Qogent.in repository

3. **Configure Build Settings**:

   - Build command: `pnpm build:netlify`
   - Publish directory: `.next`
   - Set required environment variables in the Netlify UI:
     - `NODE_VERSION` = `20.9.0`
     - `NPM_FLAGS` = `--version`
     - Other environment variables from your `.env` file

4. **Deploy Site**:

   - Click "Deploy site" to start the initial deployment
   - Netlify will automatically build and deploy your site

5. **Set Up Custom Domain** (when ready):

   - In the Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Enter `qogent.in` and follow the DNS configuration steps

6. **Enable Continuous Deployment**:
   - Netlify will automatically deploy when changes are pushed to the main branch
   - You can configure branch deploys and deploy previews for pull requests

### 4. Netlify CLI for Local Testing (optional)

Install the Netlify CLI for local testing of the Netlify environment:

```bash
pnpm add -D netlify-cli

# Add script to package.json
# "netlify:dev": "netlify dev"
```

## Static Data Files for Frontend-Only Implementation

### 1. Country Data (src/data/countries.json)

```json
[
  {
    "id": 1,
    "name": "Germany",
    "code": "DE",
    "region": "Europe",
    "flagUrl": "/images/flags/germany.svg",
    "description": "Germany offers high-quality, tuition-free education at public universities. It's known for engineering, sciences, and arts programs.",
    "featured": true
  },
  {
    "id": 2,
    "name": "Canada",
    "code": "CA",
    "region": "North America",
    "flagUrl": "/images/flags/canada.svg",
    "description": "Canada offers a high standard of living, multicultural environment, and quality education with work opportunities during and after studies.",
    "featured": true
  },
  {
    "id": 3,
    "name": "United States",
    "code": "US",
    "region": "North America",
    "flagUrl": "/images/flags/usa.svg",
    "description": "The USA hosts many top-ranked universities with diverse programs, advanced research facilities, and extensive campus offerings.",
    "featured": true
  }
]
```

### 2. University Data (src/data/universities.json)

```json
[
  {
    "id": 1,
    "name": "Technical University of Munich",
    "countryId": 1,
    "website": "https://www.tum.de/en/",
    "isPublic": true,
    "ranking": 50,
    "description": "A top technical university in Germany known for engineering and sciences."
  },
  {
    "id": 2,
    "name": "University of Toronto",
    "countryId": 2,
    "website": "https://www.utoronto.ca/",
    "isPublic": true,
    "ranking": 18,
    "description": "Canada's top university with a strong emphasis on research and innovation."
  },
  {
    "id": 3,
    "name": "Massachusetts Institute of Technology",
    "countryId": 3,
    "website": "https://www.mit.edu/",
    "isPublic": false,
    "ranking": 1,
    "description": "World-leading institution for technology, engineering, and science education."
  }
]
```

### 3. Job Listings Data (src/data/jobs.json)

```json
[
  {
    "id": 1,
    "title": "Student Research Assistant",
    "company": "Technical University of Munich",
    "countryId": 1,
    "description": "Research assistant position for graduate students in the Computer Science department.",
    "requirements": "Currently enrolled in a Master's or PhD program. Knowledge of machine learning and Python.",
    "salaryRange": "€12-€15 per hour",
    "applicationType": "Direct",
    "jobType": "Part-time",
    "isActive": true
  },
  {
    "id": 2,
    "title": "Graduate Teaching Assistant",
    "company": "University of Toronto",
    "countryId": 2,
    "description": "Teaching assistant for undergraduate computer science courses.",
    "requirements": "Graduate student in Computer Science or related field. Strong communication skills.",
    "salaryRange": "CAD 25-30 per hour",
    "applicationType": "University Portal",
    "jobType": "Part-time",
    "isActive": true
  }
]
```

## Important Notes on Compatibility

Based on learnings from previous projects, here are some key considerations for this project:

1. **Tailwind CSS Version**: Use Tailwind CSS v3.3.0 instead of v4, as v4 has compatibility issues with TypeScript and Next.js 15.

2. **CSS Import Method**: Always use standard Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`) rather than direct imports (`@import "tailwindcss";`).

3. **PostCSS Configuration**: Use the standard configuration with `tailwindcss` and `autoprefixer` plugins.

4. **Dual Router Structure**: Include a minimal Pages Router structure alongside App Router to prevent deployment issues on Netlify.

5. **Type Safety**: Ensure proper null checking for searchParams and other potentially null values:

   ```typescript
   // Correct approach with proper null checking
   const initialQuery = searchParams?.get('q') ?? ''
   ```

6. **Platform-Specific Builds**: Use the special `build:netlify` script for Netlify deployment to avoid App Router validation issues.

7. **Testing**: Always verify the complete build process locally before deploying to production on Netlify.

## Git-Based Development Workflow

1. **Create Feature Branch**:

   ```bash
   git checkout -b feature/[feature-name]
   ```

2. **Implement Feature/Fix**:

   - Make code changes following project guidelines
   - Run the app locally with `pnpm dev` to test changes

3. **Run Tests and Linting**:

   ```bash
   pnpm lint
   pnpm type-check
   pnpm test
   ```

4. **Commit Changes with Conventional Commit Messages**:

   ```bash
   git add .
   git commit -m "feat: add country selector component"
   ```

   Use conventional commit prefixes:

   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Formatting changes
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

5. **Push to Remote Repository**:

   ```bash
   git push origin feature/[feature-name]
   ```

6. **Create Pull Request**:

   - Create PR on GitHub from your feature branch to main
   - Fill in the PR template with description of changes
   - Request code review

7. **Merge to Main After Approval**:
   - Merge the PR to main branch once approved
   - Netlify will automatically deploy the changes

## First Steps After Setup

1. Create initial pages structure (home, about, destinations)
2. Implement basic layout components (header, footer)
3. Create a theme toggle component for dark/light mode
4. Setup the hero section on the homepage with HeroButton component
5. Begin implementing the destination overview grid
6. Create static data files for countries, universities, and jobs
7. Implement the "Which Country is Right for You?" tool with static data
8. Create the job listings page with filtering functionality

## VS Code Configuration ✅

Added proper editor configuration for the project:

```json
// .vscode/settings.json
{
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "editor.quickSuggestions": {
    "strings": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript",
    "css": "css"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "files.associations": {
    "*.css": "css",
    "src/app/globals.css": "tailwindcss"
  },
  "editor.colorDecorators": true,
  "editor.semanticHighlighting.enabled": true
}
```

```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "csstools.postcss"
  ]
}
```
