import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function LoadingDestination() {
  return (
    <main>
      {/* Hero Section Skeleton */}
      <div className="relative h-[400px] w-full">
        <Skeleton className="absolute inset-0 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background">
          <Section className="relative z-10 pt-24 pb-16">
            <Container>
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                <Skeleton className="h-4 w-4 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                <Skeleton className="h-4 w-24 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                <Skeleton className="h-4 w-4 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                <Skeleton className="h-4 w-32 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
              </div>
              
              <div className="mt-8 max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-8 w-8 rounded-full opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                  <Skeleton className="h-10 w-2/3 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                </div>
                <Skeleton className="h-20 w-full opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                <div className="flex flex-wrap gap-2 mt-6">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-24 rounded-full opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Skeleton className="h-12 w-40 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                  <Skeleton className="h-12 w-48 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                </div>
              </div>
            </Container>
          </Section>
        </div>
      </div>

      {/* Key Facts Section */}
      <Section background="muted">
        <Container>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
            {/* Left column - Key Facts */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6">
                <Skeleton className="h-6 w-6 rounded-full opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                <Skeleton className="h-8 w-32 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-5 w-5 rounded-full opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                    <div>
                      <Skeleton className="h-5 w-24 mb-1 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                      <Skeleton className="h-4 w-32 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - Statistics */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6">
                <Skeleton className="h-6 w-6 rounded-full opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                <Skeleton className="h-8 w-48 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
              </div>
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <Skeleton className="h-5 w-40 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                      <Skeleton className="h-5 w-20 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                    </div>
                    <Skeleton className="h-2.5 w-full rounded-full opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Universities Section */}
      <Section background="muted">
        <Container>
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-6 w-6 rounded-full opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
            <Skeleton className="h-8 w-48 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
          </div>
          <Skeleton className="h-20 w-full max-w-3xl mb-8 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4 space-y-4">
                <Skeleton className="h-48 w-full rounded-lg opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                <Skeleton className="h-6 w-3/4 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                <Skeleton className="h-4 w-full opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                  <Skeleton className="h-4 w-24 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Requirements Section */}
      <Section>
        <Container>
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-6 w-6 rounded-full opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
            <Skeleton className="h-8 w-48 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-6">
                <Skeleton className="h-8 w-48 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex gap-3">
                    <Skeleton className="h-7 w-7 rounded-full opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-6 w-40 opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                      <Skeleton className="h-16 w-full opacity-70 bg-muted-foreground/30 dark:bg-muted/70" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
} 