import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { routes } from './interfaces/routes'

const app = express()

// Middlewares
app.use(express.json())
app.use(
  cors({
    origin: '*',
  }),
)

// Routes
app.use(routes)

export { app }
