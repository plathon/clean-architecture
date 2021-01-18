import { Either, left, right } from '@shared/either'
import { Email } from './email'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { InvalidNameError } from './errors/InvalidNameError'
import { Name } from './name'

export interface UserData {
  name: string
  email: string
}

export class User {
  private constructor(
    public readonly name: Name,
    public readonly email: Email
  ) {}

  static create(
    userData: UserData
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const { name, email } = userData

    const nameOrError = Name.create(name)
    const emailOrError = Email.create(email)

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(name))
    }

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(email))
    }

    const safeName = nameOrError.value
    const safeEmail = emailOrError.value

    return right(new User(safeName, safeEmail))
  }
}
