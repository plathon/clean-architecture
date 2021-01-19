import { UserData } from '@entities/user/user-data'

export interface UserRepository {
  exists(email: string): Promise<boolean>
  create(user: UserData): Promise<void>
}
