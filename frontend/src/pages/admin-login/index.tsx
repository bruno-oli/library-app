import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import {
  AdminLoginSchema,
  adminLoginSchema,
} from '@/schemas/admin-login.schema'
import { loginAdmin } from '@/services/admin-services'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [isFetching, setIsFetching] = useState(false)

  const navigate = useNavigate()

  const { toast } = useToast()

  async function handleAdminLogin(data: AdminLoginSchema) {
    setIsFetching(true)

    try {
      const token = (await loginAdmin(data)) as string

      localStorage.setItem('adminToken', token)

      navigate('/dashboard')
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast({
          description: error.response?.data.error,
          title: 'Algo deu errado',
          variant: 'destructive',
        })
      }

      toast({
        description: 'Erro interno no servidor, tente novamente mais tarde!',
        title: 'Algo deu errado',
        variant: 'destructive',
      })
    } finally {
      setIsFetching(false)
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AdminLoginSchema>({
    resolver: zodResolver(adminLoginSchema),
  })

  return (
    <main className="flex min-h-screen w-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(handleAdminLogin)}
        className="flex w-[450px] flex-col space-y-4 rounded-[--radius] border-2 border-border p-5"
      >
        <h1 className="text-4xl font-bold text-primary">Admin Login</h1>
        <Separator />

        <div>
          <Input type="email" placeholder="Email" {...register('email')} />
          {errors.email && (
            <span className="text-destructive">{errors.email.message}</span>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Senha"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-destructive">{errors.password.message}</span>
          )}
        </div>

        <Button
          type="submit"
          variant={'default'}
          disabled={!!(errors.email || errors.password || isFetching)}
        >
          Entrar
        </Button>

        <Button
          type="button"
          variant={'outline'}
          onClick={() => {
            navigate('/register')
          }}
        >
          Criar conta
        </Button>
      </form>
    </main>
  )
}

export { AdminLogin }
