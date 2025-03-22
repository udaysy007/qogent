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
  openGraph: {
    title: 'Qogent | Your Gateway to Global Education',
    description: 'Democratizing access to international education with merit-based admissions guidance.',
    url: 'https://qogent.com',
    siteName: 'Qogent',
    images: [
      {
        url: '/images/qogent-social.png',
        width: 1200,
        height: 630,
        alt: 'Qogent - Your Gateway to Global Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qogent | Your Gateway to Global Education',
    description: 'Democratizing access to international education with merit-based admissions guidance.',
    images: ['/images/social/twitter-card.png'],
    creator: '@qogent',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-large.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
