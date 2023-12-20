import { z } from 'zod'

const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/

const updateAdminSchema = z
  .object({
    name: z
      .string()
      .refine(
        (val) => !val || (val && val.length >= 3),
        'O nome deve ter pelo menos 3 caracteres',
      ),
    email: z
      .string()
      .refine((val) => !val || (val && emailRegex.test(val)), 'Email inválido'),
    currentPassword: z
      .string()
      .refine((val) => !val || (val && val.length >= 6), 'Senha inválida'),
    newPassword: z
      .string()
      .refine(
        (val) => !val || (val && val.length >= 6),
        'A senha deve ter pelo menos 6 caracteres',
      ),
    newPasswordConfirm: z
      .string()
      .refine(
        (val) => !val || (val && val.length >= 6),
        'A senha deve ter pelo menos 6 caracteres',
      ),
  })
  .refine(
    (data) => {
      return !(
        data.newPassword &&
        (!data.currentPassword ||
          !data.newPassword ||
          !data.newPasswordConfirm ||
          data.newPassword !== data.newPasswordConfirm)
      )
    },
    {
      message: 'As senhas devem ser iguais',
      path: ['newPasswordConfirm'],
    },
  )
  .refine(
    (data) => {
      return !(
        data.currentPassword &&
        (!data.newPassword || !data.newPasswordConfirm)
      )
    },
    {
      message: 'Voce deve digitar sua nova senha',
      path: ['newPassword'],
    },
  )

export type UpdateAdminSchema = z.infer<typeof updateAdminSchema>

export { updateAdminSchema }
