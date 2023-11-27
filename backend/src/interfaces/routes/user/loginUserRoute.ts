import { LoginUserUseCase } from '@/application/usecases/user/LoginUserUseCase'
import { UserDatabaseRepository } from '@/infrastructure/persistence/UserDatabaseRepository'
import { LoginUserController } from '@/interfaces/controllers/user/LoginUserController'
import { Router } from 'express'

const loginUserRoute = Router()

const userDatabaseRepository = new UserDatabaseRepository()
const loginUserUseCase = new LoginUserUseCase(userDatabaseRepository)
const loginUserController = new LoginUserController(loginUserUseCase)

loginUserRoute.post('/user/login', loginUserController.handle)

export { loginUserRoute }
