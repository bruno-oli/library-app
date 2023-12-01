import { CustomError } from '@/domain/errors/CustomError'
import { BookRepository } from '@/domain/repositories/BookRepository'

class GetBookByIdUseCase {
  private readonly bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async execute(id: string) {
    try {
      const book = await this.bookRepository.findById(id)

      if (!book) {
        throw new CustomError('Any book with this id was found', 404)
      }

      return book
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw new CustomError('Internal server error', 500)
    }
  }
}

export { GetBookByIdUseCase }
