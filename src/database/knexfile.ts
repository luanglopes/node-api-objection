import Knex from 'knex'
import 'ts-node/register'

interface IKnexfile {
  [env: string]: Knex.Config
}

const knexfile: IKnexfile = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'node_api_objection',
    },
    migrations: {
      tableName: 'migrations',
      extension: 'ts',
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'node_api_objection',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      extension: 'ts',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'node_api_objection',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      extension: 'ts',
    },
  },
}

export = knexfile
