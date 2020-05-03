import { Model, RelationMappings } from 'objection'

import dbHelpers from '../database/dbHelpers'

export default class Block extends Model {
  static get tableName(): string {
    return 'blocks'
  }

  static get relationMappings(): RelationMappings {
    const ImageModelPath = dbHelpers.importModelPath('Image')

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
