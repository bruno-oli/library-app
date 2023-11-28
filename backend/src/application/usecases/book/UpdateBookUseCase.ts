import { BookDTO } from '@/application/dtos/BookDTO'
import { CustomError } from '@/domain/errors/CustomError'
import { BookRepository } from '@/domain/repositories/BookRepository'

class UpdateBookUseCase {
  private readonly bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async execute(id: string, book: BookDTO) {
    try {
      await this.bookRepository.update(id, book)
    } catch (error) {
      throw new CustomError('Internal server error', 500)
    }
  }
}

export { UpdateBookUseCase }
