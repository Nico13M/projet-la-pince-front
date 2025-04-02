'use client'

import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BUDGET_CATEGORIES as initialCategories } from '@/utils/categoryBudget'
import { Button } from '@/components/ui/button'
import { Trash2, Pencil } from 'lucide-react'
import CategoryModalButton from '../forms/CategoryModalButton'
import { Input } from '@/components/ui/input'

function CategorySelector({
  categorie,
  setCategorie,
}: {
  categorie: string
  setCategorie: (categorie: string) => void
}) {
  const [categories, setCategories] = useState(initialCategories)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState('')

  const removeCategory = (category: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setCategories(categories.filter((cat) => cat !== category))
    if (categorie === category) {
      setCategorie('')
    }
  }

  const handleAddCategory = (newCategory: string) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory])
      setCategorie(newCategory)
    }
  }

  const startEditing = (category: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingCategory(category)
    setNewCategoryName(category)
  }

  const handleEditCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value)
  }

  const saveEditCategory = () => {
    if (editingCategory && newCategoryName.trim() !== '') {
      setCategories(categories.map((cat) => (cat === editingCategory ? newCategoryName : cat)))
      if (categorie === editingCategory) {
        setCategorie(newCategoryName)
      }
    }
    setEditingCategory(null)
  }

  return (
    <div>
      <label htmlFor="categorie" className="mb-1.5 block text-sm font-medium text-slate-700">
        Catégorie
      </label>
      <div className="flex justify-between">
        <Select value={categorie} onValueChange={setCategorie}>
          <SelectTrigger className="w-full border-slate-300 text-slate-500 me-4">
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div key={cat} className="flex items-center justify-between">
                  {editingCategory === cat ? (
                    <Input
                      value={newCategoryName}
                      onChange={handleEditCategory}
                      onBlur={saveEditCategory}
                      onKeyDown={(e) => e.key === 'Enter' && saveEditCategory()}
                      autoFocus
                    />
                  ) : (
                    <SelectItem value={cat} className="flex-1">
                      {cat}
                    </SelectItem>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-2"
                    onClick={(e) => startEditing(cat, e)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-2"
                    onClick={(e) => removeCategory(cat, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                Aucune catégorie disponible
              </div>
            )}
          </SelectContent>
        </Select>
        <CategoryModalButton onAddCategory={handleAddCategory} />
      </div>
    </div>
  )
}

export default CategorySelector
