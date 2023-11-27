import express from "express"
import cors from "cors"
import "dotenv/config"
import { userRoutes } from "./interfaces/routes/user"

const app = express()

// Middlewares
app.use(express.json())
app.use(cors({
  origin: "*"
}))

// Routes
app.use(userRoutes)

export { app };