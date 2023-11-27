export interface AdminDTO {
  email: string
  name: string
}

export interface CreateAdminDTO extends AdminDTO {
  password: string
}
