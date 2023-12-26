import { UserAuthContext } from '@/context/user-auth-context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
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

const Header = () => {
  const { isAuthenticated, user, logoutUser } = useContext(UserAuthContext)
  return (
    <header className="py-8 container flex items-center justify-between">
      <h1 className="text-3xl font-bold">Library App</h1>

      {isAuthenticated ? (
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
      ) : (
        <Link className="text-xl" to="/login">
          <Button type="button">Entrar</Button>
        </Link>
      )}
    </header>
  )
}

export { Header }
