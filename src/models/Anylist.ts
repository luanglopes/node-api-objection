import { Model, RelationMappings, QueryBuilder } from 'objection'

import DBHelpers from '../database/DBHelpers'

export default class Anylist extends Model {
  static get tableName(): string {
    return 'anylists'
  }

  static get relationMappings(): RelationMappings {
    const AnylistItemModelPath = DBHelpers.getModelPath('AnylistItem')
    const UserModelPath = DBHelpers.getModelPath('User')
    const ImageModelPath = DBHelpers.getModelPath('Image')

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
        modelClass: UserModelPath,
        join: {
          from: 'anylists.userId',
          to: 'users.id',
        },
      },

      cover: {
        relation: Model.HasOneRelation,
        modelClass: ImageModelPath,
        filter(builder: QueryBuilder<Anylist>): void {
          builder.where('imageableType', 'anylist_cover')
        },
        beforeInsert(model): void {
          model.imageableType = 'anylist_cover'
        },
        join: {
          from: 'anylists.id',
          to: 'images.imageableId',
        },
      },

      shareImage: {
        relation: Model.HasOneRelation,
        modelClass: ImageModelPath,
        filter(builder): void {
          builder.where('imageableType', 'anylist_share_image')
        },
        beforeInsert(model): void {
          model.imageableType = 'anylist_share_image'
        },
        join: {
          from: 'anylists.id',
          to: 'images.imageableId',
        },
      },
    }
  }
}
