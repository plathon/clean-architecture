import faker from 'faker'
import { UserValidator } from './user-validator'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'
import { User } from './user'

const name = faker.name.firstName()
const email = faker.internet.email()

describe('User Entity', () => {
  test('should return invalid name error when an invalid name is provide', () => {
    const userData = { name: '', email }
    const spied = jest.spyOn(UserValidator, 'validateName')
    expect(spied).not.toHaveBeenCalled()
    const result = User.create(userData)
    expect(spied).toHaveBeenCalledWith(userData.name)
    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    const error = result.value
    expect(error).toBeInstanceOf(InvalidNameError)
  })

  test('should return invalid email error when an invalid email is provide', () => {
    const userData = { name, email: '@mail.com' }
    const spied = jest.spyOn(UserValidator, 'validateEmail')
    expect(spied).not.toHaveBeenCalled()
    const result = User.create(userData)
    expect(spied).toHaveBeenCalledWith(userData.email)
    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    const error = result.value
    expect(error).toBeInstanceOf(InvalidEmailError)
  })

  test('should return an instance of User when valid credentials is provide', () => {
    const userData = { name, email }
    const spiedName = jest.spyOn(UserValidator, 'validateName')
    const spiedEmail = jest.spyOn(UserValidator, 'validateEmail')
    expect(spiedName).not.toHaveBeenCalled()
    expect(spiedEmail).not.toHaveBeenCalled()
    const result = User.create(userData)
    expect(spiedName).toHaveBeenCalledWith(userData.name)
    expect(spiedEmail).toHaveBeenCalledWith(userData.email)
    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    const user = result.value
    expect(user).toBeInstanceOf(User)
  })
})
