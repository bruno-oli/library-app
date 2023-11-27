import { RegisterAdminUseCase } from '@/application/usecases/admin/RegisterAdminUseCase'
import { AdminDatabaseRepository } from '@/infrastructure/persistence/AdminDatabaseRepository'
import { RegisterAdminController } from '@/interfaces/controllers/admin/RegisterAdminController'
import { AuthAdminMiddleware } from '@/interfaces/middlewares/AuthAdminMiddleware'
import { Router } from 'express'

const registerAdminRoute = Router()

const adminDatabaseRepository = new AdminDatabaseRepository()
const authAdminMiddleware = new AuthAdminMiddleware(adminDatabaseRepository)
const registerAdminUseCase = new RegisterAdminUseCase(adminDatabaseRepository)
const registerAdminController = new RegisterAdminController(
  registerAdminUseCase,
)

registerAdminRoute.post(
  '/admin/register',
  authAdminMiddleware.handle,
  registerAdminController.handle,
)

export { registerAdminRoute }
