import { UserAuthContext } from '@/context/user-auth-context'
import { useContext, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { ShoppingBasket } from 'lucide-react'
import { CartContext } from '@/context/cart-context'

const Header = () => {
  const { isAuthenticated, user, logoutUser } = useContext(UserAuthContext)
  const { products } = useContext(CartContext)

  const cartIconRef = useRef<HTMLAnchorElement>(null)

  return (
    <header className="py-8 container flex items-center justify-between">
      <Link to="/">
        <h1 className="text-3xl font-bold">Library App</h1>
      </Link>

      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${user?.name}`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>
                Olá, <strong>{user?.name} 👋</strong>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <PersonIcon /> <Link to="/profile">Meu perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 flex items-center gap-2"
                onClick={logoutUser}
              >
                <ExitIcon /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink to="/cart" className="relative" ref={cartIconRef}>
            <ShoppingBasket
              className={`hover:text-primary transition-colors ${
                cartIconRef.current?.classList.contains('active') &&
                'text-primary'
              }`}
            />

            <span className="absolute -right-2 -bottom-3 w-5 h-5 rounded-full bg-foreground text-primary flex items-center justify-center">
              {products.length}
            </span>
          </NavLink>
        </div>
      ) : (
        <Link className="text-xl" to="/login">
          <Button type="button">Entrar</Button>
        </Link>
      )}
    </header>
  )
}

export { Header }
