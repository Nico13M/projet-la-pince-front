'use client'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import TransactionForm from '@/components/forms/TransactionForm'
import { useState } from 'react'
import { Transaction } from '../../../types/transaction'
import { Pagination } from '@/components/Pagination'
import TransactionList from '@/components/gestion/TransactionList'

export default function GestionPage() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: 'Loyer',
      montant: '650,00 €',
      date: '05/03/2024',
      categorie: 'Logement',
      type: 'Dépense',
    },
    {
      id: 2,
      description: 'Salaire',
      montant: '2340,00 €',
      date: '01/03/2024',
      categorie: 'Revenu',
      type: 'Revenu',
    },
  ])

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction])
  }

  return (
    <>
      <DashboardHeader title="Gestion" />

      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          <TransactionForm onAddTransaction={addTransaction} />
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">
              Tableau des Transactions
            </h3>
            <div className="rounded-md">
              <TransactionList />
            </div>
          </div>
        </div>
        <Pagination />
      </div>
    </>
  )
}
