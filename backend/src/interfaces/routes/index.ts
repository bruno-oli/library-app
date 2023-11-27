import { Router } from 'express'
import { userRoutes } from './user'
import { adminRoutes } from './admin'

const routes = Router()

routes.use(userRoutes)
routes.use(adminRoutes)

export { routes }
