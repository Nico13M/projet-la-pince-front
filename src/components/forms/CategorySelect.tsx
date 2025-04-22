import { useState } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BUDGET_CATEGORIES as initialCategories } from '@/utils/categoryBudget'
import { Path, PathValue, UseFormReturn } from 'react-hook-form'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { Trash2, Pencil } from 'lucide-react'
import CategoryModalButton from './CategoryModalButton'
import { Input } from '../ui/input'

interface CategorySelectProps<T extends Record<string, any>> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  placeholder?: string
  className?: string
  onCategoryDelete?: (category: string) => void
}

export function CategorySelect<T extends Record<string, any>>({
  form,
  name,
  label = 'Catégorie',
  placeholder = 'Sélectionner une catégorie',
  className,
  onCategoryDelete,
}: CategorySelectProps<T>) {
  const [categories, setCategories] = useState(initialCategories)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState<string>('')

  // Supprimer une catégorie
  const handleDeleteCategory = (category: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (onCategoryDelete) {
      onCategoryDelete(category)
    }
    setCategories(categories.filter((c) => c !== category))

    if (form.getValues(name) === category) {
      form.setValue(name, "" as PathValue<T, Path<T>>, { shouldValidate: true })
    }
  }

  // Ajouter une catégorie
  const handleAddCategory = (newCategory: string) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory])
      form.setValue(name, newCategory as PathValue<T, Path<T>>, { shouldValidate: true })
    }
  }

  // Modifier une catégorie
  const handleEditCategory = (category: string) => {
    setEditingCategory(category)
    setNewCategoryName(category)
  }

  // Valider la modification
  const handleSaveEdit = () => {
    if (editingCategory && newCategoryName.trim() !== '' && !categories.includes(newCategoryName)) {
      setCategories(categories.map((c) => (c === editingCategory ? newCategoryName : c)))
      if (form.getValues(name) === editingCategory) {
        form.setValue(name, newCategoryName as PathValue<T, Path<T>>, { shouldValidate: true })
      }
    }
    setEditingCategory(null)
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <div className="flex justify-between w-full">
            <Select onValueChange={field.onChange} defaultValue={field.value} >
              <FormControl>
                <SelectTrigger className="w-full  text-slate-500 me-4">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div key={category} className="flex items-center justify-between px-2 py-1">
                      {editingCategory === category ? (
                        <Input
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          onBlur={handleSaveEdit}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                          autoFocus
                          className="flex-1 mr-2"
                        />
                      ) : (
                        <SelectItem value={category} className="flex-1">
                          {category}
                        </SelectItem>
                      )}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 mr-1"
                              onClick={() => handleEditCategory(category)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Éditer</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={(e) => handleDeleteCategory(category, e)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Supprimer</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
