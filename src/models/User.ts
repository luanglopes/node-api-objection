import { Model, RelationMappings } from 'objection'

import databaseHelpers from '../database/helpers'

export default class User extends Model {
  static get tableName(): string {
    return 'users'
  }

  static get relationMappings(): RelationMappings {
    const AnylistModelPath = databaseHelpers.importModelPath('Anylist')
    const ImageModelPath = databaseHelpers.importModelPath('Image')

    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: AnylistModelPath,
        join: {
          from: 'users.id',
          to: 'anylists.userId',
        },
      },

      avatar: {
        relation: Model.HasOneRelation,
        modelClass: ImageModelPath,
        filter(builder): void {
          builder.where('imageableType', 'user_avatar')
        },
        beforeInsert(model): void {
          model.imageableType = 'user_avatar'
        },
        join: {
          from: 'users.id',
          to: 'images.imageableId',
        },
      },
    }
  }
}
