export class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`the email: ${email} is not valid`)
    this.name = email
  }
}
