import { HttpResponse } from '../ports/http'

export enum StatusCode {
  badRequest = 400,
  ok = 200,
  internalServerError = 500
}

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: StatusCode.badRequest,
  body: error
})

export const ok = <T>(data: T): HttpResponse<T> => ({
  statusCode: StatusCode.ok,
  body: data
})

export const internalServerError = (
  description: string
): HttpResponse<string> => ({
  statusCode: StatusCode.internalServerError,
  body: description
})
