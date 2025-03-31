import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TransactionItem } from './TransactionItem'

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Transactions récentes</CardTitle>

        <Button variant="link" className="h-auto cursor-pointer p-0 text-sm">
          Voir tout
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TransactionItem
            name="Gucci"
            category="shopping"
            amount={82.5}
            date={new Date('2023-11-15')}
            type="expense"
          />
          <TransactionItem
            name="McDonald's"
            category="restaurant"
            amount={45.2}
            date={new Date('2023-11-15')}
            type="expense"
          />
          <TransactionItem
            name="Electricité"
            category="utilities"
            amount={2850}
            date={new Date('2023-11-15')}
            type="income"
          />
        </div>
      </CardContent>
    </Card>
  )
}
