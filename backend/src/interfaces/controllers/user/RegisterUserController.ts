import { RegisterUserUseCase } from '@/application/usecases/user/RegisterUserUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { Request, Response } from 'express'
import { registerUserSchema } from '../../validation/schemas/user/registerUserSchema'

class RegisterUserController {
  private readonly registerUserUseCase: RegisterUserUseCase

  constructor(registerUserUseCase: RegisterUserUseCase) {
    this.registerUserUseCase = registerUserUseCase
  }

  handle = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const user = { name, email, password }

    const validateUser = registerUserSchema.safeParse(user)

    if (!validateUser.success) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    try {
      await this.registerUserUseCase.execute(user)

      return res.status(201).send()
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { RegisterUserController }
