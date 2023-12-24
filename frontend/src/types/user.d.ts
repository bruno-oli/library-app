declare interface IUser {
  id: string
  name: string
  email: string
  iat: string
}

declare interface IUserLogin {
  email: string
  password: string
}

declare interface IUserLoginResponse {
  token: string
}

declare interface IUserRegister {
  name: string
  email: string
  password: string
}
