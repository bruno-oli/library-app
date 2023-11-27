import { BookDTO } from '@/application/dtos/BookDTO'
import { Book } from '../entities/Book'

export interface BookRepository {
  create(book: BookDTO): Promise<void>
  findById(id: string): Promise<Book>
  findByAuthor(author: string): Promise<Book[]>
  update(id: string, book: Partial<BookDTO>): Promise<void>
  delete(id: string): Promise<void>
}
