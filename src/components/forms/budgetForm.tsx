"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

import { DatePickerFormField } from "@/components/forms/DatePickerFormField"

const formSchema = z.object({
    item: z.string().min(2, { message: "L'item doit contenir au moins 2 caractères" }),
    date: z.date(),
    category: z.string().min(1, { message: "Veuillez sélectionner une catégorie" }),
    amount: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Le montant doit être un nombre",
    }),
})

export default function BudgetForm() {
    const { showToast } = useToast()
    const [transactions, setTransactions] = useState<any[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            item: "",
            date: new Date(),
            category: "",
            amount: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        const formattedAmount = Number(values.amount).toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
        })

        const newTransaction = {
            id: Date.now(),
            item: values.item,
            date: format(values.date, "dd/MM/yyyy"),
            category: values.category,
            amount: formattedAmount,
        }


        setTransactions([newTransaction, ...transactions])


        form.reset()

        showToast({
            title: "Transaction ajoutée",
            description: "La transaction a été ajoutée avec succès",
        })

        window.dispatchEvent(new CustomEvent("transaction-added", { detail: newTransaction }))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 rounded-lg border p-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="item"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nom de l'item" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <DatePickerFormField form={form} />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Catégorie</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner une catégorie" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Logement">Logement</SelectItem>
                                        <SelectItem value="Alimentation">Alimentation</SelectItem>
                                        <SelectItem value="Transport">Transport</SelectItem>
                                        <SelectItem value="Loisirs">Loisirs</SelectItem>
                                        <SelectItem value="Santé">Santé</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Montant</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input type="text" placeholder="0.00" {...field} className="pr-8" />
                                        <div className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">€</div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Ajouter la transaction
                </Button>
            </form>
        </Form>
    )
}
