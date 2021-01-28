export class InvalidNameError extends Error {
  constructor(name: string) {
    super(`the name: ${name} is not valid`)
    this.name = name
  }
}
