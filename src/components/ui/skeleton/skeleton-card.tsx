import { Skeleton } from './skeleton'

export function CardSkeleton() {
  return (
    <div className="rounded-lg p-4">
      <div className="flex items-center space-y-4 space-x-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      </div>

      <div className="mt-4">
        <Skeleton className="h-4 w-[80%]" />
        <div className="mt-2 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    </div>
  )
}
