import { BookDTO } from '@/application/dtos/BookDTO'
import { BookRepository } from '@/domain/repositories/BookRepository'
import { prisma } from '../PrismaInstance'

class BookDatabaseRepository implements BookRepository {
  async create(book: BookDTO) {
    await prisma.book.create({
      data: book,
    })
  }

  async findById(id: string) {
    return await prisma.book.findUnique({ where: { id } })
  }

  async findByName(name: string) {
    return await prisma.book.findMany({ where: { name } })
  }

  async findByAuthor(author: string) {
    return await prisma.book.findMany({ where: { author } })
  }

  async update(id: string, book: Partial<BookDTO>) {
    await prisma.book.update({ where: { id }, data: book })
  }

  async delete(id: string) {
    await prisma.book.delete({ where: { id } })
  }
}

export { BookDatabaseRepository }
