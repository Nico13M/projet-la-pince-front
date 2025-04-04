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
  const percentage = (currentAmount / totalAmount) * 100
  const isOverBudget = currentAmount > totalAmount
  const remainingAmount = totalAmount - currentAmount

  return (
    <div className="group relative rounded-xl p-6 transition-all duration-300 border bg-background hover:bg-accent/20 shadow-sm hover:shadow-lg border-accent/20">
      <div className="flex flex-col mb-4">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-base font-semibold truncate max-w-[280px] text-foreground">
            {name}
          </h3>
          {isOverBudget && (
            <span className="bg-red-100/80 text-red-900 px-2.5 py-1 rounded-md text-xs font-medium backdrop-blur-sm flex items-center">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2 animate-pulse" />
              Dépassé
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-xs text-foreground/60">Budget alloué</p>
          <p className="text-sm font-semibold tabular-nums">
            <span className={`text-lg ${isOverBudget ? 'text-red-600' : 'text-foreground'}`}>
              {formatEuro(currentAmount)}
            </span>
            <span className="mx-1.5 opacity-50 text-foreground/40">/</span>
            <span className="text-foreground/70">{formatEuro(totalAmount)}</span>
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <div className="bg-primary/10 h-3.5 w-full rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className={`h-full ${color} transition-all duration-700 ease-out shadow-inner`}
              style={{ 
                width: `${Math.min(percentage, 100)}%`,
                borderRadius: percentage >= 97 ? '9999px' : '9999px 0 0 9999px'
              }}
            />
          </div>
          {!isOverBudget && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-foreground/80">
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>

        <div className="flex justify-between items-center text-xs pt-1">
          <p className="text-foreground/70">
            {!isOverBudget ? (
              <>
                <span className="opacity-70">Restant:</span>{' '}
                <span className="text-foreground font-semibold ml-1">
                  {formatEuro(remainingAmount)}
                </span>
              </>
            ) : (
              <span className="text-red-600 font-medium flex items-center">
                <span className="opacity-70 mr-1">Excédent:</span> {formatEuro(-remainingAmount)}
              </span>
            )}
          </p>
          {isOverBudget && (
            <p className="text-red-600 font-medium tabular-nums bg-red-50/80 px-2.5 py-1 rounded-md">
              +{percentage.toFixed(1)}%
            </p>
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 group-hover:opacity-100"></div>
    </div>
  )
}