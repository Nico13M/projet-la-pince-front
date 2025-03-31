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
const initialTransactions = [
    {
        id: 1,
        item: "lorem ipsum",
        date: "11/03/2025",
        category: "Logement",
        amount: "- XX,XX €",
    },
    {
        id: 2,
        item: "lorem ipsum",
        date: "11/03/2025",
        category: "Logement",
        amount: "- XX,XX €",
    },
]

export default function TransactionList() {
    const { showToast } = useToast()
    const [transactions, setTransactions] = useState(initialTransactions)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null)

    // Listen for new transactions
    useEffect(() => {
        const handleNewTransaction = (event: CustomEvent) => {
            setTransactions((prev) => [event.detail, ...prev])
        }

        window.addEventListener("transaction-added", handleNewTransaction as EventListener)

        return () => {
            window.removeEventListener("transaction-added", handleNewTransaction as EventListener)
        }
    }, [])

    const handleDelete = (id: number) => {
        setTransactionToDelete(id)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (transactionToDelete) {
            setTransactions(transactions.filter((t) => t.id !== transactionToDelete))
            showToast({
                title: "Transaction supprimée",
                description: "La transaction a été supprimée avec succès",
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
                            <TableHead>Item</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Catégories</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">{transaction.item}</TableCell>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{transaction.category}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
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
                                                onClick={() => handleDelete(transaction.id)}
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
                                    Aucune transaction disponible
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
                            Cette action ne peut pas être annulée. Cette transaction sera définitivement supprimée.
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

