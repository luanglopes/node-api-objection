import { Model, RelationMappings } from 'objection'

import DBHelpers from '../database/DBHelpers'

export default class Block extends Model {
  static get tableName(): string {
    return 'blocks'
  }

  static get relationMappings(): RelationMappings {
    const ImageModelPath = DBHelpers.getModelPath('Image')

    return {
      images: {
        relation: Model.HasManyRelation,
        modelClass: ImageModelPath,
        filter(builder): void {
          builder.where('imageableType', 'block_image')
        },
        beforeInsert(model): void {
          model.imageableType = 'block_image'
        },
        join: {
          from: 'blocks.id',
          to: 'images.imageableId',
        },
      },
    }
  }
}
