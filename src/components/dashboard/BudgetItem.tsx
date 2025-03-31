interface BudgetItemProps {
  name: string
  currentAmount: number
  totalAmount: number
}

export function BudgetItem({
  name,
  currentAmount,
  totalAmount,
}: BudgetItemProps) {
  const percentage = (currentAmount / totalAmount) * 100

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <p className="font-medium">{name}</p>
        <p className="text-muted-foreground text-sm">
          {currentAmount}€ / {totalAmount}€
        </p>
      </div>
      <div className="bg-muted h-2 w-full rounded-full">
        <div className={`bg-primary h-full rounded-full w-[${percentage}%]`} />
      </div>
    </div>
  )
}
