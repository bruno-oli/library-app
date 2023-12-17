import { describe, expect, it } from 'vitest'
import { AdminMockRepository } from '@/infrastructure/mock/AdminMockRepository'
import { AuthAdminUseCase } from '@/application/usecases/admin/AuthAdminUseCase'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

describe('AuthAdminUseCase', () => {
  it('should auth an admin', async () => {
    const adminRepository = new AdminMockRepository()
    const authAdminUseCase = new AuthAdminUseCase(adminRepository)

    adminRepository.admins.push({
      id: crypto.randomUUID(),
      name: 'Jhon Doe',
      email: 'jhondoe@gmail',
      password: await bcrypt.hash('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const secret = process.env.JWT_SECRET
    const token = jwt.sign(
      {
        id: adminRepository.admins[0].id,
        email: adminRepository.admins[0].email,
        name: adminRepository.admins[0].name,
      },
      secret,
    )

    const admin = await authAdminUseCase.execute(token)

    expect(admin).toHaveProperty('id')
    expect(admin).toHaveProperty('name')
    expect(admin).toHaveProperty('email')
    expect(admin).toHaveProperty('iat')
  })

  it('should throw an error if admin not found', async () => {
    const adminRepository = new AdminMockRepository()
    const authAdminUseCase = new AuthAdminUseCase(adminRepository)

    const secret = process.env.JWT_SECRET
    const token = jwt.sign(
      {
        id: crypto.randomUUID(),
        email: 'jhondoe@gmail',
        name: 'Jhon Doe',
      },
      secret,
    )

    await expect(authAdminUseCase.execute(token)).rejects.toThrow()
  })
})
