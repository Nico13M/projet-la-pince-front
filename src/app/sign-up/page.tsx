'use client'

import SignUpForm from '@/components/forms/SignUpForm'
import Separator from '@/components/Separator'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useVisibilityAnimation } from '@/hooks/useVisibilityAnimation'

export default function SignUp() {
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
            <h1 className="text-3xl font-bold text-primary">Inscription</h1>
            <p className="text-center text-muted-foreground">
              Rejoignez-nous et prenez le contrôle de vos finances dès aujourd'hui !
            </p>
          </div>
          
          <div className="mt-6">
            <SignUpForm />
          </div>
          
          <div className="my-6">
            <Separator />
          </div>
          
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center">
              Vous avez déjà un compte ?{' '}
              <Link href="/sign-in" className="text-primary font-medium hover:underline transition-all">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
