'use client'

import LoginForm from '@/components/forms/LoginForm'
import Separator from '@/components/Separator'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function SignIn() {
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
          <h1>Connexion</h1>
          <p className="text-center text-sm">
            Accédez à votre espace personnel pour gérer vos budget
          </p>
        </div>
        <LoginForm />
        <Separator />
        <div className="flex flex-col items-center justify-center gap-3">
          <p>
            Vous n'avez pas de compte ?{' '}
            <Link href="/sign-up" className="text-primary">
              S'inscrire
            </Link>
          </p>
          <p>
            Mot de passe oublié ?{' '}
            <Link href="#" className="text-primary">
              Reinitialiser
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
