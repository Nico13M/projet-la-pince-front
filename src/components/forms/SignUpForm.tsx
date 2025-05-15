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
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Prénom</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Jimmy" 
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Nom</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Dupont" 
                    {...field} 
                    className="bg-background/50 transition-all focus-visible:bg-background/80 placeholder:text-gray-300"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
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
          {isLoading ? 'Inscription en cours...' : (
            <>
              <span>S'inscrire</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
