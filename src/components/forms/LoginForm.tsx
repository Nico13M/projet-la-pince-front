'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const formSchema = z.object({
  email: z.string().email({
    message: 'Veuillez saisir une adresse email valide',
  }),
  password: z.string().min(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  }),
})

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const API_LINK = process.env.NEXT_PUBLIC_API_LINK

      
      const response = await fetch(API_LINK + '/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      })
      if (response.status === 429) {
        setErrorMessage('Trop de requête, veuillez réessayer plus tard ')
      }
      if (response.status === 403) {
        setErrorMessage('Identifiant ou mot de passe incorect')
      }
      if (response.status === 201) {
        router.push('/dashboard')
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Une erreur est survenue')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} method="POST" action="#" className="w-full space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="jimmy@gmail.com" 
                  {...field} 
                  className="bg-background/50 transition-all focus-visible:bg-background/80 placeholder:text-gray-300"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="91@a1b2c3d4"
                    type={passwordVisible ? 'text' : 'password'}
                    {...field}
                    className="bg-background/50 transition-all focus-visible:bg-background/80 placeholder:text-gray-300"
                  />
                  <Button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        {errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}
        <Button 
          className="w-full group transition-all bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary/50"
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? 'Connexion en cours...' : (
            <>
              <span>Se connecter</span>
              <LogIn className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
