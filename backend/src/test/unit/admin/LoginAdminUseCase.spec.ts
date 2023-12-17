import { describe, expect, it } from 'vitest'
import { AdminMockRepository } from '@/infrastructure/mock/AdminMockRepository'
import { LoginAdminUseCase } from '@/application/usecases/admin/LoginAdminUseCase'
import bcrypt from 'bcrypt'

describe('LoginAdminUseCase', () => {
  it('should login an admin', async () => {
    const adminRepository = new AdminMockRepository()
    const loginAdminUseCase = new LoginAdminUseCase(adminRepository)

    adminRepository.admins.push({
      id: crypto.randomUUID(),
      name: 'Jhon Doe',
      email: 'jhondoe@gmail',
      password: await bcrypt.hash('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const admin = await loginAdminUseCase.execute('jhondoe@gmail', '123456')

    expect(admin).toHaveProperty('token')
  })

  it('should throw an error if admin not found', async () => {
    const adminRepository = new AdminMockRepository()
    const loginAdminUseCase = new LoginAdminUseCase(adminRepository)

    await expect(
      loginAdminUseCase.execute('jhondoe@gmail', '123456'),
    ).rejects.toThrow()
  })

  it('should throw an error if password is incorrect', async () => {
    const adminRepository = new AdminMockRepository()
    const loginAdminUseCase = new LoginAdminUseCase(adminRepository)

    adminRepository.admins.push({
      id: crypto.randomUUID(),
      name: 'Jhon Doe',
      email: 'jhondoe@gmail',
      password: await bcrypt.hash('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await expect(
      loginAdminUseCase.execute('jhondoe@gmail', '1234567'),
    ).rejects.toThrow()
  })
})
