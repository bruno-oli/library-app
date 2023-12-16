import { Router } from 'express'
import { createOrderRoute } from './createOrderRoute'

const orderRoutes = Router()

orderRoutes.use(createOrderRoute)

export { orderRoutes }
