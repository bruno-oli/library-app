import { z } from 'zod'

const createOrderSchema = z.object({
  books: z.array(
    z.object({
      product_id: z.string().uuid(),
      quantity: z.number().nonnegative(),
    }),
  ),
})

export { createOrderSchema }
