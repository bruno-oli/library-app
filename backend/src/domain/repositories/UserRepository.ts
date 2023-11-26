import { CreateUserDTO, UserDTO } from "@/application/dtos/UserDTO";
import { User } from "../entities/User";

export interface UserRepository {
  create(user: CreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  update(user: Partial<UserDTO>): Promise<void>
  delete(id: string): Promise<void>
}