import { formatEuro } from '@/utils/formatEuro'
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
  const colorClass = isPositive ? 'text-green-500' : 'text-red-500'

  return (
    <>
      <div className="text-2xl font-bold">{formatEuro(value)}</div>
      <div className="text-muted-foreground flex items-center text-xs">
        <ArrowIcon className={`mr-1 h-4 w-4 ${colorClass}`} />
        <span className={colorClass}>
          {isPositive ? '+' : ''}
          {percentage}%
        </span>
        <span className="ml-1">par rapport au mois dernier</span>
      </div>
    </>
  )
}
