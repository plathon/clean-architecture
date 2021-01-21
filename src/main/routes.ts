import { Router } from 'express'
import { routeAdapter } from './adapters/express-route-adapter'
import { registerUserController } from './config/register-user'

const routes = Router()

routes.post('/users', routeAdapter(registerUserController))

export default routes
