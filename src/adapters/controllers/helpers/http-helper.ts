import { HttpResponse } from '../ports/http'
import { HttpErrorMessage } from './http-error-message'

export enum StatusCode {
  badRequest = 400,
  ok = 200,
  internalServerError = 500
}

export const badRequest = (error: Error): HttpResponse<HttpErrorMessage> => ({
  statusCode: StatusCode.badRequest,
  body: { message: error.message }
})

export const ok = <T>(data: T): HttpResponse<T> => ({
  statusCode: StatusCode.ok,
  body: data
})

export const internalServerError = (
  description = 'Could not process your request. Please try again later.'
): HttpResponse<HttpErrorMessage> => ({
  statusCode: StatusCode.internalServerError,
  body: { message: description }
})
