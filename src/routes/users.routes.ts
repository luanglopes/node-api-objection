import { Router } from 'express'

import User from '../models/User'

const routes = Router()

routes.get('/', async (req, res) => {
  const users = await User.query()

  return res.status(200).json(users)
})

routes.post('/', async (req, res) => {
  const data = req.body

  const user = await User.query().insertAndFetch(data)

  return res.status(201).json(user)
})

routes.put('/:id', async (req, res) => {
  const data = req.body
  const { id } = req.params

  const user = await User.query().updateAndFetchById(id, data)

  return res.status(200).json(user)
})

routes.delete('/:id', async (req, res) => {
  const { id } = req.params

  await User.query().deleteById(id)

  return res.sendStatus(204)
})

export default routes
