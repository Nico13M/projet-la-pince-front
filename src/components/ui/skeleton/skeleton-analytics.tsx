import { Skeleton } from './skeleton'

export default function AnalyticsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-[250px] w-full" />
    </div>
  )
}
