import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, ShoppingBag, Utensils } from 'lucide-react'

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Recent Transactions</CardTitle>

        <Button variant="link" className="h-auto cursor-pointer p-0 text-sm">
          See all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                <ShoppingBag className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Shopping</p>
                <p className="text-muted-foreground text-xs">Today, 14:30</p>
              </div>
            </div>
            <p className="font-medium text-red-500">-€82.50</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                <Utensils className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Restaurant</p>
                <p className="text-muted-foreground text-xs">
                  Yesterday, 20:15
                </p>
              </div>
            </div>
            <p className="font-medium text-red-500">-€45.20</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                <Building className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Salary</p>
                <p className="text-muted-foreground text-xs">Mar 1, 2025</p>
              </div>
            </div>
            <p className="font-medium text-green-500">+€2,850.00</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
