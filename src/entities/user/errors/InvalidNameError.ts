import { UserError } from './UserError'

export class InvalidNameError extends Error implements UserError {
  constructor(name: string) {
    super(`the name: ${name} is not valid`)
    this.name = name
  }
}
