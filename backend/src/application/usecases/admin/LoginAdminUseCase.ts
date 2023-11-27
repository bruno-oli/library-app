import { CustomError } from '@/domain/errors/CustomError'
import { AdminRepository } from '@/domain/repositories/AdminRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class LoginAdminUseCase {
  private readonly adminRepository: AdminRepository

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository
  }

  async execute(email: string, password: string) {
    const admin = await this.adminRepository.findByEmail(email)

    if (!admin) {
      throw new CustomError('Invalid credentials', 401)
    }

    const passwordMatch = await bcrypt.compare(password, admin.password)

    if (!passwordMatch) {
      throw new CustomError('Invalid credentials', 401)
    }

    const secret = process.env.JWT_SECRET
    const token = jwt.sign({ id: admin.id, email, name: admin.name }, secret)

    return { token }
  }
}

export { LoginAdminUseCase }
