import { logoutAdmin } from '@/services/admin-services'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Label } from './ui/label'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from './ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet'
import { useAdminAuthStore } from '@/store/admin-auth-store'

const AdminDropdown = () => {
  const {
    state: { admin },
    // actions: { setAdmin },
  } = useAdminAuthStore()

  return (
    <Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${admin?.name}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>{admin?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <SheetTrigger className="w-full">
            <DropdownMenuItem>Editar dados</DropdownMenuItem>
          </SheetTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center font-bold text-destructive"
            onClick={logoutAdmin}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Dados</SheetTitle>
          <SheetDescription>Edite suas informações</SheetDescription>
        </SheetHeader>
        <form className="mt-4 flex w-full flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              value={admin?.name}
              placeholder="Nome"
              type="text"
              id="name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={admin?.email}
              placeholder="Email"
              type="email"
              id="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current-password">Senha atual</Label>
            <Input
              placeholder="Insira a sua senha atual"
              id="current-password"
              type="password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">Nova senha</Label>
            <Input
              placeholder="Insira a sua senha nova"
              id="new-password"
              type="password"
            />
          </div>

          <SheetTrigger className="self-end">
            <Button variant={'default'}>Salvar</Button>
          </SheetTrigger>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export { AdminDropdown }
