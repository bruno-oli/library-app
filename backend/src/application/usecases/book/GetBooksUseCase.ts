import { Book } from '@/domain/entities/Book'
import { CustomError } from '@/domain/errors/CustomError'
import { BookRepository } from '@/domain/repositories/BookRepository'

class GetBooksUseCase {
  private readonly bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async execute(params?: Partial<Book>) {
    try {
      const books = await this.bookRepository.findAll(params)

      if (!books || !books.length) {
        throw new CustomError('Any book was found', 404)
      }

      return { books }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw new CustomError('Internal server error', 500)
    }
  }
}

export { GetBooksUseCase }
