import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Qogent</h3>
            <p className="text-sm text-muted-foreground">
              Your Gateway to Global Education
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Destinations</h3>
            <Link
              href="/destinations/ireland"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Ireland
            </Link>
            <Link
              href="/destinations/poland"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Poland
            </Link>
            <Link
              href="/destinations/germany"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Germany
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Services</h3>
            <Link
              href="/services/admissions"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Admissions Guidance
            </Link>
            <Link
              href="/services/visa"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Visa Assistance
            </Link>
            <Link
              href="/services/accommodation"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Accommodation
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Company</h3>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About Us
            </Link>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Qogent. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
