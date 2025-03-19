# Next.js Build Troubleshooting

## Issue: Root Page Build Failure

### Problem Description
Running `pnpm build` would fail with the error: "Cannot read properties of undefined (reading 'entryCSSFiles')" specifically when prerendering the root page.

### Root Cause
The issue was related to the project's route structure. The application used a route group named `(main)` which contained most of the application pages, creating a boundary between the root page and the rest of the application. This route group was causing CSS processing issues during static generation of the root page.

### Initial Application Structure
```
src/
  app/
    (main)/
      about/
      blog/
      destinations/
      tools/
      universities/
      page.tsx (this was accessed via /)
    layout.tsx
    page.tsx (empty/placeholder root page)
    ...
```

### Failed Approaches
We tried various approaches that did not resolve the issue:
1. Simplifying the root page
2. Updating Next.js from 15.2.1 to 15.2.3
3. Modifying PostCSS and Tailwind configurations
4. Adding redirects in next.config.js
5. Disabling TypeScript and ESLint checks

### Solution: Route Structure Redesign
The solution that worked was removing the `(main)` route group entirely and restructuring the app to use a flatter directory structure:

1. Created a proper root page at src/app/page.tsx
2. Moved all content from src/app/(main)/* to src/app/*
3. Removed the (main) directory completely
4. Removed any redirect configuration from next.config.js (if applicable)

### After Application Structure
```
src/
  app/
    about/
    blog/
    destinations/
    tools/
    universities/
    page.tsx (properly functioning root page)
    layout.tsx
    ...
```

### Key Insight
Route groups in Next.js, while useful for organization, can create complications in how Next.js processes CSS during the build phase, particularly when generating static pages. The issue specifically affects the boundary between route groups and the root page.

### How to Revert (if needed)
If there's a need to go back to the route group structure, be aware that:
1. The build will likely fail again with the same CSS processing error
2. You might need to implement a different solution, such as:
   - Using a different route structure
   - Making the root page dynamic instead of static
   - Implementing a custom build process

### References
- [Next.js Route Groups Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
- [Next.js Static and Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic) 