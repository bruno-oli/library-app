import { AuthAdminDTO } from '@/application/dtos/AdminDTO'
import { CustomError } from '@/domain/errors/CustomError'
import { AdminRepository } from '@/domain/repositories/AdminRepository'
import jwt from 'jsonwebtoken'

class AuthAdminUseCase {
  private readonly adminRepository: AdminRepository

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository
  }

  async execute(token: string) {
    const secret = process.env.JWT_SECRET

    try {
      const decoded = jwt.verify(token, secret) as AuthAdminDTO
      const admin = await this.adminRepository.findById(decoded.id)

      if (!admin) {
        throw new CustomError('Invalid credentials', 401)
      }

      return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        iat: decoded.iat,
      }
    } catch (error) {
      throw new CustomError('Invalid credentials', 401)
    }
  }
}

export { AuthAdminUseCase }
