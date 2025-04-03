'use client'

import { signup } from '@/app/_actions/signup/signup'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Le prénom est obligatoire',
  }),
  lastName: z.string().min(2, {
    message: 'Le nom est obligatoire',
  }),
  email: z.string().email({
    message: 'Veuillez saisir une adresse email valide',
  }),
  password: z.string().min(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  }),
})

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [passwordVisible, setPasswordVisible] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const response = await signup(values)
      if (response.statusCode === 201) {
        router.push('/sign-in')
      } else if (
        response.statusCode === 403 &&
        response.message === 'Credentials taken'
      ) {
        setErrorMessage('Ces identifiants sont déjà utilisés')
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Jimmy" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Dupont" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <div className="relative">
                <Input
                  placeholder="91@a1b2c3d4"
                  type={passwordVisible ? 'text' : 'password'}
                  {...field}
                />
                <Button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                  variant="ghost"
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? 'Inscription en cours' : "S'inscrire"}
        </Button>
      </form>
    </Form>
  )
}
