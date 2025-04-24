'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { TransactionItem } from './TransactionItem'
import { fetchUserTransactions } from '@/app/_actions/dashboard/fetchUserTransactions'
import { ArrowRight, Clock, Plus } from 'lucide-react'

interface Transaction {
  id: string | number
  name: string
  amount: number
  dateOfExpense: Date
  transactionType: 'income' | 'expense' | 'investment'
}

export function RecentTransactions() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactionData, setTransactionData] = useState<Transaction[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const data = await fetchUserTransactions()
        setTransactionData(data.data as Transaction[])
      } catch (error) {
        console.error('Error fetching transaction data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <Card className="border-accent/20 bg-white shadow-md">
      <CardHeader className="border-accent/10 flex flex-row items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <Clock className="text-primary/80 h-5 w-5" />
          <CardTitle>Transactions récentes</CardTitle>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-accent/20 h-8 gap-1 text-sm font-medium"
          >
            <Plus className="h-3.5 w-3.5" />
            Nouvelle
          </Button>
          <Button
            variant="link"
            className="text-primary flex h-8 cursor-pointer items-center gap-1 p-0 text-sm font-medium"
          >
            Voir tout
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <TableSkeleton />
        ) : transactionData && transactionData.length > 0 ? (
          <div className="space-y-2">
            {transactionData.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                name={transaction.name}
                amount={transaction.amount}
                date={transaction.dateOfExpense}
                transactionType={transaction.transactionType}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-primary/10 mb-4 rounded-full p-3">
              <Clock className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-2 text-base font-medium">
              Aucune transaction récente
            </h3>
            <p className="text-foreground/60 mb-4 max-w-md text-sm">
              Les transactions que vous effectuez apparaîtront ici.
            </p>
            <Button size="sm" className="gap-1">
              <Plus className="h-3.5 w-3.5" />
              Ajouter une transaction
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
