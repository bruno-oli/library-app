import { LoginAdminUseCase } from '@/application/usecases/admin/LoginAdminUseCase'
import { AdminDatabaseRepository } from '@/infrastructure/persistence/AdminDatabaseRepository'
import { LoginAdminController } from '@/interfaces/controllers/admin/LoginAdminController'
import { Router } from 'express'

const loginAdminRoute = Router()

const adminDatabaseRepository = new AdminDatabaseRepository()
const loginAdminUseCase = new LoginAdminUseCase(adminDatabaseRepository)
const loginAdminController = new LoginAdminController(loginAdminUseCase)

loginAdminRoute.post('/admin/login', loginAdminController.handle)

export { loginAdminRoute }
