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
import { BadgeDollarSign, FileText, MoveDown, MoveUp, Coins, Tag, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { BudgetEditor } from './BudgetEditor'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'
import { DescriptionPopover } from './DescriptionPopover'
import { Pagination } from '../Pagination'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { SavedBudget, BudgetFormValues } from '@/types/budget'
import { deleteBudget, fetchUserBudget, updateBudget } from '@/app/_actions/dashboard/fetchUserBudget'
import { formatEuro } from '@/utils/format'

function capitalize(str: string) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Simplified transaction types for demonstration
// In a real implementation, you might want to fetch the actual transaction types associated with each budget
const getTransactionTypeForBudget = (budgetName?: string, categoryName?: string): string => {
  if (!budgetName && !categoryName) return 'expense';
  
  // Vérifier le nom du budget en premier (prioritaire)
  if (budgetName) {
    const name = budgetName.toLowerCase();
    if (name === 'free' || name.includes('revenu') || name.includes('income') || name.includes('salaire')) {
      return 'income';
    }
    if (name.includes('invest') || name.includes('placement')) {
      return 'investment';
    }
  }
  
  // Ensuite vérifier le nom de la catégorie
  if (categoryName) {
    const catName = categoryName.toLowerCase();
    if (catName.includes('revenu') || catName.includes('salaire') || catName.includes('income')) {
      return 'income';
    }
    if (catName.includes('invest') || catName.includes('placement')) {
      return 'investment';
    }
  }
  
  return 'expense';
}

const getTransactionTypeBadge = (type: string) => {
  switch (type) {
    case 'income':
      return { 
        icon: <MoveUp className="h-4 w-4 text-emerald-500" />,
        label: 'Revenu',
        style: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    case 'investment':
      return { 
        icon: <Coins className="h-4 w-4 text-blue-500" />,
        label: 'Investissement',
        style: 'bg-blue-50 text-blue-700 border-blue-200'
      };
    default:
      return { 
        icon: <MoveDown className="h-4 w-4 text-red-500" />,
        label: 'Dépense',
        style: 'bg-red-50 text-red-700 border-red-200'
      };
  }
}

export default function BudgetList({
  refreshTrigger = 0,
}: {
  refreshTrigger?: number
}) {
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
      category: {
        id: budget.category?.id || '',
        name: capitalize(budget.category?.name || 'Inconnu')
      },
      threshold: typeof budget.threshold === 'number'
        ? budget.threshold : null
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
        setBudgets([])
        setPage(1)
        setTotalPages(1)
      }
    } catch (err) {
      showToast({
        title: 'Erreur',
        description: 'Impossible de charger les budgets.',
      })
      setBudgets([])
      setPage(1)
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    getAndSetBudgets(page)
  }, [page])

  useEffect(() => {
    if (refreshTrigger > 0) {
      getAndSetBudgets(1)
    }
  }, [refreshTrigger])

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
      <div className="overflow-x-auto rounded-md border shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold">Budget</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">Catégorie</TableHead>
              <TableHead className="font-semibold">Seuil</TableHead>
              <TableHead className="w-[120px] font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets.length > 0 ? (
              budgets.map((budget) => {
                return (
                  <TableRow key={budget.id} className="group hover:bg-slate-50">
                    <TableCell className="font-medium">
                      {budget.name}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      {budget.description ? (
                        <div className="flex items-center gap-1.5">
                          <DescriptionPopover
                            description={budget.description}
                          />
                          <span className="text-xs text-slate-500 hidden">{budget.description}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const transactionType = getTransactionTypeForBudget(budget.name, budget.category?.name);
                        const badge = getTransactionTypeBadge(transactionType);
                        
                        return (
                          <Badge variant="outline" className={`flex items-center gap-0.5 px-1.5 py-0.5 text-xs whitespace-nowrap ${badge.style}`}>
                            {badge.icon}
                            <span>{badge.label}</span>
                          </Badge>
                        );
                      })()}
                    </TableCell>
                    <TableCell>
                      {budget.category && budget.category.name ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="secondary" className="flex items-center gap-1.5 px-2 py-1">
                                <Tag className="h-3 w-3 text-slate-500" />
                                {budget.category.name}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Catégorie: {budget.category.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {budget.threshold !== null ? (
                        <div className="flex items-center gap-1.5">
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200 border flex items-center gap-1">
                            <BadgeDollarSign className="h-3.5 w-3.5" />
                            {formatEuro(budget.threshold)}
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <BudgetEditor budget={budget} onSave={handleSaveBudget} />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 opacity-70 hover:bg-red-50 hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteClick(budget.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                  Aucun budget disponible
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
        description="Cette action est irréversible. Le budget sera définitivement supprimé."
      />
    </>
  )
}
