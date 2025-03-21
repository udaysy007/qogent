import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Providers } from './providers'
import { cn } from '@/lib/utils'
import Script from 'next/script'
import './globals.css'
import { ScrollToTop } from '@/components/ScrollToTop'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XLZT03BYY8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XLZT03BYY8');
          `}
        </Script>
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
        suppressHydrationWarning
      >
        <Providers>
          <ThemeProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <ScrollToTop />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
