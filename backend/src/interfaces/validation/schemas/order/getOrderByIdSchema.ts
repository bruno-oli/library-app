import { z } from 'zod'

const getOrderByIdSchema = z.string().uuid()

export { getOrderByIdSchema }
