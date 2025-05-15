'use client'

import { fetchUserTransactions } from '@/app/_actions/dashboard/fetchUserTransactions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { TransactionItem } from './TransactionItem'

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

  const router = useRouter()

  const fetchAndSetTransactions = async () => {
    setIsLoading(true)
    try {
      const response = await fetchUserTransactions()
      setTransactionData(response.data)
    } catch (error) {
      console.error('Error fetching transaction data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAndSetTransactions()
  }, [])

  const handleAdded = () => {
    fetchAndSetTransactions()
  }

  return (
    <>
      <Card className="relative overflow-hidden rounded-2xl border-0 bg-white/80 shadow-lg backdrop-blur-sm">
        <div className="from-primary/60 to-secondary/60 absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r"></div>
        <div className="bg-primary/5 absolute -right-10 -bottom-16 h-32 w-32 rounded-full blur-2xl"></div>

        <CardHeader className="border-accent/10 flex flex-row items-center justify-between border-b pt-6 pb-3">
          <div className="flex items-center gap-2">
            <div className="from-primary/10 to-secondary/10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br shadow-sm backdrop-blur-sm">
              <Clock className="text-primary h-4 w-4" />
            </div>
            <CardTitle className="text-base font-medium tracking-wide">
              Transactions récentes
            </CardTitle>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="link"
              className="text-primary hover:text-primary/80 flex h-9 cursor-pointer items-center gap-1 p-0 text-sm font-medium transition-colors"
              onClick={() => router.push('/dashboard/transactions')}
            >
              Voir tout
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-5 pb-4">
          {isLoading ? (
            <TableSkeleton />
          ) : transactionData && transactionData.length > 0 ? (
            <div className="space-y-2.5">
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
              <div className="from-primary/10 to-secondary/10 mb-4 rounded-full bg-gradient-to-br p-3">
                <Clock className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-base font-medium">
                Aucune transaction récente
              </h3>
              <p className="text-foreground/60 mb-4 max-w-md text-sm">
                Les transactions que vous effectuez apparaîtront ici.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
