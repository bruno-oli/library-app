import { DeleteBookUseCase } from '@/application/usecases/book/DeleteBookUseCase'
import { AdminDatabaseRepository } from '@/infrastructure/persistence/AdminDatabaseRepository'
import { BookDatabaseRepository } from '@/infrastructure/persistence/BookDatabaseRepository'
import { DeleteBookController } from '@/interfaces/controllers/book/DeleteBookController'
import { AuthAdminMiddleware } from '@/interfaces/middlewares/AuthAdminMiddleware'
import { Router } from 'express'

const deleteBookRoute = Router()

const adminDatabaseRepository = new AdminDatabaseRepository()
const authAdminMiddleware = new AuthAdminMiddleware(adminDatabaseRepository)

const bookDatabaseRepository = new BookDatabaseRepository()
const deleteBookUseCase = new DeleteBookUseCase(bookDatabaseRepository)
const deleteBookController = new DeleteBookController(deleteBookUseCase)

deleteBookRoute.delete(
  '/books/:id',
  authAdminMiddleware.handle,
  deleteBookController.handle,
)

export { deleteBookRoute }
