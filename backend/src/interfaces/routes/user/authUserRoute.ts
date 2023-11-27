import { AuthUserUseCase } from '@/application/usecases/user/AuthUserUseCase'
import { UserDatabaseRepository } from '@/infrastructure/persistence/UserDatabaseRepository'
import { AuthUserController } from '@/interfaces/controllers/user/AuthUserController'
import { Router } from 'express'

const authUserRoute = Router()

const userDatabaseRepository = new UserDatabaseRepository()
const authUserUseCase = new AuthUserUseCase(userDatabaseRepository)
const authUserController = new AuthUserController(authUserUseCase)

authUserRoute.post('/user/auth', authUserController.handle)

export { authUserRoute }
