'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { useState } from 'react'

interface CategoryModalButtonProps {
    onAddCategory: (category: string) => void
}

const CategoryModalButton = ({ onAddCategory }: CategoryModalButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [newCategory, setNewCategory] = useState('')

    const handleAddCategory = () => {
        if (newCategory) {
            onAddCategory(newCategory)
            setNewCategory('')
            setIsOpen(false)
        }
    }
    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" >
                        Ajouter une catégorie
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
                    <DialogDescription>
                        Entrez un nom pour la nouvelle catégorie.
                    </DialogDescription>
                    <div className="mt-4">
                        <label htmlFor="newCategory" className="block text-sm font-medium">
                            Nom de la catégorie
                        </label>
                        <input
                            id="newCategory"
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full mt-2 p-2 border border-slate-300 rounded-md"
                        />
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                        <DialogClose asChild>
                            <Button variant="outline">Annuler</Button>
                        </DialogClose>
                        <Button
                            onClick={handleAddCategory}
                            disabled={!newCategory.trim()}
                        >
                            Ajouter
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CategoryModalButton