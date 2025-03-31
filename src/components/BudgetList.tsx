"use client"
import { useState, useEffect } from "react"
import { Edit, Trash2, Eye, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"

// Sample initial data
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

export default function BudgetList() {
    const { showToast } = useToast()
    const [Budgets, setBudgets] = useState(initialBudgets)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [BudgetToDelete, setBudgetToDelete] = useState<number | null>(null)
    const [editingBudget, setEditingBudget] = useState<number | null>(null) // Etat pour savoir quel budget est en édition
    const [tempEdit, setTempEdit] = useState<any>(null) // Etat pour stocker les modifications temporaires

    // Listen for new Budgets
    useEffect(() => {
        const handleNewBudget = (event: CustomEvent) => {
            setBudgets((prev) => [event.detail, ...prev])
        }

        window.addEventListener("Budget-added", handleNewBudget as EventListener)

        return () => {
            window.removeEventListener("Budget-added", handleNewBudget as EventListener)
        }
    }, [])

    const handleDelete = (id: number) => {
        setBudgetToDelete(id)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (BudgetToDelete) {
            setBudgets(Budgets.filter((t) => t.id !== BudgetToDelete))
            showToast({
                title: "Budget supprimée",
                description: "La Budget a été supprimée avec succès",
            })
        }
        setDeleteDialogOpen(false)
    }

    const startEditing = (Budget: any) => {
        setTempEdit(Budget)
        setEditingBudget(Budget.id)
    }

    const cancelEdit = () => {
        setTempEdit(null)
        setEditingBudget(null)
    }

    const handleEditChange = (field: string, value: string) => {
        setTempEdit((prev: any) => ({
            ...prev,
            [field]: value,
        }))
    }

    const saveEdit = () => {
        setBudgets(Budgets.map((budget) => (budget.id === tempEdit.id ? tempEdit : budget)))
        setEditingBudget(null)
        showToast({
            title: "Budget modifié",
            description: "Les modifications ont été enregistrées avec succès",
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
                            <TableHead>Catégories</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Budgets.length > 0 ? (
                            Budgets.map((Budget) => (
                                <TableRow key={Budget.id}>
                                    <TableCell className="font-medium">{Budget.Budget}</TableCell>
                                    <TableCell className="max-w-[200px]">
                                        <div className="flex items-center gap-2">
                                            <span className="line-clamp-1">
                                                {Budget.Description || 'Aucune description'}
                                            </span>
                                            {Budget.Description && Budget.Description.length > 50 && (
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
                                                            {Budget.Description}
                                                        </p>
                                                    </PopoverContent>
                                                </Popover>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>{Budget.date}</TableCell>
                                    <TableCell>{Budget.category}</TableCell>
                                    <TableCell>{Budget.amount}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-1">
                                            {editingBudget === Budget.id ? (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-green-600 hover:text-green-700"
                                                        onClick={saveEdit}
                                                    >
                                                        <Check className="h-4 w-4" />
                                                        <span className="sr-only">Valider</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-600 hover:text-red-700"
                                                        onClick={cancelEdit}
                                                    >
                                                        <X className="h-4 w-4" />
                                                        <span className="sr-only">Annuler</span>
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => startEditing(Budget)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Modifier</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => handleDelete(Budget.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Supprimer</span>
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    Aucune Budget disponible
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {editingBudget && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Modifier le Budget</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Budget</label>
                                <Input
                                    value={tempEdit?.Budget || ''}
                                    onChange={(e) => handleEditChange('Budget', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <Input
                                    value={tempEdit?.Description || ''}
                                    onChange={(e) => handleEditChange('Description', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <Input
                                    value={tempEdit?.date || ''}
                                    onChange={(e) => handleEditChange('date', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Catégories</label>
                                <Input
                                    value={tempEdit?.category || ''}
                                    onChange={(e) => handleEditChange('category', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Montant</label>
                                <Input
                                    value={tempEdit?.amount || ''}
                                    onChange={(e) => handleEditChange('amount', e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={cancelEdit}>
                                    Annuler
                                </Button>
                                <Button onClick={saveEdit}>Enregistrer</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action ne peut pas être annulée. Cette Budget sera définitivement supprimée.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
