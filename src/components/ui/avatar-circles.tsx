"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface AvatarCirclesProps {
  className?: string
  numPeople?: number
  avatarUrls?: string[]
}

const DEFAULT_AVATARS = [
  "/images/avatars/avatar1.jpg",
  "/images/avatars/avatar2.jpg",
  "/images/avatars/avatar3.jpg",
  "/images/avatars/avatar4.jpg",
  "/images/avatars/avatar5.jpg",
  "/images/avatars/avatar6.jpg",
]

const MAX_VISIBLE_AVATARS = 5

const AvatarCircles = ({
  numPeople = 0,
  className,
  avatarUrls = DEFAULT_AVATARS,
}: AvatarCirclesProps) => {
  const visibleAvatars = avatarUrls.slice(0, MAX_VISIBLE_AVATARS)
  const remainingCount = numPeople > 0 ? numPeople : avatarUrls.length - MAX_VISIBLE_AVATARS

  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {visibleAvatars.map((url, index) => (
        <img
          key={index}
          className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
          src={url}
          width={40}
          height={40}
          alt={`Avatar ${index + 1}`}
        />
      ))}
      {remainingCount > 0 && (
        <a
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
          href=""
        >
          +{remainingCount >= 1000 ? `${Math.floor(remainingCount / 1000)}k` : remainingCount}
        </a>
      )}
    </div>
  )
}

export { AvatarCircles } 