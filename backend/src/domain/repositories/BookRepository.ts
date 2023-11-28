import { BookDTO } from '@/application/dtos/BookDTO'
import { Book } from '../entities/Book'

export interface BookRepository {
  create(book: BookDTO): Promise<void>
  findById(id: string): Promise<Book | null>
  findByAuthor(author: string): Promise<Book[] | null>
  findByName(name: string): Promise<Book[] | null>
  update(id: string, book: Partial<BookDTO>): Promise<void>
  delete(id: string): Promise<void>
}
