'use client'

import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { BellIcon, LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function DashboardHeader({ title }: { title: string }) {
  const router = useRouter()

  async function handleLogout() {
    const API_LINK = process.env.NEXT_PUBLIC_API_LINK
    try {
      const res = await fetch(API_LINK + '/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (res.ok) {
        router.push('/sign-in')
      } else {
        console.error('Erreur lors de la déconnexion')
      }
    } catch (error) {
      console.error('Erreur réseau', error)
    }
  }

  return (
    <header className="bg-background sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <SidebarTrigger className="flex md:hidden" />
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOutIcon className="h-5 w-5" />
          <span className="sr-only">Déconnexion</span>
        </Button>
      </div>
    </header>
  )
}
