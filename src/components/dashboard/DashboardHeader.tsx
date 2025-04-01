import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { BellIcon } from 'lucide-react'

export function DashboardHeader({ title }: { title: string }) {
  return (
    <header className="bg-background sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <SidebarTrigger className="flex md:hidden" />
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  )
}
