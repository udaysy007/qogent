import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/providers/theme-provider'
import { cn } from '@/lib/utils'
import './globals.css'

export const metadata = {
  title: {
    default: 'Qogent | Your Gateway to Global Education',
    template: '%s | Qogent',
  },
  description:
    'Democratizing access to international education with merit-based admissions guidance.',
  keywords: [
    'study abroad',
    'international education',
    'university admissions',
    'global education',
    'Qogent',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
