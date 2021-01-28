import { UserRepository } from '@useCases/ports/user-repository'
import { UserData } from '@entities/user/user-data'

export class PostgresUserRepository implements UserRepository {
  async exists(email: string): Promise<boolean> {
    if (email) return Promise.resolve(true)
    else return Promise.resolve(false)
  }

  async create(user: UserData): Promise<void> {
    console.log('created', user)
  }
}
