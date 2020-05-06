import { Model, RelationMappings } from 'objection'

import DBHelpers from '../database/DBHelpers'

export default class User extends Model {
  static get tableName(): string {
    return 'users'
  }

  static get relationMappings(): RelationMappings {
    const AnylistModelPath = DBHelpers.getModelPath('Anylist')
    const ImageModelPath = DBHelpers.getModelPath('Image')

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
