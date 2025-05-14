export type TransactionType = 'expense' | 'income' | 'investment'

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  expense: 'Dépense',
  income: 'Revenu',
  investment: 'Investissement',
}

export const CATEGORY_TO_TYPE_MAP: Record<string, TransactionType> = {
  Logement: 'expense',
  Alimentation: 'expense',
  Transport: 'expense',
  Loisirs: 'expense',
  Santé: 'expense',
  Études: 'expense',
  Salaire: 'income',
  Investissement: 'investment',
}

export const DEFAULT_TRANSACTION_TYPE: TransactionType = 'expense'
