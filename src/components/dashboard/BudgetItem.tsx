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
  // currentAmount représente le montant restant (disponible)
  // On calcule le montant dépensé
  const spentAmount = totalAmount - currentAmount

  const percentage = totalAmount > 0 ? (spentAmount / totalAmount) * 100 : 0
  const isOverBudget = currentAmount < 0
  const isNegative = totalAmount <= 0
  const remainingAmount = currentAmount

  const gradientColor = color === 'bg-primary'
    ? 'from-primary/80 to-primary'
    : color === 'bg-blue-500'
      ? 'from-blue-400 to-blue-500'
      : color === 'bg-purple-500'
        ? 'from-purple-400 to-purple-500'
        : color === 'bg-amber-500'
          ? 'from-amber-400 to-amber-500'
          : color === 'bg-emerald-500'
            ? 'from-emerald-400 to-emerald-500'
            : 'from-indigo-400 to-indigo-500';

  return (
    <div className="group relative rounded-xl p-6 transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg">
      <div className="absolute inset-0 bg-white/5 rounded-xl"></div>
      <div className="absolute -right-5 -top-10 h-20 w-20 rounded-full bg-primary/5 blur-xl"></div>

      <div className="flex flex-col mb-4 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-base font-semibold truncate max-w-[280px] text-foreground">
            {name}
          </h3>
          {(isOverBudget || isNegative) && (
            <span className="bg-red-100/90 text-red-900 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm flex items-center shadow-sm">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2 animate-pulse" />
              Budget dépassé
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs text-foreground/70 font-medium">Budget alloué</p>
          <p className="text-sm font-semibold tabular-nums">
            <span className={`text-lg ${(isOverBudget || isNegative) ? 'text-red-600' : 'text-foreground'}`}>
              {formatEuro(currentAmount)}
            </span>
            <span className="mx-1.5 opacity-50 text-foreground/40">/</span>
            <span className="text-foreground/70">{formatEuro(totalAmount)}</span>
          </p>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <div className="relative">
          <div className="bg-primary/10 h-2.5 w-full rounded-full overflow-hidden backdrop-blur-sm">
            {!isNegative && !isOverBudget ? (
              <div
                className={`h-full bg-gradient-to-r ${gradientColor} transition-all duration-700 ease-out shadow-inner`}
                style={{
                  width: `${Math.min(percentage, 100)}%`,
                  borderRadius: percentage >= 97 ? '9999px' : '9999px 0 0 9999px'
                }}
              />
            ) : (
              <div className="h-full w-0"></div>
            )}
          </div>
          {!isOverBudget && !isNegative && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-white bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>

        <div className="flex justify-between items-center text-xs pt-1">
          <p className="text-foreground/70">
            {!isOverBudget && !isNegative ? (
              <>
                <span className="opacity-80">Dépense:</span>{' '}
                <span className="text-foreground font-semibold ml-1">
                  {formatEuro(spentAmount)}
                </span>
              </>
            ) : (
              <span className="text-red-600 font-medium flex items-center">
                <span className="opacity-80 mr-1">Dépense:</span> {formatEuro(spentAmount)}
              </span>
            )}
          </p>
          {isOverBudget && !isNegative && (
            <p className="text-red-600 font-medium tabular-nums bg-red-50/90 px-2.5 py-1 rounded-full text-[10px] shadow-sm">
              +{(percentage > 100 ? (percentage - 100) : percentage).toFixed(1)}%
            </p>
          )}
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 group-hover:opacity-100"></div>
    </div>
  )
}