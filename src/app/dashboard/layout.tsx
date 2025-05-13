import { AppSidebar } from '@/components/dashboard/AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { CsrfProvider } from '@/context/CsrfContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CsrfProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </CsrfProvider>
  )
}
