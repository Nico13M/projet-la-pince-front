import { transactionTypeIcons } from '@/utils/categoryIcons'
import { formatEuro } from '@/utils/format'

export function TransactionItem({
  name,
  amount,
  date,
  transactionType,
}: {
  name: string
  amount: number
  date: Date
  transactionType: 'income' | 'expense' | 'investment'
}) {
  const Icon = transactionTypeIcons[transactionType]

  const iconBackground = transactionType === 'income'
    ? 'from-green-50 to-green-100/80'
    : transactionType === 'expense'
      ? 'from-red-50 to-red-100/80'
      : 'from-blue-50 to-blue-100/80';

  const iconColor = transactionType === 'income'
    ? 'text-green-600'
    : transactionType === 'expense'
      ? 'text-red-600'
      : 'text-primary';

  const amountColor = transactionType === 'income'
    ? 'text-green-600'
    : transactionType === 'expense'
      ? 'text-red-600'
      : 'text-blue-600';

  return (
    <div className="group flex items-center justify-between rounded-xl p-3.5 transition-all duration-200 hover:bg-primary/5 hover:shadow-sm">
      <div className="flex items-center gap-3.5">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${iconBackground} shadow-sm`}>
          <Icon.icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-foreground">{Icon.label}</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-foreground/80 font-medium tracking-wide">
              {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <p className="text-muted-foreground text-xs mt-0.5 max-w-[220px] truncate">{name}</p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className={`font-semibold text-base ${amountColor}`}>
          {transactionType === 'income' ? '+' : '-'} {formatEuro(amount)}
        </p>
        <p className="text-[10px] text-foreground/70 mt-0.5">
          {new Date(date).toLocaleDateString(undefined, { year: 'numeric' })}
        </p>
      </div>
    </div>
  )
}
