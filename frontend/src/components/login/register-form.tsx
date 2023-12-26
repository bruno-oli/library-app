import { UserAuthContext } from '@/context/user-auth-context'
import { IRegister, registerSchema } from '@/schemas/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const RegisterForm = () => {
  const { registerUser } = useContext(UserAuthContext)

  async function handleRegister(data: IRegister) {
    await registerUser(data)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Card>
        <CardHeader>
          <CardTitle>Cadastro</CardTitle>
          <CardDescription>
            Parece que você ainda não tem uma conta, faça seu cadastro.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              type="text"
              id="name"
              autoComplete="name"
              {...register('name')}
            />

            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              autoComplete="email"
              {...register('email')}
            />

            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input type="password" id="password" {...register('password')} />

            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Digite a senha novamente</Label>
            <Input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
            />

            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button className="w-full" type="submit">
            Cadastrar
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

export { RegisterForm }
