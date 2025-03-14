'use client'

import SignUpForm from '@/components/forms/SignUpForm'
import Separator from '@/components/Separator'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <Link
        href="/"
        className="text-primary absolute top-4 left-4 flex flex-row"
      >
        <ChevronLeft /> Retour
      </Link>
      <div className="flex h-auto w-5/6 flex-col items-center justify-center gap-8 rounded-lg border py-10 lg:w-1/3">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1>Inscription</h1>
          <p className="text-center text-sm">
            Rejoignez-nous et prenez le contrôle de vos finances dès aujourd'hui
            !
          </p>
        </div>
        <SignUpForm />
        <Separator />
        <div className="flex flex-col items-center justify-center gap-3">
          <p>
            Vous avez déjà un compte ?{' '}
            <Link href="/sign-in" className="text-primary">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
