import { DeleteOrderUseCase } from '@/application/usecases/order/DeleteOrderUseCase'
import { OrderDatabaseRepository } from '@/infrastructure/persistence/OrderDatabaseRepository'
import { UserDatabaseRepository } from '@/infrastructure/persistence/UserDatabaseRepository'
import { DeleteOrderController } from '@/interfaces/controllers/order/DeleteOrderController'
import { AuthUserMiddleware } from '@/interfaces/middlewares/AuthUserMiddleware'
import { Router } from 'express'

const deleteOrderRoute = Router()

const userRepository = new UserDatabaseRepository()
const authUserMiddleware = new AuthUserMiddleware(userRepository)

const orderRepository = new OrderDatabaseRepository()
const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository)
const deleteOrderController = new DeleteOrderController(deleteOrderUseCase)

deleteOrderRoute.delete(
  '/order/:id',
  authUserMiddleware.handle,
  deleteOrderController.handle,
)

export { deleteOrderRoute }
