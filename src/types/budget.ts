import { BUDGET_CATEGORIES } from '@/utils/categoryBudget'

export interface BudgetFormValues {
  name: string
  category: { id: string; name: string }
  threshold: number
  description?: string
}
export interface Transaction {
  id: string
  name?: string
  transactionType?: string
  dateOfExpense?: string | Date
  amount?: number | string
}
export interface SavedBudget {
  id: string
  name: string
  category: {
    id: string
    name: string
    transactionType: 'income' | 'investment' | 'expense'
  }
  description?: string
  threshold: number
  availableAmount: number
  createdAt?: string
}

export interface Pagination {
  limit: number
  page: number
  totalPages: number
}

export interface Data<T> extends Pagination {
  data: T[]
  count: number
}

export type BudgetCategory = (typeof BUDGET_CATEGORIES)[number]
