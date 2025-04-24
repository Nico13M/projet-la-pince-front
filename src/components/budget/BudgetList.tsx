'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { BudgetEditor } from './BudgetEditor'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'
import { DescriptionPopover } from './DescriptionPopover'
import { Pagination } from '../Pagination'

import { SavedBudget, BudgetFormValues } from '@/types/budget'
import { deleteBudget, fetchUserBudget, updateBudget } from '@/app/_actions/dashboard/fetchUserBudget'
import { formatEuro } from '@/utils/format'

function capitalize(str: string) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function BudgetList() {
  const { showToast } = useToast()

  const [budgets, setBudgets] = useState<SavedBudget[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [budgetToDelete, setBudgetToDelete] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const formatBudget = (budget: any): SavedBudget => {
    console.log('Budget to format:', budget)
    return {
      id: budget.id,
      name: capitalize(budget.name),
      description: budget.description || '',
      category: capitalize(budget.category.name || 'Inconnu'),
      // date: new Date(budget.createdAt || Date.now()).toLocaleDateString('fr-FR'),

      threshold: typeof budget.threshold === 'number'
        ? budget.threshold : null
      // `${budget.threshold.toLocaleString('fr-FR', {
      //   style: 'currency',
      //   currency: 'EUR'
      // })}` : budget.threshold || '',
    }
  }


  const getAndSetBudgets = async (pageNumber = 1) => {
    try {
      setIsLoading(true)
      const data = await fetchUserBudget(pageNumber)
      if (data && data.data) {
        setBudgets(data.data.map(formatBudget))
        setPage(data.page)
        setTotalPages(data.totalPages)
      } else {
        console.error('Pas de données dans la réponse:', data)
      }
    } catch (err) {
      showToast({
        title: 'Erreur',
        description: 'Impossible de charger les budgets.',
      })
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    getAndSetBudgets(page)
  }, [page])

  useEffect(() => {
    const handleNewBudget = (event: CustomEvent<SavedBudget>) => {
      setBudgets((prev) => [event.detail, ...prev])
    }

    window.addEventListener('budget-added', handleNewBudget as EventListener)
    return () => {
      window.removeEventListener(
        'budget-added',
        handleNewBudget as EventListener
      )
    }
  }, [])

  const handleSaveBudget = async (
    id: string,
    updatedBudget: Partial<SavedBudget>
  ) => {
    try {
      const result = await updateBudget(id, updatedBudget)

      if (!result) throw new Error('La mise à jour a échoué')

      const updatedBudgets = budgets.map((b) =>
        b.id === id ? { ...b, ...updatedBudget } : b
      )
      setBudgets(updatedBudgets)

      showToast({
        title: 'Budget modifié',
        description: 'Les modifications ont été enregistrées.',
      })
    } catch (error) {
      console.error('Erreur handleSaveBudget:', error)
      showToast({
        title: 'Erreur',
        description: "La mise à jour du budget a échoué.",
      })
    }
  }

  const handleDeleteClick = (id: string) => {
    setBudgetToDelete(id)
    setDeleteDialogOpen(true)
  }
  const handleConfirmDelete = async () => {
    if (!budgetToDelete) return;

    try {
      await deleteBudget(budgetToDelete);
      setBudgets((prev) => prev.filter((b) => b.id !== budgetToDelete));
      setDeleteDialogOpen(false);

      showToast({
        title: 'Budget supprimé',
        description: 'Le budget a été supprimé avec succès.',
      });
    } catch (error) {
      showToast({
        title: 'Erreur',
        description: "La suppression du budget a échoué.",
      });
    }
  };

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
              <TableHead>Budget</TableHead>
              <TableHead>Description</TableHead>
              {/* <TableHead>Date</TableHead> */}
              <TableHead>Catégorie</TableHead>
              {/* <TableHead>Montant disponible</TableHead> */}
              <TableHead>Seuil</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets.length > 0 ? (
              budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell className="font-medium">
                    {budget.name}
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <DescriptionPopover
                      description={budget.description || ''}
                    />
                  </TableCell>
                  {/* <TableCell>{budget.date}</TableCell> */}
                  <TableCell>{budget.category}</TableCell>
                  {/* <TableCell>{budget.availableAmount}</TableCell> */}
                  <TableCell>{budget.threshold !== null
                    ? formatEuro(budget.threshold)
                    : '—'}</TableCell>
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
