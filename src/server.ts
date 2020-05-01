import express, { NextFunction, Response, Request } from 'express'
import cors from 'cors'
import 'express-async-errors'
import 'reflect-metadata'

import routes from './routes'
import AppError from './errors/AppError'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ staus: 'error', message: err.message })
  }

  console.error(err)

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' })
})

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333')
})
