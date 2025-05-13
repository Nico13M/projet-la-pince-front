import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatEuro } from '@/utils/format'

export default function CompareCard({
  totalAmount,
  comparePercentage,
  title,
  icon,
  type,
  isLoading,
}: {
  totalAmount: number
  comparePercentage: number
  title: string
  icon: React.ReactNode
  type: 'expense' | 'income' | 'investment'
  isLoading: boolean
}) {
  if (isLoading) return null

  let isPositive = false
  if (type === 'expense') {
    isPositive = comparePercentage <= 0
  } else if (type === 'income') {
    isPositive = comparePercentage >= 0
  } else if (type === 'investment') {
    isPositive = comparePercentage >= 0
  }

  return (
    <Card className="relative overflow-hidden rounded-2xl border-0 bg-white/80 shadow-lg backdrop-blur-sm">
      <div className="from-primary/80 to-secondary/80 absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r"></div>
      <div className="bg-primary/5 absolute -right-10 -bottom-16 h-32 w-32 rounded-full blur-2xl"></div>

      <CardHeader className="flex flex-row items-center justify-between pt-6">
        <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
          {icon}
          <span className="font-medium tracking-wide">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 pb-6">
        <div className="space-y-3">
          <div className="text-3xl font-bold tracking-tight">
            {formatEuro(totalAmount)}
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className={`flex items-center rounded-md p-1 shadow-sm ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={isPositive ? 'M18 15L12 9L6 15' : 'M6 9L12 15L18 9'}
                  stroke={isPositive ? '#10B981' : '#EF4444'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center text-xs">
              <span
                className={`font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}
              >
                {comparePercentage > 0 ? '+' : ''}
                {comparePercentage}%
              </span>
              <span className="text-foreground/70 ml-1.5">
                par rapport au mois dernier
              </span>
            </div>
          </div>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full ${isPositive ? 'bg-green-400' : 'bg-red-400'}`}
              style={{
                width: `${Math.min(Math.abs(comparePercentage), 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
