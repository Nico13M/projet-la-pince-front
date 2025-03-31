import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale/fr"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Control, FieldValues } from "react-hook-form"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form";

interface DatePickerFormFieldProps {
    form: UseFormReturn<{ date: Date; item: string; category: string; amount: string }>
}

export function DatePickerFormField({ form }: DatePickerFormFieldProps) {
    return (
        <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP", { locale: fr })
                                    ) : (
                                        <span>Choisir une date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date()}
                                initialFocus
                                locale={fr}
                                captionLayout="dropdown-buttons"
                                fromYear={2020}
                                toYear={new Date().getFullYear()}
                                className="border-0"
                                classNames={{
                                    day_selected: "bg-primary text-primary-foreground",
                                    day_today: "bg-accent text-accent-foreground",
                                }}
                                styles={{
                                    nav: {
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        margin: 0,
                                        marginBottom: '-40px',
                                    },
                                    table: {
                                        width: '100%',
                                    },
                                    cell: {
                                        padding: '0.25rem',
                                    },
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}