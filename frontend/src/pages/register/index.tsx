import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { RegisterSchema, registerSchema } from '@/schemas/register.schema'
import { useUserStore } from '@/store/useUserStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@radix-ui/react-separator'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const { registerUser } = useUserStore()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const [isFetching, setIsFetching] = useState<boolean>(false)

  async function handleRegister(data: RegisterSchema) {
    try {
      setIsFetching(true)

      await registerUser(data)

      toast({
        title: 'Cadastrado com sucesso',
        description: 'Redirecionando para a pagina de login...',
      })

      navigate('/login')
    } catch (err) {
      if (err instanceof Error) {
        return toast({
          variant: 'destructive',
          title: 'Algo deu errado',
          description: err.message,
        })
      }

      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Algo deu errado',
      })
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <main className="flex min-h-screen w-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex w-[450px] flex-col space-y-4 rounded-[--radius] border-2 border-border p-5"
      >
        <h1 className="text-4xl font-bold text-primary">Cadastro</h1>

        <Separator />

        <div>
          <Input type="text" placeholder="Name" {...register('name')} />
          {errors.name && (
            <span className="text-destructive">{errors.name.message}</span>
          )}
        </div>

        <div>
          <Input type="email" placeholder="Email" {...register('email')} />
          {errors.email && (
            <span className="text-destructive">{errors.email.message}</span>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-destructive">{errors.password.message}</span>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register('passwordConfirm')}
          />

          {errors.passwordConfirm && (
            <span className="text-destructive">
              {errors.passwordConfirm.message}
            </span>
          )}
        </div>

        <Button type="submit" variant={'default'} disabled={isFetching}>
          Cadastrar
        </Button>

        <Button
          type="button"
          variant={'outline'}
          onClick={() => {
            navigate('/login')
          }}
        >
          Já possui uma conta? Clique aqui para entrar
        </Button>
      </form>
    </main>
  )
}

export { Register }
