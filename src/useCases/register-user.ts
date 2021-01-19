/* eslint-disable no-unused-vars */
import { InvalidEmailError } from '@entities/user/errors/InvalidEmailError'
import { InvalidNameError } from '@entities/user/errors/InvalidNameError'
import { User, UserData } from '@entities/user/user'
import { Either, left } from '@shared/either'
import { UserRepository } from './ports/user-repository'

export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: UserData): Promise<void> {
    const userOrError = User.create(userData)
    if (userOrError.isLeft()) {
      left(userOrError.value)
    }
    const user = userOrError.value
    const userAlreadyExists = await this.userRepository.exists('mock')
  }
}
