'use client'

import { Home, Book, Globe, Wrench, FileText } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Destinations', url: '/destinations', icon: Globe },
  { name: 'Universities', url: '/universities', icon: Book },
  { name: 'Tools', url: '/tools', icon: Wrench },
  { name: 'Blog', url: '/blog', icon: FileText },
]

export function Header() {
  return (
    <header>
      <NavBar items={navItems} />
    </header>
  )
} 