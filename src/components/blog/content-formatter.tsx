'use client'

import { generateSlug } from '@/lib/utils'

// Enhanced Content Formatter with better markdown parsing
export function ContentFormatter({ content }: { content: string }) {
  // Helper function to process text formatting
  const formatText = (text: string): string => {
    let formatted = text;
    
    // Bold text
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Italic text
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-muted">$1</code>');
    
    // Links
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:text-primary/90">$1</a>');
    
    return formatted;
  };

  // Helper to extract ID from heading and generate consistent IDs
  const extractOrGenerateId = (headingText: string, customId?: string): string => {
    // If there's an explicit ID in the format {#custom-id}, use that
    if (customId) return customId;
    
    // If the heading itself contains an HTML ID attribute, extract and use it
    const htmlIdMatch = headingText.match(/id=["']([^"']+)["']/);
    if (htmlIdMatch) return htmlIdMatch[1];
    
    // Otherwise, generate a slug from the text (after removing any HTML tags)
    const cleanText = headingText.replace(/<[^>]*>/g, '');
    return generateSlug(cleanText);
  };
  
  // Parse the markdown-like content into proper HTML
  const formattedContent = content
    .split('\n')
    .map((line, index, array) => {
      // Handle headings with ID support
      if (line.startsWith('# ')) {
        const headingWithId = line.substring(2).match(/(.*?)(?:\s+\{#([\w-]+)\})?$/);
        if (headingWithId) {
          const [, text, customId] = headingWithId;
          const id = extractOrGenerateId(text, customId);
          return `<h1 id="${id}">${formatText(text)}</h1>`;
        }
      } else if (line.startsWith('## ')) {
        const headingWithId = line.substring(3).match(/(.*?)(?:\s+\{#([\w-]+)\})?$/);
        if (headingWithId) {
          const [, text, customId] = headingWithId;
          const id = extractOrGenerateId(text, customId);
          return `<h2 id="${id}">${formatText(text)}</h2>`;
        }
      } else if (line.startsWith('### ')) {
        const headingWithId = line.substring(4).match(/(.*?)(?:\s+\{#([\w-]+)\})?$/);
        if (headingWithId) {
          const [, text, customId] = headingWithId;
          const id = extractOrGenerateId(text, customId);
          return `<h3 id="${id}">${formatText(text)}</h3>`;
        }
      }
      
      // Handle HTML headings that already have IDs
      if (line.match(/<h[1-6][^>]*>/i)) {
        // Check if the heading already has an ID
        if (!line.match(/id=["'][^"']+["']/i)) {
          // If not, add one
          return line.replace(
            /(<h([1-6])[^>]*>)(.*?)(<\/h\2>)/i, 
            (match, openTag, level, content, closeTag) => {
              const id = generateSlug(content.replace(/<[^>]*>/g, ''));
              return `<h${level} id="${id}">${content}</h${level}>`;
            }
          );
        }
        // If it already has an ID, leave it unchanged
        return line;
      }
      
      // Handle lists
      if (line.match(/^\s*(\d+)\.\s(.+)$/)) { // Numbered list
        const matches = line.match(/^\s*(\d+)\.\s(.+)$/);
        const number = matches ? matches[1] : '1';
        const listItemContent = matches ? matches[2] : line.replace(/^\s*\d+\.\s/, '');
        const formattedListItem = formatText(listItemContent);
        
        // Check if we need to start a new list
        const prevLine = index > 0 ? array[index - 1] : '';
        const isNewList = !prevLine.match(/^\s*\d+\.\s(.+)$/);
        
        if (isNewList) {
          return `<ol start="${number}"><li value="${number}">${formattedListItem}</li>`
        }
        
        // Check if we need to close the list
        const nextLine = index < array.length - 1 ? array[index + 1] : '';
        const isEndOfList = !nextLine.match(/^\s*\d+\.\s(.+)$/);
        
        if (isEndOfList) {
          return `<li value="${number}">${formattedListItem}</li></ol>`
        }
        
        return `<li value="${number}">${formattedListItem}</li>`
      }
      
      if (line.match(/^\s*[-*]\s(.+)$/)) { // Bulleted list
        const listItemContent = line.replace(/^\s*[-*]\s/, '')
        const formattedListItem = formatText(listItemContent);
        
        // Check if we need to start a new list
        const prevLine = index > 0 ? array[index - 1] : '';
        const isNewList = !prevLine.match(/^\s*[-*]\s(.+)$/);
        
        if (isNewList) {
          return `<ul><li>${formattedListItem}</li>`
        }
        
        // Check if we need to close the list
        const nextLine = index < array.length - 1 ? array[index + 1] : '';
        const isEndOfList = !nextLine.match(/^\s*[-*]\s(.+)$/);
        
        if (isEndOfList) {
          return `<li>${formattedListItem}</li></ul>`
        }
        
        return `<li>${formattedListItem}</li>`
      }
      
      // Empty line as paragraph break
      if (line.trim() === '') {
        return ''
      }
      
      // Regular paragraph
      if (line.trim() !== '') {
        return `<p>${formatText(line)}</p>`
      }
      
      return line;
    })
    .join('\n')
    .replace(/<\/ol>\s*<ol>/g, '')
    .replace(/<\/ul>\s*<ul>/g, '')
  
  return (
    <div className="prose dark:prose-invert 
      prose-headings:font-semibold 
      prose-h1:text-4xl prose-h1:mb-8 
      prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
      prose-p:my-6 
      prose-ul:my-6 prose-ul:list-disc prose-ul:pl-0
      prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-0
      prose-li:my-0 prose-li:marker:text-foreground/80
      prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-md 
      max-w-none" 
      dangerouslySetInnerHTML={{ __html: formattedContent }} />
  )
} 