export interface AdminDTO {
  email: string
  name: string
}

export interface CreateAdminDTO extends AdminDTO {
  password: string
}

export interface AuthAdminDTO extends AdminDTO {
  id: string
  iat: number
}
