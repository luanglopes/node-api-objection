import { Router } from 'express'

import usersRoutes from './users.routes'
import anylistsRoutes from './anylists.routes'

const routes = Router()

routes.get('/', (req, res) => res.json({ hello: 'world' }))
routes.use('/users', usersRoutes)
routes.use('/anylists', anylistsRoutes)

export default routes
