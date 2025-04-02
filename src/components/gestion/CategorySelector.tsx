'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BUDGET_CATEGORIES } from '@/utils/categoryBudget'

function CategorySelector({
  categorie,
  setCategorie,
}: {
  categorie: string
  setCategorie: (categorie: string) => void
}) {
  return (
    <div>
      <label
        htmlFor="categorie"
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        Catégorie
      </label>
      <Select value={categorie} onValueChange={setCategorie}>
        <SelectTrigger className="w-full border-slate-300 text-slate-500">
          <SelectValue placeholder="Sélectionner une catégorie" />
        </SelectTrigger>
        <SelectContent>
          {BUDGET_CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default CategorySelector
