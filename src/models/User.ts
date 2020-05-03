import { Model, RelationMappings } from 'objection'

import dbHelpers from '../database/dbHelpers'

export default class User extends Model {
  static get tableName(): string {
    return 'users'
  }

  static get relationMappings(): RelationMappings {
    const AnylistModelPath = dbHelpers.importModelPath('Anylist')
    const ImageModelPath = dbHelpers.importModelPath('Image')

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
