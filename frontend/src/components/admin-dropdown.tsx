import { logoutAdmin, updateAdmin } from '@/services/admin-services'
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
import {
  UpdateAdminSchema,
  updateAdminSchema,
} from '@/schemas/update-admin.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useToast } from './ui/use-toast'
import { useState } from 'react'
import { shallowComparison } from '@/utils/shallowComparision'
import { ToastAction } from './ui/toast'

const AdminDropdown = () => {
  const {
    state: { admin },
    // actions: { setAdmin },
  } = useAdminAuthStore()

  const {
    handleSubmit,
    formState: { errors, dirtyFields },
    register,
  } = useForm<UpdateAdminSchema>({
    resolver: zodResolver(updateAdminSchema),
    defaultValues: {
      name: admin?.name,
      email: admin?.email,
    },
  })

  const { toast } = useToast()

  const [isFetching, setIsFetching] = useState(false)
  const [sheetIsOpen, setSheetIsOpen] = useState(false)

  async function handleUpdateAdmin(data: UpdateAdminSchema) {
    setIsFetching(true)
    try {
      await updateAdmin(data)

      toast({
        description:
          'Dados atualizados com sucesso! Recarregue a pagina para ver as alterações',
        title: 'Sucesso',
        action: (
          <ToastAction
            altText="Recarregar pagina"
            onClick={() => window.location.reload()}
          >
            Recarregar pagina
          </ToastAction>
        ),
      })

      setSheetIsOpen(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 304) {
          return
        }

        return toast({
          description: error.response?.data.error,
          title: 'Algo deu errado',
          variant: 'destructive',
        })
      }
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
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
          <SheetDescription>
            Edite suas informações. Deixe em branco os campos que você não
            deseja alterar
          </SheetDescription>
        </SheetHeader>
        <form
          className="mt-4 flex w-full flex-col gap-4"
          onSubmit={handleSubmit(handleUpdateAdmin)}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              placeholder="Nome"
              type="text"
              id="name"
              {...register('name')}
            />

            <p className="text-sm text-red-500">{errors.name?.message}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Email"
              type="email"
              id="email"
              {...register('email')}
            />

            <p className="text-sm text-red-500">{errors.email?.message}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="current-password">Senha atual</Label>
            <Input
              placeholder="Insira a sua senha atual"
              id="current-password"
              type="password"
              {...register('currentPassword')}
            />

            <p className="text-sm text-red-500">
              {errors.currentPassword?.message}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">Nova senha</Label>
            <Input
              placeholder="Insira a sua senha nova"
              id="new-password"
              type="password"
              {...register('newPassword')}
            />

            <p className="text-sm text-red-500">
              {errors.newPassword?.message}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">Confirme a nova senha</Label>
            <Input
              placeholder="Insira a sua senha nova"
              id="new-password"
              type="password"
              {...register('newPasswordConfirm')}
            />

            <p className="text-sm text-red-500">
              {errors.newPasswordConfirm?.message}
            </p>
          </div>

          <Button
            variant={'default'}
            type="submit"
            disabled={isFetching || shallowComparison(dirtyFields, {})}
          >
            Salvar
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export { AdminDropdown }
