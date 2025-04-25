'use client'

import { useState, useEffect } from 'react'
import { AddBudgetModal } from '@/components/dashboard/AddBudgetModal'
import { fetchUserBudget, createBudget } from '@/app/_actions/dashboard/fetchUserBudget'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, ChevronRight, Plus } from 'lucide-react'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { BudgetItem } from './BudgetItem'
import { useRouter } from 'next/navigation'


type CategoryType = { id: string, name: string }
interface AddBudgetValues {
  name: string
  category: CategoryType
  threshold: number
  description?: string
}


interface Budget {
  id: string | number
  name: string
  availableAmount: number
  threshold: number
  category: CategoryType
}

export function BudgetOverview() {
  const [isLoading, setIsLoading] = useState(true)
  const [budgetData, setBudgetData] = useState<Budget[]>([])
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  
  async function fetchBudgets() {
    try {
      setIsLoading(true)
      const response = await fetchUserBudget()
      setBudgetData(response.data)
    } catch (error) {
      console.error('Error fetching budget data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBudgets()
  }, [])

  
  async function handleAddBudget(values: AddBudgetValues) {
    setIsLoading(true)
    try {
      
      const params = { categoryId: values.category.id }
      const budgetToCreate = {
        name: values.name,
        threshold: values.threshold,
        description: values.description,
      }
      await createBudget(budgetToCreate, params)
      await fetchBudgets() 
      setShowModal(false)
    } catch (error) {
      console.error('Erreur lors de la création du budget:', error)
    } finally {
      setIsLoading(false)
    }
  }

  
  const budgetColors = [
    'bg-primary',
    'bg-blue-500',
    'bg-purple-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-indigo-500',
  ]

  return (
    <>
      <AddBudgetModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddBudget}
      />

      <Card className="relative border-0 overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl">
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-primary/70 to-secondary/70"></div>
        <div className="absolute -left-10 -bottom-16 h-32 w-32 rounded-full bg-primary/5 blur-2xl"></div>
        
        <CardHeader className="flex flex-row items-center justify-between pt-6 border-b border-accent/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm shadow-sm">
              <BarChart3 className="text-primary h-4 w-4" />
            </div>
            <CardTitle className="font-medium tracking-wide text-base">Vue d&apos;ensemble des budgets</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 text-sm font-medium border-accent/20 hover:bg-primary/5 transition-all"
              onClick={() => setShowModal(true)}
            >
              <Plus className="h-3.5 w-3.5" />
              Nouveau
            </Button>
            <Button
              variant="link"
              className="text-primary flex h-9 cursor-pointer items-center gap-1 p-0 text-sm font-medium hover:text-primary/80 transition-colors"
              onClick={() => router.push('/dashboard/budget')}
            >
              Gérer les budgets
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          {isLoading ? (
            <TableSkeleton />
          ) : budgetData && budgetData.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {budgetData.map((budget, index) => (
                <BudgetItem
                  key={budget.id}
                  name={budget.name}
                  currentAmount={budget.availableAmount}
                  totalAmount={budget.threshold}
                  color={budgetColors[index % budgetColors.length]}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full p-3 bg-gradient-to-br from-primary/10 to-secondary/10">
                <BarChart3 className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-base font-medium">Aucun budget défini</h3>
              <p className="text-foreground/60 mb-4 max-w-md text-sm">
                Créez des budgets pour suivre vos dépenses et optimiser votre
                gestion financière.
              </p>
              <Button size="sm" className="gap-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm transition-all duration-300" onClick={() => setShowModal(true)}>
                <Plus className="h-3.5 w-3.5" />
                Créer un budget
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
