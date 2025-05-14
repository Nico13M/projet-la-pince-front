import {
  CATEGORY_TO_TYPE_MAP,
  TRANSACTION_TYPE_LABELS,
  TransactionType,
} from '@/constants/transactions'

export const determineTransactionTypeFromCategory = (
  categoryName?: string,
): TransactionType => {
  if (!categoryName) return 'expense'
  return CATEGORY_TO_TYPE_MAP[categoryName] || 'expense'
}

export const getTransactionTypeLabel = (type?: string): string => {
  if (!type) return TRANSACTION_TYPE_LABELS.expense

  const normalizedType = type.toLowerCase() as TransactionType

  if (normalizedType in TRANSACTION_TYPE_LABELS) {
    return TRANSACTION_TYPE_LABELS[normalizedType as TransactionType]
  }

  if (
    type.toLowerCase().includes('revenu') ||
    type.toLowerCase().includes('income') ||
    type.toLowerCase().includes('salaire')
  ) {
    return TRANSACTION_TYPE_LABELS.income
  }

  if (type.toLowerCase().includes('invest')) {
    return TRANSACTION_TYPE_LABELS.investment
  }

  return TRANSACTION_TYPE_LABELS.expense
}

export const getApiTransactionType = (uiType?: string): TransactionType => {
  if (!uiType) return 'expense'

  const lowerType = uiType.toLowerCase()

  if (lowerType.includes('dépense') || lowerType.includes('expense')) {
    return 'expense'
  }

  if (lowerType.includes('revenu') || lowerType.includes('income')) {
    return 'income'
  }

  if (
    lowerType.includes('investissement') ||
    lowerType.includes('investment')
  ) {
    return 'investment'
  }

  return 'expense'
}
