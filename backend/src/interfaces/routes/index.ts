import { Router } from 'express'
import { userRoutes } from './user'
import { adminRoutes } from './admin'
import { bookRoutes } from './book'
import { orderRoutes } from './order'

const routes = Router()

routes.use(userRoutes)
routes.use(adminRoutes)
routes.use(bookRoutes)
routes.use(orderRoutes)

export { routes }
