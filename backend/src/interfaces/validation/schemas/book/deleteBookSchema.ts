import { z } from 'zod'

const deleteBookSchema = z.object({
  id: z.string().uuid(),
})

export { deleteBookSchema }
