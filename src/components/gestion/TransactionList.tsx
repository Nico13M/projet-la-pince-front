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
import { BadgeDollarSign, BadgeEuro, Banknote, Coins, MoveDown, MoveUp, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Pagination } from '../Pagination'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'
import { TransactionEditor } from './TransactionEditor'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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

const getTransactionIcon = (type?: string) => {
  if (!type) return null

  switch (type.toLowerCase()) {
    case 'income':
      return <MoveUp className="h-4 w-4 text-emerald-500" />
    case 'expense':
      return <MoveDown className="h-4 w-4 text-red-500" />
    case 'investment':
      return <Coins className="h-4 w-4 text-blue-500" />
    default:
      return <Banknote className="h-4 w-4 text-gray-500" />
  }
}

const getTransactionTypeColor = (type?: string) => {
  if (!type) return 'bg-gray-100 text-gray-600'

  switch (type.toLowerCase()) {
    case 'income':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'expense':
      return 'bg-red-50 text-red-700 border-red-200'
    case 'investment':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200'
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
      <div className="overflow-x-auto rounded-md border shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold">Titre transaction</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Budget</TableHead>
              <TableHead className="font-semibold text-right">Montant</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction: Transaction) => (
                <TableRow key={transaction.id} className="group hover:bg-slate-50">
                  <TableCell className="font-medium">{transaction.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Badge variant="outline" className={`flex items-center gap-1 px-2 py-0.5 ${getTransactionTypeColor(transaction.transactionType)}`}>
                        {getTransactionIcon(transaction.transactionType)}
                        {formatTransactionType(transaction.transactionType)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {transaction.dateOfExpense
                      ? new Date(transaction.dateOfExpense).toLocaleDateString(
                          'fr-FR',
                          { day: '2-digit', month: '2-digit', year: 'numeric' }
                        )
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {transaction.budget ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="secondary" className="px-2 py-1">
                              {transaction.budget.name}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Budget: {transaction.budget.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    transaction.transactionType?.toLowerCase() === 'income' 
                      ? 'text-emerald-600' 
                      : transaction.transactionType?.toLowerCase() === 'expense' 
                        ? 'text-red-600' 
                        : 'text-blue-600'
                  }`}>
                    {typeof transaction.amount === 'number'
                      ? `${transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`
                      : transaction.amount || '-'}
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
                        className="h-8 w-8 text-red-600 opacity-70 hover:bg-red-50 hover:opacity-100 transition-opacity"
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
                <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                  Aucune transaction disponible
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="bg-slate-50 border-t p-2">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
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
