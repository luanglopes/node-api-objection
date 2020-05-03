import { Model, RelationMappings } from 'objection'

import databaseHelpers from '../database/helpers'

export default class User extends Model {
  static get tableName(): string {
    return 'users'
  }

  static get relationMappings(): RelationMappings {
    const AnylistModelPath = databaseHelpers.importModelPath('Anylist')

    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: AnylistModelPath,
        join: {
          from: 'users.id',
          to: 'anylists.userId',
        },
      },
    }
  }
}
