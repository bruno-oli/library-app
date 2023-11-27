import { CreateAdminDTO } from '@/application/dtos/AdminDTO'
import { CustomError } from '@/domain/errors/CustomError'
import { AdminRepository } from '@/domain/repositories/AdminRepository'
import bcrypt from 'bcrypt'

class RegisterAdminUseCase {
  private readonly adminRepository: AdminRepository

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository
  }

  async execute(admin: CreateAdminDTO) {
    const adminExists = await this.adminRepository.findByEmail(admin.email)

    if (adminExists) {
      throw new CustomError('Admin already exists', 409)
    }

    const passwordHash = await bcrypt.hash(admin.password, 10)

    try {
      await this.adminRepository.create({ ...admin, password: passwordHash })
    } catch (error) {
      throw new CustomError('Internal server error', 500)
    }
  }
}

export { RegisterAdminUseCase }
