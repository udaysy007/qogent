"use client"

import { AvatarCircles } from "@/components/ui/avatar-circles"

const avatarUrls = [
  "/images/avatars/avatar1.jpg",
  "/images/avatars/avatar2.jpg",
  "/images/avatars/avatar3.jpg",
  "/images/avatars/avatar4.jpg",
]

export function AvatarCirclesDemo() {
  return <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />
} 