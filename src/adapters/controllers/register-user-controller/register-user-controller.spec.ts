import { RegisterUserController } from './register-user-controller'
import { RegisterUserUseCase } from '@useCases/register-user-use-case'
import { PostgresUserRepository } from '@external/repositories/postgres/postgres-user-repository'
import { HttpRequest } from '../ports/http'

jest.mock('@useCases/register-user-use-case', () => {
  return {
    RegisterUserUseCase: jest.fn().mockImplementation(() => {
      return { execute: jest.fn() }
    })
  }
})

const userRepository = new PostgresUserRepository()
const registerUserUseCase = new RegisterUserUseCase(userRepository)
const registerUserController = new RegisterUserController(registerUserUseCase)

describe('register user controller', () => {
  test('should return status code 400 when name is not provided ', async () => {
    const params: HttpRequest<any> = {
      body: { email: 'john@mail.com' }
    }
    const expected = { message: 'Missing param: name' }
    const result = await registerUserController.execute(params)
    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(expected)
  })

  test('should return status code 400 when email is not provided', async () => {
    const params: HttpRequest<any> = {
      body: { name: 'john lennon' }
    }
    const expected = { message: 'Missing param: email' }
    const result = await registerUserController.execute(params)
    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(expected)
  })

  test('should call registerUserUseCase.execute method with user data', async () => {
    const userData = { name: 'john lennon', email: 'john@mail.com' }
    const params: HttpRequest<any> = {
      body: userData
    }
    expect(registerUserUseCase.execute).not.toHaveBeenCalled()
    await registerUserController.execute(params)
    expect(registerUserUseCase.execute).toHaveBeenCalledWith(userData)
  })

  test('should return a badRequest when registerUserUseCase return error', async () => {
    const userData = { name: 'john lennon', email: 'john@mail.com' }
    const params: HttpRequest<any> = {
      body: userData
    }
    const mockedErrorMessage = 'mocked error message'
    const expected = { message: mockedErrorMessage }
    registerUserUseCase.execute = jest.fn().mockResolvedValue({
      isLeft: jest.fn().mockReturnValue('true'),
      value: new Error(mockedErrorMessage)
    })
    const result = await registerUserController.execute(params)

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(expected)
  })

  test('should return status code 500 when registerUserUseCase throws an error', async () => {
    const userData = { name: 'john lennon', email: 'john@mail.com' }
    const params: HttpRequest<any> = {
      body: userData
    }
    registerUserUseCase.execute = jest.fn().mockRejectedValue(new Error())
    const result = await registerUserController.execute(params)
    expect(result.statusCode).toBe(500)
  })

  test('should return status code 200 when email and name are correctly provided', async () => {
    const userData = { name: 'john lennon', email: 'john@mail.com' }
    const params: HttpRequest<any> = {
      body: userData
    }
    registerUserUseCase.execute = jest.fn().mockResolvedValue({
      isLeft: jest.fn().mockReturnValue(false)
    })
    const result = await registerUserController.execute(params)
    expect(result.statusCode).toBe(200)
    expect(result.body).toBe(userData)
  })
})
