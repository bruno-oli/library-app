import { AuthUserUseCase } from '@/application/usecases/user/AuthUserUseCase'
import { UserDatabaseRepository } from '@/infrastructure/persistence/UserDatabaseRepository'
import { AuthUserController } from '@/interfaces/controllers/AuthUserController'
import { Router } from 'express'

const authUserRoute = Router()

const userDatabaseRepository = new UserDatabaseRepository()
const authUserUseCase = new AuthUserUseCase(userDatabaseRepository)
const authUserController = new AuthUserController(authUserUseCase)

authUserRoute.post('/auth', authUserController.handle)

export { authUserRoute }
