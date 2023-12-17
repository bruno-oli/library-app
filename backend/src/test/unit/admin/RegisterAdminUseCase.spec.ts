import { describe, it, expect } from 'vitest'
import { RegisterAdminUseCase } from '@/application/usecases/admin/RegisterAdminUseCase'
import { AdminMockRepository } from '@/infrastructure/mock/AdminMockRepository'
import { CreateAdminDTO } from '@/application/dtos/AdminDTO'

describe('RegisterAdminUseCase', () => {
  it('should register an admin', async () => {
    const adminRepository = new AdminMockRepository()
    const registerAdminUseCase = new RegisterAdminUseCase(adminRepository)

    const admin: CreateAdminDTO = {
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    }

    await registerAdminUseCase.execute(admin)

    expect(adminRepository.admins).toHaveLength(1)
  })

  it('should admin id is a uuid', async () => {
    const adminRepository = new AdminMockRepository()
    const registerAdminUseCase = new RegisterAdminUseCase(adminRepository)

    const admin: CreateAdminDTO = {
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    }

    await registerAdminUseCase.execute(admin)

    const uuidRegex =
      /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/

    expect(adminRepository.admins[0].id).toMatch(uuidRegex)
  })

  it('should throw an error if admin already exists', async () => {
    const adminRepository = new AdminMockRepository()
    const registerAdminUseCase = new RegisterAdminUseCase(adminRepository)

    const admin: CreateAdminDTO = {
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    }

    await registerAdminUseCase.execute(admin)

    await expect(registerAdminUseCase.execute(admin)).rejects.toThrow()
  })

  it('should password be hashed', async () => {
    const adminRepository = new AdminMockRepository()
    const registerAdminUseCase = new RegisterAdminUseCase(adminRepository)

    const admin: CreateAdminDTO = {
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    }

    await registerAdminUseCase.execute(admin)

    expect(adminRepository.admins[0].password).not.toBe('123456')
  })
})
