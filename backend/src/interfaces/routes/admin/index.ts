import { Router } from 'express'
import { registerAdminRoute } from './registerAdminRoute'
import { loginAdminRoute } from './loginAdminRoute'

const adminRoutes = Router()

adminRoutes.use(registerAdminRoute)
adminRoutes.use(loginAdminRoute)

export { adminRoutes }
