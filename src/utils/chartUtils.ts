export default function filterDataByTimeframe<T extends { month: string }>(
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
