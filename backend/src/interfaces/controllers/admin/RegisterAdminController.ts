import { RegisterAdminUseCase } from '@/application/usecases/admin/RegisterAdminUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { registerAdminSchema } from '@/interfaces/validation/schemas/admin/registerAdminSchema'
import { Request, Response } from 'express'

class RegisterAdminController {
  private readonly registerAdminUseCase: RegisterAdminUseCase

  constructor(registerAdminUseCase: RegisterAdminUseCase) {
    this.registerAdminUseCase = registerAdminUseCase
  }

  handle = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const admin = { name, email, password }

    const validateBody = registerAdminSchema.safeParse(admin)

    if (!validateBody.success) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    try {
      await this.registerAdminUseCase.execute(admin)

      return res.status(201).send()
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { RegisterAdminController }
