"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Eye, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BudgetList() {
    const { showToast } = useToast()
    const [Budgets, setBudgets] = useState(initialBudgets)
    const [editingId, setEditingId] = useState(null)
    const [editData, setEditData] = useState({})
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [budgetToDelete, setBudgetToDelete] = useState(null)


    useEffect(() => {
        const handleNewBudget = (event: CustomEvent) => {
            setBudgets((prev) => [event.detail, ...prev])
        }

        window.addEventListener("Budget-added", handleNewBudget as EventListener)

        return () => {
            window.removeEventListener("Budget-added", handleNewBudget as EventListener)
        }
    }, [])

    const startEditing = (budget) => {
        setEditingId(budget.id)
        setEditData({
            ...budget,
            date: new Date(budget.date)
        })
    }

    const cancelEditing = () => {
        setEditingId(null)
        setEditData({})
    }

    const saveEdit = (id) => {
        const updatedBudgets = Budgets.map(b => {
            if (b.id === id) {
                return {
                    ...editData,
                    date: format(editData.date, "dd/MM/yyyy")
                }
            }
            return b
        })

        setBudgets(updatedBudgets)
        setEditingId(null)
        showToast({
            title: "Modification enregistrée",
            description: "Le budget a été mis à jour",
        })
    }

    const handleEditChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }))
    }

    const handleDeleteClick = (id) => {
        setBudgetToDelete(id)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        setBudgets(Budgets.filter(b => b.id !== budgetToDelete))
        setDeleteDialogOpen(false)
        showToast({
            title: "Budget supprimé",
            description: "Le budget a été supprimé avec succès",
        })
    }

    return (
        <>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Budget</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Catégorie</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead className="w-[120px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Budgets.length > 0 ? (
                            Budgets.map((budget) => (
                                <TableRow key={budget.id}>
                                    <TableCell className="font-medium">{budget.Budget}</TableCell>
                                    <TableCell className="max-w-[200px]">
                                        <div className="flex items-center gap-2">
                                            <span className="line-clamp-1">
                                                {budget.Description || 'Aucune description'}
                                            </span>
                                            {budget.Description && budget.Description.length > 50 && (
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            <span className="sr-only">Voir description complète</span>
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-80">
                                                        <p className="text-sm">
                                                            {budget.Description}
                                                        </p>
                                                    </PopoverContent>
                                                </Popover>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>{budget.date}</TableCell>
                                    <TableCell>{budget.category}</TableCell>
                                    <TableCell>{budget.amount}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => startEditing(budget)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Modifier</span>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-96">
                                                    <div className="grid gap-4">
                                                        <div className="space-y-2">
                                                            <h4 className="font-medium leading-none">Modifier le budget</h4>
                                                        </div>
                                                        <div className="grid gap-4">
                                                            <div className="grid grid-cols-3 items-center gap-4">
                                                                <label>Budget</label>
                                                                <Input
                                                                    value={editData.Budget || ''}
                                                                    onChange={(e) => handleEditChange('Budget', e.target.value)}
                                                                    className="col-span-2 h-8"
                                                                />
                                                            </div>

                                                            <div className="grid grid-cols-3 items-center gap-4">
                                                                <label>Description</label>
                                                                <Input
                                                                    value={editData.Description || ''}
                                                                    onChange={(e) => handleEditChange('Description', e.target.value)}
                                                                    className="col-span-2 h-8"
                                                                />
                                                            </div>

                                                            <div className="grid grid-cols-3 items-center gap-4">
                                                                <label>Date</label>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <Button
                                                                            variant="outline"
                                                                            className="col-span-2 h-8 justify-start text-left font-normal"
                                                                        >
                                                                            {editData.date ? format(editData.date, "PPP") : "Choisir une date"}
                                                                        </Button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0">
                                                                        <Calendar
                                                                            mode="single"
                                                                            selected={editData.date}
                                                                            onSelect={(date) => handleEditChange('date', date)}
                                                                            initialFocus
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </div>

                                                            <div className="grid grid-cols-3 items-center gap-4">
                                                                <label>Catégorie</label>
                                                                <Select
                                                                    value={editData.category}
                                                                    onValueChange={(value) => handleEditChange('category', value)}
                                                                >
                                                                    <SelectTrigger className="col-span-2 h-8">
                                                                        <SelectValue placeholder="Sélectionner" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Logement">Logement</SelectItem>
                                                                        <SelectItem value="Alimentation">Alimentation</SelectItem>
                                                                        <SelectItem value="Transport">Transport</SelectItem>
                                                                        <SelectItem value="Loisirs">Loisirs</SelectItem>
                                                                        <SelectItem value="Santé">Santé</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                            <div className="grid grid-cols-3 items-center gap-4">
                                                                <label>Montant</label>
                                                                <div className="col-span-2 relative">
                                                                    <Input
                                                                        type="number"
                                                                        step="0.01"
                                                                        value={editData.amount?.replace(/[^0-9.,]/g, '') || ''}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value
                                                                            if (/^[0-9]*[,.]?[0-9]{0,2}$/.test(value) || value === '') {
                                                                                handleEditChange('amount', value)
                                                                            }
                                                                        }}
                                                                        className="h-8 pr-8"
                                                                    />
                                                                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                                                                        €
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-end gap-2 mt-4">
                                                                <Button variant="outline" onClick={cancelEditing}>
                                                                    Annuler
                                                                </Button>
                                                                <Button onClick={() => saveEdit(budget.id)}>
                                                                    Enregistrer
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-600 hover:bg-red-50"
                                                onClick={() => handleDeleteClick(budget.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Supprimer</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    Aucun budget disponible
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible. Le budget sera définitivement supprimé.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={confirmDelete}
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

const initialBudgets = [
    {
        id: 1,
        Budget: "lorem ipsum",
        Description: "Description courte",
        date: "11/03/2025",
        category: "Logement",
        amount: "- XX,XX €",
    },
    {
        id: 2,
        Budget: "lorem ipsum",
        Description: "Cette description est beaucoup plus longue et nécessitera d'être tronquée dans le tableau avec un bouton pour voir l'intégralité du texte dans une popup",
        date: "11/03/2025",
        category: "Logement",
        amount: "- XX,XX €",
    },
]