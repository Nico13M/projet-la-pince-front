import { formatEuro } from '@/utils/formatEuro'

export function BudgetItem({
  name,
  currentAmount,
  totalAmount,
}: {
  name: string
  currentAmount: number
  totalAmount: number
}) {
  const percentage = (currentAmount / totalAmount) * 100

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <p className="font-medium">{name}</p>
        <p className="text-muted-foreground text-sm">
          {formatEuro(currentAmount)} / {formatEuro(totalAmount)}
        </p>
      </div>
      <div className="bg-muted h-2 w-full rounded-full">
        <div className={`bg-primary h-full rounded-full w-[${percentage}%]`} />
      </div>
    </div>
  )
}
