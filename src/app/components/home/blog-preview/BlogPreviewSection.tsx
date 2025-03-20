"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BlogPostCard } from "./BlogPostCard";
import { Button } from "@/components/ui/button";
import { BlogService } from "@/lib/services/blog";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost } from "@/lib/services/blog";

export function BlogPreviewSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      setError(false);
      
      try {
        const supabase = createClient();
        const blogService = BlogService.getInstance(supabase);
        const posts = await blogService.getAllPosts();
        
        if (posts && posts.length > 0) {
          setBlogPosts(posts.slice(0, 3));
        } else {
          console.log("No posts returned from database");
          setBlogPosts([]);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError(true);
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Don't render the section if there are no blog posts and not loading
  if (!isLoading && blogPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[hsl(var(--background))]">
      <div className="container">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl mb-4">
              Latest From Our Blog
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Expert insights, guides, and tips to help you navigate your academic journey abroad.
            </p>
          </div>
          
          <Button 
            asChild
            variant="ghost" 
            className="hidden md:flex items-center mt-4 md:mt-0"
          >
            <a href="/blog" className="flex items-center">
              View all articles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Button>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                className="flex animate-pulse flex-col space-y-4 bg-[hsl(var(--card))] rounded-xl overflow-hidden border border-[hsl(var(--border))] h-[400px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-48 bg-muted"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-6 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogPostCard
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.description}
                  coverImage={post.image_url}
                  date={post.published_at}
                  readTime={post.read_time}
                  category={{
                    name: post.category,
                    slug: post.category.toLowerCase().replace(/\s+/g, '-')
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="flex justify-center mt-8 md:hidden">
          <Button asChild variant="outline">
            <a href="/blog" className="flex items-center">
              View All Articles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </Button>
        </div>
        
        {/* Newsletter signup teaser */}
        <motion.div
          className="mt-16 p-6 md:p-8 lg:p-10 rounded-xl bg-[hsl(var(--primary))/10 dark:bg-[hsl(var(--primary))]/20 border border-[hsl(var(--primary))]/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                Get Expert Study Abroad Tips
              </h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of students receiving our weekly insights on admissions, scholarships, and student life abroad.
              </p>
              <ul className="space-y-3 mb-6 md:mb-0">
                <li className="flex items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-5 h-5 text-[hsl(var(--primary))] mr-2 shrink-0 mt-0.5"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span>Exclusive scholarship alerts</span>
                </li>
                <li className="flex items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-5 h-5 text-[hsl(var(--primary))] mr-2 shrink-0 mt-0.5"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span>Application deadline reminders</span>
                </li>
                <li className="flex items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-5 h-5 text-[hsl(var(--primary))] mr-2 shrink-0 mt-0.5"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span>Country-specific visa guides</span>
                </li>
                <li className="flex items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-5 h-5 text-[hsl(var(--primary))] mr-2 shrink-0 mt-0.5"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span>Student success stories</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-2 rounded-md border border-[hsl(var(--input))] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] transition-shadow"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-2 rounded-md border border-[hsl(var(--input))] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] transition-shadow"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <select
                      className="w-full px-4 py-2 rounded-md border border-[hsl(var(--input))] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] transition-shadow text-muted-foreground"
                      required
                    >
                      <option value="">Select Your Interest</option>
                      <option value="masters">Masters Degree</option>
                      <option value="phd">PhD Programs</option>
                      <option value="bachelors">Bachelors Degree</option>
                      <option value="research">Research Opportunities</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full">
                    Subscribe to Newsletter
                  </Button>
                </form>
                <p className="mt-4 text-xs text-center text-muted-foreground">
                  By subscribing, you agree to receive study abroad related updates. You can unsubscribe at any time.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-5 h-5 mr-2 text-[hsl(var(--primary))]"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  Weekly Updates
                </div>
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-5 h-5 mr-2 text-[hsl(var(--primary))]"
                  >
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% Free
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 