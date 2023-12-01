import { Router } from 'express'
import { createBookRoute } from './createBookRoute'
import { deleteBookRoute } from './deleteBookRoute'
import { updateBookRoute } from './updateBookRoute'
import { getBooksRoute } from './getBooksRoute'
import { getBookByIdRoute } from './getBookByIdRoute'

const bookRoutes = Router()

bookRoutes.use(createBookRoute)
bookRoutes.use(deleteBookRoute)
bookRoutes.use(updateBookRoute)
bookRoutes.use(getBooksRoute)
bookRoutes.use(getBookByIdRoute)

export { bookRoutes }
