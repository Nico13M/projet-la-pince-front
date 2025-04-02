'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const categories = [
  'Alimentation',
  'Transport',
  'Logement',
  'Loisirs',
  'Santé',
  'Éducation',
  'Revenus',
]

function CategorySelector({ categorie, setCategorie }) {
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
          {categories.map((cat) => (
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
