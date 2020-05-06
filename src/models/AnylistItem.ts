import { Model, RelationMappings } from 'objection'

import DBHelpers from '../database/DBHelpers'

export default class AnylistItem extends Model {
  static get tableName(): string {
    return 'anylistItems'
  }

  static get relationMappings(): RelationMappings {
    const BlockModelPath = DBHelpers.getModelPath('Block')

    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: BlockModelPath,
        join: {
          from: 'anylistItems.id',
          to: 'blocks.itemId',
        },
      },
    }
  }
}
