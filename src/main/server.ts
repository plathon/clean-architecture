import './env'
import express from 'express'
import routes from './routes'
import { middlewares } from './middlewares'

const app = express()

app.use(middlewares)
app.use(routes)

app.listen(3000)
