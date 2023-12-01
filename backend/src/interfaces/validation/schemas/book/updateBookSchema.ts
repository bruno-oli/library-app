import { z } from 'zod'

const updateBookSchema = z
  .object({
    name: z.string().min(2),
    description: z.string().min(20),
    image: z.string().url(),
    stock: z.number().nonnegative(),
    price_in_cents: z.number().nonnegative(),
    author: z.string().min(2),
  })
  .partial()
  .strict()
  .superRefine(
    // eslint-disable-next-line
    ({ name, description, image, stock, price_in_cents, author }, ctx) => {
      if (
        !name &&
        !description &&
        !image &&
        !stock &&
        // eslint-disable-next-line
        !price_in_cents &&
        !author
      ) {
        ctx.addIssue({
          code: 'custom',
          message: 'At least one field must be updated',
          path: [
            'name',
            'description',
            'image',
            'stock',
            'price_in_cents',
            'author',
          ],
        })
      }
    },
  )

export { updateBookSchema }
