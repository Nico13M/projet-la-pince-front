import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { SavedBudget, Transaction } from '@/types/budget'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { BudgetEditor } from './GestiontEditor'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'
import { Pagination } from '../Pagination'

import { fetchGetTransactions } from '@/app/_actions/transactions/fetchTransactions'

function capitalize(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function BudgetList() {
  
  const [budgets, setBudgets] = useState<SavedBudget[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const mapTransactionToBudget = (transaction: Transaction): SavedBudget => ({
    id: transaction.id,
    budget: capitalize(transaction.name || ''),
    category: capitalize(transaction.transactionType || ''),
    date: transaction.dateOfExpense
      ? new Date(transaction.dateOfExpense).toLocaleDateString('fr-FR')
      : '',
    amount:
      typeof transaction.amount === 'number'
        ? `${transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`
        : transaction.amount || '',
  });

  const handleSaveBudget = (
    id: string,
    updatedBudget: Partial<SavedBudget>,
  ) => {
    const updatedBudgets = budgets.map((b: { id: string }) => {
      if (b.id === id) {
        return { ...b, ...updatedBudget }
      }
      return b
    })
    setBudgets(updatedBudgets)
    
  }

  const handleConfirmDelete = async () => {
    if (!budgetToDelete) return
    try {
      setBudgets((prev: SavedBudget[]) => prev.filter((b: any) => b.id !== budgetToDelete))
      setDeleteDialogOpen(false)
      setBudgetToDelete(null)
      
    } catch (err) {
      
    }
  }

  const getAndSetTransactions = async (pageNumber = 1) => {
    try {
      setIsLoading(true)
      const data = await fetchGetTransactions(pageNumber)
      setBudgets(data.data.map(mapTransactionToBudget))
      setPage(data.page)
      setTotalPages(data.totalPages)
    } catch (err) {
      
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setBudgetToDelete(id)
    setDeleteDialogOpen(true)
  }

  useEffect(() => {
    getAndSetTransactions(page)
    
  }, [page])

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
              <TableHead>Titre budget</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets.length > 0 ? (
              budgets.map((budget: SavedBudget) => (
                <TableRow key={budget.id}>
                  <TableCell className="font-medium">{budget.budget}</TableCell>
                  <TableCell>{budget.date}</TableCell>
                  <TableCell>{budget.category}</TableCell>
                  <TableCell>{budget.amount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <BudgetEditor budget={budget} onSave={handleSaveBudget} />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteClick(budget.id)}
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
                  Aucun budget disponible
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
        description="Cette action est irréversible. Le budget sera définitivement supprimé."
      />
    </>
  )
}
