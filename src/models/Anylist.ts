import { Model, RelationMappings } from 'objection'

import databaseHelpers from '../database/helpers'

export default class Anylist extends Model {
  static get tableName(): string {
    return 'anylists'
  }

  static get relationMappings(): RelationMappings {
    const AnylistItemModelPath = databaseHelpers.importModelPath('AnylistItem')
    const User = databaseHelpers.importModelPath('User')

    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: AnylistItemModelPath,
        join: {
          from: 'anylists.id',
          to: 'anylistItems.anylistId',
        },
      },

      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'anylists.userId',
          to: 'users.id',
        },
      },
    }
  }
}
