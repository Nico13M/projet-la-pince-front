import { monthsLabels } from '@/constants/analytics'

export function filterDataByTimeframe<T extends { month: string }>(
  data: T[],
  timeframe: 'year' | '6months' | '3months',
  monthsConfig: Record<string, { shortLabel: string }>,
): T[] {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()

  let filteredMonths: number[] = []

  if (timeframe === '3months') {
    // 3 derniers mois (mois actuel et les 2 précédents)
    filteredMonths = Array.from(
      { length: 3 },
      (_, i) => (currentMonth - 2 + i + 12) % 12,
    )
  } else if (timeframe === '6months') {
    // 6 derniers mois
    filteredMonths = Array.from(
      { length: 6 },
      (_, i) => (currentMonth - 5 + i + 12) % 12,
    )
  } else {
    // Année entière
    filteredMonths = Array.from({ length: 12 }, (_, i) => i)
  }

  // Récupération des libellés des mois à partir des indices
  const monthLabels = filteredMonths.map((idx) => {
    const monthKeys = Object.keys(monthsConfig)
    const monthKey = monthKeys[idx]
    return monthsConfig[monthKey].shortLabel
  })

  // Filtrage des données selon les mois sélectionnés
  const filtered = monthLabels
    .map((label) => data.find((item) => item.month === label))
    .filter((item) => item !== undefined) as T[]

  return filtered
}

export const createEmptyMonthsData = (dataKeys: string[]) => {
  const emptyMonthsConfig: Record<
    string,
    {
      shortLabel: string
      data: Record<string, number[]>
    }
  > = {}

  Object.entries(monthsLabels).forEach(([month, { shortLabel }]) => {
    const dataObject: Record<string, number[]> = {}
    dataKeys.forEach((key) => {
      dataObject[key] = []
    })

    emptyMonthsConfig[month] = {
      shortLabel,
      data: dataObject,
    }
  })

  return emptyMonthsConfig
}

export const generateColors = (count: number): string[] => {
  const baseHues = [
    0, // rouge clair
    210, // gris froid (désaturé)
    220, // bleu lavande
    340, // rose doux
    200, // bleu doux
    20, // saumon
    210, // azur
    120, //vert pastel
    0, // gris chaud (désaturé)
    230, // bleu pastel
    265, //bleu violet
  ]

  return Array.from({ length: count }, (_, i) => {
    const hue = baseHues[i % baseHues.length] // cyclique si + de 9
    const saturation = 60 // saturation moyenne
    const lightness = 50 // luminosité douce

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  })
}

// Fonction utilitaire pour calculer la somme d'un tableau
export const calculateTotalOfArray = (array: number[]) =>
  array.reduce((sum, value) => sum + value, 0)
