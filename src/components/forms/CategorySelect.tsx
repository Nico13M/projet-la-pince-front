import { addCategories } from '@/app/_actions/dashboard/addCategories'
import { deleteCategory } from '@/app/_actions/dashboard/deteleteCategory'
import { fetchCategories } from '@/app/_actions/dashboard/fetchCategories'
import { updateCategory } from '@/app/_actions/dashboard/updateCategory'
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
import { Pencil, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Path, UseFormReturn } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import CategoryModalButton from './CategoryModalButton'

interface Category {
  id: string | number
  name: string
  transactionType: 'income' | 'investment' | 'expense'
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

  const handleDeleteCategory = async (
    categoryId: string | number,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation()
    try {
      await deleteCategory(String(categoryId))
      setCategories((cats) => cats.filter((c) => c.id !== categoryId))
      const current = form.getValues(name)
      if (current?.id === categoryId) {
        form.setValue(
          name,
          { id: '', name: '', transactionType: undefined } as any,
          {
            shouldValidate: true,
          },
        )
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddCategory = async (payload: {
    name: string
    transactionType: string
  }) => {
    const created = await addCategories(payload)
    setCategories((cats) => [...cats, created])
    form.setValue(name, created, { shouldValidate: true })
  }

  const handleEditCategory = (categoryName: string) => {
    setEditingCategory(categoryName)
    setNewCategoryName(categoryName)
  }

  const handleSaveEdit = async () => {
    if (
      editingCategory &&
      newCategoryName.trim() !== '' &&
      !categories.some((c) => c.name === newCategoryName)
    ) {
      const current = categories.find((c) => c.name === editingCategory)!
      const payload = {
        ...current,
        name: newCategoryName,
        transactionType: current.transactionType,
      }
      try {
        const updated = await updateCategory(payload)
        setCategories(
          categories.map((c) => (c.id === updated.id ? updated : c)),
        )
        if (form.getValues(name)?.id === updated.id) {
          form.setValue(name, updated as any, { shouldValidate: true })
        }
        setEditingCategory(null)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <div className="flex w-full justify-between">
            <Select
              onValueChange={(value) => {
                const selected = categories.find((c) => c.name === value)
                field.onChange({
                  id: selected?.id,
                  name: selected?.name,
                  transactionType: selected?.transactionType,
                })
              }}
              value={field.value?.name}
            >
              <FormControl>
                <SelectTrigger className="me-4 w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between px-2 py-1"
                    >
                      {editingCategory === category.name ? (
                        <div className="flex flex-1 items-center">
                          <Input
                            value={newCategoryName}
                            onChange={(e) => {
                              setNewCategoryName(e.target.value)
                            }}
                            autoFocus
                            className="mr-2 flex-1"
                          />
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            disabled={
                              newCategoryName.trim() === '' ||
                              categories.some((c) => c.name === newCategoryName)
                            }
                          >
                            Sauvegarder
                          </Button>
                        </div>
                      ) : (
                        <SelectItem
                          value={category.name}
                          key={category.id}
                          className="flex-1"
                        >
                          {category.name}
                        </SelectItem>
                      )}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="mr-1 h-7 w-7"
                              onClick={() => handleEditCategory(category.name)}
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
                              onClick={(e) =>
                                handleDeleteCategory(category.id, e)
                              }
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
                  <div className="text-muted-foreground px-2 py-1.5 text-sm">
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
