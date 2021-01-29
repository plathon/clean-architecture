import { UserValidator } from './user-validator'
import faker from 'faker'

describe('user validator', () => {
  test('should return false when a empty name is provide', () => {
    const name = ''
    const result = UserValidator.validateName(name)
    expect(result).toBe(false)
  })

  test('should return false when name length is less than 2 characters', () => {
    const name = 'a'
    const result = UserValidator.validateName(name)
    expect(result).toBe(false)
  })

  test('should return false when name length is greater than 255 characters', () => {
    const name =
      'MuSwKxjkuE4DMRMo4eoj7gdnC6m47o4YUUsMSJQzoBJEfiEfzyk1xiPM6YuNFlvw6B9yJN6jkHD4bQ3cfBQA83pbT0FkCUv1DcX2R5yctN69HHQkB3dnEWLAqenL1Xp6eGNFdxnEoD1dajn82LMEVwL7JHlnSPYQsXuzrrarsnbTzZMtfpIN9MTq4ZwQfJjvjOtqu7nzMTqK57zJoXEFL0eZ4xyti0lmJTGaWfsCE6lkk6pFNvyfJkxVbZR2o21W'
    const result = UserValidator.validateName(name)
    expect(result).toBe(false)
  })

  test('should return true when a valid name is provide', () => {
    const fullName = `${faker.name.firstName()} ${faker.name.lastName()}`
    const result = UserValidator.validateName(fullName)
    expect(result).toBe(true)
  })

  test('should return false when a empty email is provide', () => {
    const email = ''
    const result = UserValidator.validateEmail(email)
    expect(result).toBe(false)
  })

  test('should return false when email length is greater than 255 characters', () => {
    const email =
      'MuSwKxjkuE4DMRMo4eoj7gdnC6m47o4YUUsMSJQzoBJEf@iEfzyk1xiPM6YuNFlvw6B9yJN6jkHD4bQ3cfBQA83pbT0FkCUv1DcX2R5yctN69HHQkB3dnEWLAqenL1Xp6eGNFdxnEoD1dajn82LMEVwL7JHlnSPYQsXuzrrarsnbTzZMtfpIN9MTq4ZwQfJjvjOtqu7nzMTqK57zJoXEFL0eZ4xyti0lmJTGaWfsCE6lkk6pFNvyfJkxVbZR2o21W.com'
    const result = UserValidator.validateEmail(email)
    expect(result).toBe(false)
  })

  test('should return false when domain is not correctly provide', () => {
    const email = `${faker.name.firstName()}@`
    const result = UserValidator.validateEmail(email)
    expect(result).toBe(false)
  })

  test('should return false when email account name is not correctly provide', () => {
    const email = '@mail.com'
    const result = UserValidator.validateEmail(email)
    expect(result).toBe(false)
  })

  test('should return true when a valid email is provide', () => {
    const email = faker.internet.email()
    const result = UserValidator.validateEmail(email)
    expect(result).toBe(true)
  })
})
