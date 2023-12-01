import { GetBookByIdUseCase } from '@/application/usecases/book/GetBookByIdUseCase'
import { BookDatabaseRepository } from '@/infrastructure/persistence/BookDatabaseRepository'
import { GetBookByIdController } from '@/interfaces/controllers/book/GetBookByIdController'
import { Router } from 'express'

const getBookByIdRoute = Router()

const bookDatabaseRepository = new BookDatabaseRepository()
const getBookByIdUseCase = new GetBookByIdUseCase(bookDatabaseRepository)
const getBookByIdController = new GetBookByIdController(getBookByIdUseCase)

getBookByIdRoute.get('/book/:id', getBookByIdController.handle)

export { getBookByIdRoute }
