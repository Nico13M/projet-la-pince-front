'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import { SavedBudget } from '@/types/budget'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BudgetEditor } from './budget/BudgetEditor'
import { ConfirmDeleteDialog } from './budget/ConfirmDeleteDialog'
import { DescriptionPopover } from './budget/DescriptionPopover'

// Données initiales pour les tests
const initialBudgets: SavedBudget[] = [
  {
    id: 1,
    budget: 'lorem ipsum',
    description: 'Description courte',
    date: '11/03/2025',
    category: 'Logement',
    amount: '- XX,XX €',
  },
  {
    id: 2,
    budget: 'lorem ipsum',
    description:
      "Cette description est beaucoup plus longue et nécessitera d'être tronquée dans le tableau avec un bouton pour voir l'intégralité du texte dans une popup",
    date: '11/03/2025',
    category: 'Logement',
    amount: '- XX,XX €',
  },
]

export default function BudgetList() {
  const { showToast } = useToast()
  const [budgets, setBudgets] = useState<SavedBudget[]>(initialBudgets)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [budgetToDelete, setBudgetToDelete] = useState<number | null>(null)

  useEffect(() => {
    const handleNewBudget = (event: CustomEvent<SavedBudget>) => {
      setBudgets((prev) => [event.detail, ...prev])
    }

    window.addEventListener('budget-added', handleNewBudget as EventListener)
    return () => {
      window.removeEventListener(
        'budget-added',
        handleNewBudget as EventListener,
      )
    }
  }, [])

  const handleSaveBudget = (
    id: number,
    updatedBudget: Partial<SavedBudget>,
  ) => {
    const updatedBudgets = budgets.map((b) => {
      if (b.id === id) {
        return { ...b, ...updatedBudget }
      }
      return b
    })

    setBudgets(updatedBudgets)
    showToast({
      title: 'Modification enregistrée',
      description: 'Le budget a été mis à jour',
    })
  }

  const handleDeleteClick = (id: number) => {
    setBudgetToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (budgetToDelete === null) return

    setBudgets(budgets.filter((b) => b.id !== budgetToDelete))
    setDeleteDialogOpen(false)

    showToast({
      title: 'Budget supprimé',
      description: 'Le budget a été supprimé avec succès',
    })
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Budget</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets.length > 0 ? (
              budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell className="font-medium">{budget.budget}</TableCell>
                  <TableCell className="max-w-[200px]">
                    <DescriptionPopover
                      description={budget.description || ''}
                    />
                  </TableCell>
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
