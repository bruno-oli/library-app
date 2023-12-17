import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>

      <Toaster />
    </BrowserRouter>
  )
}

export { App }
