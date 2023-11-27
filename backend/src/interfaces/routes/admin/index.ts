import { Router } from 'express'
import { registerAdminRoute } from './registerAdminRoute'
import { loginAdminRoute } from './loginAdminRoute'
import { authAdminRoute } from './authAdminRoute'

const adminRoutes = Router()

adminRoutes.use(registerAdminRoute)
adminRoutes.use(loginAdminRoute)
adminRoutes.use(authAdminRoute)

export { adminRoutes }
