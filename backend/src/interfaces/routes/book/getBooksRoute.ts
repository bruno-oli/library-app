import { GetBooksUseCase } from '@/application/usecases/book/GetBooksUseCase'
import { BookDatabaseRepository } from '@/infrastructure/persistence/BookDatabaseRepository'
import { GetBooksController } from '@/interfaces/controllers/book/GetBooksController'
import { Router } from 'express'

const getBooksRoute = Router()

const bookDatabaseRepository = new BookDatabaseRepository()
const getBooksUseCase = new GetBooksUseCase(bookDatabaseRepository)
const getBooksController = new GetBooksController(getBooksUseCase)

getBooksRoute.get('/book', getBooksController.handle)

export { getBooksRoute }
