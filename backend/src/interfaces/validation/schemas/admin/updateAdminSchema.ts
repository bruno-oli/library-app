import { z } from 'zod'

const updateAdminSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
  })
  .partial()

export { updateAdminSchema }
