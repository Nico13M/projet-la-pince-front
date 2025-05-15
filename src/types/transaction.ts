export interface Transaction {
  id: string
  name?: string
  transactionType?: string
  dateOfExpense?: string | Date
  amount?: number | undefined
  category?: Category
  categoryId?: string
  budget?: Budget
  budgetId?: string
  budgetName?: string
}

export interface Category {
  name: string
}

export interface Budget {
  id: string
  name: string
}

export type TransactionDisplayRow = {
  id: string
  name: string
  transactionType: string
  budget: string
  dateOfExpense: string
  amount: string
}

export interface TransactionContextType {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  deleteTransaction: (id: string) => void
}
