import { describe, expect, it } from 'vitest'
import { AuthUserUseCase } from '@/application/usecases/user/AuthUserUseCase'
import { UserMockRepository } from '@/infrastructure/mock/UserMockRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

describe('AuthUserUseCase', () => {
  it('should auth a user', async () => {
    const userMockRepository = new UserMockRepository()
    const authUserUseCase = new AuthUserUseCase(userMockRepository)

    userMockRepository.users.push({
      id: crypto.randomUUID(),
      name: 'Jhon Doe',
      email: 'jhondoe@gmail',
      password: bcrypt.hashSync('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const secret = process.env.JWT_SECRET
    const token = jwt.sign(
      {
        id: userMockRepository.users[0].id,
        email: userMockRepository.users[0].email,
        name: userMockRepository.users[0].name,
      },
      secret,
    )

    const user = await authUserUseCase.execute(token)

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('iat')
  })

  it('should throw an error if user not found', async () => {
    const userMockRepository = new UserMockRepository()
    const authUserUseCase = new AuthUserUseCase(userMockRepository)

    const secret = process.env.JWT_SECRET
    const token = jwt.sign(
      {
        id: crypto.randomUUID(),
        email: 'jhondoe@gmail',
        name: 'Jhon Doe',
      },
      secret,
    )

    await expect(authUserUseCase.execute(token)).rejects.toThrow()
  })
})
