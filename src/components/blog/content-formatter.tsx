'use client'

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
  
  // Parse the markdown-like content into proper HTML
  const formattedContent = content
    .split('\n')
    .map((line, index, array) => {
      // Handle headings
      if (line.startsWith('# ')) {
        const text = line.substring(2)
        const id = text.toLowerCase().replace(/[^\w]+/g, '-')
        return `<h1 id="${id}" class="scroll-m-20 text-4xl font-bold tracking-tight mt-12 mb-6">${formatText(text)}</h1>`
      } else if (line.startsWith('## ')) {
        const text = line.substring(3)
        const id = text.toLowerCase().replace(/[^\w]+/g, '-')
        return `<h2 id="${id}" class="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4 border-b pb-2">${formatText(text)}</h2>`
      } else if (line.startsWith('### ')) {
        const text = line.substring(4)
        const id = text.toLowerCase().replace(/[^\w]+/g, '-')
        return `<h3 id="${id}" class="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-4">${formatText(text)}</h3>`
      }
      
      // Handle lists
      if (line.match(/^\s*(\d+)\.\s(.+)$/)) { // Numbered list
        const listItemContent = line.replace(/^\s*\d+\.\s/, '')
        const formattedListItem = formatText(listItemContent);
        
        // Check if we need to start a new list
        const prevLine = index > 0 ? array[index - 1] : '';
        const isNewList = !prevLine.match(/^\s*\d+\.\s(.+)$/);
        
        if (isNewList) {
          return `<ol class="list-decimal pl-6 my-6"><li class="mb-2">${formattedListItem}</li>`
        }
        
        // Check if we need to close the list
        const nextLine = index < array.length - 1 ? array[index + 1] : '';
        const isEndOfList = !nextLine.match(/^\s*\d+\.\s(.+)$/);
        
        if (isEndOfList) {
          return `<li class="mb-2">${formattedListItem}</li></ol>`
        }
        
        return `<li class="mb-2">${formattedListItem}</li>`
      }
      
      if (line.match(/^\s*[-*]\s(.+)$/)) { // Bulleted list
        const listItemContent = line.replace(/^\s*[-*]\s/, '')
        const formattedListItem = formatText(listItemContent);
        
        // Check if we need to start a new list
        const prevLine = index > 0 ? array[index - 1] : '';
        const isNewList = !prevLine.match(/^\s*[-*]\s(.+)$/);
        
        if (isNewList) {
          return `<ul class="list-disc pl-6 my-6"><li class="mb-2">${formattedListItem}</li>`
        }
        
        // Check if we need to close the list
        const nextLine = index < array.length - 1 ? array[index + 1] : '';
        const isEndOfList = !nextLine.match(/^\s*[-*]\s(.+)$/);
        
        if (isEndOfList) {
          return `<li class="mb-2">${formattedListItem}</li></ul>`
        }
        
        return `<li class="mb-2">${formattedListItem}</li>`
      }
      
      // Empty line as paragraph break
      if (line.trim() === '') {
        return '<div class="my-4"></div>'
      }
      
      // Regular paragraph
      if (line.trim() !== '') {
        return `<p class="mb-4 leading-7">${formatText(line)}</p>`
      }
      
      return line;
    })
    .join('\n')
    .replace(/<\/ol>\s*<ol class="list-decimal pl-6 my-6">/g, '')
    .replace(/<\/ul>\s*<ul class="list-disc pl-6 my-6">/g, '')
  
  return (
    <div className="prose dark:prose-invert prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-md max-w-none" dangerouslySetInnerHTML={{ __html: formattedContent }} />
  )
} 