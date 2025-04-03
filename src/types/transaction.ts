export interface Transaction {
  id: number
  description: string
  montant: string
  date: string
  categorie: string
  type: string
}

export interface TransactionContextType {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  deleteTransaction: (id: string) => void
}
