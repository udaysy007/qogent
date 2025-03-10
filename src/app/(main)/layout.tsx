import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileNav } from '@/components/layout/mobile-nav'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex items-center justify-between md:hidden">
        <MobileNav />
      </div>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
