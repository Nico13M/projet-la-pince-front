"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
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