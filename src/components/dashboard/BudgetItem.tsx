import { formatEuro } from '@/utils/format'

export function BudgetItem({
  name,
  currentAmount,
  totalAmount,
  color = 'bg-primary',
}: {
  name: string
  currentAmount: number
  totalAmount: number
  color?: string
}) {
  const spentAmount = totalAmount - currentAmount

  const percentage = totalAmount > 0 ? (spentAmount / totalAmount) * 100 : 0
  const isOverBudget = currentAmount < 0
  const isNegative = totalAmount <= 0

  const gradientColor =
    color === 'bg-primary'
      ? 'from-primary/80 to-primary'
      : color === 'bg-blue-500'
        ? 'from-blue-400 to-blue-500'
        : color === 'bg-purple-500'
          ? 'from-purple-400 to-purple-500'
          : color === 'bg-amber-500'
            ? 'from-amber-400 to-amber-500'
            : color === 'bg-emerald-500'
              ? 'from-emerald-400 to-emerald-500'
              : 'from-indigo-400 to-indigo-500'

  return (
    <div className="group relative rounded-xl border-0 bg-white/90 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0 rounded-xl bg-white/5"></div>
      <div className="bg-primary/5 absolute -top-10 -right-5 h-20 w-20 rounded-full blur-xl"></div>

      <div className="relative z-10 mb-4 flex flex-col">
        <div className="mb-2 flex items-center gap-3">
          <h3 className="text-foreground max-w-[280px] truncate text-base font-semibold">
            {name}
          </h3>
          {(isOverBudget || isNegative) && (
            <span className="flex items-center rounded-full bg-red-100/90 px-2.5 py-1 text-xs font-medium text-red-900 shadow-sm backdrop-blur-sm">
              <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />
              Budget dépassé
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-foreground/60 text-xs font-medium">
            Budget alloué
          </p>
          <p className="text-sm font-semibold tabular-nums">
            <span
              className={`text-lg ${isOverBudget || isNegative ? 'text-red-600' : 'text-foreground'}`}
            >
              {formatEuro(currentAmount)}
            </span>
            <span className="text-foreground/40 mx-1.5 opacity-50">/</span>
            <span className="text-foreground/70">
              {formatEuro(totalAmount)}
            </span>
          </p>
        </div>
      </div>

      <div className="relative z-10 space-y-3">
        <div className="relative">
          <div className="bg-primary/10 h-2.5 w-full overflow-hidden rounded-full backdrop-blur-sm">
            <div
              className={`h-full bg-gradient-to-r ${gradientColor} shadow-inner transition-all duration-700 ease-out`}
              style={{
                width: `${Math.min(percentage, 100)}%`,
                borderRadius: percentage >= 97 ? '9999px' : '9999px 0 0 9999px',
              }}
            />
          </div>
          {!isOverBudget && !isNegative && (
            <span className="absolute top-1/2 right-2 -translate-y-1/2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-1 text-xs">
          <p className="text-foreground/70">
            {!isOverBudget && !isNegative ? (
              <>
                <span className="opacity-70">Dépense:</span>{' '}
                <span className="text-foreground ml-1 font-semibold">
                  {formatEuro(spentAmount)}
                </span>
              </>
            ) : (
              <span className="flex items-center font-medium text-red-600">
                <span className="mr-1 opacity-70">Dépense:</span>{' '}
                {formatEuro(spentAmount)}
              </span>
            )}
          </p>
          {isOverBudget && !isNegative && (
            <p className="rounded-full bg-red-50/90 px-2.5 py-1 text-[10px] font-medium text-red-600 tabular-nums shadow-sm">
              +{(percentage > 100 ? percentage - 100 : percentage).toFixed(1)}%
            </p>
          )}
        </div>
      </div>

      <div className="from-accent/0 via-accent/5 to-accent/0 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </div>
  )
}
