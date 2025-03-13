'use client'

import LoginForm from '@/components/forms/LoginForm'

export default function SignIn() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-1/2 w-4/5 flex-col items-center justify-center gap-10 rounded-lg border lg:w-1/3">
        <h1>Connexion</h1>
        <LoginForm />
      </div>
    </div>
  )
}
