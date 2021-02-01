import { PostgresUserRepository } from '@external/repositories/postgres/postgres-user-repository'
import { RegisterUserUseCase } from './register-user-use-case'
import { InvalidNameError } from '@entities/user/errors/invalid-name-error'
import { InvalidEmailError } from '@entities/user/errors/invalid-email-error'
import { User } from '@entities/user/user'

import faker from 'faker'

const userRepository = new PostgresUserRepository()
const registerUserUseCase = new RegisterUserUseCase(userRepository)

const name = `${faker.name.firstName()} ${faker.name.lastName()}`
const email = faker.internet.email()

describe('Register user use case', () => {
  test('should return Invalid Name Error when wrong name is provide', async () => {
    const userData = { name: '', email }
    const result = await registerUserUseCase.execute(userData)
    const error = result.value
    expect(error).toBeInstanceOf(InvalidNameError)
    const errorMessage = error as InvalidNameError
    expect(errorMessage.message).toBe('the name:  is not valid')
  })

  test('should return Invalid Email Error when wrong email is provide', async () => {
    const userData = { name, email: '' }
    const result = await registerUserUseCase.execute(userData)
    const error = result.value
    expect(error).toBeInstanceOf(InvalidEmailError)
    const errorMessage = error as InvalidEmailError
    expect(errorMessage.message).toBe('the email:  is not valid')
  })

  test('should return userData (obj) when a new user is created', async () => {
    const userData = { name, email }
    const result = await registerUserUseCase.execute(userData)
    expect(result.value).toBeInstanceOf(User)
  })
})
