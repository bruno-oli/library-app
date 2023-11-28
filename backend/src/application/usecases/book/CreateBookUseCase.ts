import { BookDTO } from '@/application/dtos/BookDTO'
import { CustomError } from '@/domain/errors/CustomError'
import { BookRepository } from '@/domain/repositories/BookRepository'

class CreateBookUseCase {
  private readonly bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async execute(book: BookDTO) {
    try {
      await this.bookRepository.create(book)
    } catch (error) {
      throw new CustomError('Internal server error', 500)
    }
  }
}

export { CreateBookUseCase }
