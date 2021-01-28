import { RegisterUserUseCase } from '@useCases/register-user-use-case'
import { RegisterUserController } from '@adapters/controllers/register-user-controller/register-user-controller'
import { PostgresUserRepository } from '@external/repositories/postgres/postgres-user-repository'

const userRepository = new PostgresUserRepository()
const registerUserUseCase = new RegisterUserUseCase(userRepository)
export const registerUserController = new RegisterUserController(
  registerUserUseCase
)
