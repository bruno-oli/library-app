import { AuthAdminUseCase } from '@/application/usecases/admin/AuthAdminUseCase'
import { AdminDatabaseRepository } from '@/infrastructure/persistence/AdminDatabaseRepository'
import { AuthAdminController } from '@/interfaces/controllers/admin/AuthAdminController'
import { Router } from 'express'

const authAdminRoute = Router()

const adminDatabaseRepository = new AdminDatabaseRepository()
const authAdminUseCase = new AuthAdminUseCase(adminDatabaseRepository)
const authAdminController = new AuthAdminController(authAdminUseCase)

authAdminRoute.post('/admin/auth', authAdminController.handle)

export { authAdminRoute }
