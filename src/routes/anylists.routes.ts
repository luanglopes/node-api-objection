import { Router } from 'express'

import Anylist from '../models/Anylist'

const routes = Router()

routes.get('/', async (req, res) => {
  const anylists = await Anylist.query()

  return res.status(200).json(anylists)
})

routes.post('/', async (req, res) => {
  const data = req.body

  const anylist = await Anylist.query().insertAndFetch(data)

  return res.status(201).json(anylist)
})

routes.put('/:id', async (req, res) => {
  const data = req.body
  const { id } = req.params

  const anylist = await Anylist.query().updateAndFetchById(id, data)

  return res.status(200).json(anylist)
})

routes.delete('/:id', async (req, res) => {
  const { id } = req.params

  await Anylist.query().deleteById(id)

  return res.sendStatus(204)
})

export default routes
