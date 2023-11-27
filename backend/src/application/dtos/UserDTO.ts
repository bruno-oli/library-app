export interface UserDTO {
  email: string
  name: string
}

export interface CreateUserDTO extends UserDTO {
  password: string
}

export interface AuthUserDTO extends UserDTO {
  id: string
  iat: number
}
