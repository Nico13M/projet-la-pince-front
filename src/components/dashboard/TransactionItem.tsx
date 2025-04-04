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
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
          <Icon.icon className="text-primary h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">{Icon.label}</p>
          <p className="text-muted-foreground text-xs">{name}</p>
          <p className="text-muted-foreground text-xs">
          {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p
        className={`font-medium ${transactionType === 'income' ? 'text-green-500' : 'text-red-500'}`}
      >
        {transactionType === 'income' ? '+' : '-'} {formatEuro(amount)}
      </p>
    </div>
  )
}
