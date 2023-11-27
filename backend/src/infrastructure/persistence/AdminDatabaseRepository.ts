import { CreateAdminDTO, AdminDTO } from '@/application/dtos/AdminDTO'
import { AdminRepository } from '@/domain/repositories/AdminRepository'
import { prisma } from '../PrismaInstance'

class AdminDatabaseRepository implements AdminRepository {
  async create(admin: CreateAdminDTO) {
    await prisma.admin.create({ data: admin })
  }

  async findByEmail(email: string) {
    return await prisma.admin.findUnique({ where: { email } })
  }

  async findById(id: string) {
    return await prisma.admin.findUnique({ where: { id } })
  }

  async update(id: string, admin: Partial<AdminDTO>) {
    await prisma.admin.update({ where: { id }, data: admin })
  }

  async delete(id: string) {
    await prisma.admin.delete({ where: { id } })
  }
}

export { AdminDatabaseRepository }
