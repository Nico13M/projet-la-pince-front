'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { TransactionItem } from './TransactionItem'
import { fetchUserTransactions } from '@/app/_actions/dashboard/fetchUserTransactions'
import { ArrowRight, Clock, Plus } from 'lucide-react'
import { AddTransactionModal } from './AddTransactionModal' 
import { useRouter } from 'next/navigation'

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()

  
  const fetchAndSetTransactions = async () => {
    setIsLoading(true)
    try {
      const data = await fetchUserTransactions()
      setTransactionData(data.data as Transaction[])
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
      {/* Modal création transaction */}
      <AddTransactionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdded={handleAdded}
      />

      <Card className="border-accent/20 bg-white shadow-md">
        <CardHeader className="border-accent/10 flex flex-row items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <Clock className="text-primary/80 h-5 w-5" />
            <CardTitle>Transactions récentes</CardTitle>
          </div>

          <div className="flex items-center gap-2">
            {/* Ouvre la modale */}
            <Button
              variant="outline"
              size="sm"
              className="border-accent/20 h-8 gap-1 text-sm font-medium"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-3.5 w-3.5" />
              Nouvelle
            </Button>
            <Button
              variant="link"
              className="text-primary flex h-8 cursor-pointer items-center gap-1 p-0 text-sm font-medium"
              onClick={() => router.push('/dashboard/gestion')}
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
              <Button size="sm" className="gap-1" onClick={() => setIsModalOpen(true)}>
                <Plus className="h-3.5 w-3.5" />
                Ajouter une transaction
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
