'use client'

import EditTransactionModal from '@/components/gestion/EditTransactionModal'
import TransactionForm from '@/components/forms/TransactionForm'
import TransactionList from '@/components/gestion/TransactionList'
import { useState } from 'react'
import { Transaction } from '../../../types/transaction'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

export default function Gestion() {
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
  const [transactionToEdit, setTransactionToEdit] = useState(null)

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

      {isEditMode && (
        <EditTransactionModal
          transaction={transactionToEdit}
          onUpdateTransaction={updateTransaction}
          onSave={updateTransaction}
          onClose={() => setIsEditMode(false)}
        />
      )}
    </>
  )
}
