import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom'
import { Home } from './home'
import { UserAuthContextProvider } from '@/context/user-auth-context'
import { ProtectedUserRoutes } from '@/utils/protected-user-routes'
import { AuthUserRoutes } from '@/utils/auth-user-routes'
import { Login } from './login'
import { Book } from './book'
import { CartContextProvider } from '@/context/cart-context'
import { Cart } from './cart'
const Routes = () => {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <CartContextProvider>
          <ReactRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<Book />} />

            <Route element={<AuthUserRoutes />}>
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedUserRoutes />}>
              <Route path="/cart" element={<Cart />} />
            </Route>
          </ReactRoutes>
        </CartContextProvider>
      </UserAuthContextProvider>
    </BrowserRouter>
  )
}

export { Routes }
