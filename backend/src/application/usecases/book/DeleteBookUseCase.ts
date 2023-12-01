import { CustomError } from '@/domain/errors/CustomError'
import { BookRepository } from '@/domain/repositories/BookRepository'

class DeleteBookUseCase {
  private readonly bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async execute(id: string) {
    try {
      const bookExists = await this.bookRepository.findById(id)

      if (!bookExists) {
        throw new CustomError('Book not found', 404)
      }

      await this.bookRepository.delete(id)
    } catch (error) {
      throw new CustomError('Book not found', 404)
    }
  }
}

export { DeleteBookUseCase }
