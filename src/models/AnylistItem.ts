import { Model, RelationMappings } from 'objection'

import dbHelpers from '../database/dbHelpers'

export default class AnylistItem extends Model {
  static get tableName(): string {
    return 'anylistItems'
  }

  static get relationMappings(): RelationMappings {
    const BlockModelPath = dbHelpers.importModelPath('Block')

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
