import { categoryIcons } from '@/utils/categoryIcons'
import { formatEuro } from '@/utils/formatEuro'

export function TransactionItem({
  name,
  category,
  amount,
  date,
  type,
}: {
  name: string
  category: string
  amount: number
  date: Date
  type: 'income' | 'expense'
}) {
  const Icon = categoryIcons[category]
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
            {date.toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
      <p
        className={`font-medium ${type === 'income' ? 'text-green-500' : 'text-red-500'}`}
      >
        {type === 'income' ? '+' : '-'} {formatEuro(amount)}
      </p>
    </div>
  )
}
