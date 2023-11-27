import { RegisterUserUseCase } from '@/application/usecases/user/RegisterUserUseCase'
import { UserDatabaseRepository } from '@/infrastructure/persistence/UserDatabaseRepository'
import { RegisterUserController } from '@/interfaces/controllers/user/RegisterUserController'
import { Router } from 'express'

const registerUserRoute = Router()

const userDatabaseRepository = new UserDatabaseRepository()
const registerUserUseCase = new RegisterUserUseCase(userDatabaseRepository)
const registerUserController = new RegisterUserController(registerUserUseCase)

registerUserRoute.post('/user/register', registerUserController.handle)

export { registerUserRoute }
