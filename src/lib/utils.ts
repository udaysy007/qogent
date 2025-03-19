import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a consistent slug from text
 * Used for heading IDs and URL fragments
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars except whitespace and hyphens
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Extracts heading structure from blog content to build
 * table of contents dynamically
 */
export function extractTableOfContents(content: string) {
  // Regular expressions for different heading formats
  // Match both Markdown headings and HTML headings with IDs
  const h2RegexMd = /^##\s+(.*?)(?:\s+\{#([\w-]+)\})?$/gm;
  const h3RegexMd = /^###\s+(.*?)(?:\s+\{#([\w-]+)\})?$/gm;
  const h2RegexHtml = /<h2\s+id=["']([^"']+)["']>(.*?)<\/h2>/gm;
  const h3RegexHtml = /<h3\s+id=["']([^"']+)["']>(.*?)<\/h3>/gm;
  
  const headings: {
    id: string;
    slug: string;
    title: string;
    level: number;
    items: any[];
  }[] = [];
  
  // Helper function to process matches
  const processMatch = (regex: RegExp, level: number, isHtml: boolean) => {
    let match;
    while ((match = regex.exec(content)) !== null) {
      let slug, title;
      
      if (isHtml) {
        // For HTML format: match[1] is the id, match[2] is the title
        slug = match[1];
        title = match[2].replace(/<[^>]*>/g, ''); // Remove any HTML tags inside the heading
      } else {
        // For Markdown format: match[1] is the title, match[2] is the custom id (if any)
        title = match[1];
        slug = match[2] || generateSlug(title);
      }
      
      const id = `heading-${headings.length + 1}`;
      headings.push({
        id,
        slug,
        title,
        level,
        items: [],
      });
    }
  };

  // Process all heading formats
  processMatch(h2RegexHtml, 2, true);
  processMatch(h3RegexHtml, 3, true);
  processMatch(h2RegexMd, 2, false);
  processMatch(h3RegexMd, 3, false);
  
  // Sort headings by their position in the document
  headings.sort((a, b) => {
    const aIndex = content.indexOf(`id="${a.slug}"`) || content.indexOf(`{#${a.slug}}`);
    const bIndex = content.indexOf(`id="${b.slug}"`) || content.indexOf(`{#${b.slug}}`);
    return aIndex - bIndex;
  });
  
  // Build the hierarchical structure
  const result: any[] = [];
  const h2Stack: any[] = [];
  
  headings.forEach(heading => {
    if (heading.level === 2) {
      h2Stack.push(heading);
      result.push(heading);
    } else if (heading.level === 3 && h2Stack.length > 0) {
      const parentH2 = h2Stack[h2Stack.length - 1];
      parentH2.items = parentH2.items || [];
      parentH2.items.push(heading);
    } else {
      // If there's an h3 without a preceding h2, add it to the root
      result.push(heading);
    }
  });
  
  // Log the result for debugging
  console.log('Dynamic TOC generated:', result);
  
  return result;
}
