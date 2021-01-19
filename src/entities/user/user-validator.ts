export class UserValidator {
  static validateName(name: string): boolean {
    if (!name || name.trim().length < 2 || name.trim().length > 255) {
      return false
    }
    return true
  }

  static validateEmail(email: string): boolean {
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!email) {
      return false
    }
    if (email.length > 256) {
      return false
    }
    if (!tester.test(email)) {
      return false
    }
    const [account, address] = email.split('@')
    if (account.length > 64) {
      return false
    }
    const domainParts = address.split('.')
    if (
      domainParts.some(function (part) {
        return part.length > 63
      })
    ) {
      return false
    }
    return true
  }
}
