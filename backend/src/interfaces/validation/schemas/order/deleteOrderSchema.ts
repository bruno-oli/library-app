import { z } from 'zod'

const deleteOrderSchema = z.string().uuid()

export { deleteOrderSchema }
