'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { TransactionItem } from './TransactionItem'
import { fetchUserTransactions } from '@/app/_actions/dashbord/fetchUserTransactions'

export function RecentTransactions() {
  const [isLoading, setIsLoading] = useState(false)
  const [transactionData, setTransactionData] = useState([])

   useEffect(() => {
      async function fetchData() {
        const data = await fetchUserTransactions();
        setTransactionData(data.data);
      }
      fetchData();
    }, []);

  if (isLoading) {
    return <TableSkeleton />
  }
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
          {Array.isArray(transactionData) && transactionData?.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              name={transaction.name}
              amount={transaction.amount}
              date={transaction.dateOfExpense}
              transactionType={transaction.transactionType}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
