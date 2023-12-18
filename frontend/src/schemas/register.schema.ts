import { z } from 'zod'

const registerSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Insira um e-mail válido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas devem ser iguais',
    path: ['passwordConfirm'],
  })

export type RegisterSchema = z.infer<typeof registerSchema>

export { registerSchema }
