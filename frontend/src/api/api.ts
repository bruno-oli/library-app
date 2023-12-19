import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const delay = 1000
    return new Promise((resolve) => setTimeout(() => resolve(config), delay))
  },
  (error) => {
    return Promise.reject(error)
  },
)

export { api }
