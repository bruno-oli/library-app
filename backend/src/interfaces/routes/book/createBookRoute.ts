import { CreateBookUseCase } from '@/application/usecases/book/CreateBookUseCase'
import { AdminDatabaseRepository } from '@/infrastructure/persistence/AdminDatabaseRepository'
import { BookDatabaseRepository } from '@/infrastructure/persistence/BookDatabaseRepository'
import { CreateBookController } from '@/interfaces/controllers/book/CreateBookController'
import { AuthAdminMiddleware } from '@/interfaces/middlewares/AuthAdminMiddleware'
import { Router } from 'express'

const createBookRoute = Router()

const bookDatabaseRepository = new BookDatabaseRepository()
const createBookUseCase = new CreateBookUseCase(bookDatabaseRepository)
const createBookController = new CreateBookController(createBookUseCase)

const adminDatabaseRepository = new AdminDatabaseRepository()
const authAdminMiddleware = new AuthAdminMiddleware(adminDatabaseRepository)

createBookRoute.post(
  '/book',
  authAdminMiddleware.handle,
  createBookController.handle,
)

export { createBookRoute }
