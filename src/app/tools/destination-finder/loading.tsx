import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDestinationFinder() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-2/3 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
        </div>
        
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-1/3" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 