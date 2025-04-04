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
    <div className="group flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent/10">
      <div className="flex items-center gap-3.5">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full
          ${transactionType === 'income' ? 'bg-green-100/80' : 
           transactionType === 'expense' ? 'bg-red-100/80' : 'bg-blue-100/80'}`}>
          <Icon.icon className={`h-5 w-5 
            ${transactionType === 'income' ? 'text-green-600' : 
             transactionType === 'expense' ? 'text-red-600' : 'text-primary'}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-foreground">{Icon.label}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-foreground/70">
              {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-0.5 max-w-[220px] truncate">{name}</p>
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        <p className={`font-semibold text-base ${
          transactionType === 'income' ? 'text-green-600' : 
          transactionType === 'expense' ? 'text-red-600' : 'text-blue-600'}`}>
          {transactionType === 'income' ? '+' : '-'} {formatEuro(amount)}
        </p>
        <p className="text-xs text-foreground/50">
          {new Date(date).toLocaleDateString(undefined, { year: 'numeric' })}
        </p>
      </div>
    </div>
  )
}
