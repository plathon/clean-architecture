import express, { Request, Response } from 'express'

const app = express()

app.use(express.json())

app.use((request: Request, response: Response) => {
    response.status(200).json({ response: 'ok!' })
})

app.listen(3000)