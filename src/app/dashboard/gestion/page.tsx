'use client'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import TransactionForm from '@/components/forms/TransactionForm'
import EditTransactionModal from '@/components/gestion/EditTransactionModal'
import TransactionList from '@/components/gestion/TransactionList'
import { useState } from 'react'
import { Transaction } from '../../../types/transaction'

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

  const [isEditMode, setIsEditMode] = useState(false)
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null)

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction])
  }

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction,
      ),
    )
    setIsEditMode(false)
    setTransactionToEdit(null)
  }

  const removeTransaction = (id: number) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id))
  }

  const onEditTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction)
    setIsEditMode(true)
  }

  return (
    <>
      <DashboardHeader title="Gestion" />

      <div className="space-y-8 py-6">
        <TransactionForm onAddTransaction={addTransaction} />
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Transactions
          </h2>
          <TransactionList
            transactions={transactions}
            onEditTransaction={onEditTransaction}
            onRemoveTransaction={removeTransaction}
          />
        </div>
      </div>

      {isEditMode && transactionToEdit && (
        <EditTransactionModal
          transaction={transactionToEdit}
          onSave={updateTransaction}
          onClose={() => setIsEditMode(false)}
        />
      )}
    </>
  )
}
