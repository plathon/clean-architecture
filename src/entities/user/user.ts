import { Either, left, right } from '@shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'
import { UserData } from './user-data'
import { UserValidator } from './user-validator'
export class User {
  private constructor(
    public readonly name: string,
    public readonly email: string
  ) {}

  static create(
    userData: UserData
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const { name, email } = userData

    if (!UserValidator.validateName(name)) {
      return left(new InvalidNameError(name))
    }

    if (!UserValidator.validateEmail(email)) {
      return left(new InvalidEmailError(email))
    }

    return right(new User(name, email))
  }
}
