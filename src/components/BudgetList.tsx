"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2 } from "lucide-react"

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
import { useToast } from "@/hooks/use-toast"

// Sample initial data
const initialBudgets = [
    {
        id: 1,
        Budget: "lorem ipsum",
        Description: "Description desc",
        date: "11/03/2025",
        category: "Logement",
        amount: "- XX,XX €",
    },
    {
        id: 2,
        Budget: "lorem ipsum",
        Description: "Description desc",
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
                                    <TableCell className="font-medium">{Budget.Description}</TableCell>
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
                                <TableCell colSpan={5} className="h-24 text-center">
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

