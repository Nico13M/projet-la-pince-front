import { BUDGET_CATEGORIES } from '@/utils/categoryBudget'

export interface BudgetFormValues {
  budget: string
  date: Date
  category: string
  amount: number
  description?: string
}
export interface Transaction {
  id: string;
  name?: string;
  transactionType?: string;
  dateOfExpense?: string | Date;
  amount?: number | string;
}
export interface SavedBudget {
  id: string
  budget: string
  date: string
  category: string
  amount: string
}

export interface Pagination {
  limit: number;
  page: number;
  totalPages: number;
}

export interface Data<T> extends Pagination {
  data: T[];
  count: number; 
}

export type BudgetCategory = (typeof BUDGET_CATEGORIES)[number]
