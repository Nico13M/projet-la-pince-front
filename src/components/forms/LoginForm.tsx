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
import { useState } from 'react'
import { Eye, EyeOff, GhostIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'


const formSchema = z.object({
  email: z.string().email({
    message: 'Veuillez saisir une adresse email valide',
  }),
  password: z.string().min(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  }),
})


export default function LoginForm() {
  const [errorMessage, setErrorMEssage] = useState<string | null>(null)
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
    console.log(values, "received values")

    try {
      setIsLoading(true)
      const API_LINK = process.env.NEXT_PUBLIC_API_LINK
      console.log(API_LINK, 'api link')

      if (!API_LINK) throw new Error("PAS DE LIEN API ZEBI")

      const response = await fetch(API_LINK + '/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values)
      })
      if (response.status === 429) {
        setErrorMEssage("Trop de requête, veuillez réessayer plus tard ")
      }
      if (response.status === 403) {
        setErrorMEssage("Identifiant ou mot de passe incorect")
      }
      if (response.status === 201) {
        router.push('/dashboard')
      }
      console.log(response)
    } catch (error) {
      setErrorMEssage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jimmy@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <div className='relative'>

                  <Input placeholder="91@a1b2c3d4" type={passwordVisible ? 'text' : 'password'} {...field} />
                  <Button type="button"

                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 "
                    variant={GhostIcon}
                  >
                    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && <p className="text-red-500" >{errorMessage}</p>}
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? 'Connexion en cours' : 'Se connecter'}
        </Button>
      </form>
    </Form>
  )
}
