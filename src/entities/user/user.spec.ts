import { User } from './user'
import faker from 'faker'
import { InvalidNameError } from './errors/invalid-name-error'
import { InvalidEmailError } from './errors/invalid-email-error'

const email = faker.internet.email()
const name = `${faker.name.firstName()} ${faker.name.lastName()}`
const bigName =
  'MuSwKxjkuE4DMRMo4eoj7gdnC6m47o4YUUsMSJQzoBJEfiEfzyk1xiPM6YuNFlvw6B9yJN6jkHD4bQ3cfBQA83pbT0FkCUv1DcX2R5yctN69HHQkB3dnEWLAqenL1Xp6eGNFdxnEoD1dajn82LMEVwL7JHlnSPYQsXuzrrarsnbTzZMtfpIN9MTq4ZwQfJjvjOtqu7nzMTqK57zJoXEFL0eZ4xyti0lmJTGaWfsCE6lkk6pFNvyfJkxVbZR2o21W'

describe('User Entity', () => {
  test('should return invalid name error when a empty name is provide', () => {
    const userData = { name: '', email: email }
    const user = User.create(userData)
    expect(user.isLeft()).toBe(true)
    expect(user.isRight()).toBe(false)
    expect(user.value).toBeInstanceOf(InvalidNameError)
    const error = user.value as InvalidNameError
    expect(error.message).toBe('the name:  is not valid')
  })

  test('should return invalid name error when name length is less than 2 characters', () => {
    const userData = { name: name.substr(0, 1), email: email }
    const user = User.create(userData)
    expect(user.isLeft()).toBe(true)
    expect(user.isRight()).toBe(false)
    expect(user.value).toBeInstanceOf(InvalidNameError)
    const error = user.value as InvalidNameError
    expect(error.message).toBe(`the name: ${name.substr(0, 1)} is not valid`)
  })

  test('should return invalid name error when name length is greater than 255 characters', () => {
    const userData = { name: bigName, email: email }
    const user = User.create(userData)
    expect(user.isLeft()).toBe(true)
    expect(user.isRight()).toBe(false)
    expect(user.value).toBeInstanceOf(InvalidNameError)
  })

  test.only('should return invalid email error when a invalid email is provide', () => {
    const invalidEmail = '@mail.com'
    const userData = { name: name, email: invalidEmail }
    const user = User.create(userData)
    expect(user.isLeft()).toBe(true)
    expect(user.isRight()).toBe(false)
    expect(user.value).toBeInstanceOf(InvalidEmailError)
    const error = user.value as InvalidNameError
    expect(error.message).toBe('the email: @mail.com is not valid')
  })
})
