'use client'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import TransactionForm from '@/components/forms/TransactionForm'
import TransactionList from '@/components/transactions/TransactionList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileTextIcon, PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { Transaction } from '../../../types/transaction'

export default function TransactionsPage() {
  const [localTransactions, setLocalTransactions] = useState<Transaction[]>([])
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const addTransaction = (transaction: Transaction) => {
    setLocalTransactions([...localTransactions, transaction] as Transaction[])
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <>
      <DashboardHeader title="Transactions" />
      <div className="p-4 md:p-6">
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-accent/20 col-span-4 bg-white shadow-md">
              <CardHeader className="border-accent/10 flex flex-row items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <PlusCircleIcon className="text-primary/80 h-5 w-5" />
                  <CardTitle>Ajouter une transaction</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <TransactionForm onAddTransaction={addTransaction} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6">
            <Card className="border-accent/20 bg-white shadow-md">
              <CardHeader className="border-accent/10 flex flex-row items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <FileTextIcon className="text-primary/80 h-5 w-5" />
                  <CardTitle>Tableau des Transactions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="rounded-md">
                  <TransactionList refreshTrigger={refreshTrigger} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
