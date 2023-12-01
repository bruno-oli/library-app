import { UpdateBookUseCase } from '@/application/usecases/book/UpdateBookUseCase'
import { AdminDatabaseRepository } from '@/infrastructure/persistence/AdminDatabaseRepository'
import { BookDatabaseRepository } from '@/infrastructure/persistence/BookDatabaseRepository'
import { UpdateBookController } from '@/interfaces/controllers/book/UpdateBookController'
import { AuthAdminMiddleware } from '@/interfaces/middlewares/AuthAdminMiddleware'
import { Router } from 'express'

const updateBookRoute = Router()

const bookDatabaseRepository = new BookDatabaseRepository()
const updateBookUseCase = new UpdateBookUseCase(bookDatabaseRepository)
const updateBookController = new UpdateBookController(updateBookUseCase)

const adminDatabaseRepository = new AdminDatabaseRepository()
const authAdminMiddleware = new AuthAdminMiddleware(adminDatabaseRepository)

updateBookRoute.patch(
  '/book/:id',
  authAdminMiddleware.handle,
  updateBookController.handle,
)

export { updateBookRoute }
