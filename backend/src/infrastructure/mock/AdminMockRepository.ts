import { CreateAdminDTO, AdminDTO } from '@/application/dtos/AdminDTO'
import { Admin } from '@/domain/entities/Admin'
import { AdminRepository } from '@/domain/repositories/AdminRepository'

class AdminMockRepository implements AdminRepository {
  public admins: Admin[] = []

  async create(admin: CreateAdminDTO) {
    this.admins.push({
      id: crypto.randomUUID(),
      email: admin.email,
      name: admin.name,
      password: admin.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  async findByEmail(email: string) {
    return this.admins.find((admin) => admin.email === email) || null
  }

  async findById(id: string) {
    return this.admins.find((admin) => admin.id === id) || null
  }

  async update(id: string, admin: Partial<AdminDTO>) {
    const adminIndex = this.admins.findIndex((admin) => admin.id === id)

    this.admins[adminIndex] = {
      ...this.admins[adminIndex],
      ...admin,
    }
  }

  async delete(id: string) {
    this.admins = this.admins.filter((admin) => admin.id !== id)
  }
}

export { AdminMockRepository }
