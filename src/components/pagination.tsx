import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"



export function Pagination() {
    return (
        <div className="mt-4 flex items-center justify-center space-x-6">
            <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Page précédente</span>
            </Button>
            <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="h-8 w-8">
                    1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-primary-foreground">
                    2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                    3
                </Button>
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Page suivante</span>
            </Button>
        </div>
    )
}

