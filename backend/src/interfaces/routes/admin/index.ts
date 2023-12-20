import { Router } from 'express'
import { registerAdminRoute } from './registerAdminRoute'
import { loginAdminRoute } from './loginAdminRoute'
import { authAdminRoute } from './authAdminRoute'
import { updateAdminRoute } from './updateAdminRoute'

const adminRoutes = Router()

adminRoutes.use(registerAdminRoute)
adminRoutes.use(loginAdminRoute)
adminRoutes.use(authAdminRoute)
adminRoutes.use(updateAdminRoute)

export { adminRoutes }
