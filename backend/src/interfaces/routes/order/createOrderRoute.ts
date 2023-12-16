import { CreateOrderUseCase } from '@/application/usecases/order/CreateOrderUseCase'
import { OrderDatabaseRepository } from '@/infrastructure/persistence/OrderDatabaseRepository'
import { UserDatabaseRepository } from '@/infrastructure/persistence/UserDatabaseRepository'
import { CreateOrderController } from '@/interfaces/controllers/order/CreateOrderController'
import { AuthUserMiddleware } from '@/interfaces/middlewares/AuthUserMiddleware'
import { Router } from 'express'

const createOrderRoute = Router()

const orderRepository = new OrderDatabaseRepository()
const createOrderUseCase = new CreateOrderUseCase(orderRepository)
const createOrderController = new CreateOrderController(createOrderUseCase)

const userRepository = new UserDatabaseRepository()
const authUserMiddleware = new AuthUserMiddleware(userRepository)

createOrderRoute.post(
  '/order',
  authUserMiddleware.handle,
  createOrderController.handle,
)

export { createOrderRoute }
