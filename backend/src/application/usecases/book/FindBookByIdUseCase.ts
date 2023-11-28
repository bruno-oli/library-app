import { CustomError } from '@/domain/errors/CustomError'
import { BookRepository } from '@/domain/repositories/BookRepository'

class FindBookByIdUseCase {
  private readonly bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async execute(id: string) {
    try {
      const books = await this.bookRepository.findById(id)

      if (!books) {
        throw new CustomError('Any book was found', 404)
      }

      return { books }
    } catch (error) {
      throw new CustomError('Internal server error', 500)
    }
  }
}

export { FindBookByIdUseCase }
