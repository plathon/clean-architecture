import { UserData } from '@entities/user/user-data'
import { UserRepository } from '@useCases/ports/user-repository'
import { RegisterUserUseCase } from '@useCases/register-user-use-case'
import { RegisterUserController } from 'src/adapters/controllers/register-user-controller/register-user-controller'

class UserRepositoryImp implements UserRepository {
  exists(email: string) {
    if (email) return Promise.resolve(true)
    else return Promise.resolve(false)
  }

  async create(user: UserData) {
    console.log(user)
  }
}

const userRepository = new UserRepositoryImp()
const registerUserUseCase = new RegisterUserUseCase(userRepository)
export const registerUserController = new RegisterUserController(
  registerUserUseCase
)
