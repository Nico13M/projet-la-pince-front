import { formatEuro } from '@/utils/format'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

export function StatCardContent({
  value,
  percentage,
  isPositive = true,
}: {
  value: number
  percentage: number
  isPositive?: boolean
}) {
  const ArrowIcon = isPositive ? ArrowUpIcon : ArrowDownIcon
  const colorClass = isPositive ? 'text-green-600' : 'text-red-600'
  const bgColorClass = isPositive ? 'bg-green-50' : 'bg-red-50'

  return (
    <div className="space-y-3">
      <div className="text-2xl font-bold tracking-tight">
        {formatEuro(value || 0)}
      </div>
      <div className="flex items-center gap-1.5">
        <div className={`${bgColorClass} flex items-center rounded-md p-1`}>
          <ArrowIcon className={`h-3.5 w-3.5 ${colorClass}`} />
        </div>
        <div className="flex items-center text-xs">
          <span className={`${colorClass} font-semibold`}>
            {isPositive ? '+' : ''}
            {percentage}%
          </span>
          <span className="text-foreground/60 ml-1.5">vs mois dernier</span>
        </div>
      </div>
    </div>
  )
}
