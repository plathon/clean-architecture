import { UserError } from './user-error'

export class InvalidEmailError extends Error implements UserError {
  constructor(email: string) {
    super(`the email: ${email} is not valid`)
    this.name = email
  }
}
