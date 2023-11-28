import { CustomError } from '@/domain/errors/CustomError'
import { BookRepository } from '@/domain/repositories/BookRepository'

class FindBookByNameUseCase {
  private readonly bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async execute(name: string) {
    try {
      const book = await this.bookRepository.findByName(name)

      if (!book) {
        throw new CustomError('Book not found', 404)
      }

      return { book }
    } catch (error) {
      throw new CustomError('Internal server error', 500)
    }
  }
}

export { FindBookByNameUseCase }
