import { HttpRequest, HttpResponse } from './ports/http'

export interface Controller<T, R> {
  execute(httpRequest: HttpRequest<T>): Promise<HttpResponse<R>>
}
