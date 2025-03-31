import BudgetForm from "@/components/forms/budgetForm"

import { Pagination } from "@/components/pagination"
import BudgetList from "@/components/BudgetList"

export default function BudgetPage() {
    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar - visible only on desktop */}
            <div className="hidden w-64 border-r bg-muted/40 lg:block">
                <div className="flex h-14 items-center border-b px-4">
                    <div className="h-8 w-8 rounded border border-border bg-background p-1 text-center text-xs font-medium">
                        Logo
                    </div>
                    <span className="ml-2 text-sm font-medium">Menu titre</span>
                </div>
                <nav className="space-y-1 p-2">
                    {["Item 1", "Item 2", "Item 3", "Item 4"].map((item, i) => (
                        <div key={i} className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm hover:bg-accent">
                            {item}
                        </div>
                    ))}
                </nav>
                <div className="absolute bottom-0 left-0 w-64 p-4">
                    <div className="h-10 w-full rounded bg-primary"></div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <header className="flex h-14 items-center justify-between border-b px-4">
                    <h1 className="text-lg font-medium md:hidden">Budget Transaction</h1>
                    <div className="ml-auto flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-muted"></div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-4 md:p-6">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="mb-6 text-center text-xl font-semibold">Ajouter Budget</h2>
                        <BudgetForm />

                        <div className="mt-8">
                            <h3 className="mb-4 text-lg font-medium">Tableau des Budget</h3>
                            <div className="rounded-md border">
                                <BudgetList />
                            </div>
                            <Pagination />
                        </div>
                    </div>
                </main>

                {/* Footer - visible only on mobile */}
                <footer className="mt-auto border-t bg-muted/40 p-4 md:hidden">
                    <div className="text-center text-sm text-muted-foreground">Footer</div>
                </footer>
            </div>
        </div>
    )
}
