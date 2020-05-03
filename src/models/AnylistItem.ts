import { Model, RelationMappings } from 'objection'

import databaseHelpers from '../database/helpers'

export default class AnylistItem extends Model {
  static get tableName(): string {
    return 'anylistItems'
  }

  static get relationMappings(): RelationMappings {
    const BlockModelPath = databaseHelpers.importModelPath('Block')

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
