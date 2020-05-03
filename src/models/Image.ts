import { Model } from 'objection'

export default class Image extends Model {
  static get tableName(): string {
    return 'images'
  }
}
