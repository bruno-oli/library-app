import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Insira um e-mail válido!'),
  password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
})

export type LoginSchema = z.infer<typeof loginSchema>

export { loginSchema }
