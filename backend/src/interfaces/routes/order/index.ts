import { Router } from 'express'
import { createOrderRoute } from './createOrderRoute'
import { getOrderByIdRoute } from './getOrderByIdRoute'
import { deleteOrderRoute } from './deleteOrderRoute'

const orderRoutes = Router()

orderRoutes.use(createOrderRoute)
orderRoutes.use(getOrderByIdRoute)
orderRoutes.use(deleteOrderRoute)

export { orderRoutes }
