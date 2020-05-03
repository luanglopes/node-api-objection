import { Model } from 'objection'
import Knex from 'knex'

import knexConfig from './knexfile'

const environment = process.env.NODE_ENV || 'development'
const connectionConfig: Knex.Config = knexConfig[environment]

const knex = Knex(connectionConfig)

Model.knex(knex)
