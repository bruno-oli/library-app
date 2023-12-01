import { z } from 'zod'

const getBookByIdSchema = z.object({
  id: z.string().uuid(),
})

export { getBookByIdSchema }
