import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Transaction } from '@/types/transaction'

import {
  fetchDeleteTransactions,
  fetchGetTransactions,
} from '@/app/_actions/transactions/fetchTransactions'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Pagination } from '../Pagination'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'
import { TransactionEditor } from './TransactionEditor'

const formatTransactionType = (type?: string): string => {
  if (!type) return ''

  switch (type.toLowerCase()) {
    case 'income':
      return 'Revenu'
    case 'expense':
      return 'Dépense'
    case 'investment':
      return 'Investissement'
    default:
      return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  }
}

export default function TransactionList({
  refreshTrigger = 0,
}: {
  refreshTrigger?: number
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleSaveTransaction = (
    id: string,
    updatedTransaction: Partial<Transaction>,
  ) => {
    const updatedTransactions = transactions.map((b: { id: string }) => {
      if (b.id === id) {
        return { ...b, ...updatedTransaction }
      }
      return b
    })
    setTransactions(updatedTransactions)
  }

  const getAndSetTransactions = async (pageNumber = 1) => {
    try {
      setIsLoading(true)
      const data = await fetchGetTransactions(pageNumber)

      setTransactions(data.data)
      setPage(data.page)
      setTotalPages(data.totalPages)
    } catch (err) {
      console.error('Erreur lors du chargement des transactions:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!transactionToDelete) return
    try {
      await fetchDeleteTransactions(transactionToDelete)
      setTransactions((prev) =>
        prev.filter((b) => b.id !== transactionToDelete),
      )
      setDeleteDialogOpen(false)
      setTransactionToDelete(null)
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
    }
  }

  const handleDeleteClick = (id: string) => {
    setTransactionToDelete(id)
    setDeleteDialogOpen(true)
  }

  useEffect(() => {
    getAndSetTransactions(page)
  }, [page])

  useEffect(() => {
    if (refreshTrigger > 0) {
      getAndSetTransactions(1)
    }
  }, [refreshTrigger])

  const handlePageChange = (newPage: number) => {
    if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre transaction</TableHead>
              <TableHead>Type de transaction</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction: Transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>
                    {formatTransactionType(transaction.transactionType)}
                  </TableCell>
                  <TableCell>
                    {transaction.dateOfExpense
                      ? new Date(transaction.dateOfExpense).toLocaleDateString(
                          'fr-FR',
                        )
                      : ''}
                  </TableCell>
                  <TableCell>{transaction.budget?.name || '-'}</TableCell>
                  <TableCell>
                    {typeof transaction.amount === 'number'
                      ? `${transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`
                      : transaction.amount || ''}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <TransactionEditor
                        transaction={transaction}
                        onSave={handleSaveTransaction}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteClick(transaction.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune transaction disponible
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        description="Cette action est irréversible. La transaction sera définitivement supprimé."
      />
    </>
  )
}
