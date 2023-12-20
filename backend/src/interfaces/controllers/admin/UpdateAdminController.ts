import { UpdateAdminUseCase } from '@/application/usecases/admin/UpdateAdminUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { updateAdminSchema } from '@/interfaces/validation/schemas/admin/updateAdminSchema'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class UpdateAdminController {
  private readonly updateAdminUseCase: UpdateAdminUseCase

  constructor(updateAdminUseCase: UpdateAdminUseCase) {
    this.updateAdminUseCase = updateAdminUseCase
  }

  handle = async (req: Request, res: Response) => {
    const [, token] = req.headers.authorization?.split(' ') || []

    const { id } = jwt.decode(token) as { id: string }

    const { name, email, currentPassword, newPassword } = req.body

    const validateRequestBody = updateAdminSchema.safeParse({
      name,
      email,
      currentPassword,
      newPassword,
    })

    if (!validateRequestBody.success) {
      return res.status(400).json({ error: 'Corpo da requisição inválido' })
    }

    try {
      await this.updateAdminUseCase.execute(id, {
        name,
        email,
        currentPassword,
        newPassword,
      })

      return res.status(204).send()
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { UpdateAdminController }
