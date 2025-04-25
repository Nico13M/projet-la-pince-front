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

      <Card className="relative border-0 overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl">
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-primary/60 to-secondary/60"></div>
        <div className="absolute -right-10 -bottom-16 h-32 w-32 rounded-full bg-primary/5 blur-2xl"></div>
        
        <CardHeader className="flex flex-row items-center justify-between pt-6 border-b border-accent/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm shadow-sm">
              <Clock className="text-primary h-4 w-4" />
            </div>
            <CardTitle className="font-medium tracking-wide text-base">Transactions récentes</CardTitle>
          </div>

          <div className="flex items-center gap-2">
            {/* Ouvre la modale */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 text-sm font-medium border-accent/20 hover:bg-primary/5 transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-3.5 w-3.5" />
              Nouvelle
            </Button>
            <Button
              variant="link"
              className="text-primary flex h-9 cursor-pointer items-center gap-1 p-0 text-sm font-medium hover:text-primary/80 transition-colors"
              onClick={() => router.push('/dashboard/gestion')}
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
              <div className="mb-4 rounded-full p-3 bg-gradient-to-br from-primary/10 to-secondary/10">
                <Clock className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-base font-medium">
                Aucune transaction récente
              </h3>
              <p className="text-foreground/60 mb-4 max-w-md text-sm">
                Les transactions que vous effectuez apparaîtront ici.
              </p>
              <Button size="sm" className="gap-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm transition-all duration-300" onClick={() => setIsModalOpen(true)}>
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
