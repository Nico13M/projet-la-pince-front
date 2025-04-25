'use client'

import { BarChart2, CreditCard, Home, PieChart, Settings } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard/home" className="flex items-center gap-2">
              <Image src="/logo.webp" alt="Logo" width={150} height={150} className='m-auto' />
              {/* <span className="text-lg font-semibold">La Pince</span> */}
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="mx-3">
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard/home'}
              variant="default"
            >
              <Link href="/dashboard/home">
                <Home className="size-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mx-3">
            <SidebarMenuButton
              asChild
              isActive={pathname?.includes('/dashboard/gestion')}
            >
              <Link href="/dashboard/gestion">
                <CreditCard className="size-5" />
                <span>Gestion</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mx-3">
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard/budget'}
            >
              <Link href="/dashboard/budget">
                <PieChart className="size-5" />
                <span>Budgets</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mx-3">
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard/analytics'}
            >
              <Link href="/dashboard/analytics">
                <BarChart2 className="size-5" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mx-3">
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard/settings'}
            >
              <Link href="/dashboard/settings">
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
