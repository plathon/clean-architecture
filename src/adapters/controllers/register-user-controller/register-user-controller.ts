import { RegisterUserUseCase } from '@useCases/register-user-use-case'
import { Controller } from '../controller'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, ok, internalServerError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../ports/http'
import { RegisterUserRequest as Request } from './register-user-request'
import { RegisterUserResponse as Response } from './register-user-response'

export class RegisterUserController implements Controller<Request, Response> {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  execute = async (
    httpRequest: HttpRequest<Request>
  ): Promise<HttpResponse<Response>> => {
    try {
      if (!httpRequest.body?.name || !httpRequest.body.email) {
        const field = !httpRequest.body?.name ? 'name' : 'email'
        return badRequest(new MissingParamError(field))
      }
      const { body: user } = httpRequest
      const registerUserResponse = await this.registerUserUseCase.execute(user)
      if (registerUserResponse.isLeft()) {
        return badRequest(registerUserResponse.value)
      }
      return ok<Response>(user)
    } catch (error) {
      return internalServerError()
    }
  }
}
