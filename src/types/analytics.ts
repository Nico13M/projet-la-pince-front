export type Timeframe = 'year' | '6months' | '3months'

// SavingsProgress - Données pour le graphique de progression d'épargne
export interface SavingsChartPoint {
  month: string
  availableAmount: number
  threshold: number
}

// SavingsProgress - Structure d'un budget
export interface BudgetSummary {
  id: string
  name: string
  description: string
  threshold: number
  availableAmount: number
  userId: string
  categoryId: string
  createdAt: Date | string
}

// ExpenseTrend - Structure d'un élément budgétaire pour les tendances
export interface ExpenseSummaryItem {
  threshold: number
  availableAmount: number
  updatedAt: string
  totalExpense: number
  totalInvestment: number
  remainingBalance: number
}

// ExpenseTrend - Point de données pour le graphique des tendances de dépenses
export interface ExpenseTrendPoint {
  month: string
  income: number
  expense: number
}

// BudgetDistribution - Structure d'un élément budgétaire pour la distribution
export interface BudgetDistributionItem {
  id: string
  name: string
  availableAmount: number
  threshold: number
}

// BudgetDistribution - Structure d'un segment de camembert
export interface PieChartSegment {
  name: string
  value: number
  fill: string
}

// CategoryAnalysis - Structure d'un élément budgétaire par catégorie
export interface CategoryExpenseItem {
  id: string
  name: string
  description: string
  threshold: number
  availableAmount: number
  userId: string
  categoryId: string
  createdAt: string
  updatedAt: string
  category: {
    id: string
    name: string
    createdAt: string
    updatedAt: string
    transactionType: string
    userId: string
  }
}

// CategoryAnalysis - Point de données pour la comparaison de catégories
export interface CategoryComparisonPoint {
  categorie: string
  lastMonthExpense: number
  currentMonthExpense: number
}
