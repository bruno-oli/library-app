import { Router } from 'express'
import { createOrderRoute } from './createOrderRoute'
import { getOrderByIdRoute } from './getOrderByIdRoute'

const orderRoutes = Router()

orderRoutes.use(createOrderRoute)
orderRoutes.use(getOrderByIdRoute)

export { orderRoutes }
