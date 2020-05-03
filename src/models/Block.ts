import { Model, RelationMappings } from 'objection'

import databaseHelpers from '../database/helpers'

export default class Block extends Model {
  static get tableName(): string {
    return 'blocks'
  }

  static get relationMappings(): RelationMappings {
    const ImageModelPath = databaseHelpers.importModelPath('Image')

    return {
      images: {
        relation: Model.HasOneRelation,
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
