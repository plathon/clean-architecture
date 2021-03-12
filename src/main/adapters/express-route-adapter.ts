import { Request, Response } from 'express'
import { Controller } from '@adapters/controllers/controller'

export const routeAdapter = <T, R>(controller: Controller<T, R>) => async (
  request: Request,
  response: Response
): Promise<void> => {
  const httpRequest = {
    body: request.body
  }
  const httpResponse = await controller.execute(httpRequest)
  response.status(httpResponse.statusCode).json(httpResponse.body)
}
