/* eslint-disable no-unused-vars */
import { InvalidEmailError } from '@entities/user/errors/invalid-email-error'
import { InvalidNameError } from '@entities/user/errors/invalid-name-error'
import { User } from '@entities/user/user'
import { UserData } from '@entities/user/user-data'
import { Either, left, right } from '@shared/either'
import { UserRepository } from './ports/user-repository'

export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    userData: UserData
  ): Promise<Either<InvalidNameError | InvalidEmailError, User>> {
    const userOrError = User.create(userData)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    const user = userOrError.value
    const userAlreadyExists = await this.userRepository.exists(user.email)
    if (!userAlreadyExists) {
      await this.userRepository.create(userData)
    }
    return right(user)
  }
}
