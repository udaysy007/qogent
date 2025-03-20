import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Study Destinations | Qogent",
  description: "Explore top study destinations around the world. Find the perfect location for your educational journey.",
}

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 