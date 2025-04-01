import {
  BarChart2,
  CreditCard,
  Home,
  PieChart,
  Settings,
  Wallet,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import Link from 'next/link'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#" className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                  <Wallet className="size-5" />
                </div>
                <span className="text-lg font-semibold">La Pince</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="mx-3">
            <SidebarMenuButton asChild isActive variant="default">
              <Link href="#">
                <Home className="size-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mx-3">
            <SidebarMenuButton asChild>
              <Link href="/gestion">
                <CreditCard className="size-5" />
                <span>Gestion</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mx-3">
            <SidebarMenuButton asChild>
              <Link href="/budgets">
                <PieChart className="size-5" />
                <span>Budgets</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mx-3">
            <SidebarMenuButton asChild>
              <Link href="/analytics">
                <BarChart2 className="size-5" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mx-3">
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings className="size-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
