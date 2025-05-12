import { useEffect, useState } from 'react'
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
import { Path, PathValue, UseFormReturn } from 'react-hook-form'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { Button } from '../ui/button'
import { Trash2, Pencil } from 'lucide-react'
import CategoryModalButton from './CategoryModalButton'
import { Input } from '../ui/input'
import { fetchCategories } from '@/app/_actions/dashboard/fetchCategories'

interface Category {
  id: string | number
  name: string
}

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
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState<string>('')

  useEffect(() => {
    const loadCategories = async () => {
      const fetched = await fetchCategories()
      setCategories(fetched)
    }
    loadCategories()
  }, [])

  const handleDeleteCategory = (categoryName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (onCategoryDelete) onCategoryDelete(categoryName)
    setCategories(categories.filter((c) => c.name !== categoryName))


    if (form.getValues(name) === categoryName) {
      form.setValue(name, '' as PathValue<T, Path<T>>, { shouldValidate: true })
    }
  }

  const handleAddCategory = (newCategory: string) => {

    const alreadyExists = categories.some((c) => c.name === newCategory)
    if (newCategory && !alreadyExists) {
      const newCat = { id: Date.now(), name: newCategory }
      setCategories([...categories, newCat])
      form.setValue(name, newCategory as PathValue<T, Path<T>>, { shouldValidate: true })
    }
  }

  const handleEditCategory = (categoryName: string) => {
    setEditingCategory(categoryName)
    setNewCategoryName(categoryName)
  }

  const handleSaveEdit = () => {
    if (
      editingCategory &&
      newCategoryName.trim() !== '' &&
      !categories.some((c) => c.name === newCategoryName)
    ) {
      const updated = categories.map((c) =>
        c.name === editingCategory ? { ...c, name: newCategoryName } : c
      )
      setCategories(updated)
      if (form.getValues(name) === editingCategory) {
        form.setValue(name, newCategoryName as PathValue<T, Path<T>>, {
          shouldValidate: true,
        })
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
            <Select onValueChange={(value) => {
              const selected = categories.find(c => c.name === value)
              field.onChange(selected ? { id: selected.id, name: selected.name } : { id: '', name: '' })
            }} defaultValue={field.value?.name}>
              <FormControl>
                <SelectTrigger className="w-full text-slate-500 me-4">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.length > 0 ? (
                  categories.map((category) => (

                    <div key={category.id} className="flex items-center justify-between px-2 py-1">
                      {editingCategory === category.name ? (
                        <Input
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          onBlur={handleSaveEdit}
                          onKeyDown={(e) =>
                            e.key === 'Enter' && handleSaveEdit()
                          }
                          autoFocus
                          className="mr-2 flex-1"
                        />
                      ) : (
                        <SelectItem value={category.name} key={category.id} className="flex-1">
                          {category.name}
                        </SelectItem>
                      )}
                      {/* <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={(e) => handleDeleteCategory(category.name, e)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Supprimer</TooltipContent>
                        </Tooltip>
                      </TooltipProvider> */}
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground px-2 py-1.5 text-sm">
                  </div>
                )}
              </SelectContent>
            </Select>
            {/* <CategoryModalButton onAddCategory={handleAddCategory} /> */}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
