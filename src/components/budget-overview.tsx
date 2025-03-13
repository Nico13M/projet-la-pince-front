import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function BudgetOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Budget Overview</CardTitle>
        <Button variant="link" className="h-auto p-0 text-sm">
          Manage budgets
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <p className="font-medium">Groceries</p>
              <p className="text-muted-foreground text-sm">€350 / €500</p>
            </div>
            <div className="bg-muted h-2 w-full rounded-full">
              <div className="bg-primary h-full w-[70%] rounded-full" />
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <p className="font-medium">Entertainment</p>
              <p className="text-muted-foreground text-sm">€180 / €200</p>
            </div>
            <div className="bg-muted h-2 w-full rounded-full">
              <div className="bg-primary h-full w-[90%] rounded-full" />
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <p className="font-medium">Transport</p>
              <p className="text-muted-foreground text-sm">€120 / €150</p>
            </div>
            <div className="bg-muted h-2 w-full rounded-full">
              <div className="bg-primary h-full w-[80%] rounded-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
