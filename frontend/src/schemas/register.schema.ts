import { z } from 'zod'

const registerSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter pelo menos 3 letras'),
    email: z.string().email('Insira um email válido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 letras'),
    confirmPassword: z.string().min(1, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmPassword'],
  })

export type IRegister = z.infer<typeof registerSchema>

export { registerSchema }
