'use client'

import LoginForm from '@/components/forms/LoginForm'
import Separator from '@/components/Separator'
import WalletAnimation from '@/components/animations/WalletAnimation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useVisibilityAnimation } from '@/hooks/useVisibilityAnimation'

export default function SignIn() {
  const { visibilityClasses } = useVisibilityAnimation()

  return (
    <div className="relative min-h-screen w-full overflow-hidden from-primary to-secondary bg-gradient-to-br text-white">
      {/* Background gradient elements similar to the landing page */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-secondary/20 absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl"></div>
        <div className="bg-primary/20 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-10">
        <Link
          href="/"
          className="text-white absolute top-6 left-6 flex flex-row items-center transition-all hover:translate-x-[-5px]"
        >
          <ChevronLeft /> Retour
        </Link>

        <div className={`w-full max-w-md rounded-xl border border-white/10 bg-white text-foreground shadow-lg px-6 py-8 transition-all ${visibilityClasses()}`}>
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-3xl font-bold text-primary">Connexion</h1>
            <WalletAnimation />
            <p className="text-center text-muted-foreground">
              Accédez à votre espace personnel pour gérer vos budgets
            </p>
          </div>

          <div className="mt-6">
            <LoginForm />
          </div>

          <div className="my-6">
            <Separator />
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center">
              Vous n'avez pas de compte ?{' '}
              <Link href="/sign-up" className="text-primary font-medium hover:underline transition-all">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
