import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ILogin, loginSchema } from '@/schemas/login.schema'
import { useContext } from 'react'
import { UserAuthContext } from '@/context/user-auth-context'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  })

  const { loginUser } = useContext(UserAuthContext)

  async function handleLogin(data: ILogin) {
    await loginUser(data.email, data.password)
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Bem vindo de volta, realize o login para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

export { LoginForm }
