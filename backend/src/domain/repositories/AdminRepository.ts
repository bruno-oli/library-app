import { Admin } from "../entities/Admin"
import { AdminDTO, CreateAdminDTO } from "@/application/dtos/AdminDTO"

export interface AdminRepository {
  create(admin: CreateAdminDTO): Promise<void>
  findByEmail(email: string): Promise<Admin>
  findById(id: string): Promise<Admin>
  update(admin: Partial<AdminDTO>): Promise<void>
  delete(id: string): Promise<void>
}