import { UpdateAdminDTO } from '@/application/dtos/AdminDTO'
import { shallowComparison } from '@/application/utils/shallowComparision'
import { Admin } from '@/domain/entities/Admin'
import { CustomError } from '@/domain/errors/CustomError'
import { AdminRepository } from '@/domain/repositories/AdminRepository'
import bcrypt from 'bcrypt'

class UpdateAdminUseCase {
  private readonly adminRepository: AdminRepository

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository
  }

  async execute(id: string, admin: Partial<UpdateAdminDTO>) {
    const adminExists = await this.adminRepository.findById(id)

    if (!adminExists) {
      throw new CustomError('Admin nao encontrado', 404)
    }

    if (
      (admin.currentPassword && !admin.newPassword) ||
      (admin.newPassword && !admin.currentPassword)
    ) {
      throw new CustomError('Requisição invalida', 400)
    }

    if (admin.currentPassword && admin.newPassword) {
      const passwordMatch = await bcrypt.compare(
        admin.currentPassword,
        adminExists.password,
      )

      if (!passwordMatch) {
        throw new CustomError('Nao autorizado', 401)
      }

      const passwordHash = await bcrypt.hash(admin.newPassword, 10)

      admin.newPassword = passwordHash
    }

    await this.adminRepository.update(id, {
      email: admin.email,
      name: admin.name,
      password: admin.newPassword,
    })

    const updatedAdmin = (await this.adminRepository.findById(id)) as Admin

    const isUnmodified = shallowComparison(adminExists, updatedAdmin, [
      'updatedAt',
      'createdAt',
    ])

    console.log(isUnmodified)

    if (isUnmodified) {
      throw new CustomError('Nao modificado', 304)
    }
  }
}

export { UpdateAdminUseCase }
