"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface VideoTestimonialProps {
  videoSrc: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  posterSrc?: string;
}

export function VideoTestimonial({
  videoSrc,
  title,
  isOpen,
  onClose,
  posterSrc
}: VideoTestimonialProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle video loading states
  const handleLoadedData = () => {
    setIsLoading(false);
  };

  // Play or pause video on click
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Reset video when dialog is closed
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isOpen]);

  // Auto-play when opened
  useEffect(() => {
    if (isOpen && videoRef.current && !isLoading) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Auto-play prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [isOpen, isLoading]);

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent 
        className="max-w-3xl p-0 bg-[hsl(var(--background))] rounded-xl overflow-hidden border border-[hsl(var(--border))]"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <div className="relative">
          {/* Video */}
          <div 
            className="relative aspect-video bg-black" 
            onClick={togglePlayPause}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--card))]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[hsl(var(--primary))] border-t-transparent" />
              </div>
            )}
            
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              className="w-full h-full"
              playsInline
              controls={false}
              onLoadedData={handleLoadedData}
            />
            
            {/* Custom video controls overlay */}
            <AnimatePresence>
              {!isPlaying && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                    className="w-16 h-16 rounded-full bg-[hsl(var(--primary))/90 hover:bg-[hsl(var(--primary))]/100 text-[hsl(var(--primary-foreground))] flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
                    aria-label="Play video"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-7 h-7 ml-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Title bar */}
          <div className="p-4 flex items-center justify-between">
            <h3 className="font-medium text-lg">{title}</h3>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground rounded-full p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
              aria-label="Close video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 