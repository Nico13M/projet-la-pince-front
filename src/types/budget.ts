import { BUDGET_CATEGORIES } from '@/utils/categoryBudget'

export interface BudgetFormValues {
  budget: string
  date: Date
  category: string
  amount: number
  description?: string
}

export interface SavedBudget {
  id: number
  budget: string
  date: string
  category: string
  amount: string
  description?: string
}

export type BudgetCategory = (typeof BUDGET_CATEGORIES)[number]
