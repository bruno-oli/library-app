import { UpdateAdminUseCase } from '@/application/usecases/admin/UpdateAdminUseCase'
import { AdminDatabaseRepository } from '@/infrastructure/persistence/AdminDatabaseRepository'
import { UpdateAdminController } from '@/interfaces/controllers/admin/UpdateAdminController'
import { AuthAdminMiddleware } from '@/interfaces/middlewares/AuthAdminMiddleware'
import { Router } from 'express'

const updateAdminRoute = Router()

const adminRepository = new AdminDatabaseRepository()
const updateAdminUseCase = new UpdateAdminUseCase(adminRepository)
const updateAdminController = new UpdateAdminController(updateAdminUseCase)

const authAdminMiddleware = new AuthAdminMiddleware(adminRepository)

updateAdminRoute.patch(
  '/admin',
  authAdminMiddleware.handle,
  updateAdminController.handle,
)

export { updateAdminRoute }
