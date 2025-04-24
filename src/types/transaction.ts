export interface Transaction {
  id: string
  name?: string
  transactionType?: string
  dateOfExpense?: string | Date
  amount?: number | string
  category?: Category
  categoryId?: string
}

export interface Category {
  name: string
}

export type TransactionDisplayRow = {
  id: string
  name: string
  transactionType: string
  category: string
  dateOfExpense: string
  amount: string
}

export interface TransactionContextType {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  deleteTransaction: (id: string) => void
}
