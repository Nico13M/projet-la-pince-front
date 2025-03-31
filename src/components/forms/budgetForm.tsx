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
    Budget: z.string().min(2, { message: "Le nom du budget doit contenir au moins 2 caractères" }),
    date: z.date(),
    category: z.string().min(1, { message: "Veuillez sélectionner une catégorie" }),
    amount: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Le montant doit être un nombre",
    }),
    Description: z.string().optional(),

})

export default function BudgetForm() {
    const { showToast } = useToast()
    const [Budgets, setBudgets] = useState<any[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Budget: "",
            date: new Date(),
            category: "",
            amount: "",
            Description: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        const formattedAmount = Number(values.amount).toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
        })

        const newBudget = {
            id: Date.now(),
            Budget: values.Budget,
            date: format(values.date, "dd/MM/yyyy"),
            category: values.category,
            amount: formattedAmount,
            Description: values.Description,
        }
        console.log(newBudget);

        setBudgets([newBudget, ...Budgets])


        form.reset()

        showToast({
            title: "Budget ajoutée",
            description: "La Budget a été ajoutée avec succès",
        })

        window.dispatchEvent(new CustomEvent("Budget-added", { detail: newBudget }))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 rounded-lg border p-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="Budget"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Budget</FormLabel>
                                <FormControl>
                                    <Input placeholder="Budget" {...field} />
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
                                <FormLabel>Objectif</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="Description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Notes supplémentaires (optionnel)"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Ajouter la Budget
                </Button>
            </form>
        </Form>
    )
}
