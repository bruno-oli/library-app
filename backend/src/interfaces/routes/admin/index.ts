import { Router } from 'express'
import { registerAdminRoute } from './registerAdminRoute'

const adminRoutes = Router()

adminRoutes.use(registerAdminRoute)

export { adminRoutes }
