import { GetOrderByIdUseCase } from '@/application/usecases/order/GetOrderUseCase'
import { OrderDatabaseRepository } from '@/infrastructure/persistence/OrderDatabaseRepository'
import { OrderProductDatabaseRepository } from '@/infrastructure/persistence/OrderProductDatabaseRepository'
import { UserDatabaseRepository } from '@/infrastructure/persistence/UserDatabaseRepository'
import { GetOrderByIdController } from '@/interfaces/controllers/order/GetOrderByIdController'
import { AuthUserMiddleware } from '@/interfaces/middlewares/AuthUserMiddleware'
import { Router } from 'express'

const getOrderByIdRoute = Router()

const orderRepository = new OrderDatabaseRepository()
const orderProductRepository = new OrderProductDatabaseRepository()
const getOrderByIdUseCase = new GetOrderByIdUseCase(
  orderRepository,
  orderProductRepository,
)
const getOrderByIdController = new GetOrderByIdController(getOrderByIdUseCase)

const userRepository = new UserDatabaseRepository()
const authUserMiddleware = new AuthUserMiddleware(userRepository)

getOrderByIdRoute.get(
  '/order/:id',
  authUserMiddleware.handle,
  getOrderByIdController.handle,
)

export { getOrderByIdRoute }
